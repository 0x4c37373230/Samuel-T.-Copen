import fs = require("fs");

type BedrockServer = {
    Name: String,
    Ip: String,
    Port: number,
    Software: String,
    Version: String,
    Gamemode: String
}

export function addServer (serverInfo: BedrockServer)
{
    fs.readFile("serverDB.json", "utf-8", function read(err, fileData)
    {
        let database = JSON.parse(fileData);
        let amount = Object.keys(database.serverList).length;
        let ipExists = false;

        for (let i = 0; i < amount; i++)
        {
            let ipToCheck = database.serverList[i].server.ip;

            if (ipToCheck === serverInfo.Ip)
                ipExists = true;
        }

        if (!ipExists)
        {
            database.serverList.push({
                server:
                    {
                        name: serverInfo.Name,
                        ip: serverInfo.Ip,
                        port: serverInfo.Port,
                        software: serverInfo.Software,
                        version: serverInfo.Version,
                        gamemode: serverInfo.Gamemode
                    }
            });
        }

        let json = JSON.stringify(database);

        fs.writeFileSync('serverDB.json', json, "utf-8");
    });
}