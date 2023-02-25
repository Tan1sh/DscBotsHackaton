const { Model, DataTypes } = require('sequelize');

const sequelize = require('../functions/sqlite.js')

class Tickets extends Model {}

Tickets.init({
    guildId: DataTypes.STRING,
    category: DataTypes.STRING
}, 
{
    sequelize,
    modelName: 'Tickets',
    timestamps: true
})

module.exports = Tickets