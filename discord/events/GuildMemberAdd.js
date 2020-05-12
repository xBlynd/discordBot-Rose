const BaseEvent = require('./../../modules/BaseEvent');
const { logChannel, logGuild } = require('../../config.json');
const getTimestamp = require('./../functions/getTimestamp');


class GuildMemberAdd extends BaseEvent {
    get name() {
        return 'guildMemberAdd';
    }

    exec(member) {
        const channel = member.client.guilds.get(logGuild).channels.get(logChannel);
        channel.send(`✅\`${getTimestamp()}\` \`ID: ${member.user.id}\` **${member.user.tag}** joined the guild. Total Members: **${member.guild.memberCount}**`);    
    }
}

module.exports = GuildMemberAdd;
