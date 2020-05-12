const util = require('util');
const BaseCommand = require('./../../../modules/BaseCommand');

class Ping extends BaseCommand {
    constructor() {
        super();

        this.aliases = [];
        this.usage = 'ping';
        this.description = 'PONG!';
    }

    get name() {
        return 'ping';
    }

    async exec(message) {
        const res = await message.channel.send('PONG!').catch(console.error);

        return res.edit([
            `Round Trip: ${res.createdTimestamp - message.createdTimestamp}ms`,
            `WSS: ${util.inspect(message.client.pings)}`,
        ]);
    }
}

module.exports = Ping;
