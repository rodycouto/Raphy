const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  message.delete().catch(err => { return })

  let rody = message.author.id === ("451619591320371213")
  if (rody) {
    if (!args[0]) {return message.channel.send('Diga algo.')}
    let sayMessage = args.join(' ')
    return message.channel.send(sayMessage)
  }

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    let noperms = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('Permissão Necessária: Gerenciar Mensagens')
    return message.inlineReply(noperms)
  }

  if (!args[0]) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let format = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('Siga o formato correto')
      .setDescription('`' + prefix + 'say Alguma coisa`')
    return message.inlineReply(format)
  }

  let sayMessage = args.join(' ')
  message.inlineReply(sayMessage + `\n \n- *Mensagem por: ${message.author}*`)
}