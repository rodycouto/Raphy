const Discord = require('discord.js')

exports.run = async (client, message, args) => {


  var list = [
    'https://imgur.com/Gkel36E.gif',
    'https://imgur.com/BVSgNuq.gif',
    'https://imgur.com/XohOnWv.gif',
    'https://imgur.com/d8QQgnf.gif',
    'https://imgur.com/HYpSxgw.gif',
    'https://imgur.com/k51u431.gif',
    'https://imgur.com/SHtdL4s.gif',
    'https://imgur.com/YQz7bUL.gif',
    'https://imgur.com/xjxB8bx.gif',
    'https://imgur.com/hBHsV3N.gif',
    'https://imgur.com/RhpBfgg.gif'
  ]

  var rand = list[Math.floor(Math.random() * list.length)]
  var texto = args.join(" ")
  if (!texto) texto = `${message.author}`

  const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${texto}`)
    .setImage(rand)

  await message.inlineReply(embed).then(msg => {
    msg.react('🔄').catch(err => { return }) // 1º Embed
    msg.react('❌').catch(err => { return })
    setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)

    msg.awaitReactions((reaction, user) => {
      if (message.author.id !== user.id) return;

      if (reaction.emoji.name === '🔄') { // 1º Embed - Principal
        reaction.users.remove(user)

        const embed = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setDescription(`${texto}`)
          .setImage(list[Math.floor(Math.random() * list.length)])
        msg.edit(embed)
      }
      if (reaction.emoji.name === '❌') {
        msg.delete().catch(err => { return })
      }
    })
  })
}