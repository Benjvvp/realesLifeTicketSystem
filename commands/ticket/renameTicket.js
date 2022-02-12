module.exports = {
  name: "renameticket",
  async run(message, args, client) {
    let newName = args.join(" ");
    if(!message.member.roles.cache.has("940091780869812247")) return message.channel.send("No tienes los permisos necesarios ❌.");
    if(!newName) return message.channel.send("Debes especificar el nuevo nombre del canal.");
    await message.channel.setName(newName);
    message.channel.send(`Se a cambiado correctamente el nombre del ticket a \`${newName}\``);
  },
};
