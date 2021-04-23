const Discord = require('discord.js')

exports.run = async (client, message, args) => {


  var list = [
    'https://imgur.com/9zEHFOj.gif',
    'https://imgur.com/Q24PF7s.gif',
    'https://imgur.com/EZgl4vG.gif',
    'https://imgur.com/RxvSNe9.gif',
    'https://imgur.com/pHfHAPd.gif',
    'https://imgur.com/VJzBq0F.gif',
    'https://imgur.com/4N1aXJO.gif',
    'https://imgur.com/GVUNzI8.gif',
    'https://imgur.com/sD5Mlya.gif',
    'https://imgur.com/rZkPeYR.gif'
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