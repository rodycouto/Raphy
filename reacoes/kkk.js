const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    var list = [
        'https://imgur.com/vWefPeq.gif',
        'https://imgur.com/eyP7fdy.gif',
        'https://imgur.com/QwkU36H.gif',
        'https://imgur.com/1OGayCA.gif',
        'https://imgur.com/M1bhUTr.gif',
        'https://imgur.com/wkG8DQP.gif',
        'https://imgur.com/YsPeGCr.gif',
        'https://imgur.com/aoDtLiN.gif'
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