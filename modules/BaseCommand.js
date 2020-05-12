class BaseCommand {
    /**
     * Creates an instance of BaseCommand.
     * @memberof BaseCommand
     */
    constructor() {
        if (this.constructor === BaseCommand) { throw new Error('Cannot instantiate abstract BaseCommand.'); }

        // Default command options
        this.aliases = [];
        this.visible = true;
        this.category = 'Basic';
    }

    /**
     * Get the name of the command
     *
     * @readonly
     * @memberof BaseCommand
     */
    get name() {
        throw new Error('Name must be overridden');
    }

    /**
     * The function that is executed when the command is called
     *
     * @memberof BaseCommand
     */
    exec() {
        throw new Error(`exec not implmented for ${this.constructor.name}.`);
    }
}

module.exports = BaseCommand;
