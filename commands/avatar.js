const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async (client, message, args) => {

  let user = message.mentions.users.first() || message.author || message.member
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 })
  let linkavatar = user.displayAvatarURL()

  const embed = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setDescription(`[Baixar](${linkavatar}) avatar de ${user}`)
    .setImage(avatar)

  await message.inlineReply(embed).then(msg => {
    msg.react('❌').catch(err => { return }) // X
    msg.react('📨').catch(err => { return }) // Carta
    setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)

    msg.awaitReactions((reaction, member) => {

      if (reaction.emoji.name === '📨') {
        let PrivadoDesativado = db.get(`privadooff_${member.id}`)
        if (PrivadoDesativado) {
           return message.channel.send(`<:xis:835943511932665926> ${member}, você desativou minhas mensagens no seu privado. Este recurso está bloqueado para você.`) 
          } else { 
            member.send(embed).catch(err => { return }) }
      }
      if (message.author.id !== member.id) return
      if (reaction.emoji.name === '❌') {
        message.delete().catch(err => { return })
        msg.delete().catch(err => { return })
      }
    })
  })
}