const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  message.delete().catch(err => { return })

  var Random = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setImage('https://imgur.com/RcrfOc3.gif')

  return message.inlineReply(Random).then(msg => msg.delete({ timeout: 6000 })).catch(err => { return })
}