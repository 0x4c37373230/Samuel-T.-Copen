const mcpeping = require("mcpe-ping");

const {pingServer} = require("./ping.js");

function octetGen()
{
    return Math.floor(Math.random() * (255 + 1));
}

function portGen()
{
    return Math.floor(Math.random() * (65535 - 1 + 1)) + 1;
}

exports.serverSearch = function (msg, serverAmount, portType, portNumber)
{
    for (let loopCount = 0; loopCount < serverAmount; loopCount++)
    {
        let ipAddress = `${octetGen()}.${octetGen()}.${octetGen()}.${octetGen()}`;
        let portNum = 19132

        switch (portType)
        {
            case "r":
                portNum = portGen();
                break;
            case "s":
                portNum = portNumber;
                break;
        }

        if (ipAddress !== "127.0.0.1")
        {
            mcpeping(`${ipAddress}`, portNum, function (err)
            {
                if (err)
                {
                    msg.channel.send(`No server found at **${ipAddress} : ${portNum}**`);
                }
                else
                {
                    msg.channel.send(`A server was found at **${ipAddress}:${portNum}**. Pinging now...`);
                    pingServer(msg, ipAddress, portNum);
                }
            }, 3000);
        }
    }
}