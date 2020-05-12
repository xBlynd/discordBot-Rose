const BaseEvent = require('./../../modules/BaseEvent');
const prefix = '!';
const { admins } = require('./../../config.json');

class MessageCreate extends BaseEvent {
    get name() {
        return 'message';
    }

    async exec(message) {
        try {
            if (message.channel.type !== 'text') { return; }

            if (message.channel.id === '459210954501128233') { // plz be done?
                // if (message.author.id === '492838738943016983') { return; }
                if (!message.webhookID) { return; }
                message.admin = true;
                await message.channel.send('recived request to update');
                await message.client.commands.get('update').exec(message);
                await message.client.commands.get('reload').exec(message);
                return message.channel.send('bot has updated!');
            }

            if (message.author.bot) { return; }

            if (message.content.toLowerCase().startsWith(prefix.toLowerCase())) {
                message.prefix = prefix;
            } else {
                return console.log(`${message.guildID}: ${message.author.id} - ${message.content}`);
            }

            if (admins.includes(message.author.id)) { message.admin = true; }

            message.source = message.content;
            message.content = message.content.slice(message.prefix.length).trim();
            message.split = message.content.split(' ');
            message.command = message.split.splice(0, 1)[0];
            message.content = message.split.join(' ');

            try {
                if (message.client.commands.has(message.command)) {
                    await this.commands.get(message.command).exec(message);

                    return console.log(`\x1b[33m${message.guildID}: ${message.author.id} - ${message.source}\x1b[0m`);
                } else if (message.client.aliases.has(message.command)) {
                    await this.commands.get(message.client.aliases.get(message.command)).exec(message);

                    return console.log(`\x1b[33m${message.guildID}: ${message.author.id} - ${message.source}\x1b[0m`);
                } else {
                    return console.log(`${message.guildID}: ${message.author.id} - ${message.source}`);
                }
            } catch (error) {
                console.log(error);
                message.channel.send(`An unexpected error has occurred and your request couldn't be handled\n\nMessage: ${message.prefix}${message.command} ${message.content}\nAuthor: <@${message.author.id}>`);
            }
        } catch (error) {
            message.channel.send(`An unexpected error has occurred and your request couldn't be handled\n\nMessage: ${message.content}\nAuthor: ${message.author}`).then(() => {
                message.channel.send(error.stack || error, { code: 'js', split: true }).catch(console.error);
            }).catch(console.error);
        }
    }
}

module.exports = MessageCreate;
