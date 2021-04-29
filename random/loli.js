const Discord = require('discord.js')

exports.run = async (client, message, args) => {

  let Random = new Discord.MessageEmbed()
    .setColor('#8B0000')
    .setImage('https://imgur.com/RcrfOc3.gif')

  setTimeout(function () { message.delete() }, 5000)
  return message.inlineReply(Random).then(msg => msg.delete({ timeout: 5000 }).catch(err => { return }))
}