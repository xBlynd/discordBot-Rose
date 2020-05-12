class BaseEvent {
    /**
     * Creates an instance of BaseEvent.
     * @memberof BaseEvent
     */
    constructor() {
        if (this.constructor === BaseEvent) { throw new Error('Cannot instantiate abstract BaseEvent.'); }
    }

    /**
     * Get the name of the event
     *
     * @readonly
     * @memberof BaseEvent
     */
    get name() {
        throw new Error('Name must be overridden');
    }

    /**
     * The function that is called when an event is executed
     *
     * @memberof BaseEvent
     */
    exec() {
        throw new Error(`exec not implmented for ${this.constructor.name}.`);
    }
}

module.exports = BaseEvent;
