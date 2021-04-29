const db = require('quick.db')
const Discord = require('discord.js')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

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

        user = message.mentions.members.first()

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let correto = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'cobrar @user Valor`')

        args[0] = user
        if (!args[0]) {
            let cobre = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('💸 Sistema de cobrança')
                .setDescription('Cobre as pessoas que te devem ou apenas peça dinheiro, você que sabe.')
                .addField('Comando', '`' + prefix + 'cobrar @user Valor`')
                .setFooter('A Naya não se responsabiliza por dinheiro perdido ou mal usado.')
            return message.inlineReply(cobre)
        }

        if (user.id === '837147659898191902') { return message.inlineReply('Sai pra lá, eu não to devendo ninguém :cry:') }
        if (user.id == message.author.id) { return message.inlineReply('Você não pode cobrar você mesmo.') }
        if (!args[1]) { return message.inlineReply(correto) }
        if (args[1] < '0') { return message.inlineReply('Diga um valor maior que 0') }
        if (args[1] === '0') { return message.inlineReply('Diga um valor maior que 0') }

        if (isNaN(args[1])) {
            let notnumber = new Discord.MessageEmbed()
                .setColor('#8B0000')
                .setTitle('❌ Valor não reconhecido')
                .setDescription('O valor que você digitou não é um número.')
            return message.inlineReply(notnumber)
        }

        if (args[2]) { return message.inlineReply(correto) }

        let cobrando = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('💸 Sistema de Cobrança')
            .addFields(
                {
                    name: 'Cobrado',
                    value: user,
                    inline: true
                },
                {
                    name: 'Cobrante',
                    value: message.author,
                    inline: true
                },
                {
                    name: 'Valor cobrado',
                    value: `${args[1]} <:StarPoint:766794021128765469>MPoints`,
                    inline: true
                }
            )
            .setFooter("Auto delete em 1 minuto.")

        await message.channel.send('A Naya não se responsabiliza por dinheiro perdido.', cobrando).then(msg => {
            msg.react('✅') // Check
            msg.react('❌') // X
            msg.delete({ timeout: 60000 })

            msg.awaitReactions((reaction, user) => {
                if (message.mentions.users.first().id !== user.id) return

                if (reaction.emoji.name === '✅') { // Check
                    msg.delete().catch(err => { return })
                    let money = db.get(`mpoints_${user.id}`)

                    let nomoney = new Discord.MessageEmbed()
                        .setColor('#8B0000')
                        .setDescription('Você não tem todo esse dinheiro na carteira.')

                    if (money === null) { return message.inlineReply(nomoney) }
                    if (!money) { return message.inlineReply(nomoney) }
                    if (money < args[1]) { return message.inlineReply(nomoney) }

                    db.subtract(`mpoints_${user.id}`, args[1])
                    db.add(`mpoints_${message.author.id}`, args[1])

                    let embed2 = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('<a:Check:836347816036663309> Transação concluida!')
                        .setDescription(`${user} pagou ${args[1]}<:StarPoint:766794021128765469>MPoints para ${message.author}`)

                    return message.inlineReply(embed2)
                }
                if (reaction.emoji.name === '❌') { // Check
                    msg.delete().catch(err => { return })
                    return message.inlineReply(`${user} recusou e não pagou o valor cobrado.`)
                }
            })
        })
    }
}