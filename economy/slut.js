const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')

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

        let timeout = 14400000
        let author = await db.fetch(`slut_${message.author.id}`)

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author))

            return message.inlineReply(`Você pode se prostituir novamente em ${time.minutes}m e ${time.seconds}s`)
        } else {

            let list = ["win", "lose"]
            let result = list[Math.floor(Math.random() * list.length)]

            if (result === "win") {
                let amount = (Math.floor(Math.random() * 200) + 1)
                let amountxp = (Math.floor(Math.random() * 200) + 1)
                db.add(`mpoints_${message.author.id}`, amount)
                db.add(`xp_${message.author.id}`, amountxp)
                db.set(`slut_${message.author.id}`, Date.now())
                message.inlineReply(`Você se prostituiu e obteve ${amount} <:StarPoint:766794021128765469>MPoints e ${amountxp} XP`)
            } else if (result === "lose") {
                let amount = (Math.floor(Math.random() * 100) + 1)
                let amountxp = (Math.floor(Math.random() * 200) + 1)
                db.subtract(`mpoints_${message.author.id}`, amount)
                db.add(`xp_${message.author.id}`, amountxp)
                db.set(`slut_${message.author.id}`, Date.now())
                message.inlineReply(`Você se prostituiu e perdeu ${amount} <:StarPoint:766794021128765469>MPoints, porém ganhou ${amountxp} XP`)
            }
        }
    }
}
