# Samuel-T.-Copen

A typescript bedrock port of the JE Copenheimer project; a discord bot designed to scan the internet for MC servers and ping them to get information about them. Named after Samuel Theodore Cohen; inventor of the neutron bomb. Note that the server storing is inefficient as it's quite slow. This was just made as a POC and not intended for actual usage, feel free to improve it anyways

**TODO**:
- Worker threads
- Reader Streams

### Dependencies
- discord.js-v12
- mcpe-ping
- node-os-utilities

### Setting the bot up

Download the code folder, run the command `npm install` inside to install all the node-js dependencies. Then open a command prompt and run `tsc` to transpile the TS code to JS; then run `cd dist` and then `node index`. The bot should start and if the config file doesn't exist, it will be created and you'll be asked to input a token.
