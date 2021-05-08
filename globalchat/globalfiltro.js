const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let Moderador = db.get(`moderadoreschatglobal_${message.author.id}`)
    if (!Moderador) {
        message.delete().catch(err => { return })
        return message.channel.send('⚠️ Este é um comando restrito para Moderadores do Chat Global.')
    }

    const NoArgs0 = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('🔇 Filtro de Palavrões no Chat Global')
        .addField('Ative', '`' + prefix + 'globalfiltro on`')
        .addField('Desative', '`' + prefix + 'globalfiltro off`')

    if (!args[0]) { return message.inlineReply(NoArgs0) }
    if (args[1]) { return message.inlineReply('<:xis:835943511932665926> | Por favor, nada além do comando.\nUse `' + prefix + 'globalfiltro` para mais informações.') }

    let filtro = db.get('noglobalbadwords')

    if (['status', 'server'].includes(args[0].toLowerCase())) {
        if (filtro) {
            return message.inlineReply('<a:Check:836347816036663309> Ativado')
        } else { return message.inlineReply('<:xis:835943511932665926> Desativado') }
    }

    if (['on', 'ativar'].includes(args[0].toLowerCase())) {
        if (filtro) {
            return message.inlineReply('O filtro global contra palavrões já está ativado.')
        } else {
            db.set('noglobalbadwords', 'ON')
            message.inlineReply('ok')
            let ServidoresAtivados = db.fetch(`globalchat_${message.guild.id}`)
            if (message.channel.id === ServidoresAtivados) {

                client.guilds.cache.forEach(Canal => {
                    try {
                        client.channels.cache.get(db.fetch(`globalchat_${Canal.id}`)).send(`📢 ${message.author.tag} ativou o filtro de palavrões no Chat Global.`)
                    } catch (e) { return }
                })
            }
        }
    }

    if (['off', 'desligar'].includes(args[0].toLowerCase())) {
        if (!filtro) {
            return message.inlineReply('O filtro global contra palavrões já está desativado.')
        } else {
            db.delete('noglobalbadwords')
            message.inlineReply('ok')
            let ServidoresAtivados = db.fetch(`globalchat_${message.guild.id}`)
            if (message.channel.id === ServidoresAtivados) {

                client.guilds.cache.forEach(Canal => {
                    try {
                        client.channels.cache.get(db.fetch(`globalchat_${Canal.id}`)).send(`📢 ${message.author.tag} desativou o filtro de palavrões no Chat Global.`)
                    } catch (e) { return }
                })
            }
        }
    }
}