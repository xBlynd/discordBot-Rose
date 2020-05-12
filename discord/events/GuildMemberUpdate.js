const BaseEvent = require('./../../modules/BaseEvent');
const { logChannel, logGuild } = require('../../config.json');
const getTimestamp = require('./../functions/getTimestamp');

class GuildMemberUpdate extends BaseEvent {
    get name() {
        return 'guildMemberUpdate';
    }

    async exec(oldMember, newMember) {
        if (newMember.nickname !== oldMember.nickname) {
            const channel = newMember.client.guilds.get(logGuild).channels.get(logChannel);

            if (newMember.nickname) {
                await channel.send(`🙍‍️\`${getTimestamp()}\` \`ID: ${newMember.user.id}\` **${newMember.user.tag}** has changed their nickname to **${newMember.nickname}**.`);
            } else {
                await channel.send(`🙍‍️\`${getTimestamp()}\` \`ID: ${newMember.user.id}\` **${newMember.user.tag}** has removed their nickname of **${oldMember.nickname}**.`);
            }
        } else if (newMember.roles !== oldMember.roles) {
            const channel = newMember.client.guilds.get(logGuild).channels.get(logChannel);
            const currentRoles = newMember.roles.map(r => { if (r.id !== newMember.guild.id) { return r.name; } }).filter(Boolean); // eslint-disable-line array-callback-return
            const oldRoles = oldMember.roles.map(r => { if (r.id !== newMember.guild.id) { return r.name; } }).filter(Boolean); // eslint-disable-line array-callback-return

            if (newMember.roles.size > oldMember.roles.size) {
                let difference = currentRoles.filter(r => !oldRoles.includes(r));
                await channel.send(`🔧\`${getTimestamp()}\` \`ID: ${newMember.user.id}\` **${newMember.user.tag}** roles have changed.\nGained role: \`${difference.join(', ')}\`\nCurrent roles: \`${currentRoles.join(', ')}\``);
            } else {
                let difference = oldRoles.filter(r => !currentRoles.includes(r));
                await channel.send(`🔧\`${getTimestamp()}\` \`ID: ${newMember.user.id}\` **${newMember.user.tag}** roles have changed.\nLost role: \`${difference.join(', ')}\`\nCurrent roles: \`${currentRoles.join(', ')}\``);
            }
        }
    }
}

module.exports = GuildMemberUpdate;
