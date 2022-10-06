import {MessageEmbed, Message} from "discord.js";

/**
 * Sends an embed containing a list of all the bot commands and their basic usage
 * @param msg - is the context
 * @param commandPrefix - is the bot prefix
 */
export function help (msg: Message, commandPrefix: String)
{
    let helpEmbed = new MessageEmbed()
        .setTitle("Sam T. Copen")
        .setDescription("A bedrock port of the Java Edition Copenheimer project")
        .addField("Prefix", `${commandPrefix}`, false)
        .addField("ping", "Usage: `c.ping [ip] [port]`. \n Pings a server and retrieves information about it. If the server isn't in the database; it will be added", true)
        .addField("find", "Usage: `c.find [port mode] [port]`. \n Generates IPs and looks for MCBE servers by pinging them. By default it looks on the port 19132", true)
        .addField("status", "Usage: `c.status`. \n Provides some information about the bot including how many servers are in the database, how many of those servers are online and the total player count of all those servers", true)
        .addField("browse", "Usage: `c.browse [condition] [value]`. \n Allows browsing through the database. The conditions can be either 'name' or 'version' and value can be anything", true)
        .addField("list", "Usage: `c.list`. \n Lists the names of all the servers in the database", true)
        .addField("os-info", "Usage: `c.os-info`. \n Provides some information about the environment where the bot is running", true);

    msg.channel.send(helpEmbed);
}