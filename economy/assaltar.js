const Discord = require('discord.js')
const db = require('quick.db')
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

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        if (!args[0]) {
            var noargs = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('Comando Assaltar')
                .setDescription('O comando assaltar te garante 100% do dinheiro que o @user tem na carteira.\n \nCaso a pessoa que você assaltar também tenha uma arma, você tem a chance de ser assaltado de volta.')
                .addField('Item Obrigatório', '🔫 Arma')
            return message.inlineReply(noargs)
        }

        let arma = await db.get(`arma_${message.author.id}`)
        if (arma === null) {
            var nota = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('❌ Comando Negado')
                .setDescription(`${message.author}, é necessário que você tenho uma **🔫 Arma** para assaltar alguém.`)
            return message.inlineReply(nota)
        }

        let user = message.mentions.members.first()
        if (!user) {
            var nook = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Siga o formato correto')
                .setDescription('`' + prefix + 'assaltar @user`')
            return message.inlineReply(nook)
        }

        if (!db.get(`arma_${message.author.id}`)) {

            var nota = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('❌ Comando Negado')
                .setDescription(`${message.author}, é necessário que você tenha uma **🔫 Arma** para assaltar alguém.`)
            return message.inlineReply(nota)
        }

        if (user.id == '821471191578574888') {
            return message.inlineReply('Você realmente quer me assaltar? Tá doido é? Vou te quebrar no meio.')
        }

        if (user.id == message.author.id) {
            return message.inlineReply(`Você não pode assaltar você mesmo.`)
        }

        var usermoney = db.get(`money_${user.id}`)
        if (usermoney == null) usermoney = 0

        var autormoney = db.get(`money_${message.author.id}`)
        if (autormoney == null) autormoney = 0

        if (usermoney === 0 || usermoney < 0) {
            var nomoney = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription(`${user} não possui dinheiro.`)
            return message.inlineReply(nomoney)
        }

        var timeout = 1040000
        var daily = db.get(`assaltotime_${message.author.id}`)
        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily))

            let embedtime = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription(`Você já assaltou alguém hoje, assalte novamente em ${time.minutes}m e ${time.seconds}s.`)
            return message.inlineReply(embedtime)
        } else {

            var gunuser = db.get(`arma_${user.id}`)
            if (gunuser) {

                var luck = ['win', 'lose']
                var result = luck[Math.floor(Math.random() * luck.length)]

                var authormoney = db.get(`money_${message.author.id}`)

                if (result == 'lose') {
                    var amount = Math.floor(Math.random() * authormoney) + 1
                    var embed1 = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle("🔫 O assalto falhou!!")
                        .setDescription(`${user} reagiu mais rápido que você e te assaltou!\n \nVocê perdeu ${amount}<:StarPoint:766794021128765469>`)
                    message.inlineReply(embed1)
                    db.subtract(`money_${message.author.id}`, amount)
                    db.add(`money_${user.id}`, amount)
                    db.set(`assaltotime_${message.author.id}`, Date.now())
                } else if (result == 'win') {
                    let moneyEmbed = new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setTitle(`🔫 Você assaltou ${user.user.username} com sucesso!`)
                        .setDescription(`${message.author} assaltou todo o dinheiro de ${user} e obteve ${db.get(`money_${user.id}`)}<:StarPoint:766794021128765469>`)

                    message.inlineReply(moneyEmbed)
                    db.add(`money_${message.author.id}`, usermoney)
                    db.subtract(`money_${user.id}`, usermoney)
                    db.set(`assaltotime_${message.author.id}`, Date.now())
                }
            }

            var usermoney = db.get(`money_${user.id}`)
            if (gunuser === null) {
                let moneyEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`🔫 Você assaltou ${user.user.username} com sucesso!`)
                    .setDescription(`${message.author} assaltou todo o dinheiro de ${user} e obteve ${db.get(`money_${user.id}`)}<:StarPoint:766794021128765469>`)

                message.inlineReply(moneyEmbed)
                db.subtract(`money_${user.id}`, usermoney)
                db.add(`money_${message.author.id}`, usermoney)
                db.set(`assaltotime_${message.author.id}`, Date.now())
            } else if (!db.get(`arma_${user.id}`)) {
                let moneyEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`🔫 Você assaltou ${user.user.username} com sucesso!`)
                    .setDescription(`${message.author} assaltou todo o dinheiro de ${user} e obteve ${db.get(`money_${user.id}`)}<:StarPoint:766794021128765469>`)

                db.add(`money_${message.author.id}`, usermoney)
                db.subtract(`money_${user.id}`, usermoney)
                db.set(`assaltotime_${message.author.id}`, Date.now())
                message.inlineReply(moneyEmbed)
            }
        }
    }
}