const { MessageEmbed } = require('discord.js');
const YT = require('../../../modules/youtube');
const ytdl = require('ytdl-core');

const playlist = require('../../../modules/musicQueue');
const youtube = new YT('AIzaSyDzSYjWxBpUWwmeFPtd7EaDxFJAsFni6a4');

const BaseCommand = require('./../../../modules/BaseCommand');

class Play extends BaseCommand {
    constructor() {
        super();

        this.aliases = [];
        this.usage = 'play [song]';
        this.description = '';
    }

    get name() {
        return 'play';
    }

    async exec(message) {
        if (message.guild.voiceConnection && message.guild.voiceConnection.channel.id) {
            if (message.guild.voiceConnection.channel.id !== message.member.voiceChannel.id) { return message.channel.send('Please join the active voice channel.'); }
        }

        if (!message.content) {
            if (playlist.info[message.guild.id] && playlist.info[message.guild.id].playing) {
                return message.channel.send('You need to specify a song.').catch(console.error);
            } else {
                if (!playlist.info[message.guild.id]) { playlist.info[message.guild.id] = {}; }
                playlist.info[message.guild.id].playing = true;
                return init();
            }
        }

        let res = await youtube.search({ q: message.content, part: 'snippet', topicId: '/m/04rlf', type: 'video', maxResults: 1 });
        res = res.body.items[0];

        if (!res) { return message.channel.send('Sorry, i was unable to find this.').catch(console.error); }
        res.author = message.author;

        message.channel.send(new MessageEmbed()
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setColor(0x66B266)
            .setDescription(res.snippet.title)
            .setFooter(res.author.username, res.author.displayAvatarURL())
            .setTimestamp()
            .setTitle('Song Added')
        ).catch(console.error);

        playlist.add(message.guild.id, res);

        async function init() {
            let song = playlist.next(message.guild.id);

            if (!song) {
                if (!message.client.voiceConnections.get(message.guild.id)) {
                    // prob removed guild
                    playlist.end(message.guild.id);
                    try {
                        message.client.voiceConnections.get(message.guild.id).dispatcher.end();
                    } catch (error) { return; }
                    return;
                }

                if (message.client.voiceConnections.get(message.guild.id).channel.members.size < 2) {
                    playlist.end(message.guild.id);
                    message.client.voiceConnections.get(message.guild.id).dispatcher.end();

                    message.channel.send(new MessageEmbed()
                        .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
                        .setColor(0xF59A44)
                        .setDescription(`Autoplay aborted due to no active listeners`)
                        .setTimestamp()
                        .setTitle('Info')
                    ).catch(console.error);
                }

                if (playlist.info[message.guild.id].autoplay === true) {
                    let auto = playlist.lastID[message.guild.id];
                    // message.channel.send(auto, {co1de: 'markdown'})
                    let autoRes = await youtube.search({ relatedToVideoId: auto, part: 'snippet', topicId: '/m/04rlf', type: 'video', maxResults: 6 });
                    const items = autoRes.body.items;
                    const item = items[Math.floor(Math.random() * items.length)];

                    autoRes = item;
                    autoRes.author = message.client.user;

                    playlist.add(message.guild.id, autoRes);
                    song = playlist.next(message.guild.id);
                } else {
                    message.channel.send(new MessageEmbed()
                        .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
                        .setColor(0xFF6666)
                        .setDescription(`Stream Ended`)
                        .setTimestamp()
                    ).catch(console.error);

                    let connection = message.client.voiceConnections.get(message.guild.id);

                    connection.disconnect();
                    connection.channel.leave();
                    playlist.info[message.guild.id].playing = false;

                    return;
                }
            }
            song = song[0];

            if (typeof song.id.videoId === 'string') {
                song.videoID = song.id.videoId;
            } else {
                song.videoID = song.snippet.resourceId.videoId;
            }

            // message.channel.send(new MessageEmbed()
            //     .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            //     .setColor(0xF59A44)
            //     .setFooter(song.author.username, song.author.displayAvatarURL())
            //     .setImage(song.snippet.thumbnails.high ? song.snippet.thumbnails.high.url : null)
            //     .setTimestamp()
            //     .setTitle(song.snippet.title ? song.snippet.title : 'missing title')
            //     .setURL(`https://www.youtube.com/watch?v=${song.videoID}`)
            // ).catch(console.error);
            message.channel.send(`Now Playing: **${song.snippet.title ? song.snippet.title : 'missing title'}**`);
            const connection = message.client.voiceConnections.get(message.guild.id) ? message.client.voiceConnections.get(message.guild.id) : await message.member.voiceChannel.join();
            let stream = ytdl(`https://www.youtube.com/watch?v=${song.videoID}`, { filter: 'audioonly' }, { passes: 4 });
            let dispatcher = connection.play(stream);

            dispatcher.on('error', (error) => { console.error(error); });
            dispatcher.on('end', () => { init(); });
        }

        if (!playlist.info[message.guild.id] || !playlist.info[message.guild.id].playing) {
            if (!playlist.info[message.guild.id]) { playlist.info[message.guild.id] = {}; }

            playlist.info[message.guild.id].playing = true;
            init();
        }
    }
}

module.exports = Play;
