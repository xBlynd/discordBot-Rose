const BaseEvent = require('./../../modules/BaseEvent');
const { logChannel, logGuild } = require('../../config.json');
const getTimestamp = require('./../functions/getTimestamp');

class test extends BaseEvent {
    get name() {
        return 'voiceStateUpdate';
    }

    async exec(oldMember, newMember) {
        if (oldMember && newMember && oldMember.voiceChannel && newMember.voiceChannel && oldMember.voiceChannel.id === newMember.voiceChannel.id) {
            return;
        }

        if (oldMember.voiceChannel) {
            // left
            const channel = oldMember.client.guilds.get(logGuild).channels.get(logChannel);
            await channel.send(`\`${getTimestamp()}\` \`ID: ${oldMember.user.id}\` **${oldMember.user.tag}** left **${oldMember.voiceChannel.name}**(${oldMember.voiceChannel.id}).`);
        }

        if (newMember.voiceChannel) {
            // joined
            const channel = oldMember.client.guilds.get(logGuild).channels.get(logChannel);
            await channel.send(`\`${getTimestamp()}\` \`ID: ${newMember.user.id}\` **${newMember.user.tag}** joined **${newMember.voiceChannel.name}**(${newMember.voiceChannel.id}).`);
        }
    }
}

module.exports = test;
