module.exports = {
  name: "closeticket",
  async run(message, args, client) {
    if(!message.member.roles.cache.has("940091780869812247")) return message.channel.send("No tienes los permisos necesarios ❌.");
    message.channel.send('Cerrando el ticket manualmente...').then(msg => {
      setTimeout(() => {
        message.channel.delete();
      }, 5000);
    })
  },
};
