const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

  let list = [
    'https://imgur.com/T1sDMLA.gif',
    'https://imgur.com/5niochn.gif',
    'https://imgur.com/GGfSu9s.gif',
    'https://imgur.com/LygOJ5M.gif',
    'https://imgur.com/HTlpSAQ.gif',
    'https://imgur.com/fS4E13N.gif',
    'https://imgur.com/8vPPdZr.gif',
    'https://imgur.com/lIZEcOn.gif',
  ]

  let list1 = [
    'https://imgur.com/T1sDMLA.gif',
    'https://imgur.com/5niochn.gif',
    'https://imgur.com/GGfSu9s.gif',
    'https://imgur.com/LygOJ5M.gif',
    'https://imgur.com/HTlpSAQ.gif',
    'https://imgur.com/fS4E13N.gif',
    'https://imgur.com/8vPPdZr.gif',
    'https://imgur.com/lIZEcOn.gif',
  ]

  let rand = list[Math.floor(Math.random() * list.length)]
  let rand1 = list1[Math.floor(Math.random() * list1.length)]
  let user = message.mentions.users.first()

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  if (!user) { return message.reply('`' + prefix + 'fight @user`') }
  if (user.id === '837147659898191902') { return message.inlineReply('Paaaaara! Não é pra me bater!!!! :cry:') }
  if (user.id === message.author.id) { return message.inlineReply('Você não pode usar este comando com você mesmo.') }

  let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
  let avatar1 = user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
  let embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(message.author.username + ` está brigando com ${user.username}`, avatar)
    .setImage(rand)
    .setFooter('Clique em 🔁 para retribuir')

  let embed2 = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(user.username + ` levou a sério a luta com ${message.author.username} `, avatar1)
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