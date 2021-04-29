const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let perms = message.member.hasPermission("ADMINISTRATOR")
    if (!perms) {
        let noperms = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão necessária: Administrador')
        return message.inlineReply(noperms)
    }

    if (prefix === "-") {
        let iqual = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('O meu prefixo definido já é o padrão.')
        return message.inlineReply(iqual)
    }

    let resprefix = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Você deseja resetar meu prefix para `-`?')

    await message.inlineReply(resprefix).then(msg => {
        msg.react('✅') // Check
        msg.react('❌') // X

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            if (reaction.emoji.name === '✅') { // Sim
                msg.delete().catch(err => { return })
                db.delete(`prefix_${message.guild.id}`)

                let resetprefix = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle("<a:Check:836347816036663309> " + message.author.username + ' resetou meu prefixo para `-`')
                message.inlineReply(resetprefix)
            }
            if (reaction.emoji.name === '❌') { // Não
                msg.delete().catch(err => { return })
                let cancelado = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Comando cancelado')
                message.inlineReply(cancelado)
            }
        })
    })
}