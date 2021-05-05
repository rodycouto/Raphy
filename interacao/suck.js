const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

   let list = [
      'https://imgur.com/ghtNfE9.gif',
      'https://imgur.com/xyCAFWc.gif',
      'https://imgur.com/6gAisvv.gif',
      'https://imgur.com/4HIukDs.gif',
      'https://imgur.com/867BE2L.gif',
      'https://imgur.com/QZgruaz.gif'
   ]

   let list1 = [
      'https://imgur.com/ghtNfE9.gif',
      'https://imgur.com/xyCAFWc.gif',
      'https://imgur.com/6gAisvv.gif',
      'https://imgur.com/4HIukDs.gif',
      'https://imgur.com/867BE2L.gif',
      'https://imgur.com/QZgruaz.gif'
   ]

   let rand = list[Math.floor(Math.random() * list.length)]
   let rand1 = list1[Math.floor(Math.random() * list1.length)]
   let user = message.mentions.users.first()

   let prefix = db.get(`prefix_${message.guild.id}`)
   if (prefix === null) prefix = "-"

   if (!user) { return message.reply('`' + prefix + 'suck @user`') }
   if (user.id === '837147659898191902') { return message.inlineReply('Sai daqui pervertido') }
   if (user.id === message.author.id) { return message.inlineReply('Você não pode usar este comando com você mesmo.') }

   let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
   let avatar1 = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
   let embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setDescription(`${message.author} está chupando ${user}`, avatar)
      .setImage(rand)
      .setFooter('Clique em 🔁 para retribuir')

   let embed2 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setDescription(`${user} devolveu a chupada ${message.author}, que safadeza.`, avatar1)
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