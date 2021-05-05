const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

  let list = [
    'https://imgur.com/CPTozLv.gif',
    'https://imgur.com/5aq8D6c.gif',
    'https://imgur.com/XP3GFfT.gif',
    'https://imgur.com/79xL32Q.gif',
    'https://imgur.com/KFs6dKC.gif',
    'https://imgur.com/5U8gQ4n.gif',
    'https://imgur.com/EpBlqOx.gif',
    'https://imgur.com/HUC8k8C.gif',
    'https://imgur.com/vS1plk0.gif',
    'https://imgur.com/FqOuFTy.gif',
    'https://imgur.com/g8BxzSC.gif',
    'https://imgur.com/c51iZqH.gif',
    'https://imgur.com/8R75YyG.gif',
    'https://imgur.com/CqSNKyj.gif'
  ]

  let list1 = [
    'https://imgur.com/CPTozLv.gif',
    'https://imgur.com/5aq8D6c.gif',
    'https://imgur.com/XP3GFfT.gif',
    'https://imgur.com/79xL32Q.gif',
    'https://imgur.com/KFs6dKC.gif',
    'https://imgur.com/5U8gQ4n.gif',
    'https://imgur.com/EpBlqOx.gif',
    'https://imgur.com/HUC8k8C.gif',
    'https://imgur.com/vS1plk0.gif',
    'https://imgur.com/FqOuFTy.gif',
    'https://imgur.com/g8BxzSC.gif',
    'https://imgur.com/c51iZqH.gif',
    'https://imgur.com/8R75YyG.gif',
    'https://imgur.com/CqSNKyj.gif'
  ]

  let rand = list[Math.floor(Math.random() * list.length)]
  let rand1 = list1[Math.floor(Math.random() * list1.length)]
  let user = message.mentions.users.first()

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  if (!user) {return message.reply('`' + prefix + 'comprimentar @user`')  }

  if (user.id === '837147659898191902') { // Naya
    let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
    let embed1 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setAuthor(message.author.username + ` está comprimentando ${user.username}`, avatar)
      .setImage(rand)

    let embed3 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setDescription(`Olá ${message.author.username}`)
      .setImage(rand1)
    message.inlineReply(embed1)
    return message.inlineReply(embed3)
  }

  if (user.id === message.author.id) { return message.inlineReply('Você não pode usar este comando com você mesmo.') }

  let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
  let avatar1 = user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
  let embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(message.author.username + ` está comprimentando ${user.username}`, avatar)
    .setImage(rand)
    .setFooter('Clique em 🔁 para retribuir')

  let embed2 = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(user.username + ` comprimentou ${message.author.username} de volta`, avatar1)
    .setImage(rand1)

  await message.inlineReply(embed).then(msg => {
    msg.react('🔁').catch(err => { return })
    setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 15000)
    
    msg.awaitReactions((reaction, user) => {
      if (message.mentions.users.first().id !== user.id) return

      if (reaction.emoji.name === '🔁') {
        msg.reactions.removeAll().catch(err => { return })
        return message.inlineReply(embed2)
      }
    })
  })
}