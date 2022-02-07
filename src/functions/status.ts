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

function getAllPlayers(serverDB: {serverList:[ServerInfo]}): number
{
    let amount = Object.keys(serverDB.serverList).length;
    let players = 0;

    for (let i = 0; i < amount; i++)
    {
        let ip = serverDB.serverList[i].server.ip;
        let port = serverDB.serverList[i].server.port;

        mcpeping(ip, port, function (err: any, data: any)
        {
            if (!err)
            {
                players += data.currentPlayers;
            }
        }, 1000);
    }
    return players;
}

function pingAll(serverDB: {serverList:[ServerInfo]}): number
{
    let amount = Object.keys(serverDB.serverList).length
    let onlineServers = 0;

    for (let i = 0; i < amount; i++)
    {
        let ip = serverDB.serverList[i].server.ip;
        let port = serverDB.serverList[i].server.port;

        mcpeping(ip, port, function (err: any)
        {
            if (!err)
            {
                ++onlineServers;
            }
        }, 1000);

    }
    return onlineServers;
}

export function status(msg: Message)
{
    fs.readFile('serverDB.json', 'utf8', function read(err, fileData)
    {
        if (!err)
        {
            msg.channel.send("Just a moment. Please stand by...");

            let database = JSON.parse(fileData);
            let serverAmount = Object.keys(database.serverList).length

             let statusEmbed = new MessageEmbed()
                .setTitle("Sam T. Copen Status")
                .setColor("#FF0000")
                .addField("Total servers", `${serverAmount}`, false)
                .addField("Online servers", pingAll(database), true)
                .addField("Online players", getAllPlayers(database), true)

            msg.channel.send(statusEmbed);
        }
    });
}