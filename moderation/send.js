const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = '-' }

    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        let perms = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: Gerenciar Mensagens')
        return message.inlineReply(perms)
    }

    let canal = message.mentions.channels.first()
    args[0] = canal
    if (!canal) {
        let nocanal = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'send #canal Sua mensagem`')
        return message.inlineReply(nocanal)
    }

    if (!args[1]) {
        let noargs = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'send #canal Sua mensagem`')
        return message.inlineReply(noargs)
    }

    let mensagem = args.slice(1).join(" ")
    if (!mensagem) {
        let nomensagem = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'send #canal Sua mensagem`')
        return message.inlineReply(nomensagem)
    }

    canal.send(mensagem + `\n \n*${message.author.username}*`)
    message.inlineReply('Enviado com sucesso.')
}