const Discord = require("discord.js")
const db = require('quick.db')
const ms = require("ms")

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission('MANAGE_MESSAGES')) { return message.channel.send('<:xis:835943511932665926> Permissão Necessária: Gerenciar Mensagens') }

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  const format = new Discord.MessageEmbed()
    .setColor('#8B0000')
    .setTitle('Siga o formato correto')
    .setDescription('`' + prefix + 'sorteio 1s/m/h #CanalDoSorteio Prêmio`')
    .addFields(
      {
        name: 'Exemplo',
        value: '`' + prefix + 'sorteio 2h #Sorteios Cargo Mod`\n \nO sorteio acaba em 2 horas no canal #Sorteios, prêmio: Cargo Mod'
      }
    )

  if (!args[0]) { return message.channel.send(format) }
  if (!args[0].endsWith("s") && !args[0].endsWith("m") && !args[0].endsWith("h")) { return message.channel.send(format) }
  if (args[0].length > 3) { return message.channel.send('<:xis:835943511932665926> Tempo limite é de 99h') }
  if (isNaN(args[0][0])) { return message.channel.send(format) }

  let channel = message.mentions.channels.first()
  if (!channel) { return message.channel.send(format) }

  let prize = args.slice(2).join(" ")
  if (!prize) { return message.channel.send(format) }

  const Embed = new Discord.MessageEmbed()
    .setColor(`#067aff`)
    .setDescription(`**Prêmio: ${prize}**\nReaja ao :tada: para participar do sorteio`)
    .setTimestamp(Date.now() + ms(args[0]))
    .setFooter('Resultado')

  let m = await channel.send(`:tada:🥳 **SORTEIO POR ${message.author}** 🥳:tada:`, Embed)
  m.react("🎉")

  message.channel.send(`<a:Check:836347816036663309> Sorteio criado no canal ${channel}.`)

  setTimeout(() => {
    if (m.reactions.cache.get("🎉").count <= 1) { return channel.send('<:xis:835943511932665926> Sorteio cancelado por falta de participantes.') }

    let winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random()
    let avatar = winner.displayAvatarURL({ format: 'png' })

    let winembed = new Discord.MessageEmbed()
      .setColor(`#067aff`)
      .setTitle(`Vencedor/a: ${winner.tag}`)
      .setDescription(`Parabéns ${winner}, você ganhou!\n \n**Prêmio:** ${prize}`)
      .setThumbnail(avatar)

    channel.send(":tada: ***Sorteio Acabou*** ", winembed).catch(err => { return })
    let PrivadoDesativado = db.get(`privadooff_${winner.id}`)
    if (PrivadoDesativado) { return } else { winner.send(`Parabéééééééns!! Você ganhou o sorteio em **${message.guild.name}**.\n \nVocê ganhou: **${prize}**.`).catch(err => { return }) }
    if (PrivadoDesativado) { return } else { message.author.send(`${winner} foi o ganhador do sorteio em ${message.guild.name}.`).catch(err => { return }) }
  }, ms(args[0]))
}