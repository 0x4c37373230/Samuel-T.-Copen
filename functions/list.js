const fs = require("fs");
const {MessageEmbed} = require("discord.js");

exports.listServers = function (msg)
{
    const rStream = fs.createReadStream("serverDB.json").setEncoding("utf8");
    let fileData = "";

    rStream.on("data", function(chunk)
    {
        fileData += chunk;
    });
    rStream.on("end",function()
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
    });
}