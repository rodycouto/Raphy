exports.run = async (client, message, args) => {
  message.delete().catch(err => { return })
  return message.channel.send('Comando em reforma').then(msg => msg.delete({ timeout: 5000 })).catch(err => { return })
}