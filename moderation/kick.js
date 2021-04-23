const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('KICK_MEMBERS')) {
        var permss = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Permissão Necessária: Expulsar Membros')
        return message.inlineReply(permss)
    }

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
        var adm = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Eu preciso da permissão "Kickar Membros" para utilizar esta função.')
        return message.inlineReply(adm)
    }

    let member = message.mentions.members.first()
    let reason = args.slice(1).join(" ")
    let logchannel = db.get(`logchannel_${message.guild.id}`)
    if (logchannel === null) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        var nochannel = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('O logchannel não foi definido.')
            .setDescription('`' + prefix + 'setlogchannel #CanalLog`')
        return message.inlineReply(nochannel)
    }

    if (!client.channels.cache.get(logchannel)) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        var logdel = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Parece que o logchannel foi deletado.')
            .setDescription('`' + prefix + 'setlogchannel #CanalLog`')
        return message.inlineReply(logdel)
    }

    if (!args[0]) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        var noargs = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'kick @user Razão do kick (opcional)`')
        return message.inlineReply(noargs)
    }

    if (!member) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        var noargs1 = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'kick @user Razão do kick (opcional)`')
        return message.inlineReply(noargs1)
    }

    if (db.get(`whitelist_${member.id}`)) {// Rodrigo Couto
        var banrody = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle(member.user.username + ' está na whitelist.')
        return message.inlineReply(banrody)
    }

    if (member.hasPermission(['ADMINISTRATOR'])) {
        var nokick = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(member.user.username + ' é um administrador. Não posso continuar com a expulsão.')
        return message.inlineReply(nokick)
    }

    if (!member.kickable) {
        var nokick = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(member.user.username + ' tem algum cargo maior que o meu')
        return message.inlineReply(nokick)
    }

    if (member.id === message.author.id) {
        var autokick = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Autokick não é uma opção')
        return message.inlineReply(autokick)
    }

    if (!reason) { reason = `${message.author.username} não especificou nenhuma razão` }

    var discordserver = 'https://discord.gg/YpFWgJuuUV'
    var support = 'https://forms.gle/vtJ5qBqFDd9rL5JU8'

    var kickembed = new Discord.MessageEmbed()
        .setColor('GRAY')
        .setTitle('Sistema de Kick - ' + message.guild.name)
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Usuário Expulso', member)
        .addField('ID', member.id)
        .addField('Kickado por', message.author)
        .addField('Razão', reason)
        .setFooter('Horário:')
        .setTimestamp()

    var confirm = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription(`Você confirma a expulsão de ${member.user}?`)

    await message.inlineReply(confirm).then(msg => {
        msg.react('✅') // Check
        msg.react('❌') // X

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            if (reaction.emoji.name === '✅') { // Sim
                msg.delete().catch(err => { return })

                var kicked = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle(`${member.user.username} foi expulso com sucesso.`)
                    .setDescription(`Relatório enviado ao ${client.channels.cache.get(logchannel)}`)

                member.kick().catch(err => {
                    var errorembed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Um erro ocorreu na expulsão')
                        .setDescription('Error by console.log: \n \n' + err)
                        .addFields(
                            {
                                name: 'Precisa de ajuda?',
                                value: `[Meu servidor](${discordserver})`,
                                inline: true
                            },
                            {
                                name: 'Dica o que houve no suporte',
                                value: `[Suporte Maya](${support})`
                            }
                        )
                    return message.inlineReply(errorembed)
                })
                message.inlineReply(kicked)
                return client.channels.cache.get(logchannel).send(kickembed)
            }
            if (reaction.emoji.name === '❌') { // Não
                msg.delete().catch(err => { return })
                var cancel = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Comando cancelado.')

                message.inlineReply(cancel)
            }
        })
    })
}