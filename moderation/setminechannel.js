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
            .setDescription('Selecione um canal para todo mundo poder minerar')
            .addField('Comandos', '`' + prefix + 'setminechannel #Canal`')
            .addField('Desative o Canal', '`' + prefix + 'setminechannel off`')
        return message.inlineReply(noargs)
    }

    if (args[0] === 'off') {
        let canal = db.get(`minechannel_${message.guild.id}`)
        if (canal === null) {
            let semcanal = new Discord.MessageEmbed()
                .setColor('#8B0000')
                .setTitle('O Canal de Mineração já está desativado.')

            return message.inlineReply(semcanal)
        } else if (canal) {
            db.delete(`minechannel_${message.guild.id}`)
            let comcanal = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Canal de Mineração desativado.')
            return message.inlineReply(comcanal)
        }
    }

    let channel = message.mentions.channels.first()
    if (!channel) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"
        let nochannel = new Discord.MessageEmbed()
            .setColor('#8B0000') // red
            .setTitle('' + prefix + 'setminechannel #Canal')

        return message.inlineReply(nochannel)
    }

    let atual = db.get(`minechannel_${message.guild.id}`)
    if (channel.id === atual) {

        let iqual = new Discord.MessageEmbed()
            .setColor('#8B0000') // Red
            .setTitle('Este canal já foi definido como Canal de Mineração!')

        return message.inlineReply(iqual)
    } else if (args[0] !== atual) {
        db.set(`minechannel_${message.guild.id}`, channel.id)

        let sucess = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Canal de Mineração Ativado!')
            .setDescription(`Canal escolhido: ${channel}`)

        return message.inlineReply(sucess)
    }
}