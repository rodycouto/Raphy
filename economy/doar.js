const db = require('quick.db')
const Discord = require('discord.js')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

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

        let money = db.get(`mpoints_${message.author.id}`)
        let user = message.mentions.members.first()

        if (!db.get(`mpoints_${message.author.id}`)) money = '0'
        if (money === null) money = '0'
        if (!args[0]) { return message.inlineReply('Não sabe usar o comando doar?\n' + '`' + prefix + 'help doar`') }
        if (!args[1]) { return message.inlineReply('Não sabe usar o comando doar?\n' + '`' + prefix + 'help doar`') }
        if (!user) { return message.inlineReply('Não sabe usar o comando doar?\n' + '`' + prefix + 'help doar`') }
        if (user.id === "821471191578574888") { return message.inlineReply('Sorry, mas não quero seu dinheiro.') }
        if (user.id == message.author.id) { return message.inlineReply('Você não pode doar para você mesmo.') }
        if (message.mentions.bot) { return message.inlineReply('Você não pode doar para bots.') }

        var confirm = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Confirmação...')
            .setDescription(`Confirmar transação no valor de ${money}<:StarPoint:766794021128765469>MPoints para ${user}?`)

        var confirm2 = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Confirmação...')
            .setDescription(`Confirmar transação no valor de ${args[1]}<:StarPoint:766794021128765469>MPoints para ${user}?`)

        if (['all', 'tudo'].includes(args[1])) {

            return message.inlineReply(confirm).then(msg => {
                msg.react('✅') // Check
                msg.react('❌') // X
                msg.delete({ timeout: 120000 }).catch(err => { return })

                msg.awaitReactions((reaction, user) => {

                    if (message.author.id !== user.id) return

                    if (reaction.emoji.name === '✅') { // Sim
                        msg.delete().catch(err => { return })

                        db.add(`mpoints_${message.mentions.members.first().id}`, money)
                        db.subtract(`mpoints_${message.author.id}`, money)
                        return message.channel.send(`✅ Transação efetuada com sucesso!\nQuantia: ${money}<:StarPoint:766794021128765469>MPoints`).catch(err => { return })
                    }

                    if (reaction.emoji.name === '❌') { // Não
                        msg.delete().catch(err => { return })
                        msg.channel.send(`Transação cancelada.`)
                    }
                })
            })
        }

        if (money < args[1]) { return message.inlineReply('Você não tem todo esse dinheiro.') }
        if (args[1] < 0) { return message.inlineReply('Diga um valor maior que 0') }
        if (isNaN(args[1])) { return message.inlineReply('O valor que você digitou não é um número.') }

        return message.inlineReply(confirm2).then(msg => {
            msg.react('✅') // Check
            msg.react('❌') // X
            msg.delete({ timeout: 120000 }).catch(err => { return })

            msg.awaitReactions((reaction, user) => {

                if (message.author.id !== user.id) return

                if (reaction.emoji.name === '✅') { // Sim
                    msg.delete().catch(err => { return })

                    db.add(`mpoints_${message.mentions.members.first().id}`, args[1])
                    db.subtract(`mpoints_${message.author.id}`, args[1])
                    return message.channel.send(`✅ Transação efetuada com sucesso!\nQuantia: ${args[1]}<:StarPoint:766794021128765469>MPoints`).catch(err => { return })
                }

                if (reaction.emoji.name === '❌') { // Não
                    msg.delete().catch(err => { return })
                    msg.channel.send(`Transação cancelada.`)
                }
            })
        })
    }
}
