const { Client, Intents } = require("discord.js");
const fs = require("fs");
const client = new Client({ intents: [new Intents(32767)] });

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
const commandHandler = require("./handlers/handlerMessages");

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
commandHandler(client);

client.login(process.env.TOKEN);