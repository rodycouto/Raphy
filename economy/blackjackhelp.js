
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
  
  var linkgit = 'https://github.com/rodycouto/MayaCommands/blob/main/Exemplos/comojogarbj.md'

  var help = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('♠️ ♥️ 21 Pontos - Blackjack ♣️ ♦️')
    .setDescription(`Olhe tudo sobe o Blackjack [cliquando aqui](${linkgit})`)
  return message.inlineReply(help)

}