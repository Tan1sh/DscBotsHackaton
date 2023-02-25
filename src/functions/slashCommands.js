// Imports
const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);

module.exports = async (client) => {

    const sc = await globPromise(`${process.cwd()}/slashCommands/*.js`)


    const arraySlashCommands = [];

    sc.map((value) => {
        const file = require(value);
        if (!file.name) return;
        client.slashCommands.set(file.name, file);

        if(['MESSAGE', 'USER'].includes(file.type)) delete file.description;
        arraySlashCommands.push(file)


    })


    client.on('ready', async () => {
        const guild = await client.guilds.fetch('1066563612078002257')
        guild.commands.set(arraySlashCommands).catch((e) => {
            console.log(e)
        }).then(() => {
            console.log('slash registred')
        })

    })
}