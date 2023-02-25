// Imports
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const dotenv = require('dotenv');

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ]
})

// Other
console.clear()
dotenv.config();

module.exports = client;


client.slashCommands = new Collection()
client.config = require('../config.json')

require('./functions/sqlite.js')
require('./functions/slashCommands.js')(client)
require('./functions/eventsHandler.js')(client)


client.login(client.config.token).then(() =>{
    console.log('Done')
})