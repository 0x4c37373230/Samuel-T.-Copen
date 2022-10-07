import {Message} from "discord.js";
import * as fs from "fs";

/**
 * This function basically checks if the user ID of whoever executed an admin-restricted command is listed in the
 * config file
 * @param {string | undefined} userID - is the ID of whoever ran a command
 * @param adminArray - is the array that contains all admin IDs on the config file
 * @returns {boolean}
 */
export function adminCheck(userID: string | undefined, adminArray: any): boolean
{
    let permissionCheck = false;

    for (let i = 0; i < adminArray.length; i++)
    {
        if (userID === adminArray[i])
            permissionCheck = true;
    }

    return permissionCheck;
}

/**
 * This can act as the add and remove admin commands. Both require an admin to execute them
 * @param {Message} msg - is the context
 * @param {"add" | "remove"} instruction - is what determines whether the provided ID should be added or removed
 * @param {string} id - is the id to perform an operation on
 */
export function adminManager(msg: Message, instruction: "add" | "remove", id: string) {
    fs.readFile("config.json", "utf-8", (err, fileData) =>
    {
        let config = JSON.parse(fileData);
        let exists = false;

        if (!adminCheck(msg.member?.id, config.admins))
            msg.channel.send("You are not listed as an admin in the config file, therefore, you cannot run this command (get fucked lmao)")
        else
        {
            switch (instruction)
            {
                case "add":
                    for (let i = 0; i < config.admins.length; i++)
                    {
                        if (id === config.admins[i])
                            exists = true;
                    }

                    if (!exists)
                        config.admins.push(id);
                    break;
                default:
                    for (let i = 0; i < config.admins.length; i++)
                    {
                        if (id === config.admins[i])
                            delete config.admins[i]
                    }
            }

            fs.writeFileSync("../config.json", JSON.stringify(config))
            msg.channel.send("Changes executed successfully");
        }
    });
}
