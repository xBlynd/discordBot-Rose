const BaseEvent = require('./../../modules/BaseEvent');
const { logChannel, logGuild } = require('../../config.json');
const getTimestamp = require('./../functions/getTimestamp');


class GuildBanRemove extends BaseEvent {
    get name() {
        return 'guildBanRemove';
    }

    exec(guild, user) {
        const channel = guild.client.guilds.get(logGuild).channels.get(logChannel);

        setTimeout(async () => {
            let bans = await guild.fetchAuditLogs({ type: 'MEMBER_BAN_REMOVE' });
            let ban = bans.entries.first();

            await channel.send(`✨\`${getTimestamp()}\` \`ID: ${user.id}\` **${user.tag}** was unbanned from the guild by **${ban.executor.tag}**. Total Members: **${guild.memberCount}**`);
        }, 1000);
    }
}

module.exports = GuildBanRemove;
