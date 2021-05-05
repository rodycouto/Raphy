const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

  let list = [
    'https://imgur.com/uXL0iTg.gif',
    'https://imgur.com/U8W2LSy.gif',
    'https://imgur.com/Y0rsWyI.gif',
    'https://imgur.com/QTTHhp1.gif',
    'https://imgur.com/hI6bUlY.gif',
    'https://imgur.com/e1ofXDH.gif',
    'https://imgur.com/Zhw4mwC.gif',
    'https://imgur.com/mJousjU.gif',
    'https://imgur.com/cZWWATV.gif',
    'https://imgur.com/LPftvE0.gif',
    'https://imgur.com/dwxp3zn.gif',
    'https://imgur.com/hpddahS.gif',
    'https://imgur.com/LHBOVKM.gif',
    'https://imgur.com/Fkchj2G.gif',
    'https://imgur.com/ao4wesH.gif',
    'https://imgur.com/Np86qdf.gif',
    'https://imgur.com/0N1XzB1.gif',
    'https://imgur.com/DrUzqCx.gif',
    'https://imgur.com/wVKnj9O.gif',
    'https://imgur.com/LDFs9nu.gif',
    'https://imgur.com/4yKZQ8B.gif',
    'https://imgur.com/koFG06W.gif'
  ]

  let list1 = [
    'https://imgur.com/uXL0iTg.gif',
    'https://imgur.com/U8W2LSy.gif',
    'https://imgur.com/Y0rsWyI.gif',
    'https://imgur.com/QTTHhp1.gif',
    'https://imgur.com/hI6bUlY.gif',
    'https://imgur.com/e1ofXDH.gif',
    'https://imgur.com/Zhw4mwC.gif',
    'https://imgur.com/mJousjU.gif',
    'https://imgur.com/cZWWATV.gif',
    'https://imgur.com/LPftvE0.gif',
    'https://imgur.com/dwxp3zn.gif',
    'https://imgur.com/hpddahS.gif',
    'https://imgur.com/LHBOVKM.gif',
    'https://imgur.com/Fkchj2G.gif',
    'https://imgur.com/ao4wesH.gif',
    'https://imgur.com/Np86qdf.gif',
    'https://imgur.com/0N1XzB1.gif',
    'https://imgur.com/DrUzqCx.gif',
    'https://imgur.com/wVKnj9O.gif',
    'https://imgur.com/LDFs9nu.gif',
    'https://imgur.com/4yKZQ8B.gif',
    'https://imgur.com/koFG06W.gif'
  ]

  let rand = list[Math.floor(Math.random() * list.length)]
  let rand1 = list1[Math.floor(Math.random() * list1.length)]
  let user = message.mentions.users.first()

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  if (!user) { return message.inlineReply('`' + prefix + 'hug @user`') }

  if (user.id === '837147659898191902') {
    let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
    let embed1 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setAuthor(message.author.username + ` está abraçando ${user.username}`, avatar)
      .setImage(rand)
    message.inlineReply(embed1)
    return message.inlineReply('Que abraço fofinho')
  }

  if (user.id === message.author.id) { return message.inlineReply('Você não pode usar este comando com você mesmo.') }

  let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
  let avatar1 = user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })

  let embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(message.author.username + ` está abraçando `, avatar)
    .setImage(rand)
    .setFooter('Clique em 🔁 para retribuir')

  let embed2 = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(user.username + ` retribuiu o abraço de ${message.author.username}`, avatar1)
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