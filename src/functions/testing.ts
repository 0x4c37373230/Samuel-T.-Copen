const api = require("../statplus/index.js");

export async function testingStuff()
{
    try
    {
        let data = await api.ping("", 19132).then((data: any) => {
            console.log(data)
        });
    }
    catch(err)
    {
        console.log(err)
    }
}