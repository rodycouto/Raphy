const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) { prefix = "-" }

  var embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle(`${message.author.username} está pedindo um pouco de dinheiro`)
    .setDescription(`${prefix}doar ${message.author} Valor`)
  return message.inlineReply(embed)
}