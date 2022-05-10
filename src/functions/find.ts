// @ts-ignore
import mcpeping = require("mcpe-ping");
import {Message} from "discord.js";

import {pingServer} from "./ping.js";
import {ipGenerator, portGenerator} from "../ipTools";

export function serverSearch(msg: Message, serverAmount: Number, mode: "r" | "s" | "l", portType: "r" | "s" | "l", ipStr: string, portNum: number)
{
    for (let loopCount = 0; loopCount < serverAmount; loopCount++)
    {
        let ip: string;
        let port: number;

        if (ipStr === "SKIP")
            ip = ipGenerator.generator(mode);
        else
            ip = ipGenerator.generator(mode, ipStr);

        if (isNaN(portNum))
            port = portGenerator.generator(portType);
        else
            port = portGenerator.generator(portType, portNum);

        // TODO:
        //  Implement ranged IP search mode
        //  Worker thread usage

        if (ip !== "127.0.0.1")
        {
            mcpeping(ip, port, function (err: any)
            {
                if (err)
                    msg.channel.send(`No server found at **${ip}:${port}**`);
                else
                {
                    msg.channel.send(`A server was found at **${ip}:${port}**. Pinging now...`);
                    pingServer(msg, ip, Number(port));
                }

            }, 3000);
        }
    }
}