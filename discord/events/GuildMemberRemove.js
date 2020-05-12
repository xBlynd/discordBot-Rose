const BaseEvent = require('./../../modules/BaseEvent');
const { logChannel, logGuild } = require('../../config.json');
const getTimestamp = require('./../functions/getTimestamp');

class GuildMemberRemove extends BaseEvent {
    get name() {
        return 'guildMemberRemove';
    }

    exec(member) {
        setTimeout(async () => {
            let bans = await member.guild.fetchBans();

            if (bans.has(member.user.id)) {
                return;
            }

            const channel = member.client.guilds.get(logGuild).channels.get(logChannel);
            await channel.send(`❌\`${getTimestamp()}\` \`ID: ${member.user.id}\` **${member.user.tag}** left the guild or was kicked. Total Members: **${member.guild.memberCount}**`);
        }, 1250);
    }
}

module.exports = GuildMemberRemove;
