import fs = require("fs");
// @ts-ignore
import mcpeping = require("mcpe-ping");
import {MessageEmbed, Message} from "discord.js";

type ServerInfo = {
    server: {
        name: String,
        ip: String,
        port: number,
        software: String,
        version: String,
        gamemode: String
    }
}

/**
 * Gets the total amount of players in all the servers listed in the database
 * @param serverDB - is the parsed version of 'serverDB.json'
 */
function getAllPlayers(serverDB: {serverList:[ServerInfo]}): number
{
    // FIXME: This doesn't work properly yet. I know why (I think I do at least) but it's hard to explain

    let amount = Object.keys(serverDB.serverList).length;
    let players = 0;

    for (let i = 0; i < amount; i++)
    {
        let ip = serverDB.serverList[i]?.server.ip;
        let port = serverDB.serverList[i]?.server.port;

        if (typeof ip !== "undefined" && typeof port !== "undefined")
        {
            mcpeping(ip, port, (err: any, data: any) =>
            {
                if (!err)
                    players += data.currentPlayers;
            }, 1000);
        }
    }
    return players;
}

/**
 * Pings all the servers listed in the JSON to check the amount of online servers
 * @param serverDB - is the parsed version of 'serverDB.json'
 */
function pingAll(serverDB: {serverList:[ServerInfo]}): number
{
    // FIXME: This doesn't work properly yet. I know why (I think I do at least) but it's hard to explain

    let amount = Object.keys(serverDB.serverList).length;
    let onlineServers = 0;

    for (let i = 0; i < amount; i++)
    {
        let ip = serverDB.serverList[i]?.server.ip;
        let port = serverDB.serverList[i]?.server.port;

        if (typeof ip !== "undefined" && typeof port !== "undefined")
        {
            mcpeping(ip, port, (err: any) =>
            {
                if (!err)
                    ++onlineServers;
            }, 1000);
        }

    }
    return onlineServers;
}

/**
 * Sends an embed with the JSON status, online servers and full amount of players
 * @param msg - is the "context"
 */
export function status(msg: Message)
{
    fs.readFile('serverDB.json', 'utf8', (err, fileData) =>
    {
        if (!err)
        {
            msg.channel.send("Just a moment. Please stand by...");

            let database = JSON.parse(fileData);
            let serverAmount = Object.keys(database.serverList).length;

             let statusEmbed = new MessageEmbed()
                .setTitle("Sam T. Copen Status")
                .setColor("#FF0000")
                .addField("Total servers", `${serverAmount}`, false)
                .addField("Online servers", pingAll(database), true)
                .addField("Online players", getAllPlayers(database), true);

            msg.channel.send(statusEmbed);
        }
    });
}