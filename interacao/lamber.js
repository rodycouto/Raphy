const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

   let list = [
      'https://imgur.com/ixqmPUG.gif',
      'https://imgur.com/fcQKlLL.gif',
      'https://imgur.com/WtIcBUB.gif',
      'https://imgur.com/XXPT5jN.gif',
      'https://imgur.com/lBhuZIZ.gif',
      'https://imgur.com/NaD26Am.gif'
   ]

   let list1 = [
      'https://imgur.com/ixqmPUG.gif',
      'https://imgur.com/fcQKlLL.gif',
      'https://imgur.com/WtIcBUB.gif',
      'https://imgur.com/XXPT5jN.gif',
      'https://imgur.com/lBhuZIZ.gif',
      'https://imgur.com/NaD26Am.gif'
   ]


   let rand = list[Math.floor(Math.random() * list.length)]
   let rand1 = list1[Math.floor(Math.random() * list1.length)]
   let user = message.mentions.users.first()

   let prefix = db.get(`prefix_${message.guild.id}`)
   if (prefix === null) prefix = "-"

   if (!user) { return message.reply('`' + prefix + 'lamber @user`') }
   if (user.id === '837147659898191902') { return message.inlineReply('Sai pervertido!') }
   if (user.id === message.author.id) { return message.inlineReply('Você não pode usar este comando com você mesmo.') }

   let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
   let avatar1 = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
   let embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setAuthor(message.author.username + ` está lambendo ${user.username}`, avatar)
      .setImage(rand)
      .setFooter('Clique em 🔁 para retribuir')

   let embed2 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setAuthor(user.username + ` gostou e retribuiu a lambida de ${message.author.username}`, avatar1)
      .setImage(rand1)

   await message.inlineReply(embed).then(msg => {
      msg.react('🔁').catch(err => { return })
      setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 15000)

      msg.awaitReactions((reaction, user) => {
         if (message.mentions.users.first().id !== user.id) return

         if (reaction.emoji.name === '🔁') { // Retribuiu
            msg.reactions.removeAll().catch(err => { return })
            return message.inlineReply(embed2)
         }
      })
   })
}