console.log(`Session starting`);

const { Client } = require('discord.js');
const client = new Client({ disableEveryone: true, fetchAllMembers: true });
const { token } = require('./config.json');

const CommandLoader = require('./modules/CommandLoader');
const EventLoader = require('./modules/EventLoader');
const FunctionLoader = require('./modules/FunctionLoader');

client.on('ready', async() => {
    const cLoader = new CommandLoader(`${__dirname}/discord/commands`);
    const eLoader = new EventLoader(`${__dirname}/discord/events`);
    const fLoader = new FunctionLoader(`${__dirname}/discord/functions`);
    const loaders = [[client.commands, client.aliases] = await cLoader.load(), client.events = await eLoader.load(client), client.functions = await fLoader.load()];
    Promise.all(loaders).then(() => { console.log(`Sucessfully loaded ${client.commands.size} commands, ${client.events.size} events, and ${client.functions.size} functions.\nBot is now ready`); }).catch(console.error);

    client.functions.get('onReady')(client);
});

client.permits = {};
client.login(token);
