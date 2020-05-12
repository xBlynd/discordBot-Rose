const playlist = require('../../../modules/musicQueue');
const BaseCommand = require('./../../../modules/BaseCommand');

class AutoPlay extends BaseCommand {
    constructor() {
        super();

        this.aliases = [];
        this.usage = 'autoplay';
        this.description = 'toggle autoplay';
    }

    get name() {
        return 'autoplay';
    }

    exec(message) {
        if (!message.member.voiceChannel || !message.client.voiceConnections.get(message.guild.id).channel.members.has(message.author.id)) { return message.channel.send('Please join a voice channel.').catch(console.error); }

        if (!playlist.info[message.guild.id] || !playlist.info[message.guild.id].playing) { return message.channel.send('Currently not playing anything...'); }
        if (playlist.info[message.guild.id].autoplay) {
            playlist.info[message.guild.id].autoplay = false;

            message.channel.send('Autoplay is no longer enabled!').catch(console.error);
        } else {
            playlist.info[message.guild.id].autoplay = true;

            message.channel.send('Autoplay is now enabled!').catch(console.error);
        }
    }
}

module.exports = AutoPlay;
