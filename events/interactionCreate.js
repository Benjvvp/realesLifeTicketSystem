const { SelectMenuInteraction } = require("discord.js");
const { getTicketNumbers } = require("../utils/getTicketNumbers");
const { getParentChannel } = require("../utils/getParentChannel");
const Discord = require("discord.js");
const {
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
} = require("discord.js");
const { changeTicketNumbers } = require("../utils/changeTicketNumbers");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {SelectMenuInteraction} interaction;
   */
  async execute(interaction) {
    if (!interaction.isSelectMenu()) return;
    const { guild, member, values } = interaction;
    const value = values[0];
    if (
      !["duda", "reporte", "apelacion", "donacion", "otro"].includes(value)
    )
      return;
    changeTicketNumbers("add", 1);
    const ID = getTicketNumbers();

    await guild.channels
      .create(`${value}-${member.user.username}-${ID}`, {
        type: "text",
        parent: getParentChannel(value),
        permissionOverwrites: [
          {
            id: member.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          },
          {
            id: guild.roles.everyone.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          },
          {
            id: '940091780869812247',
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          }
        ],
      })
      .then((channel) => {
        const Embed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setAuthor({ name: `${guild.name} | ID`, iconURL: guild.iconURL() })
          .setTitle(`Ticket de ${member.user.username} creado correctamente✅`)
          .setDescription(
            `Un <@&940091780869812247> revisara tu ticket y te proporcionara ayuda en lo que necesites.`
          )
          .setFooter({
            text: `La lista que se encuentra abajo es valida solamente para el staff.`,
          });

        const staffRow = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("ticketType")
            .setPlaceholder("Utilidades para staff")
            .setOptions([
              {
                label: "💾 Close",
                value: "close",
              },
            ])
        );
        channel.send({
          embeds: [Embed],
          components: [staffRow],
        });
        interaction.reply({
          content: ` Tu ticket ha sido creado correctamente. ${channel}`,
          ephemeral: true,
        });
      });
  },
};
