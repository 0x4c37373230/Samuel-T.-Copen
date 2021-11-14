const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const commandPrefix = "c.";

const {pingServer} = require("./functions/ping.js");
const {serverSearch} = require("./functions/find.js");
const {status} = require("./functions/status");
const {sort} = require("./functions/sort");
const {getPlayers} = require("./functions/players")

client.on("ready", () =>
{
    console.log("Ready to do a considerable amount of trolling");
})

client.on("message",  msg =>
{
    const args= msg.content.slice(commandPrefix.length).trim().split(" ");
    const command= args.shift().toLowerCase();

    if (msg.content.startsWith(commandPrefix))
    {
        if (!msg.author.bot)
        {
            switch (command)
            {
                case "ping":
                    pingServer(msg, args[0], args[1]);
                    break;
                case "find":
                    serverSearch(msg, args[0], args[1], args[2]);
                    break;
                case "status":
                    status(msg);
                    break;
                case "browse":
                    sort(msg, args[0], args[1]);
                    break;
                case "players":
                    getPlayers(msg, args[0], args[1]);
                    break;
                default:
                    msg.channel.send("No command specified, or command given doesn't exist.");
            }
        }
    }
});

client.login(config.token);