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
            .setDescription('Selecione um canal para todo mundo poder pescar')
            .addField('Comandos', '`' + prefix + 'setpescachannel #Canal`')
            .addField('Desative o Canal', '`' + prefix + 'setpescachannel off`')
        return message.inlineReply(noargs)
    }

    if (args[0] === 'off') {
        let canal = db.get(`pescachannel_${message.guild.id}`)
        if (canal === null) {
            let semcanal = new Discord.MessageEmbed()
                .setColor('#8B0000')
                .setTitle('O Canal de Pesca já está desativado.')

            return message.inlineReply(semcanal)
        } else if (canal) {
            db.delete(`pescachannel_${message.guild.id}`)
            let comcanal = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Canal de Pesca desativado.')
            return message.inlineReply(comcanal)
        }
    }

    let channel = message.mentions.channels.first()
    if (!channel) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"
        let nochannel = new Discord.MessageEmbed()
            .setColor('#8B0000') // red
            .setTitle('' + prefix + 'setpescachannel #Canal')

        return message.inlineReply(nochannel)
    }

    let atual = db.get(`pescachannel_${message.guild.id}`)
    if (channel.id === atual) {

        let iqual = new Discord.MessageEmbed()
            .setColor('#8B0000') // Red
            .setTitle('Este canal já foi definido como Canal de Pesca!')

        return message.inlineReply(iqual)
    } else if (args[0] !== atual) {
        db.set(`pescachannel_${message.guild.id}`, channel.id)

        let sucess = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Canal de Pesca Ativado!')
            .setDescription(`Canal escolhido: ${channel}`)

        return message.inlineReply(sucess)
    }
}