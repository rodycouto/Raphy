const Discord = require('discord.js')

exports.run = async (client, message, args) => {


  var list = [
    'https://imgur.com/CWhbgUi.gif',
    'https://imgur.com/NcPs1vb.gif',
    'https://imgur.com/4PdAqQb.gif',
    'https://imgur.com/a0m7XtQ.gif',
    'https://imgur.com/txn2gYq.gif',
    'https://imgur.com/b1QJPMT.gif',
    'https://imgur.com/AYTiN3X.gif',
    'https://imgur.com/lj2yGDC.gif',
    'https://imgur.com/GEMICFG.gif',
    'https://imgur.com/h42MSIR.gif',
    'https://imgur.com/191ip4V.gif',
    'https://imgur.com/t4oqtRB.gif'
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