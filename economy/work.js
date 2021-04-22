const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

    let timeout1 = 6140000
    let author1 = await db.fetch(`pego_${message.author.id}`)

    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
        let time = ms(timeout1 - (Date.now() - author1))

        var presomax = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('🚨 Você está em prisão máxima!')
            .setDescription('`Liberdade em: ' + `${time.minutes}` + 'm e ' + `${time.seconds}` + 's`')
        return message.inlineReply(presomax)
    } else {

        let timeout = 86400000
        let author = await db.fetch(`worked_${message.author.id}`)

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author))
             
            return message.inlineReply(`Você já trabalhou hoje, descance um pouco! Volte em ${time.hours}h, ${time.minutes}m, e ${time.seconds}s`)
        } else {
            let amount = 33
            let amountxp = 150
            db.add(`money_${message.author.id}`, amount)
            db.add(`xp_${message.author.id}`, amountxp)
            db.set(`worked_${message.author.id}`, Date.now())

            return message.inlineReply(`Você trabalhou e ganhou ${amount} <:StarPoint:766794021128765469>MPoints e ${amountxp} XP`)
        }
    }
}