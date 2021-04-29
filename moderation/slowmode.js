const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

  if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) { return message.inlineReply('Eu preciso da permissão "Gerenciar Canais" para utilizar esta função.') }
  if (!message.member.hasPermission('MANAGE_CHANNELS')) { return message.inlineReply('Permissão Necessária: Gerenciar Canais') }

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  let noargs = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Slowmode Informações')
    .setDescription('Com o slowmode, você dita um intervalo que os membros podem mandar mensagens.')
    .addFields(
      {
        name: 'Ative o Slowmode',
        value: '`' + prefix + 'slowmode 10` *(segundos)*',
        inline: true
      },
      {
        name: 'Desative o Slowmode',
        value: '`' + prefix + 'slowmode off`',
        inline: true
      }
    )

  if (!args[0]) { return message.inlineReply(noargs) }

  let canal = message.mentions.channels.first() || message.channel

  let noslow = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle(`${message.author.username} desativou o slowmode.`)

  if (args[0] === 'off') {
    canal.setRateLimitPerUser(0)

    return message.inlineReply(noslow)
  }

  if (isNaN(args[0])) {
    let number = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('`' + args[0] + '` não é um número.')
    return message.inlineReply(number)
  }

  if (args[0] < 1) {
    let number = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('O tempo mínimo é 1 segundo')
    return message.inlineReply(number)
  }

  canal.setRateLimitPerUser(args[0])
  let slowmode = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle(`${message.author.username} colocou o canal em Slowmode.`)
    .setDescription('Tempo definido: `' + args[0] + ' segundos.`')
  message.inlineReply(slowmode)
}