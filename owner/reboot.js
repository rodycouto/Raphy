exports.run = async (client, message, args) => {

    const rody = message.author.id === ("451619591320371213")
    if (!rody) {
        message.delete().catch(err => { return })
        return message.inlineReply('⚠️ Este é um comando restrito.')
    }

    client.guilds.cache.forEach(guild => {

        let CanaisValidos = guild.channels.cache.find(ch => ch.name === "naya-global-chat")

        if (!CanaisValidos) return

        return CanaisValidos.send('<a:carregando:836101628083437608> Rebooting...')
    })

    client.user.setActivity(`Rebooting...`, { type: "WATCHING" })
    return message.inlineReply('<a:carregando:836101628083437608> Rebooting...')
}