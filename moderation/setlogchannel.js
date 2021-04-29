const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
        let perms = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: Gerenciar Canais')
        return message.inlineReply(perms)
    }

    if (!args[0]) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let noargs = new Discord.MessageEmbed()
            .setColor('#8B0000') // red
            .setTitle('`' + prefix + 'setlogchannel #CanalLog`')
        return message.inlineReply(noargs)
    }

    if (args[0] === 'off') {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let semcanal = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('O logchannel não pode ser desativado.')
            .setDescription('Caso queira trocar de canal, use o comando \n`' + prefix + 'setlogchannel #CanalLog`')

        return message.inlineReply(semcanal)

    }

    let channel = message.mentions.channels.first()
    if (!channel) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"
        let nochannel = new Discord.MessageEmbed()
            .setColor('#8B0000') // red
            .setTitle('' + prefix + 'setlogchannel #Canallogs')

        return message.inlineReply(nochannel)
    }

    let atual = db.get(`logchannel_${message.guild.id}`)
    if (channel.id === atual) {

        let iqual = new Discord.MessageEmbed()
            .setColor('#8B0000') // Red
            .setTitle('Este canal já foi definido como Canal Log!')

        return message.inlineReply(iqual)
    } else if (args[0] !== atual) {
        db.set(`logchannel_${message.guild.id}`, channel.id)

        let sucess = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Log System Ativado!')
            .setDescription(`Canal escolhido: ${channel}`)

        return message.inlineReply(sucess)
    }
}