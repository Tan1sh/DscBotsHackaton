// Imports
const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);

module.exports = async (client) => {

    const events = await globPromise(`${process.cwd()}/events/*.js`)

    events.map((value) => {
        const event = require(value)

        client.on(event.name, (...args) => event.execute(...args))
    })

    console.log('Events Loaded')

  
}