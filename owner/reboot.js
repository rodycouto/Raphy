exports.run = async (client, message, args) => {

    const rody = message.author.id === ("451619591320371213")
    if (!rody) {
        message.delete().catch(err => { return })
        return message.inlineReply('⚠️ Este comando é um restrito.')
    }
    return message.inlineReply('Rebooting...').then(msg => msg.delete({ timeout: 15000 }))
}