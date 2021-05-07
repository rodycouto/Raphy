const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let color = await db.get(`color_${message.author.id}`)
    if (color === null) color = '#6F6C6C'

    let PorquinhoMoney = db.get('PorquinhoMoney')
    if (PorquinhoMoney === null) PorquinhoMoney = 0

    let LastWinner = db.get('lastwinner')
    if (LastWinner === null) { LastWinner = 'Ninguém por enquanto' }

    let lastprize = db.get('lastprize')
    if (lastprize === null) { lastprize = '0<:RPoints:837666759389347910>RPoints'}

    if (['coins', 'moedas', 'moeda', 'status', 'rpoints'].includes(args[0])) {
        const StatusPigEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('🐖 Pig Status')
            .setDescription('Tente quebrar o Pig e ganhe todo o dinheiro dele!')
            .addField('Último ganhador', `${LastWinner}\n${lastprize}<:RPoints:837666759389347910>`, true)
            .addField('RPoints no Pig', `${PorquinhoMoney}<:RPoints:837666759389347910>`, true)
        return message.inlineReply(StatusPigEmbed)
    }

    if (args[1]) { return message.inlineReply('<:xis:835943511932665926> Por favor, digite apenas `' + prefix + 'pig` ou `' + prefix + 'pig status`') }

    let timeout1 = 30000 // 1 Minutos
    let author1 = await db.fetch(`PorquinhoTimeout_${message.author.id}`)

    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
        let time = ms(timeout1 - (Date.now() - author1))
        return message.inlineReply(`<:xis:835943511932665926> Tente quebrar o porquinho novamente em: ${time.seconds}s`)
    } else {

        let money = db.get(`mpoints_${message.author.id}`)
        if (money === null) money = 0

        if (money < 0) { return message.inlineReply('<:xis:835943511932665926> Você não pode quebrar o porquinho estando negativado.') }
        if (money < 10) { return message.inlineReply('<:xis:835943511932665926> Você precisa de pelo menos de 10<:RPoints:837666759389347910>RPoints para tentar quebrar o porquinho.') }
        if (money = 10 || money > 10) {

            db.set(`PorquinhoTimeout_${message.author.id}`, Date.now())
            db.add('PorquinhoMoney', 10)
            db.subtract(`mpoints_${message.author.id}`, 10)

            const Wins = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('<a:Check:836347816036663309> Você quebrou o porquinho')
                .setDescription(`Você quebrou o porquinho e conseguiu ${PorquinhoMoney}<:RPoints:837666759389347910>RPoints!`)
                .setFooter(`${prefix}pig coins`)

            const Lose = new Discord.MessageEmbed()
                .setColor('#8B0000')
                .setTitle('<:xis:835943511932665926> Você não quebrou o porquinho')
                .setDescription(`Você não quebrou o porquinho e perdeu 10<:RPoints:837666759389347910>RPoints!`)
                .setFooter(`${prefix}pig coins`)

            let luck = ['win', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose'] // 10% de chance de vitória
            let result = luck[Math.floor(Math.random() * luck.length)]

            if (result === 'win') {
                db.set('lastprize', PorquinhoMoney)
                db.add(`mpoints_${message.author.id}`, PorquinhoMoney)
                db.delete('PorquinhoMoney')
                db.set(`lastwinner`, `${message.author.tag} - *(${message.author.id})*`)
                return message.inlineReply(Wins)
            }

            if (result === 'lose') {
                return message.inlineReply(Lose)
            }
        }
    }
}