const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"
    var formato = '`' + prefix + 'assaltar @user`, dúvidas? use `' + prefix + 'assaltar`'

    var noargs1 = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('🥷 Comando Assaltar')
        .setDescription('O comando assaltar te garante 100% do dinheiro que o @user tem na carteira.\n \nCaso a pessoa que você assaltar também tenha uma arma, você tem a chance de ser assaltado de volta, preso, se ferir e perder dinheiro do próprio banco para tratamento.')
        .addField('Comando', '`' + prefix + 'assaltar @user`')
        .addField('Item Necessário', '🔫 Arma')

    if (!args[0]) { return message.inlineReply(noargs1) }
    let user = message.mentions.members.first()
    if (!user) { return message.inlineReply(formato) }
    let arma = await db.get(`arma_${message.author.id}`)
    let gunuser = db.get(`arma_${user.id}`)

    let usermoney = db.get(`mpoints_${user.id}`)
    let autormoney = db.get(`mpoints_${message.author.id}`)
    let amount = Math.floor(Math.random() * usermoney) + 1
    if (usermoney == null) usermoney = 0
    if (autormoney == null) autormoney = 0

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

        let timeout2 = 1000000
        let author2 = await db.fetch(`preso_${message.author.id}`)

        if (author2 !== null && timeout2 - (Date.now() - author2) > 0) {
            let time = ms(timeout2 - (Date.now() - author2))
            return message.inlineReply(`Você está preso! Liberdade em: ${time.minutes}m e ${time.seconds}s`)
        } else {

            var timeout = 1040000
            let daily = db.get(`assaltotime_${message.author.id}`)
            if (daily !== null && timeout - (Date.now() - daily) > 0) {
                let time = ms(timeout - (Date.now() - daily))

                return message.inlineReply(`🚨 A policía está em sua busca, tente novamente em ${time.minutes}m e ${time.seconds}s.`)
            } else {

                if (arma === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, é necessário que você tenha uma **🔫 Arma** para utilizar este comando.`) }
                if (!db.get(`arma_${message.author.id}`)) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, é necessário que você tenha uma **🔫 Arma** para utilizar este comando.`) }
                if (args[1]) { return message.inlineReply(formato) }
                if (user.id == '821471191578574888') { return message.inlineReply('<:xis:835943511932665926> Você não pode me assaltar, que coisa feia!') }
                if (user.id == message.author.id) { return message.inlineReply(`<:xis:835943511932665926> Você não pode assaltar você mesmo.`) }
                if (usermoney === 0) { return message.inlineReply(`<:xis:835943511932665926> ${user} não possui dinheiro algúm.`) }
                if (usermoney < 0) { return message.inlineReply(`<:xis:835943511932665926> ${user} está individado, tenha coração!`) }

                if (gunuser) {

                    var luck = ['win', 'lose', 'preso', 'win', 'ferido']
                    let result = luck[Math.floor(Math.random() * luck.length)]
                    let tratamento = Math.floor(Math.random() * 5000) + 1

                    var assaltando = new Discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`<a:loading:834782920287846430> ${message.author} está assaltando ${user}`)

                    var LoseEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle("🔫 O assalto falhou!!")
                        .setDescription(`${user} reagiu mais rápido que você e te assaltou!\n \nVocê perdeu ${amount}<:StarPoint:766794021128765469>MPoints`)

                    var WinEmbed = new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setTitle(`🔫 Você assaltou ${user.user.username} com sucesso!`)
                        .setDescription(`${message.author} assaltou todo o dinheiro de ${user} e obteve ${db.get(`mpoints_${user.id}`)}<:StarPoint:766794021128765469>MPoints`)

                    var PresoEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('🚨 Preso!')
                        .setDescription(`${user} te rendeu e você foi preso sem direito a fiança!`)

                    var FeridoEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('🚑 Você levou um tiro!')
                        .setDescription(`${user} atirou em você! Você está ferido e precisa de tratamentos rápido!`)
                        .addField('🏥 Maya Hospital', `Debitamos ${tratamento}<:StarPoint:766794021128765469>MPoints de sua conta do banco para salvar sua vida.`)

                    if (result == 'win') {
                        setTimeout(function () {
                            db.add(`mpoints_${message.author.id}`, usermoney)
                            db.subtract(`mpoints_${user.id}`, usermoney)
                            db.set(`assaltotime_${message.author.id}`, Date.now())
                            message.inlineReply(WinEmbed)
                        }, 4500)
                        message.inlineReply(assaltando).then(msg => msg.delete({ timeout: 4000 }))
                    }

                    if (result == 'lose') {
                        setTimeout(function () {
                            db.subtract(`mpoints_${message.author.id}`, amount)
                            db.add(`mpoints_${user.id}`, amount)
                            db.set(`assaltotime_${message.author.id}`, Date.now())
                            message.inlineReply(LoseEmbed)
                        }, 4500)
                        message.inlineReply(assaltando).then(msg => msg.delete({ timeout: 4000 }))
                    }

                    if (result == 'preso') {
                        setTimeout(function () {
                            db.set(`preso_${message.author.id}`, Date.now())
                            message.inlineReply(PresoEmbed)
                        }, 4500)
                        message.inlineReply(assaltando).then(msg => msg.delete({ timeout: 4000 }))
                    }

                    if (result == 'ferido') {
                        setTimeout(function () {
                            db.subtract(`mpoints_${message.author.id}`, tratamento)
                            db.add(`mpoints_${client.user.id}`, tratamento)
                            db.set(`assaltotime_${message.author.id}`, Date.now())
                            message.inlineReply(FeridoEmbed)
                        }, 4500)
                        message.inlineReply(assaltando).then(msg => msg.delete({ timeout: 4000 }))
                    }
                }

                if (!gunuser) {

                    var luck1 = ['win', 'lose']
                    let result1 = luck1[Math.floor(Math.random() * luck1.length)]

                    let AssaltEmbed = new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setTitle(`🔫 Você assaltou ${user.user.username} com sucesso!`)
                        .setDescription(`${message.author} assaltou todo o dinheiro de ${user} e obteve ${db.get(`mpoints_${user.id}`)}<:StarPoint:766794021128765469>MPoints`)

                    var PresoEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('🚨 Preso!')
                        .setDescription(`Havia policía por perto e você foi preso sem direito a fiança!`)

                    if (result1 === 'win') {
                        db.add(`mpoints_${message.author.id}`, usermoney)
                        db.subtract(`mpoints_${user.id}`, usermoney)
                        db.set(`assaltotime_${message.author.id}`, Date.now())
                        return message.inlineReply(AssaltEmbed)
                    }

                    if (result1 === 'lose') {
                        db.set(`preso_${message.author.id}`, Date.now())
                        return message.inlineReply(PresoEmbed)
                    }
                }
            }
        }
    }
}
