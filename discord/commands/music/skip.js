const BaseCommand = require('./../../../modules/BaseCommand');

class Skip extends BaseCommand {
    constructor() {
        super();

        this.aliases = [];
        this.usage = 'skip';
        this.description = 'skips song';
    }

    get name() {
        return 'skip';
    }

    exec(message) {
        const connection = message.client.voiceConnections.get(message.guild.id);
        if (!connection || !connection.dispatcher) { return message.channel.send('Unable to fetch active connected session.').catch(console.error); }

        connection.dispatcher.end();
        message.react('👌').catch(console.error);
    }
}

module.exports = Skip;
