const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
        let perms = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: Gerenciar Canais')
        return message.inlineReply(perms)
    }

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
        let adm = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Eu preciso da permissão "Gerenciar Canais" para utilizar esta função.')
        return message.inlineReply(adm)
    }

    if (!args[0]) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let noargs = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Use o formato correto')
            .setDescription('`' + prefix + 'createchannel NomeDoCanal`')
        return message.inlineReply(noargs)
    }

    message.guild.channels.create(args.slice(0).join(" "), { type: 'text' })

    let sucess = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Canal criado com sucesso.')
    return message.inlineReply(sucess)
}