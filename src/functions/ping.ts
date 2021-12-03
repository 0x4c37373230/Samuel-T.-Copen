// @ts-ignore
import mcpeping = require("mcpe-ping");
import {MessageEmbed, Message} from "discord.js";

import {addServer} from "./database";

export function pingServer (msg: Message, ip: String, port: number)
{
    mcpeping(`${ip}`, port, function(err: any, data: any)
    {
        if (err)
        {
            msg.channel.send(`**ERROR**: ${err.description}`);
        }
        else
        {
            let serverInfo =
                {
                    Name: `${data.cleanName}`,
                    Ip: `${data.rinfo.address}`,
                    Port: port,
                    Software: "",
                    Version: `${data.version}`,
                    Gamemode: ""
                };

            let infoEmbed = new MessageEmbed()
                .setTitle(`${data.cleanName}`)
                .setColor("#ADD8E6")
                .addField("Address", `${data.rinfo.address}`, false)
                .addField("Current Player Count", `${data.currentPlayers}`, true)
                .addField("Max Players", `${data.maxPlayers}`, true)
                .addField("Version", `${data.version}`, false);

            if (data.advertise.search("Survival"))
            {
                infoEmbed.addField("Gamemode", "Survival", false);
                serverInfo.Gamemode = "Survival";
            }
            else if (data.advertise.search("Creative"))
            {
                infoEmbed.addField("Gamemode", "Creative", false);
                serverInfo.Gamemode = "Creative";
            }

            if (data.advertise.search("PocketMine-MP"))
            {
                infoEmbed.addField("Software", "PocketMine-MP", false);
                serverInfo.Software = "PocketMine-MP";
            }
            else if (data.advertise.search("Proxy"))
            {
                infoEmbed.addField("Software", "Proxy", false);
                serverInfo.Software = "Proxy";
            }
            addServer(serverInfo);
            msg.channel.send(infoEmbed);
        }
    }, 3000);
}