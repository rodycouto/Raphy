const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

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

    if (args[0]) {
        let noargs = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Utilize apenas `' + prefix + 'clonechannel` no canal em que deseja clonar.')
        return message.inlineReply(noargs)
    }

    let NomeDoCanal = message.channel.name
    message.guild.channels.create(NomeDoCanal, { type: 'text' })

    let sucess = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Canal criado com sucesso.')
    message.inlineReply(sucess)
}