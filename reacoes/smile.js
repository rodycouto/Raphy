const Discord = require('discord.js')

exports.run = async (client, message, args) => {


  var list = [
    'https://imgur.com/QK8cwtR.gif',
    'https://imgur.com/oJkRMdJ.gif',
    'https://imgur.com/29dAyoP.gif',
    'https://imgur.com/WynaI9R.gif',
    'https://imgur.com/0pPidWf.gif',
    'https://imgur.com/jWfVX9M.gif',
    'https://imgur.com/3fbA1AK.gif',
    'https://imgur.com/LwlQ4TQ.gif',
    'https://imgur.com/FO56cRi.gif',
    'https://imgur.com/oeDg5RU.gif',
    'https://imgur.com/dHSDVHL.gif',
    'https://imgur.com/cx30ip7.gif',
    'https://imgur.com/IatiaHU.gif',
    'https://imgur.com/UMhVcKN.gif',
    'https://imgur.com/Q7UWMMr.gif',
    'https://imgur.com/zC5hHs1.gif',
    'https://imgur.com/dNrvVjS.gif',
    'https://imgur.com/rEceQOt.gif'
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