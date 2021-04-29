const db = require("quick.db")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) {

        let noperm = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: Administrador')

        return message.inlineReply(noperm)
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        let adm = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Eu preciso da permissão "Gerenciar Mensagens" para utilizar esta função.')
        return message.inlineReply(adm)
    }

    let channel = message.mentions.channels.first() || message.channel

    if (db.get(`blockchannel_${channel.id}`)) {
        let ok = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(`${channel} já está bloqueado.`)
        return message.inlineReply(ok)
    }

    let confirm = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription(`Você deseja bloquear todos os meus comandos no canal ${channel}?`)

    await message.inlineReply(confirm).then(msg => {
        msg.react('✅') // Check
        msg.react('❌') // X

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            if (reaction.emoji.name === '✅') { // Sim
                msg.delete().catch(err => { return })

                db.add(`blockchannel_${channel.id}`, channel.id)
                let ok = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`Meus comandos no canal ${channel} foram bloqueados.`)
                return message.inlineReply(ok)
            }
            if (reaction.emoji.name === '❌') { // Não
                msg.delete().catch(err => { return })
                message.inlineReply("Comando cancelado.")
            }
        })
    })
}