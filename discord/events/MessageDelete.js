const BaseEvent = require('./../../modules/BaseEvent');
const { logChannel, logGuild } = require('../../config.json');
const getTimestamp = require('./../functions/getTimestamp');

class MessageDelete extends BaseEvent {
    get name() {
        return 'messageDelete';
    }

    exec(message) {
        if (!message.author.bot && message.content) {
            const channel = message.client.guilds.get(logGuild).channels.get(logChannel);

            setTimeout(async () => {
                let messageDeletes = await message.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE' });
                let deletedMessage = messageDeletes.entries.first();

                if (Date.now() >= (deletedMessage.createdAt.getTime() + 5000)) {
                    await channel.send(`🗑\`${getTimestamp()}\` \`ID: ${message.author.id}\` **Channel**: <#${message.channel.id}> **${message.author.tag}'s** message was deleted.\n**Content**: ${message.cleanContent}`, { split: true });
                } else {
                    await channel.send(`🗑\`${getTimestamp()}\` \`ID: ${message.author.id}\` **Channel**: <#${message.channel.id}> **${message.author.tag}'s** message was deleted by **${deletedMessage.executor.tag}**.\n**Content**: ${message.cleanContent}`, { split: true });
                }
            }, 1000);
        }
    }
}

module.exports = MessageDelete;
