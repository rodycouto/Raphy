const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) { return message.inlineReply('<:xis:835943511932665926> Permissão Necessária: ADMINISTRADOR') }
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) { return message.channel.send('<:xis:835943511932665926> Eu preciso da permissão "Manusear Mensagens" para utilizar esta função.') }

    let nolink = db.get(`nolink_${message.guild.id}`)

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (!args[0]) { return message.inlineReply(new Discord.MessageEmbed().setColor('#FF0000').setTitle('🔗 Sistema Ant-link').setDescription('O meu sistema detecta links que membros enviam no servidor e eu deleto avisando o membro que não pode enviar links.').addField('Comando', '`' + prefix + 'antlink on`\n' + '`' + prefix + 'antlink off`').addField('⚠️ Atenção', 'Com o sistema antlink ativado, não será possível enviar GIFS.').setFooter('Administradores tem passe livre neste comando.')) }

    if (args[0] === 'on') {
        if (nolink) { return message.inlineReply('✅ O sistema ant-link já está ativado.') }

        var confirm = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Você deseja ativar o sistema de ant-link?')

        await message.inlineReply(confirm).then(msg => {
            msg.react('✅') // Check
            msg.react('❌') // X

            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return

                if (reaction.emoji.name === '✅') { // Sim
                    msg.delete().catch(err => { return })
                    db.set(`nolink_${message.guild.id}`, "ON")
                    var ok = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Sistema Ant-Link ativado com sucesso!')
                    setTimeout(function () { message.channel.send(ok) }, 3700)
                    return message.inlineReply('<a:loading:834782920287846430> Ativando sistema ant link...').then(msg => msg.delete({ timeout: 4000 }).catch(err => { return }))
                }
                if (reaction.emoji.name === '❌') { // Não
                    msg.delete().catch(err => { return })
                    message.inlineReply("Comando cancelado.")
                }
            })
        })
    }

    if (args[0] === 'off') {
        if (nolink === null) { return message.inlineReply('✅ O sistema ant-link já está desativado.') }

        var confirm = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Você deseja desativar o sistema de ant-link?')

        await message.inlineReply(confirm).then(msg => {
            msg.react('✅') // Check
            msg.react('❌') // X

            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return

                if (reaction.emoji.name === '✅') { // Sim
                    msg.delete().catch(err => { return })
                    db.delete(`nolink_${message.guild.id}`)
                    var ok = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Sistema Ant-Link desativado com sucesso!')
                    setTimeout(function () { message.channel.send(ok) }, 3700)
                    return message.inlineReply('<a:loading:834782920287846430> Desativando sistema ant link...').then(msg => msg.delete({ timeout: 4000 }).catch(err => { return }))
                }
                if (reaction.emoji.name === '❌') { // Não
                    msg.delete().catch(err => { return })
                    message.inlineReply("Comando cancelado.")
                }
            })
        })
    }
}