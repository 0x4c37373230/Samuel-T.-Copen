import Discord = require("discord.js");

import {cmdHandler} from "./cmdHandler";
import * as fs from "fs";
import * as readline from "readline";

const client = new Discord.Client();
const commandPrefix = "c.";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

client.on("ready", () =>
{
    console.log("Ready to do a considerable amount of trolling");
});

client.on("message", (msg: Discord.Message) =>
{
    const args = msg.content.slice(commandPrefix.length).trim().split(" ");
    const command = args.shift()!.toLowerCase();

    if (msg.content.startsWith(commandPrefix) && !msg.author.bot)
        cmdHandler(commandPrefix, msg, command, args);
});

function main() {
    let finalToken = "";

    if (!fs.existsSync("./config.json"))
    {
        rl.question("Please input the bot token: ", (token) =>
        {
            rl.question("Please input the ID of whoever will be the main bot admin: ", function (userID) {
                fs.writeFileSync("./config.json", `{\n\t"token": "${token}",\n\n\t"admins": [\n\t\t"${userID}"\n\t]\n}`);
            });

            finalToken = token;
        });
    }
    else
    {
        const config = require("../config.json");
        finalToken = config.token;
    }

    if (finalToken !== "")
        client.login(finalToken);
    else
        console.log("No token was provided");
}

main();