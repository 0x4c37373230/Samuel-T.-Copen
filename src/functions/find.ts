// @ts-ignore
import mcpeping = require("mcpe-ping");
import {Message} from "discord.js";

import {pingServer} from "./ping.js";

function* octetGen()
{
    while (true) {
        yield Math.floor(Math.random() * (255 + 1));
    }
}

function* portGen()
{
    while (true) {
        yield Math.floor(Math.random() * (65535 - 1 + 1)) + 1;
    }
}

export function serverSearch(msg: Message, serverAmount: Number, portType: String, portNum: number)
{
    let octetGenerator = octetGen();
    let portGenerator = portGen();

    for (let loopCount = 0; loopCount < serverAmount; loopCount++)
    {
        let ip = `${octetGenerator.next().value}.${octetGenerator.next().value}.${octetGenerator.next().value}.${octetGenerator.next().value}`;
        let port: number | void = 19132;

        switch (portType)
        {
            case "r":
                port = portGenerator.next().value;
                break;
            case "s":
                port = portNum;
                break;
        }

        if (ip !== "127.0.0.1")
        {
            mcpeping(ip, port, function (err: any)
            {
                if (err)
                {
                    msg.channel.send(`No server found at **${ip} : ${port}**`);
                }
                else
                {
                    msg.channel.send(`A server was found at **${ip}:${port}**. Pinging now...`);
                    pingServer(msg, ip, Number(port));
                }
            }, 3000);
        }
    }
}