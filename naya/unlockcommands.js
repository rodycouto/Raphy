const db = require("quick.db")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) {

        let noperm = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: Administrador')

        return message.inlineReply(noperm)
    }

    let channel = message.mentions.channels.first() || message.channel

    if (!db.get(`blockchannel_${channel.id}`)) {
        let ok = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(`${channel} não está desbloqueado.`)
        return message.inlineReply(ok)
    }

    let confirm = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription(`Você deseja desbloquear todos os meus comandos no canal ${channel}?`)
        .setFooter('Cancelamento em 20 segundos.')

    await message.inlineReply(confirm).then(msg => {
        msg.react('✅').catch(err => { return }) // Check
        msg.react('❌').catch(err => { return }) // X
        setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 20000)

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            if (reaction.emoji.name === '✅') { // Sim
                msg.delete().catch(err => { return })

                db.delete(`blockchannel_${channel.id}`, channel.id)
                let ok = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`Meus comandos no canal ${channel} foram desbloqueados.`)
                return message.inlineReply(ok)
            }
            if (reaction.emoji.name === '❌') { // Não
                msg.delete().catch(err => { return })
                message.inlineReply("Comando cancelado.")
            }
        })
    })
}