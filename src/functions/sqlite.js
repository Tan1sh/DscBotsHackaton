// Imports
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db.sqlite',
    logging: false
})

sequelize.sync().then(() => {
    console.log('DB loaded')
})

module.exports = sequelize