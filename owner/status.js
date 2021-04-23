const db = require("quick.db")

exports.run = async (client, message, args) => {

  var rody = message.author.id === ("451619591320371213")
  if (!rody)
    return message.inlineReply('⚠️ Este comando é um restrito.')

  if (!args.length) {
    return message.inlineReply("Qual é a mensagem?")
  }

  db.set(`status`, args.join(" "))
  client.user.setActivity(args.join(" "));
  return message.inlineReply("Status foi atualizado.")
}