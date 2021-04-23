const db = require('quick.db')
const Discord = require('discord.js')
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

        let user = message.mentions.members.first()
        let bot = message.mentions.bot
        let nomoney = 'Dinheiro insuficiente.'

        let money = db.get(`mpoints_${message.author.id}`)
        if (money === null) money = '0'

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        var noargs = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('💸 Sistema de Pagamento')
            .setDescription('Page a galera, é simples e rápido!\n \n*MPoints perdidos não serão recuperados. Cuidado para não ser enganado*')
            .addField('Comando', '`' + prefix + 'pay @user quantia`\n' + '`' + prefix + 'pay @user all/tudo`')
            .setFooter('Apenas o dinheiro na carteira será válido para pagamentos.')

        var formato = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'pay @user Valor`')

        if (!args[0]) { return message.inlineReply(noargs) }
        if (!args[1]) { return message.inlineReply(formato) }
        if (user === message.author) { return message.inlineReply('Você não pode pagar você mesmo.') }
        if (bot) { return message.inlineReply('Você não pode pagar bots.') }
        if (money < args[1]) { return message.inlineReply(`Você precisa ter ${args[1]}<:StarPoint:766794021128765469> na carteira para poder pagar ${user.user.username}.`) }
        if (args[1] < 0) { return message.inlineReply(nomoney) }
        if (isNaN(args[1])) { return message.inlineReply('Valor digitado não é um número.') }

        var confirm = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Você confirma os dados a baixo?')
            .setDescription('O dinheiro pago não retornará para você a menos que te devolvam.')
            .addField('Informações', `Pagar **${args[1]}<:StarPoint:766794021128765469>MPoints** para ${user} ?`)
            .setFooter('Auto delete em 30 segundos.')

        await message.inlineReply('A Maya não se responsabiliza por dinheiro perdido.', confirm).then(msg => {
            msg.react('✅').catch(err => { return }) // Check
            msg.react('❌').catch(err => { return }) // X
            msg.delete({ timeout: 30000 }).catch(err => { return })

            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return

                if (reaction.emoji.name === '✅') { // Sim
                    msg.delete().catch(err => { return })
                    db.add(`mpoints_${message.mentions.members.first().id}`, args[1])
                    db.subtract(`mpoints_${message.author.id}`, args[1])

                    var embed = new Discord.MessageEmbed()
                        .setColor('#efff00')
                        .setDescription(`${message.author} pagou ${args[1]}<:StarPoint:766794021128765469>MPoints para ${message.mentions.members.first()}`)
                    return message.inlineReply(embed)
                }
                if (reaction.emoji.name === '❌') { // Não
                    msg.delete().catch(err => { return })
                    message.inlineReply("Pagamento cancelado.")
                }
            })
        })
    }
}