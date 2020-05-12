const fs = require('fs').promises;
const path = require('path');

class CommandLoader {
    /**
     * Creates an instance of CommandLoader.
     *
     * @param {string} directory Commands directory
     * @memberof CommandLoader
     */
    constructor(directory) {
        this.directory = directory;

        this.commands = new Map();
        this.aliases = new Map();
    }

    /**
     * Load commands into the commands map
     *
     * @returns {Map[]}
     * @memberof CommandLoader
     */
    async load() {
        const paths = await fs.readdir(this.directory);
        const directorys = paths.filter(p => !path.parse(p).ext);

        directorys.map(async (d) => {
            const files = await fs.readdir(`${this.directory}/${d}`);

            files.forEach((file) => {
                if (!file.endsWith('.js')) {
                    console.error(`${file} is not a command so has been skipped.`);
                } else {
                    try {
                        this._addCommand(`${this.directory}/${d}/${file}`, d);
                    } catch (e) {
                        console.error('Error loading command: ', e);
                    }
                }
            });
        });

        await Promise.all(directorys);

        return [this.commands, this.aliases];
    }

    /**
     * Load a command and add it to the commands map
     *
     * @private
     * @param {string} directory Directory of the command to load
     * @param {string} category command category
     * @returns {void}
     * @memberof CommandLoader
     */
    _addCommand(directory, category) {
        delete require.cache[require.resolve(directory)];

        const func = require(directory);

        if (!(func.prototype && func.prototype.hasOwnProperty('constructor'))) {
            return;
        }

        // eslint-disable-next-line
        const command = new (func);

        if (this.commands.has(command.name)) {
            console.warn(`${command.name} was already created in the commands object and has been skipped.`);
        } else {
            if (command.aliases) {
                command.aliases.forEach(alias => {
                    if (this.commands.has(alias) || this.aliases.has(alias)) {
                        console.warn(`${alias} has already been mapped so it has been skipped.`);
                    } else {
                        this.aliases.set(alias, command.name);
                    }
                });
            }
            command.category = category;
            this.commands.set(command.name, command);
        }
    }
}

module.exports = CommandLoader;
