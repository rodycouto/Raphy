const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    var list = [
        'https://imgur.com/vV4hpLj.gif',
        'https://imgur.com/WzIRoEy.gif',
        'https://imgur.com/kOrLZ2t.gif',
        'https://imgur.com/hrEeTmx.gif',
        'https://imgur.com/LpoqoCG.png',
        'https://imgur.com/ey25jic.gif',
        'https://imgur.com/BlRkTju.gif',
        'https://imgur.com/vyrP2Q2.gif',
        'https://imgur.com/M26RtNG.gif',
        'https://imgur.com/acSah5H.gif'
    ]

    var gif = list[Math.floor(Math.random() * list.length)]

    var gojo = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setImage(gif)

    await message.inlineReply(gojo).then(msg => {
        msg.react('🔄').catch(err => { return }) // 1º Embed
        msg.react('❌').catch(err => { return })
        setTimeout(function () { msg.reactions.removeAll() }, 30000)

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return;

            if (reaction.emoji.name === '🔄') { // 1º Embed - Principal
                reaction.users.remove(user)
                var gojo = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setImage(list[Math.floor(Math.random() * list.length)])
                msg.edit(gojo)
            }
            if (reaction.emoji.name === '❌') {
                msg.delete().catch(err => { return })
            }
        })
    })
}