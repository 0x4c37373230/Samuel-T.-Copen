// @ts-ignore
import mcpeping = require("mcpe-ping");
import {Message} from "discord.js";

import {pingServer} from "./ping.js";
import {ipGenerator, portGen} from "../ipTools";

export function serverSearch(msg: Message, serverAmount: Number, mode: "random" | "linear", portType: "r" | "s", portNum: number)
{
    let portGenerator = portGen();

    for (let loopCount = 0; loopCount < serverAmount; loopCount++)
    {
        let ip = ipGenerator.generator(mode);
        let port: number | void = 19132;

        switch (portType)
        {
            case "r":
                port = portGenerator.next().value;
                break;
            default:
                 if (!isNaN(portNum))
                    port = portNum
        }

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