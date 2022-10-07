import {Message} from "discord.js";
import * as fs from "fs";
import {downServers} from "./update";

export function removeServer(msg: Message, serverName: string) {
    fs.readFile("serverDB.json", "utf-8", function read(err, fileData)
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
    });
}