const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

  let list = [
    'https://imgur.com/m8ZtlNO.gif',
    'https://imgur.com/umCms9c.gif',
    'https://imgur.com/3uMLnPC.gif',
    'https://imgur.com/Pobe6Lo.gif',
    'https://imgur.com/q1AQ4vD.gif',
    'https://imgur.com/kVSTKPb.gif',
    'https://imgur.com/duiXoPW.gif',
    'https://imgur.com/HshuBMF.gif',
    'https://imgur.com/b7cFfKJ.gif',
    'https://imgur.com/NWEGNSx.gif',
    'https://imgur.com/V90HGXk.gif',
    'https://imgur.com/4nyxMrc.gif',
    'https://imgur.com/fFliWDG.gif',
    'https://imgur.com/CdoJ8Ac.gif',
    'https://imgur.com/8tPxaFx.gif',
    'https://imgur.com/FjtrdCW.gif',
    'https://imgur.com/kWIeWwk.gif'
  ]

  let list1 = [
    'https://imgur.com/m8ZtlNO.gif',
    'https://imgur.com/umCms9c.gif',
    'https://imgur.com/3uMLnPC.gif',
    'https://imgur.com/Pobe6Lo.gif',
    'https://imgur.com/q1AQ4vD.gif',
    'https://imgur.com/kVSTKPb.gif',
    'https://imgur.com/duiXoPW.gif',
    'https://imgur.com/HshuBMF.gif',
    'https://imgur.com/b7cFfKJ.gif',
    'https://imgur.com/NWEGNSx.gif',
    'https://imgur.com/V90HGXk.gif',
    'https://imgur.com/4nyxMrc.gif',
    'https://imgur.com/fFliWDG.gif',
    'https://imgur.com/CdoJ8Ac.gif',
    'https://imgur.com/8tPxaFx.gif',
    'https://imgur.com/FjtrdCW.gif',
    'https://imgur.com/kWIeWwk.gif'
  ]

  let rand = list[Math.floor(Math.random() * list.length)]
  let rand1 = list1[Math.floor(Math.random() * list1.length)]
  let user = message.mentions.users.first()

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  if (!user) { return message.reply('`' + prefix + 'kill @user`') }
  if (user.id === '837147659898191902') { return message.inlineReply('Paaara, não tenta me matar! :cry:') }
  if (user.id === message.author.id) { return message.inlineReply('Você não pode usar este comando com você mesmo.') }

  let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
  let avatar1 = user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
  let embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(message.author.username + ` está matando ${user.username}`, avatar)
    .setImage(rand)
    .setFooter('Clique em 🔁 para retribuir')

  let embed2 = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(user.username + ` e ${message.author.username} ESTÃO SE MATANDO!`, avatar1)
    .setImage(rand1)

  await message.inlineReply(embed).then(msg => {
    msg.react('🔁').catch(err => { return })
    setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 15000)
    
    msg.awaitReactions((reaction, user) => {
      if (message.mentions.users.first().id !== user.id) return

      if (reaction.emoji.name === '🔁') { // Retribuiu
        msg.reactions.removeAll().catch(err => { return })
        return message.inlineReply(embed2)
      }
    })
  })
}