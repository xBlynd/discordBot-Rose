const BaseCommand = require('./../../../modules/BaseCommand');

class Clear extends BaseCommand {
    constructor() {
        super();

        this.aliases = [];
        this.usage = 'clear x';
        this.description = 'wipe x amount of messages';
    }

    get name() {
        return 'clear';
    }

    async exec(message) {
        if (!/^\d+$/.test(message.content)) { return message.channel.send(`Specify an number to remove.`).catch(console.log); }

        const amount = parseInt(message.content);
        if (amount > 100) { return message.channel.send(`Number should be less than or equal to 100.`); }

        try {
            const messages = await message.channel.bulkDelete(amount);

            message.channel.send(`Bulk deleted ${messages.size} messages.`);
        } catch (error) {
            message.channel.send(`You can only bulk delete messages that are under 14 days old.`);
        }
    }
}

module.exports = Clear;
