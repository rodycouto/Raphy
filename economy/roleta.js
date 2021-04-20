const Discord = require("discord.js")
const db = require("quick.db")
const ms = require('parse-ms')

var slotItems = ["💸", "💵", "💶", "💷", "💴"]

exports.run = async (client, message, args) => {

    let user = message.author
    let win = false
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

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

        let timeout5 = 380000
        let roletatime = await db.fetch(`roletatimeout_${message.author.id}`)
        if (roletatime !== null && timeout5 - (Date.now() - roletatime) > 0) {
            let time = ms(timeout5 - (Date.now() - roletatime))
            return message.inlineReply(`Calminha! As maquinas precisam recarregar. Tempo de recarga completa: ${time.minutes}m, e ${time.seconds}s`)
        } else {

            if (!args[0]) {
                var noargs = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Roleta Maya')
                    .setDescription('Aqui você pode apostar ou perder o dinheiro apostado, então cuidado.\n \n**Observações**\nPerdeu? Você perde o valor apostado.\nVitória? Você pode ganhar 3x mais o valor apostado.')
                    .addFields(
                        {
                            name: 'Comando',
                            value: '`' + prefix + 'roleta valor`'
                        }
                    )
                return message.inlineReply(noargs)
            }

            if (['all', 'tudo'].includes(args[0])) {
                let atual = db.get(`money_${message.author.id}`)
                let money = db.get(`money_${message.author.id}`)

                if (args[1]) {
                    return message.inlineReply('Por favor, não digite nada após o argumento **ALL/TUDO**')
                }

                if (money === null) {
                    var nota = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setDescription(`${message.author}, você não tem dinheiro para apostar.`)
                    return message.inlineReply(nota)
                }

                if (!db.get(`money_${message.author.id}`)) { money = 0 }

                if (money < 0) {
                    var nota = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setDescription(`${message.author}, você não pode jogar com divida.`)
                    return message.inlineReply(nota)
                }

                if (money == 0) {
                    var nota = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setDescription(`${message.author}, você não tem dinheiro para apostar.`)
                    return message.inlineReply(nota)
                }

                let number = []
                for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length) }

                if (number[0] == number[1] && number[1] == number[2]) {
                    money *= 2
                    win = true
                } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
                    money *= 3
                    win = true
                }
                if (win) {
                    let slotsEmbed1 = new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setTitle('🎰 GANHOU')
                        .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n${message.author} apostou ${atual} e ganhou ${money} <:StarPoint:766794021128765469>`)
                    db.add(`money_${message.author.id}`, money)
                    db.set(`roletatimeout_${message.author.id}`, Date.now())
                    return message.inlineReply(slotsEmbed1)
                } else {
                    let slotsEmbed = new Discord.MessageEmbed()
                        .setColor("#FF0000")
                        .setTitle('🎰 PERDEU')
                        .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n${message.author} apostou ${atual} e perdeu ${money} <:StarPoint:766794021128765469>`)
                    db.subtract(`money_${message.author.id}`, money)
                    db.add(`bank_${client.user.id}`, money)
                    db.set(`roletatimeout_${message.author.id}`, Date.now())
                    return message.inlineReply(slotsEmbed)
                }
            }

            if (isNaN(args[0])) {
                var nonumber = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle(`${args[0]}, digite um número.`)
                    .setDescription('`' + prefix + 'roleta valor`')
                return message.inlineReply(nonumber)
            }

            if (args[1]) {
                var nonumber = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Por favor, digite um número válido')
                    .setDescription('`' + prefix + 'roleta valor`')
                return message.inlineReply(nonumber)
            }

            let money = db.get(`money_${message.author.id}`)

            if (money === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription(`${message.author}, você não tem dinheiro para apostar.`)
                return message.inlineReply(nota)
            }


            if (!db.get(`money_${message.author.id}`)) { money = 0 }

            if (money < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription(`${message.author}, você não pode jogar com divida.`)
                return message.inlineReply(nota)
            }

            if (money == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription(`${message.author}, você não tem dinheiro para apostar.`)
                return message.inlineReply(nota)
            }

            if (args[0] > money) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription(`${message.author}, você não tem todo esse dinheiro.`)
                return message.inlineReply(nota)
            }

            let number = []
            for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length) }

            if (number[0] == number[1] && number[1] == number[2]) {
                money *= 2
                win = true
            } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
                money *= 3
                win = true
            }
            if (win) {
                let slotsEmbed1 = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle('🎰 GANHOU')
                    .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n${message.author} apostou ${args[0]} e ganhou ${money} <:StarPoint:766794021128765469>`)
                message.inlineReply(slotsEmbed1)
                db.add(`money_${message.author.id}`, money)
                db.set(`roletatimeout_${message.author.id}`, Date.now())
            } else {
                let slotsEmbed = new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle('🎰 PERDEU')
                    .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n${message.author} apostou ${args[0]} e perdeu ${money} <:StarPoint:766794021128765469>`)
                message.inlineReply(slotsEmbed)
                db.subtract(`money_${message.author.id}`, money)
                db.add(`bank_${client.user.id}`, money)
                db.set(`roletatimeout_${message.author.id}`, Date.now())
            }
        }
    }
}