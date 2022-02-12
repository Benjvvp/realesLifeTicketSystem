const Discord = require("discord.js");
function sendMessageToStaff(messageParam, userName, ticketType) {
  const embed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Ticket creado")
    .setDescription(
      `**Un usuario a creado un ticket por favor atiendelo lo antes posible, el nombre del usuario es \`${userName}\` y el tipo de ticket es \`${ticketType}\`**`
    )
  messageParam.guild.members.cache.forEach((member) => {
    if (member.roles.cache.find((role) => role.id === "940091780869812247")) {
      member.send({ embeds: [embed] });
    }
  });
}

module.exports = { sendMessageToStaff };
