const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission('BAN_MEMBERS')) { return message.inlineReply('<:xis:835943511932665926> Permissão Necessária: Banir Membros') }

  if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    var adm = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Eu preciso da permissão "Banir Membros" para utilizar esta função.')
    return message.inlineReply(adm)
  }

  let logchannel = db.get(`logchannel_${message.guild.id}`)
  if (logchannel === null) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    var nolog = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Não há Canal Log registrado.')
      .setDescription('`' + prefix + 'setlogchannel #CanalLog`')
    return message.inlineReply(nolog)
  }

  if (!client.channels.cache.get(logchannel)) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    var nolog1 = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Parece que o canal log foi excluido.')
      .setDescription('`' + prefix + 'setlogchannel #CanalLog`')
    return message.inlineReply(nolog1)
  }

  var user = message.mentions.members.first()
  if (!user) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    var nouser = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Siga o formato')
      .setDescription('`' + prefix + 'ban @user Razão`')
    return message.inlineReply(nouser)
  }

  if (db.get(`whitelist_${user.id}`)) {// Rodrigo Couto
    var banrody = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle(user.user.username + ' está na whitelist.')
    return message.inlineReply(banrody)
  }

  if (user.id === message.author.id) {
    var autoban = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Banir você mesmo não é uma opção.')
    return message.inlineReply(autoban)
  }

  if (user.id === message.guild.owner.id) {
    var banowner = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Banir o dono do servidor não é uma opção.')
    return message.inlineReply(banowner)
  }

  if (user.hasPermission('BAN_MEMBERS')) {
    var banperm = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`${user.user.username} tem permissões importantes neste servidor, não posso banir.`)
    return message.inlineReply(banperm)
  }

  var reason = args.slice(1).join(" ")
  if (!reason) reason = message.author.username + ' não especificou nenhuma razão.'

  var banEmbed = new Discord.MessageEmbed()
    .setTitle(`Sistema de Banimento - ${message.guild.name}`)
    .setColor('#FF0000')
    .addFields(
      {
        name: 'Usuário Banido',
        value: user.user,
        inline: true
      },
      {
        name: 'Nome da Conta',
        value: user.user.tag,
        inline: true
      },
      {
        name: 'ID do usuário',
        value: user.id
      },
      {
        name: 'Moderador',
        value: message.author.username
      },
      {
        name: 'Motivo',
        value: reason
      },
    )
    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter('Data')

  var startban = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`Você realmente deseja banir ${user.user} do servidor?`)

  await message.inlineReply(startban).then(msg => {
    msg.react('✅') // Check
    msg.react('❌') // X

    msg.awaitReactions((reaction, user) => {
      if (message.author.id !== user.id) return

      if (reaction.emoji.name === '✅') { // Sim
        msg.delete().catch(err => { return })

        var banned = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setTitle(`Você baniu ${user.username} com sucesso.`)
          .setDescription(`Relatório enviado ao ${client.channels.cache.get(logchannel)}`)

        message.mentions.members.first().ban().catch(err => { message.inlineReply(`ERROR: ${err}`) })
        message.inlineReply(banned)
        return client.channels.cache.get(logchannel).send(banEmbed)
      }
      if (reaction.emoji.name === '❌') { // Não
        msg.delete().catch(err => { return })
        var cancel = new Discord.MessageEmbed()
          .setColor('GREY')
          .setTitle('Comando cancelado.')

        message.inlineReply(cancel)
      }
    })
  })
}