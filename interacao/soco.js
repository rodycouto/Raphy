const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

    let list = [
        'https://imgur.com/kcDfBMj.gif',
        'https://imgur.com/Sk9BJWZ.gif',
        'https://imgur.com/YRqxOO2.gif',
        'https://imgur.com/LU2k2jC.gif',
        'https://imgur.com/Um5vE45.gif',
        'https://imgur.com/s5ZAbLi.gif',
        'https://imgur.com/t82sPko.gif',
        'https://imgur.com/9jCQNRf.gif',
        'https://imgur.com/jkUZ2kW.gif',
    ]

    let list1 = [
        'https://imgur.com/kcDfBMj.gif',
        'https://imgur.com/Sk9BJWZ.gif',
        'https://imgur.com/YRqxOO2.gif',
        'https://imgur.com/LU2k2jC.gif',
        'https://imgur.com/Um5vE45.gif',
        'https://imgur.com/s5ZAbLi.gif',
        'https://imgur.com/t82sPko.gif',
        'https://imgur.com/9jCQNRf.gif',
        'https://imgur.com/jkUZ2kW.gif',
    ]

    let rand = list[Math.floor(Math.random() * list.length)]
    let rand1 = list1[Math.floor(Math.random() * list1.length)]
    let user = message.mentions.users.first()

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    if (!user) { return message.reply('`' + prefix + 'soco @user`') }
    if (user.id === '837147659898191902') { return message.inlineReply('Se você me der um soco... NEM OUSE!') }
    if (user.id === message.author.id) { return message.inlineReply('Você não pode socar você mesmo.') }

    let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
    let avatar1 = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })

    let embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setAuthor(message.author.username + ` deu um soco ${user.username}`, avatar)
        .setImage(rand)
        .setFooter('Clique em 🔁 para retribuir')

    let embed2 = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setAuthor(user.username + ` retribuiu o soco de ${message.author.username} com força`, avatar1)
        .setImage(rand1)

    await message.inlineReply(embed).then(msg => {
        msg.react('🔁').catch(err => { return })
        setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 15000)

        msg.awaitReactions((reaction, user) => {
            if (message.mentions.users.first().id !== user.id) return

            if (reaction.emoji.name === '🔁') {
                msg.reactions.removeAll().catch(err => { return })
                return message.inlineReply(embed2)
            }
        })
    })
}