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

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let user = message.mentions.members.first()
        if (!user) {
            var nook = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Siga o formato correto')
                .setDescription('`' + prefix + 'rob @user`')
            return message.inlineReply(nook)
        }

        if (user.id == '821471191578574888') {
            return message.inlineReply('Você realmente quer me roubar? Tá doido é? Vou te quebrar no meio.')
        }

        if (user.id == message.author.id) {
            return message.inlineReply(`Você não pode roubar você mesmo.`)
        }

        var usermoney = db.get(`money_${user.id}`)
        if (usermoney == null) usermoney = 0

        var autormoney = db.get(`money_${message.author.id}`)
        if (autormoney == null) autormoney = 0

        if (usermoney <= 0) {
            var nomoney = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle(`${user.user.username} não possui dinheiro.`)
            return message.inlineReply(nomoney)
        }

        if (usermoney < 0) {
            var nomoney = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle(`${user.user.username} não possui dinheiro.`)
            return message.inlineReply(nomoney)
        }

        var timeout = 6040000
        var daily = db.get(`robtime_${message.author.id}`)
        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily))

            let embedtime = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription(`${message.author}, você já roubou alguém hoje, roube novamente em ${time.minutes}m e ${time.seconds}s.`)
            return message.inlineReply(embedtime)
        } else {

            var luck = ['win', 'lose']
            var result = luck[Math.floor(Math.random() * luck.length)]

            if (result == 'lose') {
                var amount = Math.floor(Math.random() * 1000) + 1
                var embed1 = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle("🚨 A polícia te pegou e você foi preso!")
                    .setDescription(`A fiança custou ${amount}<:StarPoint:766794021128765469>`)
                message.inlineReply(embed1)
                db.subtract(`money_${message.author.id}`, amount)
                db.set(`robtime_${message.author.id}`, Date.now())
            } else if (result == 'win') {
                let amount = Math.floor(Math.random() * usermoney) + 1
                let moneyEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`🔫 Você roubou ${user.user.username} com sucesso!`)
                    .setDescription(`${message.author} obeteve um lucro de ${amount}<:StarPoint:766794021128765469> com o roubo.`)

                message.inlineReply(moneyEmbed)
                db.subtract(`money_${user.id}`, amount)
                db.add(`money_${message.author.id}`, amount)
                db.set(`robtime_${message.author.id}`, Date.now())
            }
        }
    }
}