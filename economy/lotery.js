const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    var prize = db.get('loteria')
    if (prize === null) { prize = '0' }
    var embed = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setTitle('LOTERIA MAYA')
        .setDescription(`<:02zero:832667759800352838> Seja bem vindo a Loteria Maya!\nSe você quiser participar, compre tickets na loja.`)
        .addField('Valor atual', `${prize}<:StarPoint:766794021128765469>MPoints`)
    return message.inlineReply('Loteria também será igual a vida real, apenas espere um pouco.', embed)
    db.get(`ticketloteria_${message.author.id}`)

    let timeout1 = 6140000
    let author1 = await db.fetch(`pego_${message.author.id}`)

    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
        let time = ms(timeout1 - (Date.now() - author1))

        let presomax = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('🚨 Você está em prisão máxima!')
            .setDescription('`Liberdade em: ' + `${time.minutes}` + 'm e ' + `${time.seconds}` + 's`')

        return message.inlineReply(presomax)
    } else {

        let timeout = 1728000
        let author = await db.fetch(`lotery_${message.author.id}`)

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author))
            return message.inlineReply(`Você pode jogar novamente em ${time.minutes}m e ${time.seconds}s`)
        } else {
            var amount = Math.floor(Math.random() * 1000) + 1
            db.add(`mpoints_${message.author.id}`, amount)
            db.set(`lotery_${message.author.id}`, Date.now())

            await message.inlineReply(`Você jogou e ganhou ${amount} <:StarPoint:766794021128765469>MPoints.`)
        }
    }
}