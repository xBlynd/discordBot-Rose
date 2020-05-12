const YT = require('../../../modules/youtube');
const playlist = require('../../../modules/musicQueue');
const youtube = new YT('AIzaSyDzSYjWxBpUWwmeFPtd7EaDxFJAsFni6a4');

const BaseCommand = require('./../../../modules/BaseCommand');

class Playlist extends BaseCommand {
    constructor() {
        super();

        this.aliases = [];
        this.usage = 'playlist [link|name]';
        this.description = '';
    }

    get name() {
        return 'playlist';
    }

    async exec(message) {
        let maxResults = 10;
        const counter = [0, 0];

        if (!message.content) { return message.channel.send('You need to specify a playlist.').catch(console.error); }
        if (message.admin) { maxResults = 50; }

        let res;
        try {
            res = await youtube.playlist({ playlistId: message.content, part: 'snippet', maxResults });
        } catch (error) {
            return message.channel.send('Sorry, I was unable to find that playlist.').catch(console.error);
        }

        res = res.body.items;

        res.map((song) => { // eslint-disable-line array-callback-return
            if (song.snippet.thumbnails) {
                song.author = message.author;
                playlist.add(message.guild.id, song);
                counter[0]++;
            } else {
                counter[1]++;
            }
        });

        message.channel.send(`Added ${counter[0]} songs to the playlist ${counter[1] !== 0 ? `\nRemoved ${counter[1]} failed songs` : ''}`);
    }
}

module.exports = Playlist;
