import {Message} from "discord.js";

import {help} from "./functions/help";
import {pingServer} from "./functions/ping";
import {serverSearch} from "./functions/find";
import {status} from "./functions/status";
import {sort} from "./functions/sort";
import {listServers} from "./functions/list";
import {osInfo} from "./functions/os";

/**
 *
 * @param commandPrefix - is the bot prefix
 * @param msg - is the context
 * @param command -is the function to be executed
 * @param args - are the subcommands or data to be passed to the function which will be executed
 */
export function cmdHandler(commandPrefix: string, msg: Message, command: string, args: string[])
{
    switch (command)
    {
        case "help":
            help(msg, commandPrefix);
            break;
        case "ping":
            if (args[0] === "")
                msg.channel.send("No IP to ping was specified. Please provide an IP to be pinged")
            else
                pingServer(msg, args[0], parseInt(args[1]));
            break;
        case "find":
            serverSearch(msg, parseInt(args[0]), args[1], parseInt(args[2]));
            break;
        case "status":
            status(msg);
            break;
        case "browse":
            if (args[0] === ("name" || "version"))
                sort(msg, args[0], args[1]);
            else
                msg.channel.send("No such criteria exists")
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