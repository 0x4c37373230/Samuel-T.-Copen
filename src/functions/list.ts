import fs = require("fs");
import {MessageEmbed, Message} from "discord.js";

/**
 * Sends an embed containing the names of all the servers listed in 'serverDB.json'
 * @param msg - is the context
 */
export function listServers(msg: Message)
{
    fs.readFile('serverDB.json', 'utf8', (err, fileData) =>
    {
        if (!err)
        {
            let database = JSON.parse(fileData);
            let amount = Object.keys(database.serverList).length;
            let serverList = "\`\`\`diff";

            for (let i = 0; i < amount; i++)
            {
                let serverName = database.serverList[i]?.server.name;

                if (typeof serverName !== "undefined")
                    serverList = serverList.concat(`\n+ ${serverName}`)
            }

            let listEmbed = new MessageEmbed()
                .setTitle("Servers")
                .addField("List", `${serverList}\n\`\`\``, false)

            msg.channel.send(listEmbed);
        }
    });
}