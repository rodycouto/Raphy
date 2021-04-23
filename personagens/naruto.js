const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    var list = [
        'https://imgur.com/sedJ6yn.gif',
        'https://imgur.com/jsODka2.gif',
        'https://imgur.com/lTnwOaZ.gif',
        'https://imgur.com/s9KWRGj.gif',
        'https://imgur.com/5YLolvz.gif',
        'https://imgur.com/zgnTM8U.gif',
        'https://imgur.com/4hX6zUS.gif',
        'https://imgur.com/yhsV01c.gif',
        'https://imgur.com/YVdAVa7.gif',
        'https://imgur.com/fMivb4s.gif',
        'https://imgur.com/czbbuCW.gif',
        'https://imgur.com/at3YiaM.gif',
        'https://imgur.com/eUuHIvr.gif',
        'https://imgur.com/qj15h5p.gif',
        'https://imgur.com/E9UruBw.gif',
        'https://imgur.com/GAR8YlZ.gif',
        'https://imgur.com/P0yIRRd.gif'
    ]

    var gif = list[Math.floor(Math.random() * list.length)]

    var naruto = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setImage(gif)

    await message.inlineReply(naruto).then(msg => {
        msg.react('🔄').catch(err => { return }) // 1º Embed
        msg.react('❌').catch(err => { return })
        setTimeout(function () { msg.reactions.removeAll() }, 30000)

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return;

            if (reaction.emoji.name === '🔄') { // 1º Embed - Principal
                reaction.users.remove(user)
                var naruto = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setImage(list[Math.floor(Math.random() * list.length)])
                msg.edit(naruto)
            }
            if (reaction.emoji.name === '❌') {
                msg.delete().catch(err => { return })
            }
        })
    })
}