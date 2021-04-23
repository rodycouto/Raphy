const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {

  var timeout = 86400000 // 24hrs
  var amountmoney = 5
  var amountxp = 300
  var timeout1 = 6140000
  let author1 = await db.fetch(`pego_${message.author.id}`)

  if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
    let time = ms(timeout1 - (Date.now() - author1))

    var presomax = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('🚨 Você está em prisão máxima!')
      .setDescription('`Liberdade em: ' + `${time.minutes}` + 'm e ' + `${time.seconds}` + 's`')

    return message.inlineReply(presomax)
  } else {

    let daily = await db.fetch(`daily_${message.author.id}`)
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily))
      return message.inlineReply(`Você já pegou seus pontos hoje. Volte em ${time.hours}h, ${time.minutes}m, e ${time.seconds}s`)
    } else {

      let money = db.fetch(`mpoints_${message.author.id}`)
      if (money === null) { money = 0 }

      db.add(`mpoints_${message.author.id}`, amountmoney)
      db.add(`xp_${message.author.id}`, amountxp)
      db.set(`daily_${message.author.id}`, Date.now())

      message.inlineReply(`Você adquiriu ${amountmoney} <:StarPoint:766794021128765469>MPoints e ${amountxp} <:level:766847577416138772>XP.`)
    }
  }
}