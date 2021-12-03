import fs = require("fs");
import {MessageEmbed, Message} from "discord.js";

export function listServers(msg: Message)
{
    fs.readFile('serverDB.json', 'utf8', function read(err, fileData)
    {
        if (!err)
        {
            let database = JSON.parse(fileData);
            let amount = Object.keys(database.serverList).length;
            let serverList = "\`\`\`diff\n+ ";

            for (let i = 0; i < amount; i++)
            {
                let serverName = database.serverList[i].server.name;
                serverList = serverList.concat(`${serverName}\n+ `)
            }

            let listEmbed = new MessageEmbed()
                .setTitle("Servers")
                .addField("List", `${serverList}\n\`\`\``, false)

            msg.channel.send(listEmbed);
        }
    });
}