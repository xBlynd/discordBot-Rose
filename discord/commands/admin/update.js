const BaseCommand = require('./../../../modules/BaseCommand');
const exec = require(`child_process`).exec;

class Update extends BaseCommand {
    constructor() {
        super();

        this.aliases = [];
        this.usage = 'update';
        this.description = 'guess >.>';
    }

    get name() {
        return 'update';
    }

    exec(message) {
        if (!message.admin) { return; }

        let commandError = false;
        let evalOutput = '';

        return new Promise((fulfill, reject) => {
            exec('git pull', async (error, stdout, stderr) => {
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

module.exports = Update;
