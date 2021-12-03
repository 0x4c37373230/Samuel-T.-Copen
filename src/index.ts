import Discord = require("discord.js");

const client = new Discord.Client();
const config = require("../config.json");
const commandPrefix = "c.";

import {help} from "./functions/help";
import {pingServer} from "./functions/ping";
import {serverSearch} from "./functions/find";
import {status} from "./functions/status";
import {sort} from "./functions/sort"
import {listServers} from "./functions/list";
import {osInfo} from "./functions/os";

client.on("ready", () =>
{
    console.log("Ready to do a considerable amount of trolling");
})

client.on("message",  (msg: Discord.Message) =>
{
    const args= msg.content.slice(commandPrefix.length).trim().split(" ");
    // @ts-ignore
    const command= args.shift().toLowerCase();

    if (msg.content.startsWith(commandPrefix))
    {
        if (!msg.author.bot)
        {
            switch (command)
            {
                case "help":
                    help(msg, commandPrefix);
                    break;
                case "ping":
                    pingServer(msg, args[0], parseInt(args[1]));
                    break;
                case "find":
                    serverSearch(msg, parseInt(args[0]), args[1], parseInt(args[2]));
                    break;
                case "status":
                    status(msg);
                    break;
                case "browse":
                    sort(msg, args[0], args[1]);
                    break;
                case "list":
                    listServers(msg);
                    break;
                case "os-info":
                    osInfo(msg);
                    break;
                default:
                    msg.channel.send("No command specified, or command given doesn't exist.");
            }
        }
    }
})

client.login(config.token);