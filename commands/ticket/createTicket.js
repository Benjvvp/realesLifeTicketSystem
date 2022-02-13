const Discord = require("discord.js");
const {
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
} = require("discord.js");
module.exports = {
  name: "createticket",
  async run(message, args, client) {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send("No tienes los permisos necesarios ❌.");
    if(!args[0]) return message.channel.send("Debes especificar el canal para crear el ticket.");
    const channel = message.mentions.channels.first() || message.channel;

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('ticketType')
        .setPlaceholder("Selecciona el tipo de ticket")
        .setOptions([
          {
            label: '❓ Duda',
            value: 'duda',
          },
          {
            label: '⛔️ Reporte',
            value: 'reporte',
          },
          {
            label: '📃 Apelacion',
            value: 'apelacion',
          },
          {
            label: '💳 Donacion',
            value: 'donacion',
          },
          {
            label: '📝 Otro',
            value: 'otro',
          }
        ])
    );

    //Embed and Buttons in Channel Ticket
    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("Abrir ticket Realeslife ✅")
      .setDescription(
        "**Para poder crear un ticket debes seleccionar el apartado que deseas abrir y pulsarlo.**"
      )
      .setThumbnail(
        client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      );
    await channel.send({ embeds: [embed], components: [row] });
  },
};
