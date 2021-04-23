const Discord = require('discord.js')

exports.run = async (client, message, args) => {


  var list = [
    'https://imgur.com/SoJBcCw.gif',
    'https://imgur.com/DauWpF7.gif',
    'https://imgur.com/9crVq2u.gif',
    'https://imgur.com/9crVq2u.gif',
    'https://imgur.com/RC6pnby.gif',
    'https://imgur.com/DmTrFZ7.gif',
    'https://imgur.com/wrSx1MX.gif',
    'https://imgur.com/HlsCuYa.gif',
    'https://imgur.com/F5m5j3q.gif',
    'https://imgur.com/iaCxziw.gif',
    'https://imgur.com/FNHo9Ar.gif'
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