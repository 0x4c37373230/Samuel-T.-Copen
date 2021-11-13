const fs = require('fs');
const {MessageEmbed} = require("discord.js");
const mcpeping = require("mcpe-ping");

async function getAllPlayers(serverDB)
{
    let amount = Object.keys(serverDB.serverList).length;
    let players = 0;

    for (let i = 0; i < amount; i++)
    {
        let ipToPing = serverDB.serverList[i].server.ip;
        let portToPing = serverDB.serverList[i].server.port;

        await mcpeping(ipToPing, portToPing, function (err, data)
        {
            if (!err)
            {
                players += data.currentPlayers;
            }
        }, 1000);
    }
}

async function pingAll(serverDB)
{
    let amount = Object.keys(serverDB.serverList).length
    let onlineServers = 0;

    for (let i = 0; i < amount; i++)
    {
        let ipToPing = serverDB.serverList[i].server.ip;
        let portToPing = serverDB.serverList[i].server.port;

        await mcpeping(ipToPing, portToPing, function (err)
        {
            if (!err)
            {
                ++onlineServers;
            }
        }, 1000);

    }
    return onlineServers;
}

exports.status = async function (msg)
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
                .addField("Online servers", pingAll(database), false)
                .addField("Online players", getAllPlayers(database), false)

            msg.channel.send(statusEmbed);
        }
    });
}