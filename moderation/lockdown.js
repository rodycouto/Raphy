const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (message.member.hasPermission("ADMINISTRATOR")) { return message.inlineReply('<:xis:835943511932665926> Permissão Necessária: Administrador') }
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) { return message.inlineReply('<:xis:835943511932665926> Eu preciso da permissão "Gerenciar Canais" para utilizar esta função.') }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let alert = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setTitle('Utilize este comando somente em caso de EMERGÊNCIA!')
        .setDescription('Este comando tem um alto poder de impacto em todo o servidor. Quando ativado, o cargo *everyone* será bloqueado de falar em todos os canais de textos e conectar/falar em canais de voz.')
        .addFields(
            {
                name: '`' + prefix + 'lockdown on`',
                value: '**Todos** os canais serão bloqueados',
                inline: true
            },
            {
                name: '`' + prefix + 'lockdown off`',
                value: '**Todos** os canais serão liberados',
                inline: true
            }
        )

    if (!args[0]) { return message.inlineReply(alert) }

    let channels = message.guild.channels.cache.filter(ch => ch.type !== 'category')

    if (args[0] === 'on') {

        let ConfirmOn = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Você confirma o bloqueio de todos os canais de texto/voz do servidor?')
            .setFooter('Cancelamento em 30 segundos.')

        await message.inlineReply(ConfirmOn).then(msg => {
            msg.react('✅').catch(err => { return }) // Check
            msg.react('❌').catch(err => { return }) // X
            setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)

            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return

                if (reaction.emoji.name === '✅') { // Sim
                    msg.delete().catch(err => { return })

                    channels.forEach(channel => {
                        channel.updateOverwrite(message.guild.roles.everyone, {
                            SEND_MESSAGES: false,
                            CONNECT: false,
                            SPEAK: false
                        })
                    })

                    let ok = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setDescription(`${message.author.username} colocou o servidor em estado de Lockdown!`)

                    let info = new Discord.MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('Todos os canais de texto e de voz foram bloqueados para @everyone.')
                        
                    return message.inlineReply(ok).then(m => m.channel.send(info))
                }
                if (reaction.emoji.name === '❌') { // Não
                    msg.delete().catch(err => { return })
                    let ok = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setDescription('Comando cancelado')
                    message.inlineReply(ok)
                }
            })
        })

    } else if (args[0] === 'off') {
        channels.forEach(channel => {
            channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: true,
                CONNECT: true,
                SPEAK: true
            })
        })

        let free = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle(`${message.author.username} desativou o Lockdown.`)

        let okok = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('**TODOS** os membros agora podem falar em **TODOS** os canais de texto e voz. Recomendo reconfigurar as permissões dos canais privados.')
        return message.inlineReply(free).then(m => m.inlineReply(okok))
    }
}