import fs = require("fs");

type BedrockServer = {
    Name: String,
    Ip: String,
    Port: number,
    Software: String,
    Version: String,
    Gamemode: String
}

/**
 * Adds server information to 'serverDB'.json
 * @param serverInfo - contains the new server data
 */
export function addServer (serverInfo: BedrockServer)
{
    fs.readFile("serverDB.json", "utf-8", (err, fileData) =>
    {
        let database = JSON.parse(fileData);
        let amount = Object.keys(database.serverList).length;
        let ipExists = false;

        for (let i = 0; i < amount; i++)
        {
            let ipToCheck = database.serverList[i]?.server.ip;

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

        fs.writeFileSync('serverDB.json', JSON.stringify(database), "utf-8");
    });
}