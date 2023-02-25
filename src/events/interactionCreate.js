const { Events, InteractionType, ChannelType, OverwriteType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = require('../index.js')
const sequelize = require('../functions/sqlite.js');
const { EmbedBuilder } = require('@discordjs/builders');

const {
    MessageComponent
} = InteractionType
module.exports = {
    name: Events.InteractionCreate,

    async execute(int) {

        sequelize.sync()

       if(int.isChatInputCommand()) {

            const command = client.slashCommands.get(int.commandName);

            if(!command) {
                return int.reply({
                    content: 'Comando no encontrado',
                    ephemeral: true
                })
            }

            const args = {}

            for (const option of int.options.data) {
                if(option.type === 'SUB_COMMAND') {
                    if(option.name) args.push(option.name)
                    option.options?.forEach(element => {
                        if(element.value) args.push(element.value)                    
                    });
                } else if (option.value) args.push(option.value)
            }

            return command.execute(client, int, args).catch(err => {
                console.log(err)
            })
       }

       if(int.type == MessageComponent) {

        if(int.customId == 'openTicket') {
            int.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'ticket--' + int.member.user.tag,
                permissionOverwrites: [
                    {
                        id: int.guild.roles.everyone,
                        deny: ['ViewChannel'],
                        type: OverwriteType.Role
                    },
                    {
                        id: int.member.user.id,
                        allow: ['ViewChannel', 'SendMessages'],
                        type: OverwriteType.Member
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `<@${int.member.user.id}>, Tu Ticket ha sido abierto espera a que alguien te atienda.`,
                    components: [
                        new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('closeTicket')
                                .setLabel('Cerrar Ticket')
                                .setStyle(ButtonStyle.Danger),
                          
                        ),
                        ]
                })
            })
    
        }

        if(int.customId == 'closeTicket'){

            int.reply({
                content: 'El ticket sera eliminado en 5 segundos',
                ephemeral: true
            }).then(() =>{
               setTimeout(() => {
                int.channel.delete()
               }, 5000);
            })
            
        }

      
       }


    }
}