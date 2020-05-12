const BaseCommand = require('./../../../modules/BaseCommand');

class Random extends BaseCommand {
    constructor() {
        super();

        this.aliases = [];
        this.usage = 'random';
        this.description = 'selects a user from current voice channel';
    }

    get name() {
        return 'random';
    }

    exec(message) {
        if (message.member.voiceChannel) {
            const members = message.member.voiceChannel.members.array();
            return message.channel.send(`${members[Math.floor(Math.random() * members.length)].user.toString()} is the winner!`);
        } else {
            return message.reply('You need to be in a voice channel to use this command.');
        }
    }
}

module.exports = Random;
