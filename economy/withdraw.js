const db = require('quick.db')
const Discord = require('discord.js')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

    let timeout1 = 6140000
    let author1 = await db.fetch(`pego_${message.author.id}`)

    let timeout1 = 9140000
    let author1 = await db.fetch(`pego_${message.author.id}`)

    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
        let time = ms(timeout1 - (Date.now() - author1))

        var presomax = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('🚨 Você está em prisão máxima!')
            .setDescription(`Liberdade em: ${time.hours}h ${time.minutes}m e ${time.seconds}s`)

        return message.inlineReply(presomax)
    } else {

        let member = db.fetch(`banco_${message.author.id}`)

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        if (!args[0]) {
            var noamout = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Siga o formato correto')
                .setDescription('`' + prefix + 'sacar Valor`')
            return message.inlineReply(noamout)
        }

        if (member < args[0]) {
            var not = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Você não tem todo esse dinheiro no banco.')
            return message.inlineReply(not)
        }

        if (args[0] < 0) {
            var nota = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Diga um valor maior que 0')
            return message.inlineReply(nota)
        }

        if (args[0] === 'all') {
            let money = db.get(`banco_${message.author.id}`)
            if (money === null) money = '0'

            if (!db.get(`banco_${message.author.id}`)) money = '0'

            if (money == '0') {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription(`Você não tem nada para sacar no banco.`)
                return message.inlineReply(nota)
            }

            db.add(`mpoints_${message.author.id}`, money)
            db.subtract(`banco_${message.author.id}`, money)

            var nota = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription(`${message.author} sacou ${money}<:StarPoint:766794021128765469> do banco`)
            return message.inlineReply(nota)
        }

        if (isNaN(args[0])) {
            var notnumber = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Valor não reconhecido')
                .setDescription('O valor que você digitou não é um número.')
            return message.inlineReply(notnumber)
        }

        db.add(`mpoints_${message.author.id}`, args[0])
        db.subtract(`banco_${message.author.id}`, args[0])

        var embed = new Discord.MessageEmbed()
            .setColor('#efff00')
            .setDescription(`${message.author} sacou ${args[0]}<:StarPoint:766794021128765469> do banco.`)
        message.inlineReply(embed)
    }
}