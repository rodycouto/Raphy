const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')

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

        let timeout = 600000
        let author = await db.fetch(`slut_${message.author.id}`)

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author))
             
            return message.inlineReply(`Você pode se prostituir novamente em ${time.minutes}m e ${time.seconds}s`)
        } else {

            var list = ["win", "lose"]
            var result = list[Math.floor(Math.random() * list.length)]

            if (result === "win") {
                let amount = (Math.floor(Math.random() * 500) + 1)
                db.add(`money_${message.author.id}`, amount)
                db.set(`slut_${message.author.id}`, Date.now())
                message.inlineReply(`Você se prostituiu e obteve ${amount} <:StarPoint:766794021128765469>MPoints`)
            } else if (result === "lose") {
                let amount = (Math.floor(Math.random() * 500) + 1)
                db.subtract(`money_${message.author.id}`, amount)
                db.set(`slut_${message.author.id}`, Date.now())
                message.inlineReply(`Você prostituiu e perdeu ${amount} <:StarPoint:766794021128765469>MPoints`)
            }
        }
    }
}
