const playlist = require('../../../modules/musicQueue');
const BaseCommand = require('./../../../modules/BaseCommand');

class Stop extends BaseCommand {
    constructor() {
        super();

        this.aliases = ['end'];
        this.usage = 'stop';
        this.description = 'stops playback';
    }

    get name() {
        return 'template';
    }

    exec(message) {
        const connection = message.client.voiceConnections.get(message.guild.id);
        if (!connection || !connection.dispatcher) { return message.channel.send('Unable to fetch active connected session.').catch(console.error); }
    
        playlist.end(message.guild.id);
    
        message.client.commands.get('skip').exec(message);
    }
}

module.exports = Stop;
