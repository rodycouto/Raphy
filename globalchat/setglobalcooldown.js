const db = require("quick.db")

exports.run = async (client, message, args) => {

    let rody = message.author.id === ("451619591320371213")
    if (!rody) {
        message.delete().catch(err => { return })
        if (!rody) { return message.channel.send('⚠️ Este é um comando restrito.').then(msg => msg.delete({ timeout: 5000 }).catch(err => { return })) }
    }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    const format = '`' + prefix + 'setglobalcooldown 10000` *(10segundos)*'

    if (!args[0]) { return message.inlineReply(format) }
    if (isNaN(args[0])) { return message.inlineReply('<:xis:835943511932665926> O tempo não é um número.\n' + format) }
    if (args[1]) { return message.inlineReply('<:xis:835943511932665926> Nada além do tempo!') }

    db.set(`globalcooldown`, args[0])

    let ServidoresAtivados = db.fetch(`globalchat_${message.guild.id}`)
    if (message.channel.id === ServidoresAtivados) {

        client.guilds.cache.forEach(Canal => {
            try {
                client.channels.cache.get(db.fetch(`globalchat_${Canal.id}`)).send(`<a:Check:836347816036663309> Novo timeout global definido! ${args[0]} milésimos. *(1000 = 1 segundos)*`)
            } catch (e) { return }
        })
    }
}