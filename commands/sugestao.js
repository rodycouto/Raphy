const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async (client, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  const nochannel = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('❌ Nenhum canal de ideias/sugestões definido.')
    .setDescription('Graças ao sistema de organização da Naya, este é um dos comandos que requer um canal especifico para funcionamento.\n \nAs ideias e sugestões dos membros ficará em um canal para serem votadas pelos os outros membros. Bem... Se a administração do servidor quiser é claro.')
    .addFields(
      {
        name: 'Comando de Ativação',
        value: '`' + prefix + 'setideiachannel #canal`',
        inline: true
      },
      {
        name: 'Comando de Desativação',
        value: '`' + prefix + 'setideiachannel off`',
        inline: true
      }
    )

  const nochannel1 = new Discord.MessageEmbed()
    .setColor('#8B0000')
    .setTitle('Parece que o canal de ideias/sugestões foi excluido.')
    .setDescription('`' + prefix + 'setideiachannel #canal`')

  const noideia = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('💡 Comando Ideia/Sugestão')
    .setDescription('Use este comando para enviar sua ideia ao servidor, para que todos possam votar.\n \nMáximo: 300 letras\nMínimo: 10 letras')
    .addField('Comando', '`' + prefix + 'ideia Sua ideia em diante`')

  const mais300 = new Discord.MessageEmbed()
    .setColor('#8B0000')
    .setTitle('Sua ideia/sugestão não pode passar de 300 caracteres')

  const menos300 = new Discord.MessageEmbed()
    .setColor('#8B0000')
    .setTitle('Sua ideia/sugestão é curta demais, escreva mais do que 10 caracteres')

  const canal = db.get(`ideiachannel_${message.guild.id}`)
  let content = args.join(" ")
  let avatar = message.author.displayAvatarURL({ format: 'png' })

  if (canal === null) { return message.inlineReply(nochannel) }
  if (!client.channels.cache.get(canal)) { return message.inlineReply(nochannel1) }
  if (!args[0]) { return message.inlineReply(noideia) }
  if (content.length > 300) { return message.inlineReply(mais300) }
  if (content.length < 10) { return message.inlineReply(menos300) }

  let msg = await client.channels.cache.get(canal).send(
    new Discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor(`${message.author.tag} enviou sua ideia/sugestão`, avatar)
      .setDescription(content)
      .setTimestamp()
      .setFooter(`💡 ${prefix}ideia`)
  )

  await message.inlineReply(`<a:Check:836347816036663309> A sua ideia foi enviada com sucesso no canal ${client.channels.cache.get(canal)}`)

  let emojis = ["✅", "❌", "❔"]

  for (let i in emojis) {
    await msg.react(emojis[i])
  }
}