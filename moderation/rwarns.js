const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission(["MANAGE_ROLES"])) { return message.inlineReply('<:xis:835943511932665926> Permissão Necessária: Manusear Cargos') }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    if (!args[0]) { return message.inlineReply('`' + prefix + 'rwarns @user`') }

    let user = message.mentions.members.first()
    if (!user) { return message.inlineReply('`' + prefix + 'rwarns @user`') }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    if (warnings === null) { return message.inlineReply(`<:xis:835943511932665926> ${user.user.username} não tem nenhum warn.`) }

    db.delete(`warnings_${message.guild.id}_${user.id}`)

    message.inlineReply(new Discord.MessageEmbed().setColor('GREEN').setTitle(`✅ O warns de ${user.user.username} foi resatado com sucesso.`))
}