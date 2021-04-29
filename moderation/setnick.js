const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async (client, message, args) => {

  if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) {
    let adm = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('Eu preciso da permissão "Gerenciar Nicknames (Nomes/Apelidos)" para utilizar esta função.')
    return message.inlineReply(adm)
  }

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
    let noperms = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('Permissão Necessária: Gerenciar Nicknames (Nomes/Apelidos)')
    return message.inlineReply(noperms)
  }

  let user = message.mentions.users.first()
  if (!user) {
    let format = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('Siga o formato correto')
      .setDescription('`' + prefix + 'setnick @user NovoNome`')
    return message.inlineReply(format)
  }

  let nick = args.slice(1).join(" ")
  if (!nick) {
    let format = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('Siga o formato correto')
      .setDescription('`' + prefix + 'setnick @user NovoNome`')
    return message.inlineReply(format)
  }

  let linksupport = 'https://discord.gg/YpFWgJuuUV'
  let member = message.guild.members.cache.get(user.id)
  member.setNickname(nick).catch(err => {

    if (err) {
      let erro = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setTitle('Um erro foi encontrado')
        .setDescription('\n \n`' + err + '`')
        .addFields(
          {
            name: 'Missing Permissions',
            value: `Algum cargo de ${member} é maior que o meu.`,
            inline: true
          },
          {
            name: 'Unknow Member',
            value: `O usuário saiu do servidor.`,
            inline: true
          },
          {
            name: 'API Connect Problem Asking',
            value: 'Tente novamente, o servidor reconectou.',
            inline: true
          },
          {
            name: 'Algum outro erro?',
            value: `[Support Naya](${linksupport})`
          }
        )

      return message.inlineReply(erro)
    }
  })

  let sucess = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`<a:Check:836347816036663309> O nickname de ${user.tag} foi alterado para ${nick}`)
  return message.inlineReply(sucess)
}