const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  message.delete().catch(err => { return })

  var rody = message.author.id === ("451619591320371213")
  if (rody) {
    var sayMessage = args.join(' ')
    return message.channel.send(sayMessage)
  }

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    var noperms = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Permissão Necessária: Manusear Mensagens')
    return message.inlineReply(noperms)
  }

  if (!args[0]) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    var format = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Siga o formato correto')
      .setDescription('`' + prefix + 'say Alguma coisa`')
    return message.inlineReply(format)
  }

  var sayMessage = args.join(' ')
  message.inlineReply(sayMessage + `\n \n- *Mensagem por: ${message.author}*`)
}