import Discord = require("discord.js");

import {cmdHandler} from "./cmdHandler";

const client = new Discord.Client();
const config = require("../config.json");
const commandPrefix = "c.";

client.on("ready", () =>
{
    console.log("Ready to do a considerable amount of trolling");
})

client.on("message",  (msg: Discord.Message) =>
{
    const args = msg.content.slice(commandPrefix.length).trim().split(" ");
    const command = args.shift()!.toLowerCase();

    if (msg.content.startsWith(commandPrefix) && !msg.author.bot)
    {
        cmdHandler(commandPrefix, msg, command, args);
    }
})

client.login(config.token);