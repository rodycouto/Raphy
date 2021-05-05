const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

  let list = [
    'https://imgur.com/0sQbStr.gif',
    'https://imgur.com/6Y5OnND.gif',
    'https://imgur.com/yjZCLpx.gif',
    'https://imgur.com/ymAPVpI.gif',
    'https://imgur.com/WqxrEhg.gif',
    'https://imgur.com/r04g2cj.gif',
    'https://imgur.com/bz1zkXQ.gif',
    'https://imgur.com/h9xSaJn.gif',
    'https://imgur.com/vJ6iLlH.gif',
    'https://imgur.com/lprVmaI.gif',
    'https://imgur.com/LAVnPlM.gif',
    'https://imgur.com/ntOXxqx.gif'
  ]

  let list1 = [
    'https://imgur.com/0sQbStr.gif',
    'https://imgur.com/6Y5OnND.gif',
    'https://imgur.com/yjZCLpx.gif',
    'https://imgur.com/ymAPVpI.gif',
    'https://imgur.com/WqxrEhg.gif',
    'https://imgur.com/r04g2cj.gif',
    'https://imgur.com/bz1zkXQ.gif',
    'https://imgur.com/h9xSaJn.gif',
    'https://imgur.com/vJ6iLlH.gif',
    'https://imgur.com/lprVmaI.gif',
    'https://imgur.com/LAVnPlM.gif',
    'https://imgur.com/ntOXxqx.gif'
  ]

  let rand = list[Math.floor(Math.random() * list.length)]
  let rand1 = list1[Math.floor(Math.random() * list1.length)]
  let user = message.mentions.users.first()

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  if (!user) { return message.reply('`' + prefix + 'bite @user`') }
  if (user.id === '837147659898191902') { return message.inlineReply('Paaara, não me morde não :cry:') }
  if (user.id === message.author.id) { return message.inlineReply('Você não pode usar este comando com você mesmo.') }

  let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
  let avatar1 = user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
  
  let embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(message.author.username + ` está mordendo ${user.username}`, avatar)
    .setImage(rand)
    .setFooter('Clique em 🔁 para retribuir')

  let embed2 = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(user.username + ` retribuiu a mordida de ${message.author.username}`, avatar1)
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