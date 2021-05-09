const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) { return message.inlineReply('<:xis:835943511932665926> Permissão Necessária: ADMINISTRADOR') }
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) { return message.channel.send('<:xis:835943511932665926> Eu preciso da permissão "Gerenciar Mensagens" para utilizar esta função.') }

    let nolink = db.get(`nolink_${message.guild.id}`)

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    const Args0Embeds = new Discord.MessageEmbed()
        .setColor('#8B0000').setTitle('🔗 Sistema Ant-link')
        .setDescription('O meu sistema detecta **SOMENTE** links de servidores. Caso você queira bloquear todos os links, eu não posso te ajudar nisso. Isso atrapalha envio de gifs e várias outras funções.')
        .addField('Comando', '`' + prefix + 'antlink on`\n' + '`' + prefix + 'antlink off`')
        .setFooter('Administradores tem passe livre neste comando.')

    if (!args[0]) { return message.inlineReply(Args0Embeds) }

    if (args[0] === 'on') {
        if (nolink) { return message.inlineReply('<a:Check:836347816036663309> O sistema ant-link já está ativado.') }

        const confirm = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Você deseja ativar o sistema de ant-link?')
            .setFooter('Cancelamento em 30 segundos.')

        await message.inlineReply(confirm).then(msg => {
            msg.react('✅').catch(err => { return }) // Check
            msg.react('❌').catch(err => { return }) // X
            setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)

            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return

                if (reaction.emoji.name === '✅') { // Sim
                    msg.delete().catch(err => { return })
                    db.set(`nolink_${message.guild.id}`, "ON")
                    const ok = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setDescription('<a:Check:836347816036663309> Sistema Ant-Link ativado com sucesso!')
                    setTimeout(function () { message.channel.send(ok) }, 4100)
                    return message.inlineReply('<a:Pulse:839682326211854337> Ativando sistema ant link...').then(msg => msg.delete({ timeout: 4000 }).catch(err => { return }))
                }
                if (reaction.emoji.name === '❌') { // Não
                    msg.delete().catch(err => { return })
                    return message.inlineReply("Comando cancelado.")
                }
            })
        })
    }

    if (args[0] === 'off') {
        if (nolink === null) { return message.inlineReply('<a:Check:836347816036663309> O sistema ant-link já está desativado.') }

        const confirm = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Você deseja desativar o sistema de ant-link?')
            .setFooter('Cancelamento em 30 segundos.')

        await message.inlineReply(confirm).then(msg => {
            msg.react('✅').catch(err => { return }) // Check
            msg.react('❌').catch(err => { return }) // X
            setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)

            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return

                if (reaction.emoji.name === '✅') { // Sim
                    msg.delete().catch(err => { return })
                    db.delete(`nolink_${message.guild.id}`)
                    const ok = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('<a:Check:836347816036663309> Sistema Ant-Link desativado com sucesso!')
                    setTimeout(function () { message.channel.send(ok) }, 4100)
                    return message.inlineReply('<a:Pulse:839682326211854337> Desativando sistema ant link...').then(msg => msg.delete({ timeout: 4000 }).catch(err => { return }))
                }

                if (reaction.emoji.name === '❌') { // Não
                    msg.delete().catch(err => { return })
                    return message.inlineReply("Comando cancelado.")
                }
            })
        })
    }
}