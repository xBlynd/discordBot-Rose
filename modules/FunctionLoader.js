const fs = require('fs').promises;

class FunctionLoader {
    /**
     * Creates an instance of FunctionLoader.
     *
     * @param {string} directory System functions directory
     * @memberof FunctionLoader
     */
    constructor(directory) {
        this.directory = directory;

        this.systemFunctions = new Map();
    }

    /**
     * Load functions into the systemFunctions map
     *
     * @returns {Map[]}
     * @memberof FunctionLoader
     */
    async load() {
        let files;
        try {
            files = await fs.readdir(this.directory);
        } catch (e) {
            throw new Error('Unable to read functions directory: ', e, this.directory);
        }

        // eslint-disable-next-line
        await files.forEach(async file => {
            if (!file.endsWith('.js')) {
                console.error(`${file} is not a function so has been skipped.`);
            } else {
                try {
                    let name = file.slice(0, -3);
                    this._addFunction(name, `${this.directory}/${file}`);
                } catch (e) {
                    console.error('Error loading function: ', e);
                }
            }
        });

        return this.systemFunctions;
    }

    /**
     * Load a function and add it to the systemFunctions map
     *
     * @private
     * @param {string} name Name of the function
     * @param {string} directory Directory of the function to load
     * @returns {void}
     * @memberof FunctionLoader
     */
    _addFunction(name, directory) {
        delete require.cache[require.resolve(directory)];

        const func = require(directory);

        if (this.systemFunctions.has(name)) {
            console.warn(`${name} was already created in the functions object and has been skipped.`);
        } else {
            this.systemFunctions.set(name, func);
        }
    }
}

module.exports = FunctionLoader;
