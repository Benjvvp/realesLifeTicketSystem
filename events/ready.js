module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ingresando como ${client.user.tag}!`);
    client.user.setActivity("Moderando RealesLife 🤖", {
      type: "PLAYING",
    });
  },
};
