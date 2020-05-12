const BaseEvent = require('./../../modules/BaseEvent');
const { logChannel, logGuild } = require('../../config.json');
const getTimestamp = require('./../functions/getTimestamp');

class UserUpdate extends BaseEvent {
    get name() {
        return 'userUpdate';
    }

    async exec(oldUser, newUser) {
        if (!newUser.bot && oldUser.username !== newUser.username) {
            const channel = newUser.client.guilds.get(logGuild).channels.get(logChannel);
            await channel.send(`🙍‍\`${getTimestamp()}\` \`ID: ${newUser.id}\` **${oldUser.tag}** has changed their username to **${newUser.tag}**.`);
        }
    }
}

module.exports = UserUpdate;
