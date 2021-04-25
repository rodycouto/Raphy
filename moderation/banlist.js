const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) { return message.inlineReply('<:xis:835943511932665926> Permissão Necessária: Banir Membros') }
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) { return message.inlineReply('<:xis:835943511932665926> Eu preciso da permissão: "Banir Membros" para executar este comando.') }

    message.guild.fetchBans().then(banned => {
        let list = banned.map(user => user.tag).join('\n')

        if (list.length >= 1950) list = `${list.slice(0, 1948)}...`

        if (banned.size === null) { banned.size = '0' }

        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(`${banned.size} Usuários banidos!`)
        if (list) { embed.setDescription(list) }
        message.inlineReply(embed)
    })

}