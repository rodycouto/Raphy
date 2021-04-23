const Discord = require('discord.js')

exports.run = async (client, message, args) => {

   
  var list = [
    'https://imgur.com/3QM8YxZ.gif',
    'https://imgur.com/qNyHmLB.gif',
    'https://imgur.com/FFrPSGw.gif',
    'https://imgur.com/RG0Pt1t.gif',
    'https://imgur.com/f5qMc9B.gif',
    'https://imgur.com/kQJKYVC.gif',
    'https://imgur.com/AjzQFgA.gif',
    'https://imgur.com/dbMwiBU.gif',
    'https://imgur.com/QlmZnsu.gif',
    'https://imgur.com/5AKQMbC.gif',
    'https://imgur.com/QuLO5oW.gif'
  ]

  var rand = list[Math.floor(Math.random() * list.length)]
  var texto = args.join(" ")
  if (!texto) texto = `${message.author}`

  const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${texto}`)
    .setImage(rand)
    .setFooter('Auto delete em 1 minuto.')

  await message.inlineReply(embed).then(msg => {
    msg.react('🔄').catch(err => { return }) // 1º Embed
    msg.react('❌').catch(err => { return })
    msg.delete({ timeout: 60000 }).catch(err => { return })

    msg.awaitReactions((reaction, user) => {
      if (message.author.id !== user.id) return;

      if (reaction.emoji.name === '🔄') { // 1º Embed - Principal
        reaction.users.remove(user)

        const embed = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setDescription(`${texto}`)
          .setImage(list[Math.floor(Math.random() * list.length)])
          .setFooter('Auto delete em 1 minuto.')
        msg.edit(embed)
      }
      if (reaction.emoji.name === '❌') {
        msg.delete().catch(err => { return })
      }
    })
  })
}