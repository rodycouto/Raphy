const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

  let list1 = [
    'https://imgur.com/iclUiUN.gif',
    'https://imgur.com/II1bakc.gif',
    'https://imgur.com/MzAjNdv.gif',
    'https://imgur.com/eKcWCgS.gif',
    'https://imgur.com/uobBW9K.gif',
    'https://imgur.com/VrETTlv.gif',
    'https://imgur.com/FozOXkB.gif',
    'https://imgur.com/7GhTplD.gif',
    'https://imgur.com/B6UKulT.gif',
    'https://imgur.com/6i5zWCx.gif',
    'https://imgur.com/Uow8no2.gif',
    'https://imgur.com/uuabzNk.gif',
    'https://imgur.com/EwQPLZI.gif',
    'https://imgur.com/I159BUo.gif',
    'https://imgur.com/8YZFU1Z.gif',
    'https://imgur.com/agdhkfE.gif',
    'https://imgur.com/hJGrpyU.gif',
    'https://imgur.com/uPtDEh6.gif',
    'https://imgur.com/pDScNqs.gif',
    'https://imgur.com/gWIm5bK.gif',
    'https://imgur.com/1IuyOxK.gif',
    'https://imgur.com/gsong8x.gif',
    'https://imgur.com/4Pw0uxb.gif'
  ]

  let rand1 = list1[Math.floor(Math.random() * list1.length)]
  let user = message.mentions.users.first()

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  if (!user) { return message.reply('`' + prefix + 'beijar @user`') }

  if (user.id === '837147659898191902') {    return message.inlineReply('Aiin, eu sou timida')  }
  if (user.id === message.author.id) {    return message.inlineReply('Você não pode usar este comando com você mesmo.')  }
  if (message.mentions.bot) {    return message.inlineReply('Você não pode beijar bots.')  }

  let avatar1 = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })

  let embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(user.username + ` aceitou o beijo de ${message.author.username}`, avatar1)
    .setImage(rand1)

  await message.inlineReply(`${user}, aceita beijar ${message.author.username}?`,).then(msg => {
    msg.react('✅').catch(err => { return })
    setTimeout(function () {
      msg.reactions.removeAll().catch(err => { return })
      msg.edit(`${user} não respondeu ao pedido do beijo. #Força`).catch(err => { return })
    }, 20000)

    msg.awaitReactions((reaction, user) => {
      if (message.mentions.users.first().id !== user.id) return

      if (reaction.emoji.name === '✅') { // Retribuiu
        msg.delete().catch(err => { return })
        return message.inlineReply(embed)
      }
    })
  })
}