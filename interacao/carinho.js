const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

  let list = [
    'https://imgur.com/2lacG7l.gif',
    'https://imgur.com/UWbKpx8.gif',
    'https://imgur.com/4ssddEQ.gif',
    'https://imgur.com/2k0MFIr.gif',
    'https://imgur.com/nPr3s5D.gif',
    'https://imgur.com/LUypjw3.gif',
    'https://imgur.com/F3cjr3n.gif',
    'https://imgur.com/NNOz81F.gif',
    'https://imgur.com/cqIJIh4.gif',
    'https://imgur.com/5OQMI1m.gif',
    'https://imgur.com/48c0jVX.gif',
    'https://imgur.com/Iq9eZ5o.gif'
  ]

  let list1 = [
    'https://imgur.com/2lacG7l.gif',
    'https://imgur.com/UWbKpx8.gif',
    'https://imgur.com/4ssddEQ.gif',
    'https://imgur.com/2k0MFIr.gif',
    'https://imgur.com/nPr3s5D.gif',
    'https://imgur.com/LUypjw3.gif',
    'https://imgur.com/F3cjr3n.gif',
    'https://imgur.com/NNOz81F.gif',
    'https://imgur.com/cqIJIh4.gif',
    'https://imgur.com/5OQMI1m.gif',
    'https://imgur.com/48c0jVX.gif',
    'https://imgur.com/Iq9eZ5o.gif'
  ]

  let rand = list[Math.floor(Math.random() * list.length)]
  let rand1 = list1[Math.floor(Math.random() * list1.length)]
  let user = message.mentions.users.first()

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  if (!user) { return message.reply('`' + prefix + 'carinho @user`') }
  if (user.id === '837147659898191902') { return message.inlineReply('Agradeço o carinho, mas não vou retribuir desta vez, estou com sono') }
  if (user.id === message.author.id) { return message.inlineReply('Você não pode usar este comando com você mesmo.') }

  let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
  let avatar1 = user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
  let embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${message.author} está te dando carinho ${user}`, avatar)
    .setImage(rand)
    .setFooter('Clique em 🔁 para retribuir')

  let embed2 = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${user} também acariciou você ${message.author} `, avatar1)
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