const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let help = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('💌 Carta de Amor ~ Naya')
        .setDescription('Envie cartas de amor para a pessoa que você ama. Se não tem coragem de dizer pessoalmente, deixa que eu envio a carta pra você.')
        .addField('Comando', '`' + prefix + 'carta @user A sua mensagem em diante`')
        .setFooter('A pessoa que receber a carta, recebe +5 Reputação')

    let FormatoCorreto = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setTitle('Siga o formato correto')
        .setDescription('`' + prefix + 'carta @user A sua mensagem em diante`')

    let user = message.mentions.members.first()
    let bot = message.mentions.bot
    let comprar = "Você não possui cartas. Mas você pode comprar algumas na `" + prefix + "loja`"

    let cartas = db.get(`cartas_${message.author.id}`)

    if (cartas === null) { cartas = 0 }
    if (cartas === 0) { return message.inlineReply(comprar) }
    if (!cartas) { return message.inlineReply(comprar) }
    if (!args[0]) { return message.inlineReply(help) }
    if (args[1] === user) { return message.inlineReply(FormatoCorreto) }
    if (user.id === message.author.id) { return message.inlineReply('Você não pode enviar cartas para você mesmo.') }
    if (bot) { return message.inlineReply('Você não pode mandar cartas para bots.') }
    if (!args.slice(1).join(" ")) { return message.inlineReply(FormatoCorreto) }

    let embedlove = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('💌 Você recebeu uma carta de amor')
        .addField('Autor', message.author)
        .addField('Mensagem', args.slice(1).join(" "))
        .setFooter(`Esta carta de amor foi enviada do servidor ${message.guild.name}`)

    let confirm = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Você confirma os dados a baixo?')
        .addField('Mandar carta para', user)
        .addField('Mensagem', args.slice(1).join(" "))
        .setFooter('Auto delete em 1 minuto.')

    await message.inlineReply(confirm).then(msg => {
        msg.react('✅').catch(err => { return })// Check
        msg.react('❌').catch(err => { return }) // X
        msg.delete({ timeout: 60000 }).catch(err => { return })

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            if (reaction.emoji.name === '✅') { // Sim
                msg.delete().catch(err => { return })
                db.subtract(`cartas_${message.author.id}`, 1)
                db.add(`rp_${message.author.id}`, 5)
                message.mentions.members.first().send("A Naya não se responsabiliza pelo conteúdo presente nesta carta.\nVocê recebeu mais 5 reputação.", embedlove).catch(err => {
                    if (err) {
                        let errorembed = new Discord.MessageEmbed()
                            .setColor('#8B0000')
                            .setTitle('Ocorreu um erro no envio da carta')
                            .setDescription(`Caso você não saiba resolver este erro, entre em contato com o **${prefix}support** ou entre no meu servidor atráves do **${prefix}help**`)
                            .addField('Erro', err)
                        return msg.channel.send(errorembed)
                    }
                })
                message.inlineReply('<a:Check:836347816036663309> Carta enviada com sucesso.')
            }
            if (reaction.emoji.name === '❌') { // Não
                msg.delete().catch(err => { return })
                return message.inlineReply("Envio cancelado.")
            }
        })
    })
}