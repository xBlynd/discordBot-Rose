const BaseCommand = require('./../../../modules/BaseCommand');

class Invite extends BaseCommand {
    constructor() {
        super();

        this.aliases = [];
        this.usage = 'invite';
        this.description = 'gets an invite';
    }

    get name() {
        return 'invite';
    }

    exec(message) {
        message.delete().catch(console.error);
        message.reply('Here: https://discord.gg/VjVujAz');
    }
}

module.exports = Invite;
