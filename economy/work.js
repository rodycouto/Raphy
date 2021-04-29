const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

    let timeout1 = 9140000
    let author1 = await db.fetch(`pego_${message.author.id}`)

    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
        let time = ms(timeout1 - (Date.now() - author1))

        let presomax = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('🚨 Você está em prisão máxima!')
            .setDescription(`Liberdade em: ${time.hours}h ${time.minutes}m e ${time.seconds}s`)

        return message.inlineReply(presomax)
    } else {

        let timeout = 86400000
        let author = await db.fetch(`worked_${message.author.id}`)

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author))

            return message.inlineReply(`Você já trabalhou hoje, descance um pouco! Volte em ${time.hours}h, ${time.minutes}m, e ${time.seconds}s`)
        } else {

            let luck = ['win', 'lose', 'lose', 'lose', 'lose']
            let result = luck[Math.floor(Math.random() * luck.length)]
            let gorjeta = [Math.floor(Math.random() * 400) + 1]
            db.add(`mpoints_${message.author.id}`, 33)
            db.add(`xp_${message.author.id}`, 150)
            db.set(`worked_${message.author.id}`, Date.now())

            if (result === "win") {
                db.add(`mpoints_${message.author.id}`, gorjeta)
                return message.inlineReply(`Você trabalhou e ganhou 33 <:StarPoint:766794021128765469>MPoints, 150 XP e uma gorjeta de ${gorjeta} <:StarPoint:766794021128765469>MPoints`)
            }

            if (result === 'lose') {
                return message.inlineReply(`Você trabalhou e ganhou 33 <:StarPoint:766794021128765469>MPoints e 150 XP`)
            }
        }
    }
}