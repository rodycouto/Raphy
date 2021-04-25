const db = require("quick.db")

exports.run = async (client, message, args) => {

  let user = message.mentions.members.first() || message.author
  let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

  if (warnings === null) warnings = 0
  if (warnings === 1) { return message.inlineReply(`❗ ${user} tem 1 aviso.`) }
  if (warnings === 0) { return message.inlineReply(`❗ ${user} não tem avisos.`) }

  return message.inlineReply(`${user} tem ${warnings} avisos.`)
}