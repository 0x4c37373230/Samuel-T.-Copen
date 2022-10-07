const config = require("../../config.json");
// @ts-ignore
import mcpeping = require("mcpe-ping");
import * as fs from "fs";
import {Message} from "discord.js";
import {adminCheck} from "./admins";

export let downServers: number[] = [];

/**
 * This function will ping all servers in the database and remove the ones that are not found
 * @param {Message} msg - is the context
 */
export function updateDB(msg: Message) {
    fs.readFile("serverDB.json", "utf-8", (err, fileData) =>
    {
        if (!adminCheck(msg.member?.id, config.admins))
            msg.channel.send("You are not listed as an admin in the config file, therefore, you cannot run this command (get fucked lmao)")
        else
        {
            let database = JSON.parse(fileData);
            let amount = Object.keys(database.serverList).length;

            msg.channel.send(`There are ${amount} servers listed in the database. After all of them have been checked, please run the \`remove\` command with no parameters so that the database can actually be updated`)

            for (let i = 0; i < amount; i++)
            {
                let ip = database.serverList[i].server.ip;
                let port = database.serverList[i].server.port;

                mcpeping(ip, port, (err: any) =>
                {
                    if (err)
                    {
                        downServers.push(i);
                        msg.channel.send(`**${ip}:${port}** is either down or it's IP has been changed`);
                    }
                    else
                        msg.channel.send(`**${ip}:${port}** is up and still exists.`);
                }, 3000);
            }
        }
    });
}