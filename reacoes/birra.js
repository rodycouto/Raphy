const Discord = require('discord.js')

exports.run = async (client, message, args) => {



  var list = [
    'https://imgur.com/IWcnsVz.gif',
    'https://imgur.com/ykbbyeG.gif',
    'https://imgur.com/DvXtkrp.gif',
    'https://imgur.com/kZMw9e4.gif',
    'https://imgur.com/i7EekNZ.gif',
    'https://imgur.com/WSnxFkU.gif',
    'https://imgur.com/s2DQLD8.gif',
    'https://imgur.com/vTkab7F.gif',
    'https://imgur.com/C4qS1qo.gif',
    'https://imgur.com/gI9MghR.gif',
    'https://imgur.com/paJ4r0p.gif',
    'https://imgur.com/573Tfb5.gif',
    'https://imgur.com/WzrDVfM.gif',
    'https://imgur.com/Y64wzy2.gif',
    'https://imgur.com/GRiBslM.gif',
    'https://imgur.com/F0SU5zn.gif',
    'https://imgur.com/ohWzmna.gif',
    'https://imgur.com/rVtUmUB.gif',
    'https://imgur.com/LLeYBYJ.gif',
    'https://imgur.com/LolnknH.gif',
    'https://imgur.com/YFf97jp.gif',
    'https://imgur.com/UQzU1kl.gif'
  ]

  var rand = list[Math.floor(Math.random() * list.length)]
  var texto = args.join(" ")
  if (!texto) texto = `${message.author}`

  var embed = new Discord.MessageEmbed()
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

        var embed = new Discord.MessageEmbed()
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