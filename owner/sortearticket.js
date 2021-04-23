exports.run = async (client, message, args) => {
    if (message.author.id !== "451619591320371213") {
        message.delete().catch(err => { return })
        return message.inlineReply('⚠️ Este comando é um restrito.').then(msg => msg.delete({ timeout: 5000 }))
    }
}