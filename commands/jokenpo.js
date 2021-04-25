const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let money = db.get(`mpoints_${message.author.id}`)
    let Options = ["pedra", "papel", "tesoura"]
    let random = ['win', 'lose', 'draw']
    var result = random[Math.floor(Math.random() * random.length)]

    var noargs = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('👊 ✋ ✌️ Jokempo')
        .setDescription('Você pode jogar jokempo e ganhar ou perder 10 <:StarPoint:766794021128765469>MPoints')
        .addField('Comando', '`' + prefix + 'j <pedra> <papel> <tesoura>`')

    if (!args[0]) { return message.inlineReply(noargs) }
    if (money === null) money = 0
    if (!money) { return message.inlineReply('<:xis:835943511932665926> Você precisa ter pelo menos 10<:StarPoint:766794021128765469>MPoints na carteira') }
    if (money < 10) { return message.inlineReply('<:xis:835943511932665926> Você precisa ter pelo menos 10<:StarPoint:766794021128765469>MPoints na carteira') }
    if (!Options.includes(args[0])) { return message.inlineReply('<:xis:835943511932665926> Opção Incorreta!\n`' + prefix + 'j <pedra> <papel> <tesoura>`') }

    if (['pedra', 'rock'].includes(args[0])) {

        var lose = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('😭 | Eu Perdiiii')
            .setDescription('Você 👊 x ✌️ Maya\nVocê ganhou 10<:StarPoint:766794021128765469>MPoints')

        var win = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('😌 | Eu Ganheeei')
            .setDescription('Você 👊 x ✋ Maya\nVocê perdeu 10<:StarPoint:766794021128765469>MPoints')

        var draw = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('😕 | Deu empate')
            .setDescription('Você 👊 x 👊 Maya\nNinguém ganhou nada que pena')


        if (result === 'win') {
            db.subtract(`mpoints_${message.author.id}`, 10)
            return message.inlineReply(win)
        }

        if (result === 'lose') {
            db.add(`mpoints_${message.author.id}`, 10)
            return message.inlineReply(lose)
        }

        if (result === 'draw') { return message.inlineReply(draw) }

    } else if (['papel', 'paper'].includes(args[0])) {

        var lose = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('😭 | Eu Perdiiii')
            .setDescription('Você ✋ x 👊 Maya\nVocê ganhou 10<:StarPoint:766794021128765469>MPoints')

        var win = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('😌 | Eu Ganheeei')
            .setDescription('Você ✋ x ✌️ Maya\nVocê perdeu 10<:StarPoint:766794021128765469>MPoints')

        var draw = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('😕 | Deu empate')
            .setDescription('Você ✋ x ✋ Maya\nNinguém ganhou nada que pena')

        if (result === 'win') {
            db.subtract(`mpoints_${message.author.id}`, 10)
            return message.inlineReply(win)
        }

        if (result === 'lose') {
            db.add(`mpoints_${message.author.id}`, 10)
            return message.inlineReply(lose)
        }

        if (result === 'draw') { return message.inlineReply(draw) }

    } else if (['tesoura', 'sissors'].includes(args[0])) {

        var lose = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('😭 | Eu Perdiiii')
            .setDescription('Você ✌️ x ✋ Maya\nVocê ganhou 10<:StarPoint:766794021128765469>MPoints')

        var win = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('😌 | Eu Ganheeei')
            .setDescription('Você ✌️ x 👊 Maya\nVocê perdeu 10<:StarPoint:766794021128765469>MPoints')

        var draw = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('😕 | Deu empate')
            .setDescription('Você ✌️ x ✌️ Maya\nNinguém ganhou nada que pena')

        if (result === 'win') {
            db.subtract(`mpoints_${message.author.id}`, 10)
            return message.inlineReply(win)
        }

        if (result === 'lose') {
            db.add(`mpoints_${message.author.id}`, 10)
            return message.inlineReply(lose)
        }

        if (result === 'draw') { return message.inlineReply(draw) }
    }
}