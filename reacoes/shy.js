const Discord = require('discord.js')

exports.run = async (client, message, args) => {


  var list = [
    'https://imgur.com/pkQLxS0.gif',
    'https://imgur.com/w1LV6mW.gif',
    'https://imgur.com/yHpwB80.gif',
    'https://imgur.com/nqWmdmr.gif',
    'https://imgur.com/ec7IRV9.gif',
    'https://imgur.com/CGdF80m.gif',
    'https://imgur.com/BmwRbAL.gif',
    'https://imgur.com/qr73B39.gif',
    'https://imgur.com/aVCvPPs.gif',
    'https://imgur.com/1VCiYEW.gif',
    'https://imgur.com/xnlXTuU.gif',
    'https://imgur.com/ojEzYJI.gif',
    'https://imgur.com/fhFqbcR.gif'
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