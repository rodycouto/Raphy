const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    var permss = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Permissão Necessária: Manusear Roles (cargos)')

    let perms = message.member.hasPermission("MANAGE_ROLES")
    if (!perms) {
        return message.inlineReply(permss)
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        var adm = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Eu preciso da permissão "Manusear Cargos" para utilizar esta função.')
        return message.inlineReply(adm)
    }

    let user = message.mentions.members.first()
    if (!user) {
        var userr = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Siga o formato')
            .setDescription('`-addrole @user @cargo`')
        return message.inlineReply(userr)
    }

    let role = message.mentions.roles.first()
    if (!role) {
        var rolee = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Siga o formato')
            .setDescription('`-addrole @user @cargo`')
        return message.inlineReply(rolee)
    }

    if (user.roles.cache.has(role.id)) {
        var roleee = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`${user.user.username} já possui este cargo.`)
        return message.inlineReply(roleee)
    }

    user.roles.add(role)
    var sucess = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setDescription(`${user.user.username} recebeu o cargo ${role} com sucesso!`)
    message.inlineReply(sucess)
}