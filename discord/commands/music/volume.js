const BaseCommand = require('./../../../modules/BaseCommand');

class Volume extends BaseCommand {
    constructor() {
        super();

        this.aliases = ['sound', 'level', 'vol'];
        this.usage = 'colume [number]';
        this.description = 'guess';
    }

    get name() {
        return 'volume';
    }

    exec(message) {
    // Get the voice connection.
        const voiceConnection = message.client.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
        if (voiceConnection === null)
            return message.channel.send('No music being played.');

        // Get the dispatcher
        const dispatcher = voiceConnection.player.dispatcher;

        if (message.content > 200 || message.content < 0)
            return message.channel.send('Volume out of range!').then((response) => {
                response.delete(5000);
            });

        message.channel.send(`Volume set to ${message.content}`);
        dispatcher.setVolume(message.content / 100);
    }
}

module.exports = Volume;
