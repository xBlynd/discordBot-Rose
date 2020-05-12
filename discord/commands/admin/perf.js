const Discord = require('discord.js');
const os = require('os');
const { MessageEmbed } = require('discord.js');
const BaseCommand = require('./../../../modules/BaseCommand');

class Perf extends BaseCommand {
    constructor() {
        super();

        this.aliases = ['stats'];
        this.usage = 'perf';
        this.description = 'Get performance statics for the bot';
    }

    get name() {
        return 'perf';
    }


    async exec(message) {
        let tosend = [
            `**Users**: ${message.client.users.size}`,
            `**D.JS**: ${Discord.version}\n`,

            `**OS**: ${os.platform()}`,
            `**Release**: ${os.release()}`,
            `**PID**: ${process.pid}`,
            `**ARCH**: ${process.arch}`,
            `**Node**: ${process.version}`,
            `**System RAM**: ${Math.round((os.totalmem() - os.freemem()) / 1048576)} / ${Math.round(os.totalmem() / 1048576)} MB`,
            `**RAM RSS**: ${Math.round(process.memoryUsage().rss / 1048576)} MB`,
            `**RAM heapTotal**: ${Math.round(process.memoryUsage().heapTotal / 1048576)} MB`,
            `**RAM heapUsed**: ${Math.round(process.memoryUsage().heapUsed / 1048576)} MB`,
        ];


        message.channel.send(new MessageEmbed()
            .setTitle('Stats')
            .setThumbnail(message.author.displayAvatarURL)
            .setTimestamp()
            .setColor(0xe53935)
            .setDescription(tosend)
        ).then(() => {
            if (message.client.voiceConnections.size === 0) { return; }

            let tosendAddition = `Connected Streams: ${message.client.voiceConnections.size}\n\n`;

            if (message.client.voiceConnections.size > 0) {
                message.client.voiceConnections.forEach((element, index) => {
                    tosendAddition += `> [ ${index} ] [ ${element.channel.guild.name} ]\n`;
                });
            }
            message.channel.send(new MessageEmbed()
                .setTitle('Music Info')
                .setDescription(tosendAddition)
            ).catch(console.error);
        }).catch(console.error);
    }
}

module.exports = Perf;
