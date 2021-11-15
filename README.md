# Samuel-T.-Copen

A javascript bedrock port of the JE Copenheimer project; a discord bot designed to scan the internet for MC servers and ping them to get information about them. Named after Samuel Theodore Cohen; inventor of the neutron bomb

**TODO**:
- "Multithreading"
- Port to typescript

### Dependencies
- discord.js-v12
- mcpe-ping
- node-os-utilities

### Setting the bot up

Download the code folder, run the command `npm install` inside to install all the node-js dependencies; then create a file named 'config.json'. It should look something like this:
```json
{
  "token": "your-token-goes-here"
}
```
Replace the 'your-token-goes-here' with your bot token and then open a command prompt and run `node index`. The bot should start
