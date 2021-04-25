const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission(["MANAGE_ROLES"])) { return message.inlineReply('<:xis:835943511932665926> Permissão Necessária: Manusear Cargos') }

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  let logchannel = db.get(`logchannel_${message.guild.id}`)
  if (logchannel === null) { return message.inlineReply(new Discord.MessageEmbed().setColor('#FF0000').setTitle('Não há Canal Log registrado.').setDescription('`' + prefix + 'setlogchannel #CanalLog`')) }
  if (!client.channels.cache.get(logchannel)) { return message.inlineReply(new Discord.MessageEmbed().setColor('#FF0000').setTitle('Parece que o canal log foi excluido.').setDescription('`' + prefix + 'setlogchannel #CanalLog`')) }

  var user = message.mentions.members.first()
  if (!user) { return message.inlineReply('`' + prefix + 'warn @user Razão (opcional)`') }

  if (db.get(`whitelist_${user.id}`)) { return message.inlineReply(`${user.user.username} está na whitelist e não pode ser punido.`) }
  if (message.mentions.users.first().bot) { return message.inlineReply('<:xis:835943511932665926> Bots não podem receber warns.') }
  if (message.author.id === user.id) { return message.inlineReply('<:xis:835943511932665926> Auto warn não é uma opção.') }
  if (user.id === message.guild.owner.id) { return message.inlineReply('<:xis:835943511932665926> Warn no dono do servidor não é uma opção.') }

  let reason = args.slice(1).join(" ")
  if (!reason) { reason = `${message.author.username} não especificou nenhuma razão` }

  let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
  if (warnings === 5) { return message.inlineReply(new Discord.MessageEmbed().setColor('BLUE').setTitle(`Limite de warns atingido`).setDescription(`${user} atingiu 4 warns. Está na hora de uma punição maior. Mute? Kick? Ban?`)) }

  if (warnings === null) {
    db.set(`warnings_${message.guild.id}_${user.id}`, 1)
    user.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Alerta de Aviso').setDescription(`Você recebeu um aviso no servidor ${message.guild.name}\n \nRazão: ${reason}`)).catch(err => { return })

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    let msg1 = new Discord.MessageEmbed()
      .setTitle(`Sistema de Avisos ${message.guild.name}`)
      .setColor('GRAY')
      .addFields(
        {
          name: 'Usuário',
          value: user.user.tag
        },
        {
          name: 'Moderador',
          value: message.author
        },
        {
          name: 'Motivo',
          value: reason
        },
        {
          name: 'Warnings',
          value: warnings
        },
      )
      .setTimestamp()
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))

    message.inlineReply((`✅ Warn adicionado! Estou enviando mais informações no ${client.channels.cache.get(logchannel)}.`))
    client.channels.cache.get(logchannel).send(msg1)

  } else if (warnings !== null) {
    db.add(`warnings_${message.guild.id}_${user.id}`, 1)
    user.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Alerta de Aviso').setDescription(`Você recebeu um aviso no servidor **${message.guild.name}**`).addField('Razão', `Razão: ${reason}`)).catch(err => { return })

    let msg2 = new Discord.MessageEmbed()
      .setTitle(`Sistema de Avisos ${message.guild.name}`)
      .setColor('GRAY')
      .addFields(
        {
          name: 'Usuário',
          value: user.user.tag
        },
        {
          name: 'Moderador',
          value: message.author
        },
        {
          name: 'Motivo',
          value: reason
        },
        {
          name: 'Warnings',
          value: warnings
        },
      )
      .setTimestamp()
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))

    message.inlineReply(`✅ O Warn foi um sucesso! Estou enviando mais informações no ${client.channels.cache.get(logchannel)}.`)
    client.channels.cache.get(logchannel).send(msg2)
  }
}