const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MOVE_MEMBERS')) {
        let noperm = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: Mover Membros')
        return message.reply(noperm)
    }

    if (!message.guild.me.hasPermission("MOVE_MEMBERS")) {
        let adm = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Eu preciso da permissão "Mover Membros" para utilizar esta função.')
        return message.inlineReply(adm)
    }

    let member = message.mentions.members.first()
    if (!member) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let nomember = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'kickvoice @user`')
        return message.inlineReply(nomember)
    }

    if (!member.voice.channel) {
        let novoice = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle(`${member.user.username} não está em nenhum canal de voz.`)
        return message.inlineReply(novoice)
    }

    if (db.get(`whitelist_${member.id}`)) {// Rodrigo Couto
        let banrody = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle(member.user.username + ' está na whitelist.')
        return message.inlineReply(banrody)
    }

    if (member.hasPermission(['MOVE_MEMBERS', 'ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANEGE_ROLES'])) {
        let perms = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle(`${member.user.username} tem permissões importantes neste servidor.`)
        return message.inlineReply(perms)
    }

    let kicked = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`${member.user.username} foi desconectado/a do canal de voz com sucesso.`)

    member.voice.kick().catch(err => {
        let error = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Um erro foi encontrado')
            .setDescription(`ERROR BY CONSOLE.LOG \n` + err)
        message.inlineReply(error)
    })

    return message.inlineReply(kicked)
}