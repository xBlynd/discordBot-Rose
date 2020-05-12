const BaseCommand = require('./../../../modules/BaseCommand');
const exec = require(`child_process`).exec;

class Exec extends BaseCommand {
    constructor() {
        super();

        this.aliases = ['run'];
        this.usage = 'exec [code]';
        this.description = 'Execute the supplied code using the exec function';
    }

    get name() {
        return 'exec';
    }

    exec(message) {
        if (!message.admin) { return; }

        let commandError = false;
        let evalOutput = '';

        return new Promise((fulfill, reject) => {
            exec(message.content, async (error, stdout, stderr) => {
                if (stdout) { evalOutput = `${stdout}\n\n`; }
                if (stderr) { evalOutput += `${stderr}\n\n`; }
                if (error !== null) { commandError = true; evalOutput = error; }
                if (!evalOutput) { evalOutput = 'Blank output...'; commandError = true; }


                let messageOut = '';
                if (commandError === true) { messageOut += '❌ ERROR:\n'; } else { messageOut += '✅ Out:\n'; }
                await message.channel.send(messageOut);
                await message.channel.send(`\`\`\`sh\n${evalOutput}\`\`\` \n\n`);
                fulfill();
            });
        });
    }
}

module.exports = Exec;
