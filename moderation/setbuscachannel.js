const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_CHANNELS')) { return message.inlineReply('<:xis:835943511932665926> Permissão Necessária: Gerenciar Canais') }

    if (!args[0]) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let noargs = new Discord.MessageEmbed()
            .setColor('#8B0000') // red
            .setDescription('Selecione um canal para todo mundo poder minerar')
            .addField('Comandos', '`' + prefix + 'setbuscachannel #Canal`')
            .addField('Desative o Canal', '`' + prefix + 'setbuscachannel off`')
        return message.inlineReply(noargs)
    }

    if (args[0] === 'off') {
        let canal = db.get(`buscachannel_${message.guild.id}`)
        if (canal === null) {
            let semcanal = new Discord.MessageEmbed()
                .setColor('#8B0000')
                .setTitle('O Canal de Busca já está desativado.')

            return message.inlineReply(semcanal)
        } else if (canal) {
            db.delete(`buscachannel_${message.guild.id}`)
            let comcanal = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Canal de Busca desativado.')
            return message.inlineReply(comcanal)
        }
    }

    let channel = message.mentions.channels.first()
    if (!channel) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"
        let nochannel = new Discord.MessageEmbed()
            .setColor('#8B0000') // red
            .setTitle('' + prefix + 'setbuscachannel #Canal')

        return message.inlineReply(nochannel)
    }

    let atual = db.get(`buscachannel_${message.guild.id}`)
    if (channel.id === atual) {

        let iqual = new Discord.MessageEmbed()
            .setColor('#8B0000') // Red
            .setTitle('Este canal já foi definido como Canal de Busca!')

        return message.inlineReply(iqual)
    } else if (args[0] !== atual) {
        db.set(`buscachannel_${message.guild.id}`, channel.id)

        let sucess = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Canal de Busca Ativado!')
            .setDescription(`Canal escolhido: ${channel}`)

        return message.inlineReply(sucess)
    }
}