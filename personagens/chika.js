const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    var list = [
        'https://imgur.com/Iuaiyp7.png',
        'https://imgur.com/cMrsyls.gif',
        'https://imgur.com/3qZ0lf6.gif',
        'https://imgur.com/oQiROA1.gif',
        'https://imgur.com/uiZtpgx.gif',
        'https://imgur.com/PKxSNe1.gif',
        'https://imgur.com/9Mlbghs.gif',
        'https://imgur.com/2P9j1Lh.png',
        'https://imgur.com/amBtmYC.gif',
        'https://imgur.com/GprmiLM.gif',
        'https://imgur.com/XntO0FR.gif',
        'https://imgur.com/yeUTYed.gif',
        'https://imgur.com/qoOALJI.gif'
    ]

    var gif = list[Math.floor(Math.random() * list.length)]

    var chika = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setImage(gif)

    await message.inlineReply(chika).then(msg => {
        msg.react('🔄').catch(err => { return }) // 1º Embed
        msg.react('❌').catch(err => { return })
        setTimeout(function () { msg.reactions.removeAll() }, 30000)

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return;

            if (reaction.emoji.name === '🔄') { // 1º Embed - Principal
                reaction.users.remove(user)
                var chika = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setImage(list[Math.floor(Math.random() * list.length)])
                msg.edit(chika)
            }
            if (reaction.emoji.name === '❌') {
                msg.delete().catch(err => { return })
            }
        })
    })
}