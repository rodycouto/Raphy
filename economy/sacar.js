const db = require('quick.db')
const Discord = require('discord.js')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

    let timeout1 = 6140000
    let author1 = await db.fetch(`pego_${message.author.id}`)

    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
        let time = ms(timeout1 - (Date.now() - author1))

        const presomax = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('🚨 Você está em prisão máxima!')
            .setDescription('`Liberdade em: ' + `${time.minutes}` + 'm e ' + `${time.seconds}` + 's`')

        return message.inlineReply(presomax)
    } else {

        let member = db.fetch(`bank_${message.author.id}`)

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        if (!args[0]) {
            const noamout = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Siga o formato correto')
                .setDescription('`' + prefix + 'sacar Valor`')
            return message.inlineReply(noamout)
        }

        if (member < args[0]) {
            const not = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Você não tem todo esse dinheiro no banco.')
            return message.inlineReply(not)
        }

        if (args[0] < 0) {
            const nota = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Diga um valor maior que 0')
            return message.inlineReply(nota)
        }

        if (args[0] === 'all') {
            let money = db.get(`bank_${message.author.id}`)
            if (money === null) money = '0'

            if (!db.get(`bank_${message.author.id}`)) money = '0'

            if (money == '0') {
                const nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription(`Você não tem nada para sacar no banco.`)
                return message.inlineReply(nota)
            }

            db.add(`money_${message.author.id}`, money)
            db.subtract(`bank_${message.author.id}`, money)

            const nota = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription(`Você sacou ${money}<:StarPoint:766794021128765469> do banco`)
            return message.inlineReply(nota)
        }

        if (isNaN(args[0])) {
            const notnumber = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Valor não reconhecido')
                .setDescription('O valor que você digitou não é um número.')
            return message.inlineReply(notnumber)
        }

        db.add(`money_${message.author.id}`, args[0])
        db.subtract(`bank_${message.author.id}`, args[0])

        const embed = new Discord.MessageEmbed()
            .setColor('#efff00')
            .setDescription(`${message.author} sacou ${args[0]}<:StarPoint:766794021128765469> do banco.`)
        message.inlineReply(embed)
    }
}