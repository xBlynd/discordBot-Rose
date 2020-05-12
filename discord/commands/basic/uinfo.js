const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const BaseCommand = require('./../../../modules/BaseCommand');

class Uinfo extends BaseCommand {
    constructor() {
        super();

        this.aliases = [];
        this.usage = 'uinfo @user';
        this.description = 'gets a users infomation';
    }

    get name() {
        return 'uinfo';
    }

    async exec(message) {
        if (!message.guild) { return; }

        let target;
        if (message.content) {
            target = await require('../../sys').functions.findUser(message);
        } else {
            target = message.member;
        }

        if (target === false) {
            return message.channel.send(`No user found matching ${message.content}.`);
        } else if (target === true) {
            return;
        }

        message.channel.send(new MessageEmbed()
            .setAuthor(target.user.username)
            .setColor(target.displayColor)
            .setDescription([
                `**Nickname:** ${target.nickname || 'N/A'}`,
                `**ID:** ${target.id}`,
                '',
                `**Roles:** ${target.roles.filter((role) => role.id !== message.guild.id).map((role) => role.toString()).join(', ')
                    .substr(0, 2000)}`,
                '',
                `**Created at:** ${moment(target.user.createdAt).utc().format('MMM DD, Y HH:mm z')}`,
                `**Joined at:** ${moment(target.joinedAt).utc().format('MMM DD, Y HH:mm z')}`,
            ])
            .setThumbnail(target.user.displayAvatarURL())
        ).catch(console.error);
    }
}

module.exports = Uinfo;
