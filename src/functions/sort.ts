import fs = require("fs");

import {MessageEmbed, Message} from "discord.js";

/**
 * Sends an embed containing all the listed server names that match certain criteria
 * @param msg - is the subcommand to be executed
 * @param conditionType - determines the type of criteria to be selected
 * @param conditionValue - determines the value the criteria must have
 */
export function sort(msg: Message, conditionType: "name" | "version", conditionValue: String)
{
    // FIXME: This bot command straight up does not work and I have no idea why since it used to work properly

    fs.readFile('serverDB.json', 'utf8', function read(err, fileData)
    {
        if (!err)
        {
            let database = JSON.parse(fileData);
            let amount = Object.keys(database.serverList).length;

            let matchEmbed = new MessageEmbed()
                .setTitle("Matches")
                .setColor("#FF00FF")

            switch (conditionType)
            {
                case "name":
                    for (let i = 0; i < amount; i++)
                    {
                        let serverName = database.serverList[i].server.name;

                        if (serverName.search(conditionValue))
                            matchEmbed.addField(`${serverName}-`, `${database.serverList[i].server.ip} : ${database.serverList[i].server.port}`, false)
                    }
                    break;
                default:
                    for (let i = 0; i < amount; i++)
                    {
                        let serverVersion = database.serverList[i].server.version;

                        if (serverVersion === conditionValue)
                            matchEmbed.addField(`${database.serverList[i].server.name}`, `${database.serverList[i].server.ip} : ${database.serverList[i].server.port}`, false)
                    }
            }

            msg.channel.send(matchEmbed);
        }
    });
}