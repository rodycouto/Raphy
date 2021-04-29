const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
        let perms = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: Gerenciar Canais, Gerenciar Mensagens')
        return message.inlineReply(perms)
    }

    if (!args[0]) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let noargs = new Discord.MessageEmbed()
            .setColor('#8B0000') // red
            .setTitle('`' + prefix + 'setxpchannel #Canalxp`')
        return message.inlineReply(noargs)
    }

    if (args[0] === 'off') {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let semcanal = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('O xpchannel não pode ser desativado. (Por enquanto)')
            .setDescription('Caso queira trocar de canal, use o comando \n`' + prefix + 'setxpchannel #Canalxp`')

        return message.inlineReply(semcanal)
    }

    let channel = message.mentions.channels.first()
    if (!channel) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"
        let nochannel = new Discord.MessageEmbed()
            .setColor('#8B0000') // red
            .setTitle('' + prefix + 'setxpchannel #Canalxp')

        return message.inlineReply(nochannel)
    }

    let atual = db.get(`xpchannel_${message.guild.id}`)
    if (channel.id === atual) {

        let iqual = new Discord.MessageEmbed()
            .setColor('#8B0000') // Red
            .setTitle('Este canal já foi definido como Canal Xp!')

        return message.inlineReply(iqual)
    } else if (args[0] !== atual) {
        db.set(`xpchannel_${message.guild.id}`, channel.id)

        let sucess = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Xp Channel Definido!')
            .setDescription(`Canal escolhido: ${channel}`)

        return message.inlineReply(sucess)
    }
}