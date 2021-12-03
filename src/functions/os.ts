import osu = require("node-os-utils");
import {Message, MessageEmbed} from "discord.js";

export function osInfo(msg: Message)
{
    osu.cpu.usage().then(cpuPercentage =>
    {
        let osEmbed = new MessageEmbed()
            .setTitle("Sam T. Copen OS Info")
            .setColor("#FF0000")
            .addField("Platform", `${osu.os.platform()}`, false)
            .addField("CPU Model", `${osu.cpu.model()}`, false)
            .addField("CPU Count", `${osu.cpu.count()}`, true)
            .addField("CPU Usage (%)", `${cpuPercentage}%`, true)

        msg.channel.send(osEmbed);
    })
}