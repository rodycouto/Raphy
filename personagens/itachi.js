const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    var list = [
        'https://i.pinimg.com/originals/78/72/6a/78726a6ec74ba506137966e9f9250bd1.gif',
        'https://i.pinimg.com/originals/b1/b8/94/b1b8947fbb9e61d279125f678ff263ab.gif',
        'https://imgur.com/OT0UPBi.gif',
        'https://imgur.com/GU8ibL7.gif',
        'https://imgur.com/I6sD8Lx.gif',
        'https://imgur.com/enjWiGi.gif',
        'https://imgur.com/IJjLeQD.gif',
        'https://imgur.com/BxYPajz.gif',
        'https://imgur.com/hwNQ58W.jpeg',
        'https://imgur.com/rV6PdG9.jpeg',
        'https://imgur.com/oUzads1.gif',
        'https://imgur.com/NGIzV5A.gif',
        'https://imgur.com/zNQTktf.jpeg',
        'https://imgur.com/TT4Cc3S.gif',
        'https://imgur.com/SKUribQ.gif',
        'https://imgur.com/jv3LyDG.gif'
    ]

    var gif = list[Math.floor(Math.random() * list.length)]

    var Itachi = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setImage(gif)

    await message.inlineReply(Itachi).then(msg => {
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