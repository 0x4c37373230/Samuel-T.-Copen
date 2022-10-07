const config = require("../../config.json")
import * as fs from "fs";
import {Message} from "discord.js";
import {downServers} from "./update";
import {adminCheck} from "./admins";

/**
 * Removes one or multiple servers from the database
 * @param {Message} msg - is the context
 * @param {string} serverName - is a somewhat optional parameter. If no value is provided, then all the servers on the
 * array indexes determined by the `downServers` variable will be removed from the database
 */
export function removeServer(msg: Message, serverName: string) {
    fs.readFile("serverDB.json", "utf-8", (err, fileData) =>
    {
        if (!adminCheck(msg.member?.id, config.admins))
            msg.channel.send("You are not listed as an admin in the config file, therefore, you cannot run this command (get fucked lmao)")
        else
        {
            let database = JSON.parse(fileData);
            let amount = Object.keys(database.serverList).length;

            for (let i = 0; i < amount; i++)
            {
                if (typeof serverName === "undefined")
                {
                    for (let j = 0; j < downServers.length; j++)
                    {
                        if (downServers[j] === i)
                            delete database.serverList[i];
                    }
                }
                else
                {
                    if (database.serverList[i].server.name === serverName)
                        delete database.serverList[i];
                }
            }

            fs.writeFileSync('serverDB.json', JSON.stringify(database), "utf-8");
            msg.channel.send("Database update completed successfully");
        }
    });
}