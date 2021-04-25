const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

  let timeout1 = 9140000
  let author1 = await db.fetch(`pego_${message.author.id}`)

  if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
    let time = ms(timeout1 - (Date.now() - author1))

    var presomax = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('🚨 Você está em prisão máxima!')
      .setDescription(`Liberdade em: ${time.hours}h ${time.minutes}m e ${time.seconds}s`)

    return message.inlineReply(presomax)
  } else {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    var embed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`${message.author.username} está pedindo um pouco de dinheiro`)
      .setDescription(`${prefix}doar ${message.author} Valor`)
    return message.inlineReply(embed)
  }
}