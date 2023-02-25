const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders')
const { ButtonStyle } = require('discord.js')
const TicketsDB = require('../models/tickets.js')

module.exports = {
    name: 'set-tickets',
    description: 'Establece el canal de tickets.',
    type: 1,
    options: [
        {
            name: 'channel',
            description: 'canal donde se enviara el mensaje de tickets.',
            type: 1,
            options: [
                {
                    name: 'value',
                    description: 'selecciona el canal',
                    type: 7,
                    channelTypes: [0]
                }

            ],
        }
    ],

    async execute(client, int, args) {

        const canal = int.options.getChannel('value')

        const dbfind = await TicketsDB.findOne({where: {guildId: int.guild.id}})

        if(dbfind) {
            await TicketsDB.destroy({
                where: {
                  guildId: int.guild.id
                }
              });
        }
        
        await TicketsDB.create({
            guildId: int.guild.id,
            category: canal.parentId
            
        })
        


        await canal.send({
            embeds : [
                new EmbedBuilder()
                .setTitle('Haz click en el boton de abajo para crear un ticket')
                .setDescription('Al abrir un ticket se creara un nuevo canal privado')
                 .setColor(255)
            ],
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('openTicket')
                    .setLabel('Abrir Ticket')
                    .setStyle(ButtonStyle.Primary)
                )
            ]

        })

        int.reply({
            content: 'Se ha establecido el canal de tickets',
            ephemeral: true
        })

    }
}

