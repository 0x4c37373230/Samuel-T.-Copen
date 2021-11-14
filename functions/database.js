const fs = require("fs");

exports.addServer = function (serverInfo)
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
        let ipExists = false;

        for (let i = 0; i < amount; i++)
        {
            let ipToCheck = database.serverList[i].server.ip
            if (ipToCheck === serverInfo.Ip)
            {
                ipExists = true;
            }
        }

        if (!ipExists)
        {
            database.serverList.push(
                {
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

        fs.writeFile('serverDB.json', json, "utf-8", function write(err)
        {
            if (err)
            {
                console.log(err);
            }
        });
    });
}