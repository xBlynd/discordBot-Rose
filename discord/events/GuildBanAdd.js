const BaseEvent = require('./../../modules/BaseEvent');
const { logChannel, logGuild } = require('../../config.json');
const getTimestamp = require('./../functions/getTimestamp');

class GuildBanAdd extends BaseEvent {
    get name() {
        return 'guildBanAdd';
    }

    exec(guild, user) {
        const channel = guild.client.guilds.get(logGuild).channels.get(logChannel);

        setTimeout(async () => {
            let bans = await guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD' });
            let ban = bans.entries.first();
            let reason = ban.reason ? ban.reason : 'None specified';

            await channel.send(`🔨\`${getTimestamp()}\` \`ID: ${user.id}\` **${user.tag}** was banned from the guild by **${ban.executor.tag}**. **Reason**: \`${reason}\`. Total Members: **${guild.memberCount}**`);
        }, 250);
    }
}

module.exports = GuildBanAdd;
