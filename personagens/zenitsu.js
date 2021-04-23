const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    var list = [
        'https://imgur.com/RJyI598.gif',
        'https://imgur.com/arkqlmx.gif',
        'https://imgur.com/1Hhsqfu.gif',
        'https://imgur.com/lz8sDpa.gif',
        'https://imgur.com/YunLbJH.gif',
        'https://imgur.com/ZtXf8kn.gif',
        'https://imgur.com/sFA0dBn.gif',
        'https://imgur.com/mDq46Pc.gif',
        'https://imgur.com/Xa7OnQ4.gif',
        'https://imgur.com/TkKuLOq.gif',
        'https://imgur.com/2MtziTG.gif',
        'https://imgur.com/akmnXUc.gif'
    ]

    var gif = list[Math.floor(Math.random() * list.length)]

    var Zenii = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setImage(gif)

    await message.inlineReply(Zenii).then(msg => {
        msg.react('🔄').catch(err => { return }) // 1º Embed
        msg.react('❌').catch(err => { return })
        setTimeout(function () { msg.reactions.removeAll() }, 30000)

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return;

            if (reaction.emoji.name === '🔄') { // 1º Embed - Principal
                reaction.users.remove(user)
                var Zenii = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setImage(list[Math.floor(Math.random() * list.length)])
                msg.edit(Zenii)
            }
            if (reaction.emoji.name === '❌') {
                msg.delete().catch(err => { return })
            }
        })
    })
}