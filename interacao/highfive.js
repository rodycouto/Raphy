const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

  var list = [
    'https://imgur.com/ox15B5R.gif',
    'https://imgur.com/vpv5tE0.gif',
    'https://imgur.com/JpMuTSR.gif',
    'https://imgur.com/95fpU14.gif',
    'https://imgur.com/bldOqvZ.gif',
    'https://imgur.com/KMkPmla.gif',
    'https://imgur.com/lq36NgR.gif',
    'https://imgur.com/arQzBcL.gif',
    'https://imgur.com/JoLapZ3.gif',
    'https://imgur.com/Jz4722z.gif'
  ]

  var list1 = [
    'https://imgur.com/ox15B5R.gif',
    'https://imgur.com/vpv5tE0.gif',
    'https://imgur.com/JpMuTSR.gif',
    'https://imgur.com/95fpU14.gif',
    'https://imgur.com/bldOqvZ.gif',
    'https://imgur.com/KMkPmla.gif',
    'https://imgur.com/lq36NgR.gif',
    'https://imgur.com/arQzBcL.gif',
    'https://imgur.com/JoLapZ3.gif',
    'https://imgur.com/Jz4722z.gif'
  ]

  var rand = list[Math.floor(Math.random() * list.length)]
  var rand1 = list1[Math.floor(Math.random() * list1.length)]
  let user = message.mentions.users.first()

  if (!user) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    var nouser = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Erroooou')
      .setDescription('`' + prefix + 'highfive @user`')
    return message.inlineReply(nouser)
  }

  if (user.id === '821471191578574888') {

    var embed1 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setDescription(`${message.author.username} & ${user.username} mandaram um HIGHFIVE!`)
      .setImage(rand)
    return message.inlineReply(embed1)
  }

  if (user.id === message.author.id) {
    return message.inlineReply('Você não pode usar este comando com você mesmo.')
  }

  var embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`Highfive ${user}?`)
    .setFooter('Clique em 🔁 para aceitar o highfive')

  var embed2 = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${message.author.username} & ${user.username} mandaram um HIGHFIVE!`)
    .setImage(rand1)

  await message.inlineReply(embed).then(msg => {
    msg.react('🔁').catch(err => { return })
    msg.delete({ timeout: 20000 }).catch(err => { return })

    msg.awaitReactions((reaction, user) => {
      if (message.mentions.users.first().id !== user.id) return

      if (reaction.emoji.name === '🔁') {
        msg.delete().catch(err => { return })
        return message.inlineReply(embed2)
      }
    })
  })
}