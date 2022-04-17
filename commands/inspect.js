const fs = require("fs");
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key f921e51388e443da9ee3e944e2bd536c");

module.exports = {
  name: "inspect",
  help: "Sssnek SSssmart",
  arguments: " ",
  async execute(client, interaction, args) {
    if (interaction.attachments.size > 0) {
      let image;
      interaction.attachments.forEach((a) => {
        image = a.proxyURL;
      });
      let textoutput = "i think thiSSss image containSsss:\n";
      let temptext = "nothing at all";
      await stub.PostModelOutputs(
        {
          model_id: "snakebrain",
          inputs: [{ data: { image: { url: image } } }],
        },
        metadata,
        (err, response) => {
          if (err) {
            throw new Error(err);
          }
          if (response.status.code !== 10000) {
            throw new Error(
              "post model outputs failed status: " + response.status.description
            );
          }
          const output = response.outputs[0];
          const outputdata = output.data.concepts.sort((a, b) => {
            return a.value - b.value;
          });
          for (const concept of outputdata) {
            console.log(concept.name + " " + concept.value);
            temptext = "";
            temptext +=
              Math.round(concept.value * 100) + "% " + concept.name + " \n";
          }
          interaction.channel.send({ content: textoutput + temptext });
        }
      );
    }
  },
};
