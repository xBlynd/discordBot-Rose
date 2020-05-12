const BaseEvent = require('./../../modules/BaseEvent');
const { logChannel, logGuild } = require('../../config.json');
const getTimestamp = require('./../functions/getTimestamp');

class MessageUpdate extends BaseEvent {
    get name() {
        return 'messageUpdate';
    }

    async exec(oldMessage, newMessage) {
        if (!newMessage.author.bot && oldMessage.content !== newMessage.content) {
            const channel = newMessage.client.guilds.get(logGuild).channels.get(logChannel);
            await channel.send(`🛠\`${getTimestamp()}\` \`ID: ${newMessage.author.id}\` **Channel**: <#${newMessage.channel.id}> **${newMessage.author.tag}'s** message was edited.\n**Old**: ${oldMessage.cleanContent}\n\n**New**: ${newMessage.cleanContent}`, { split: true });
        }
    }
}

module.exports = MessageUpdate;
