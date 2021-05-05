const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

   let list = [
      'https://imgur.com/fm49srQ.gif',
      'https://imgur.com/4MQkDKm.gif',
      'https://imgur.com/o2SJYUS.gif',
      'https://imgur.com/oOCq3Bt.gif',
      'https://imgur.com/Agwwaj6.gif',
      'https://imgur.com/tb2uVVV.gif',
      'https://imgur.com/YA7g7h7.gif',
      'https://imgur.com/xMttEjS.gif',
      'https://imgur.com/mIg8erJ.gif',
      'https://imgur.com/oRsaSyU.gif',
      'https://imgur.com/kSLODXO.gif',
      'https://imgur.com/CwbYjBX.gif',
      'https://imgur.com/orjYBoH.gif',
      'https://imgur.com/kUNr4vk.gif',
      'https://imgur.com/T00nSoV.gif',
      'https://imgur.com/NSeL8jO.gif',
      'https://imgur.com/NaLhZ8m.gif',
      'https://imgur.com/8p95SIi.gif',
      'https://imgur.com/8af2u1Q.gif',
      'https://imgur.com/wYgsQNc.gif',
      'https://imgur.com/HT6pXv0.gif',
      'https://imgur.com/EueJXaU.gif',
      'https://imgur.com/N6ilHRG.gif',
      'https://imgur.com/N6ilHRG.gif'
   ]

   let list1 = [
      'https://imgur.com/fm49srQ.gif',
      'https://imgur.com/4MQkDKm.gif',
      'https://imgur.com/o2SJYUS.gif',
      'https://imgur.com/oOCq3Bt.gif',
      'https://imgur.com/Agwwaj6.gif',
      'https://imgur.com/tb2uVVV.gif',
      'https://imgur.com/YA7g7h7.gif',
      'https://imgur.com/xMttEjS.gif',
      'https://imgur.com/mIg8erJ.gif',
      'https://imgur.com/oRsaSyU.gif',
      'https://imgur.com/kSLODXO.gif',
      'https://imgur.com/CwbYjBX.gif',
      'https://imgur.com/orjYBoH.gif',
      'https://imgur.com/kUNr4vk.gif',
      'https://imgur.com/T00nSoV.gif',
      'https://imgur.com/NSeL8jO.gif',
      'https://imgur.com/NaLhZ8m.gif',
      'https://imgur.com/8p95SIi.gif',
      'https://imgur.com/8af2u1Q.gif',
      'https://imgur.com/wYgsQNc.gif',
      'https://imgur.com/HT6pXv0.gif',
      'https://imgur.com/EueJXaU.gif',
      'https://imgur.com/N6ilHRG.gif',
      'https://imgur.com/N6ilHRG.gif'
   ]

   let rand = list[Math.floor(Math.random() * list.length)]
   let rand1 = list1[Math.floor(Math.random() * list1.length)]
   let user = message.mentions.users.first()

   let prefix = db.get(`prefix_${message.guild.id}`)
   if (prefix === null) prefix = "-"

   if (!user) { return message.reply('`' + prefix + 'tapa @user`') }
   if (user.id === '837147659898191902') { return message.inlineReply('Saai, eu não gosto que me batam.') }
   if (user.id === message.author.id) { return message.inlineReply('Você não pode usar este comando com você mesmo.') }

   let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
   let avatar1 = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
   let embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setDescription(`${message.author} está te dando tapas ${user}`, avatar)
      .setImage(rand)
      .setFooter('Clique em 🔁 para retribuir')

   let embed2 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setDescription(`${user} te devolveu os tapas ${message.author} `, avatar1)
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