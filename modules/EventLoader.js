const fs = require('fs').promises;

class EventLoader {
    /**
     *Creates an instance of EventLoader.
     * @param {string} directory Events directory
     * @memberof EventLoader
     */
    constructor(directory) {
        this.directory = directory;

        this.events = new Map();
    }

    /**
     * Load the event files and attach them to the client
     *
     * @param {WebSocket} client Discord client
     * @returns {Map}
     * @memberof EventLoader
     */
    async load(client) {
        let files;
        try {
            files = await fs.readdir(this.directory);
        } catch (e) {
            throw new Error('Unable to read events directory: ', e, this.directory);
        }

        // eslint-disable-next-line
        await files.forEach(async file => {
            if (!file.endsWith('.js')) {
                console.error(`${file} is not an event file so has been skipped`);
            } else {
                delete require.cache[require.resolve(`${this.directory}/${file}`)];
                const func = require(`${this.directory}/${file}`);
                if (!(func.prototype && func.prototype.hasOwnProperty('constructor'))) { return; }

                // eslint-disable-next-line

                const event = new func();
                client.on(event.name, event.exec);
                this.events.set(event.name, event.exec);
            }
        });

        return this.events;
    }

    /**
     * Unload loaded events from the client
     *
     * @param {WebSocket} client Discord client
     * @memberof EventLoader
     */
    unload(client) {
        for (const event of client.events.keys()) {
            client.removeListener(event, client.events.get(event));
            client.events.delete(client.events.get(event));
        }
    }
}

module.exports = EventLoader;
