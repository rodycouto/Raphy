const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {

  let user = message.mentions.members.first() || message.member

  if (!args[0] === user) user === message.author

  let bal = await db.get(`money_${user.id}`)
  if (bal === null) bal = 0

  let bank = db.get(`bank_${user.id}`)
  if (bank === null) bank = 0

  var list = [
    'Pessoas podem te roubar, tenha cuidado.',
    'Mantenha seu dinheiro no banco',
    'Sabia que você pode roubar o dinheiro de outras pessoas?',
    'Já jogou blackjack hoje?',
    'O banco é impossivel de roubar.',
    'A bolsa de valores é um bom lugar para investir',
    'Jogares com arma podem pegar todo dinheiro da carteira',
    'Tem vários meio de se obter dinheiro',
    'Na loja tem vários itens legais para se comprar',
    'Os melhores players tem mais estrelas no perfil',
    'Já viu o ranking hoje?',
    'Você pode dobrar seu dinheiro no blackjack',
    'A roleta é uma boa forma de ganhar e perder dinheiro',
    'Já pescou hoje?',
    'Já minerou hoje?',
    'A rifa é um bom lugar para os sortudos'
  ]

  var frase = list[Math.floor(Math.random() * list.length)]

  var embed = new Discord.MessageEmbed()
    .setColor('#efff00')
    .setAuthor(`Finanças de ${user.user.tag}`, user.user.displayAvatarURL())
    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    .setDescription(frase)
    .addFields(
      {
        name: '💸 Carteira:',
        value: `<:StarPoint:766794021128765469>${bal}`,
        inline: true
      },
      {
        name: '🏦 Banco:',
        value: `<:StarPoint:766794021128765469>${bank}`,
        inline: true
      }
    )
  return message.inlineReply(embed)
}