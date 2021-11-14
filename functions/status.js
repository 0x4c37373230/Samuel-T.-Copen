const fs = require("fs");
const {MessageEmbed} = require("discord.js");
const mcpeping = require("mcpe-ping");

async function getAllPlayers(serverDB)
{
    let amount = Object.keys(serverDB.serverList).length;
    let players = 0;

    for (let i = 0; i < amount; i++)
    {
        let ip = serverDB.serverList[i].server.ip;
        let port = serverDB.serverList[i].server.port;

        await mcpeping(ip, port, function (err, data)
        {
            if (!err)
            {
                players += data.currentPlayers;
            }
        }, 1000);
    }
    return players;
}

async function pingAll(serverDB)
{
    let amount = Object.keys(serverDB.serverList).length
    let onlineServers = 0;

    for (let i = 0; i < amount; i++)
    {
        let ip = serverDB.serverList[i].server.ip;
        let port = serverDB.serverList[i].server.port;

        await mcpeping(ip, port, function (err)
        {
            if (!err)
            {
                ++onlineServers;
            }
        }, 1000);

    }
    return onlineServers;
}

exports.status = function (msg)
{
    const rStream = fs.createReadStream("serverDB.json").setEncoding("utf8");
    let fileData = "";

    rStream.on("data", function (chunk)
    {
        fileData += chunk;
    });
    rStream.on("end", function ()
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
    });
}