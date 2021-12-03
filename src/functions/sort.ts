import fs = require("fs");

import {MessageEmbed, Message} from "discord.js";

export function sort(msg: Message, conditionType: String, conditionValue: String)
{
    fs.readFile('serverDB.json', 'utf8', function read(err, fileData)
    {
        if (!err)
        {
            let database = JSON.parse(fileData);
            let amount = Object.keys(database.serverList).length;

            switch (conditionType)
            {
                case "name":
                    let nameEmbed = new MessageEmbed()
                        .setTitle("Matches")
                        .setColor("#FF00FF")

                    for (let i = 0; i < amount; i++)
                    {
                        let serverName = database.serverList[i].server.name;

                        if (serverName.search(conditionValue) > 0)
                        {
                            nameEmbed.addField(`${serverName}-`, `${database.serverList[i].server.ip} : ${database.serverList[i].server.port}`, false)
                        }
                    }
                    msg.channel.send(nameEmbed);
                    break;
                case "version":
                    let versionEmbed = new MessageEmbed()
                        .setTitle("Matches")
                        .setColor("#FF00FF")

                    for (let i = 0; i < amount; i++)
                    {
                        let serverVersion = database.serverList[i].server.version;

                        if (serverVersion === conditionValue)
                        {
                            versionEmbed.addField(`${database.serverList[i].server.name}`, `${database.serverList[i].server.ip} : ${database.serverList[i].server.port}`, false)
                        }
                    }
                    msg.channel.send(versionEmbed);
                    break;
            }
        }
    });
}