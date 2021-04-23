const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    var NezukoList = [
        'https://imgur.com/aXAIvkS.gif',
        'https://imgur.com/MZjgryh.gif',
        'https://imgur.com/7KtfCMh.gif',
        'https://imgur.com/0kQwpIV.gif',
        'https://imgur.com/6hAIcLU.gif',
        'https://imgur.com/lagU5oh.gif',
    ]

    var gif = NezukoList[Math.floor(Math.random() * NezukoList.length)]

    var nezukoo = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setImage(gif)

    await message.inlineReply(nezukoo).then(msg => {
        msg.react('🔄').catch(err => { return }) // 1º Embed
        msg.react('❌').catch(err => { return })
        setTimeout(function () { msg.reactions.removeAll() }, 30000)

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return;

            if (reaction.emoji.name === '🔄') { // 1º Embed - Principal
                reaction.users.remove(user)
                var nezukoo = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setImage(NezukoList[Math.floor(Math.random() * NezukoList.length)])
                msg.edit(nezukoo)
            }
            if (reaction.emoji.name === '❌') {
                msg.delete().catch(err => { return })
            }
        })
    })
}