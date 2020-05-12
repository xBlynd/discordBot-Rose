const BaseCommand = require('./../../../modules/BaseCommand');
const CommandLoader = require('./../../../modules/CommandLoader');
const EventLoader = require('./../../../modules/EventLoader');
const FunctionLoader = require('./../../../modules/FunctionLoader');

class Reload extends BaseCommand {
    constructor() {
        super();

        this.aliases = ['reee'];
        this.usage = 'reload';
        this.description = 'Reload the bots commands, events and functions';
    }

    get name() {
        return 'reload';
    }

    async exec(message) {
        if (!message.admin) { return; }

        const cLoader = new CommandLoader(`${__dirname}/../../commands`);
        const eLoader = new EventLoader(`${__dirname}/../../events`);
        const fLoader = new FunctionLoader(`${__dirname}/../../functions`);

        let client = message.client;

        // clear commands
        delete require.cache[require.resolve('./../../../modules/CommandLoader')];
        client.commands.clear();
        client.aliases.clear();

        // clear events
        delete require.cache[require.resolve('./../../../modules/EventLoader')];
        // for (const event in client.events) { client.events[event].unload(); }
        eLoader.unload(client);

        // clear functions
        delete require.cache[require.resolve('./../../../modules/FunctionLoader')];
        client.functions.clear();

        // reload all
        const loaders = [
            [client.commands, client.aliases] = await cLoader.load(),
            client.events = await eLoader.load(client),
            client.functions = await fLoader.load(),
        ];

        Promise.all(loaders).then(() => {
            console.log(`Sucessfully reloaded ${client.commands.size} commands, ${client.events.size} events, and ${client.functions.size} functions.`);
            message.channel.send(`Sucessfully reloaded ${client.commands.size} commands, ${client.events.size} events, and ${client.functions.size} functions.`);
        }).catch(console.error);
    }
}

module.exports = Reload;
