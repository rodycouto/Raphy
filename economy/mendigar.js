const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

  let timeout1 = 9140000
  let author1 = await db.fetch(`pego_${message.author.id}`)

  if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
    let time = ms(timeout1 - (Date.now() - author1))

    let presomax = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('🚨 Você está em prisão máxima!')
      .setDescription(`Liberdade em: ${time.hours}h ${time.minutes}m e ${time.seconds}s`)

    return message.inlineReply(presomax)
  } else {

    let timeout1 = 300000
    let author1 = await db.fetch(`esmolatimeout_${message.author.id}`)

    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
      let time = ms(timeout1 - (Date.now() - author1))

      return message.inlineReply(`Você já pediu esmola! Volte em: ${time.minutes}m e ${time.seconds}s`)
    } else {

      let prefix = db.get(`prefix_${message.guild.id}`)
      if (prefix === null) { prefix = "-" }
      db.set(`esmolatimeout_${message.author.id}`, Date.now())

      const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`${message.author.username} está pedindo um pouco de dinheiro`)
        .setDescription(`Clique no emoji para doar 50 <:StarPoint:766794021128765469>MPoints`)
        .setFooter('Comando será desativado em 30 segundos.')

      await message.inlineReply(embed).then(msg => {
        msg.react('✅').catch(err => { return }) // X
        setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)

        msg.awaitReactions((reaction, member) => {

          if (reaction.emoji.name === '✅') {
            let money = db.get(`mpoints_${member.id}`)
            if (member.id === '837147659898191902') { return }
            if (member.id === message.author.id) { return }
            if (money < 50) { return message.channel.send(`${member}, você não tem 50 <:StarPoint:766794021128765469>MPoints na carteira para ajudar ${message.author}`) }
            db.subtract(`mpoints_${member.id}`, 50)
            db.add(`mpoints_${message.author.id}`, 50)
            message.channel.send(`${member} ajudou ${message.author} com 50 <:StarPoint:766794021128765469>MPoint`)
          }
        })
      })
    }
  }
}