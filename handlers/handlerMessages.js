  
const {
  readdirSync, read, readSync, readdir
} = require("fs")

require('dotenv').config();

const {
  Collection,
  MessageEmbed
} = require("discord.js")

module.exports = async (client) => {

  client.commands = new Collection()
  stuff = readdirSync(__dirname + `/../commands`)
  stuff.forEach(c => {
      const commandFiles = readdirSync(__dirname + `/../commands/${c}`).filter((file) =>
          file.endsWith(".js"),
      )
      for (const file of commandFiles) {
          const command = require(__dirname + `/../commands/${c}/${file}`)

          if (command.name) {
              console.log(`${command.name} loaded!`)
              client.commands.set(command.name, command)
          } else {
              console.log(`${file}❌  -> lack 'name'!`)
              continue
          }
      }
  });

  client.on("messageCreate", async (message) => {
      const prefix = process.env.PREFIX;
      const {author, channel, guild} = message;

      if (author.bot || !guild) {
          return;
      }
      
      // Ignore messages without prefix
      if (!message.content.startsWith(prefix)) return

      const args = message.content
          .slice(prefix.length)
          .trim()
          .split(/ +/g)

      const cmd = args.shift().toLowerCase()
      if(!client.commands.has(cmd)) return;
      try {
          client.commands.get(cmd).run(message, args, client)
      } catch (error) {
          console.error(error)
      }
  })
}