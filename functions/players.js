const statplus = require("../statplus/src/index.js")

exports.getPlayers = async function (msg, ip, port)
{
    try
    {
        let data = await statplus.ping(`${ip}`, port, 3000, 1);
        console.log(JSON.stringify(data))
    }
    catch(err)
    {
        console.log(err)
    }
}