const BaseCommand = require('./../../../modules/BaseCommand');

class Teamup extends BaseCommand {
    constructor() {
        super();

        this.aliases = [];
        this.usage = 'teamup (number of users per team)';
        this.description = '';
    }

    get name() {
        return 'teamup';
    }

    exec(message) {
        const total = parseInt(message);
        if (!total) { return message.channel.send('select a per team count'); }
        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }
        let sending = [];

        function process(collection) {
            if (!collection) { return message.channel.send('Not enough people have joined.'); }
            if (collection.size < total * 2) { return message.channel.send('Not enough people have joined.'); }
            collection = collection.array();
            collection = shuffle(collection);
            sending.push('```-- TEAM 1 --');
            for (var i = 0; i < total * 2; i++) {
                if (i === total) { sending.push('\n\n-- TEAM 2 --'); }
                sending.push(`${collection[i].author.username}`);
            }
            sending.push('```');
            message.channel.send(sending);
        }

        message.channel.awaitMessages(response => response.content === '!join', {
            max: 999, time: 30000, errors: ['time'],
        }).then(process).catch(process);

        message.channel.send('Teams will be drawn in 30 seconds, type `!join` to join');
    }
}

module.exports = Teamup;
