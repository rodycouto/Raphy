const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

    const canal = client.channels.cache.get('836262830948614164')

    let color = await db.get(`color_${message.author.id}`)
    if (color === null) color = '#6F6C6C'

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    const noargs = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('<:zeroheart:833378638475821088> Envie suas cantadas!')
        .setDescription('Com este comando, você envia cantadas para serem adicionadas ao meu pack de cantadas!')
        .addField('Comando', '`' + prefix + 'sendcantada Sua cantada em diante`')
        .setFooter('Limite de 200 caracteres.')

    if (!args[0]) { return message.inlineReply(noargs) }

    const cantada = args.join(" ")

    const NovaCantadaEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('📢 Nova Cantada Recebido')
        .addField('Enviado por', `${message.author.tag} *(${message.author.id})*`, true)
        .addField('Servidor', message.guild.name, true)
        .addField('Relatório', cantada)

    if (cantada.length < 15) { return message.inlineReply('<:xis:835943511932665926> Por favor, escreva mais de **15 caracteres**.') }
    if (cantada.length > 200) { return message.inlineReply('<:xis:835943511932665926> Por favor, não ultrapasse mais de **200 caracteres**.') }

    canal.send(NovaCantadaEmbed).catch(err => { return message.channel.send(`<:xis:835943511932665926> Ocorreu um erro! Use **${prefix}help** e entre no meu servidor, por favor.\n \nErro: \n${err}`) })
    setTimeout(function () { message.inlineReply('<a:Check:836347816036663309> Sua cantada foi enviada com sucesso! Você vai receber sua recompensa no banco em breve.') }, 5000)
    return message.inlineReply('<a:Pulse:839682326211854337> Enviando cantada ao Servidor Central...').then(msg => msg.delete({ timeout: 4850 }))
}