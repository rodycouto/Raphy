const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let formato = '`' + prefix + 'rob @user`'
    let user = message.mentions.members.first()
    let usermoney = db.get(`mpoints_${user.id}`)
    let autormoney = db.get(`mpoints_${message.author.id}`)
    if (usermoney == null) usermoney = 0
    if (autormoney == null) autormoney = 0

    let timeout1 = 9140000
    let author1 = await db.fetch(`pego_${message.author.id}`)

    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
        let time = ms(timeout1 - (Date.now() - author1))

        let presomax = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('🚨 Você está em prisão máxima!')
            .setDescription(`Liberdade em: ${time.hours}h ${time.minutes}m e ${time.seconds}s`)

        return message.inlineReply(presomax)
    } else {

        let timeout = 6000000
        let daily = db.get(`robtime_${message.author.id}`)
        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily))

            let embedtime = new Discord.MessageEmbed()
                .setColor('#8B0000')
                .setDescription(`${message.author}, você já roubou alguém hoje, roube novamente em ${time.minutes}m e ${time.seconds}s.`)
            return message.inlineReply(embedtime)
        } else {

            if (!user) { return message.inlineReply(formato) }
            if (user.id === '837147659898191902') { return message.inlineReply('❓ Você realmente quer me roubar?') }
            if (user.id === message.author.id) { return message.inlineReply(`<:xis:835943511932665926> Você não pode roubar você mesmo.`) }
            if (usermoney === 0) { return message.inlineReply(`<:xis:835943511932665926> ${user.user.username} não possui dinheiro.`) }
            if (usermoney < 0) { return message.inlineReply(`<:xis:835943511932665926> ${user.user.username} está negativado.`) }

            let luck = ['win', 'lose']
            let result = luck[Math.floor(Math.random() * luck.length)]
            let amount = Math.floor(Math.random() * 1000) + 1
            let amount1 = Math.floor(Math.random() * usermoney) + 1

            let LoseEmbed = new Discord.MessageEmbed()
                .setColor('#8B0000')
                .setTitle("🚨 A polícia te pegou e você foi preso!")
                .setDescription(`A fiança custou ${amount}<:StarPoint:766794021128765469>MPoints`)

            let WinEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(`🔫 Você roubou ${user.user.username} com sucesso!`)
                .setDescription(`${message.author} obteve um lucro de ${amount1}<:StarPoint:766794021128765469>MPoints com o roubo.`)

            if (result == 'lose') {
                db.subtract(`mpoints_${message.author.id}`, amount)
                db.add(`mpoints_${client.user.id}`, amount)
                db.set(`robtime_${message.author.id}`, Date.now())
                message.inlineReply(LoseEmbed)
            } else if (result == 'win') {
                db.subtract(`mpoints_${user.id}`, amount1)
                db.add(`mpoints_${message.author.id}`, amount1)
                db.set(`robtime_${message.author.id}`, Date.now())
                message.inlineReply(WinEmbed)
            }
        }
    }
}