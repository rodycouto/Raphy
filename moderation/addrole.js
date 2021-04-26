const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let user = message.mentions.members.first()
    let role = message.mentions.roles.first()

    if (!message.member.hasPermission("MANAGE_ROLES")) { return message.inlineReply('<:xis:835943511932665926> Permissão Necessária: Manusear Roles (cargos)') }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) { return message.inlineReply('Eu preciso da permissão "Manusear Cargos" para utilizar esta função.') }
    if (!user) { return message.inlineReply(('`' + prefix + 'addrole @user @cargo`')) }
    if (message.author.id === user.id) { return message.inlineReply("<:xis:835943511932665926> Você não pode adicionar cargos para você mesmo.") }
    if (!role) { return message.inlineReply(('`' + prefix + 'addrole @user @cargo`')) }
    if (user.roles.cache.has(role.id)) { return message.inlineReply(`${user.user.username} já possui este cargo.`) }

    if (!role.editable) {
        var soberol = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Meu cargo não é alto o suficiente.')
            .addFields(
                {
                    name: 'Suba meu cargo',
                    value: '1 - Configurações do Servidor\n2 - Cargos\n3 - Procure meu cargo "Maya"\n4 - Arraste meu cargo para um dos primeiros\n5 - Salve as alterações e tente novamente.'
                }
            )

        var sobcarg = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription('<a:carregando:835294939096940575> Um erro foi encontrado. Buscando solução...')

        setTimeout(function () {
            message.inlineReply(soberol)
        }, 6000)
        return message.inlineReply(sobcarg).then(msg => msg.delete({ timeout: 5800 }))
    }

    var sucess = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setDescription(`${user.user.username} recebeu o cargo ${role} com sucesso!`)

    user.roles.add(role).catch(err => { if (err) { return message.inlineReply(`<:xis:835943511932665926> Não tenho poder suficiente para adicionar o cargo ${role}`) } })

    return message.channel.send(sucess)
}