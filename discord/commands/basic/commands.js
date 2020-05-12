const { MessageEmbed } = require('discord.js');
const BaseCommand = require('./../../../modules/BaseCommand');

class Commands extends BaseCommand {
    constructor() {
        super();

        this.aliases = [];
        this.usage = 'commands';
        this.description = 'List all the bots commands';
    }

    get name() {
        return 'commands';
    }

    exec(message) {
        if (message.content && message.client.commands.has(message.content)) {
            if (message.client.commands.get(message.content).category === 'admin' && !message.admin) { return; }

            const command = message.client.commands.get(message.content);

            return message.channel.send({
                embed: new MessageEmbed()
                    .setTitle(`Command info for \`${command.name}\``)
                    .setColor(0x028AF1)
                    .setTimestamp()
                    .addField('Description', command.description)
                    .addField('Usage', message.prefix + command.usage, true)
                    .addField('Aliases', command.aliases.length > 0 ? command.aliases.join(', ') : 'N/A', true),
            });
        }

        let embed = new MessageEmbed()
            .setTitle('Bot Commands')
            .setDescription(`Run ${message.prefix}commands [command name] for more detailed info`)
            .setColor(0x028AF1)
            .setTimestamp();

        let commands = {};

        message.client.commands.forEach(command => {
            if (!message.admin && command.category === 'admin') { return; }

            if (!commands.hasOwnProperty(command.category)) {
                commands[command.category] = [command.name];
            } else {
                commands[command.category].push(command.name);
            }
        });

        Object.keys(commands).sort().forEach(category => {
            embed.addField(category, commands[category].join(', '));
        });

        message.channel.send({ embed });
    }
}

module.exports = Commands;
