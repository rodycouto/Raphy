const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    var list = [
        'https://imgur.com/B8gX2UL.gif',
        'https://imgur.com/2etwv4a.gif',
        'https://imgur.com/NcHlgkV.gif',
        'https://imgur.com/xfvwpMk.gif',
        'https://imgur.com/CIa9Gru.gif',
        'https://imgur.com/iDzsPm8.gif',
        'https://imgur.com/zfvczuE.gif',
        'https://imgur.com/xDeE5fc.gif'
    ]

    var gif = list[Math.floor(Math.random() * list.length)]

    var Gifs = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setImage(gif)

    await message.inlineReply(Gifs).then(msg => {
        msg.react('🔄').catch(err => { return }) // 1º Embed
        msg.react('❌').catch(err => { return })
        setTimeout(function () { msg.reactions.removeAll() }, 30000)

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return;

            if (reaction.emoji.name === '🔄') { // 1º Embed - Principal
                reaction.users.remove(user)
                var Itachi = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setImage(list[Math.floor(Math.random() * list.length)])
                msg.edit(Itachi)
            }
            if (reaction.emoji.name === '❌') {
                msg.delete().catch(err => { return })
            }
        })
    })
}