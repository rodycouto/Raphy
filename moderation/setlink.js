const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        let permss = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: ADMINISTRADOR')
        return message.inlineReply(permss)
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      let adm = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setTitle('Eu preciso da permissão "Gerenciar Mensagens" para utilizar esta função.')
      return message.channel.send(adm)
    }

    let nolink = db.get(`nolink_${message.guild.id}`)

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (!args[0]) {

        let format = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('🔗 Sistema Ant-link')
            .setDescription('O meu sistem detecta links que membros enviam no servidor e eu deleto avisando o membro que não pode enviar links.')
            .addField('Comando', '`' + prefix + 'setlink on`\n' + '`' + prefix + 'setlink off`')
            .addField('⚠️ Atenção', 'Com o sistema antlink ativado, não será possível enviar GIFS.')
        return message.inlineReply(format)
    }

    if (args[0] === 'on') {
        if (nolink) {
            return message.inlineReply('O sistema ant-link já está ativado.')
        }

        let confirm = new Discord.MessageEmbed()
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
                    let ok = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Sistema Ant-Link ativado com sucesso!')
                    return message.inlineReply(ok)
                }
                if (reaction.emoji.name === '❌') { // Não
                    msg.delete().catch(err => { return })
                    message.inlineReply("Comando cancelado.")
                }
            })
        })
    }

    if (args[0] === 'off') {
        if (nolink === null) {
            return message.inlineReply('O sistema ant-link já está desativado.')
        }

        let confirm = new Discord.MessageEmbed()
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
                    let ok = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Sistema Ant-Link desativado com sucesso!')
                    return message.inlineReply(ok)
                }
                if (reaction.emoji.name === '❌') { // Não
                    msg.delete().catch(err => { return })
                    message.inlineReply("Comando cancelado.")
                }
            })
        })
    }
}