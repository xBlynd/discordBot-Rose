module.exports = (message) => {
    const search = message.content.toLowerCase();
    if (message.mentions.members.size > 0) {
        return message.mentions.members.first();
    }
    const found = message.guild.members.filter(member => { // eslint-disable-line array-callback-return
        const username = member.user.username.toLowerCase();
        const displayName = member.displayName.toLowerCase();

        if (username.toLowerCase() === search || displayName.toLowerCase() === search) {
            return true;
        } else if (username.toLowerCase().includes(search) || displayName.toLowerCase().includes(search)) {
            return true;
        }
    });

    if (found.size > 1) {
        const foundArray = found.map(member => member.displayName || member.user.username);

        message.channel.send(`There were multiple users found: ${'```'}\n${foundArray.join('\n')}${'```'}`).catch(console.error);

        return true;
    } else if (found.size === 1) {
        return found.first();
    } else {
        return false;
    }
};

