const db = require("quick.db")

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_CHANNELS")) { return message.inlineReply("<:xis:835943511932665926> | Permissão necessária: Gerenciar Canais") }
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) { return message.inlineReply('<:xis:835943511932665926> | Eu preciso da permissão "Gerenciar Canais" para utilizar esta função.') }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let canal = message.mentions.channels.first() || message.channel

    if (args[1]) { return message.inlineReply("<:xis:835943511932665926> | Por favor, mencione apenas o canal que deseja esconder.") }

    canal.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), { VIEW_CHANNEL: true })

    return message.channel.send(`🔒 ${message.author} escondeu o canal ${canal}! | Para mostrar o canal, use ` + '`' + prefix + 'unhide`')
}