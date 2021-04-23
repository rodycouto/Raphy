const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    var list = [
        'https://imgur.com/LVVGS8f.gif',
        'https://imgur.com/1gfMJ0g.gif',
        'https://imgur.com/5Bd9CSP.gif',
        'https://imgur.com/5Bd9CSP.gif',
        'https://imgur.com/2W8WpVO.gif',
        'https://imgur.com/trGqji4.gif',
        'https://imgur.com/cAROAx9.gif',
        'https://imgur.com/q4HSdKN.gif',
        'https://imgur.com/75hPNpP.gif',
        'https://imgur.com/TLu9P1c.gif',
        'https://imgur.com/KYqsOsT.gif'
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