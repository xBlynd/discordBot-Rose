const BaseCommand = require('./../../../modules/BaseCommand');
const util = require('util');
let _;

class Eval extends BaseCommand {
    constructor() {
        super();

        this.aliases = ['sudo'];
        this.usage = 'eval [code]';
        this.description = 'Run the supplied code using the eval function';
    }

    get name() {
        return 'eval';
    }

    async exec(message) {
        if (!message.admin) { return; }

        let commandError = false;
        let evalOutput;
        const temp = _;

        try {
            evalOutput = eval(message.content);

            if (evalOutput instanceof Promise) {
                message.channel.send(`Awaiting Promise <pending>`);
                evalOutput = await evalOutput;
            }

            _ = evalOutput;

            if (typeof evalOutput === 'object') {
                evalOutput = util.inspect(evalOutput, { depth: 0 });
                evalOutput = evalOutput
                    .replace(/<Buffer[ \w.]+>/ig, '"buffer"')
                    .replace(/\[Function]/ig, 'function(){}')
                    .replace(/\[Circular]/ig, '"Circular"')
                    .replace(/\{ \[Function: ([\w]+)]/ig, '{ $1: function $1 () {},')
                    .replace(/\[Function: ([\w]+)]/ig, 'function $1(){}')
                    .replace(/(\w+): ([\w :]+GMT\+[\w ()]+),/ig, '$1: new Date("$2"),')
                    .replace(/(\S+): ,/ig, '$1: null,');
            }
        } catch (error) { evalOutput = error; commandError = true; }

        if (evalOutput === undefined) { evalOutput = 'Undefined output...'; commandError = true; }
        if (evalOutput === null) { evalOutput = 'Null output...'; commandError = true; }
        if (!evalOutput) { evalOutput = evalOutput.toString(); }

        let messageOut = '➡ in: \n';
        messageOut = `${messageOut}\`\`\`js\n${message.content}\`\`\` \n\n`;

        if (commandError === true) { _ = temp; messageOut += '❌ ERROR:\n'; } else { messageOut += '✅ Out:\n'; }

        message.channel.send(messageOut, { split: true }).then(() => { message.channel.send(evalOutput, { code: 'js', split: true }); });
    }
}

module.exports = Eval;
