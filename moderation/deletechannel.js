const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
        let perms = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: Gerenciar Canais')
        return message.inlineReply(perms)
    }

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
        let adm = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Eu preciso da permissão "Gerenciar Canais" para utilizar esta função.')
        return message.inlineReply(adm)
    }

    if (!args[0]) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let noargs = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'deletechannel #Canal`')
        return message.inlineReply(noargs)
    }

    let channel = message.mentions.channels.first()
    if (!channel) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let nochannel = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'deletechannel #Canal`')
        return message.inlineReply(nochannel)
    }

    let confirm = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription('Este é um comando perigoso, deseja prosseguir?')

    return message.inlineReply(confirm).then(msg => {
        msg.react('✅') // Check
        msg.react('❌') // X

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            if (reaction.emoji.name === '✅') { // sim
                msg.delete().catch(err => { return })

                let confirm2 = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setDescription(`O canal ${channel} será excluido e não será possivel recupera-lo, deseja prosseguir?`)

                message.inlineReply(confirm2).then(msg => {
                    msg.react('✅') // Check
                    msg.react('❌') // X

                    msg.awaitReactions((reaction, user) => {
                        if (message.author.id !== user.id) return

                        if (reaction.emoji.name === '✅') { // sim
                            msg.delete().catch(err => { return })

                            let confirm3 = new Discord.MessageEmbed()
                                .setColor('BLUE')
                                .setDescription(`Último aviso. Você realmente deseja prosseguir com a exclusão do canal ${channel}?`)

                            message.inlineReply(confirm3).then(msg => {
                                msg.react('✅') // Check
                                msg.react('❌') // X

                                msg.awaitReactions((reaction, user) => {
                                    if (message.author.id !== user.id) return

                                    if (reaction.emoji.name === '✅') { // sim
                                        msg.delete().catch(err => { return })

                                        let sucess = new Discord.MessageEmbed()
                                            .setColor('GREEN')
                                            .setDescription(`${message.author} excluiu o canal #${channel.name}`)
                                        message.inlineReply(sucess)

                                        channel.delete().catch(err => {
                                            return message.inlineReply('Ocorreu um erro na exclusão do canal.\n \n ' + err)
                                        })
                                    }

                                    if (reaction.emoji.name === '❌') { // MPEmbed
                                        msg.delete().catch(err => { return })

                                        let canceled3 = new Discord.MessageEmbed()
                                            .setColor('GREEN')
                                            .setTitle('Comando cancelado.')
                                        message.inlineReply(canceled3)
                                    }
                                })
                            })
                        }
                        if (reaction.emoji.name === '❌') { // MPEmbed
                            msg.delete().catch(err => { return })

                            let canceled2 = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('Comando cancelado.')
                            message.inlineReply(canceled2)
                        }
                    })
                })
            }
            if (reaction.emoji.name === '❌') { // MPEmbed
                msg.delete().catch(err => { return })
                let canceled = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Comando cancelado.')
                message.inlineReply(canceled)
            }
        })
    })
}