const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    var list = [
        'https://imgur.com/36uEWal.gif',
        'https://imgur.com/NGOVLNg.gif',
        'https://imgur.com/EgTCBQ6.gif',
        'https://imgur.com/jVqX4FX.gif',
        'https://imgur.com/cqqv3QL.gif',
        'https://imgur.com/2mOB7US.gif',
        'https://imgur.com/IKdE71c.gif',
        'https://imgur.com/DaFv3Bg.gif',
        'https://imgur.com/vKGDshd.gif',
        'https://imgur.com/TvjiWPH.gif',
        'https://imgur.com/pEaLxhG.gif',
        'https://imgur.com/HuKLdyB.gif',
        'https://imgur.com/EiFXt5W.gif',
        'https://imgur.com/g3siMn6.gif'
    ]

    let gif = list[Math.floor(Math.random() * list.length)]

    var asuna = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setImage(gif)

    await message.inlineReply(asuna).then(msg => {
        msg.react('🔄').catch(err => { return }) // 1º Embed
        msg.react('❌').catch(err => { return })
        setTimeout(function () { msg.reactions.removeAll() }, 30000)

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return;

            if (reaction.emoji.name === '🔄') { // 1º Embed - Principal
                reaction.users.remove(user)
                var asuna = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setImage(list[Math.floor(Math.random() * list.length)])
                msg.edit(asuna)
            }
            if (reaction.emoji.name === '❌') {
                msg.delete().catch(err => { return })
            }
        })
    })
}