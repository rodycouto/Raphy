const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_ROLES")) { return message.inlineReply('<:xis:835943511932665926> Permissão Necessária: Gerenciar Roles (cargos)') }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) { return message.inlineReply('<:xis:835943511932665926> Eu preciso da permissão "Gerenciar Cargos" para utilizar esta função.') }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    let user = message.mentions.members.first()
    let role = message.mentions.roles.first()

    if (!user) { return message.inlineReply('`' + prefix + 'removerole @user @cargo`') }
    if (!role) { return message.inlineReply('`' + prefix + 'removerole @user @cargo`') }
    if (!user.roles.cache.has(role.id)) { return message.inlineReply(`<:xis:835943511932665926> ${user.user.username} não possui este cargo.`) }

    if (role.comparePositionTo(message.member.roles.highest) > -1) {
        return message.inlineReply(`<:xis:835943511932665926> Você não tem permissão para gerenciar o cargo ${role}.`)
    }

    if (!role.editable) {
        let soberol = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Meu cargo não é alto o suficiente.')
            .addFields(
                {
                    name: 'Suba meu cargo',
                    value: '1 - Configurações do Servidor\n2 - Cargos\n3 - Procure meu cargo "Naya"\n4 - Arraste meu cargo para um dos primeiros\n5 - Salve as alterações e tente novamente.'
                }
            )

        let sobcarg = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setDescription('<a:carregando:836101628083437608> Um erro foi encontrado. Buscando solução...')

        setTimeout(function () {
            message.inlineReply(soberol)
        }, 6000)
        return message.inlineReply(sobcarg).then(msg => msg.delete({ timeout: 5800 }))
    }

    user.roles.remove(role).catch(err => { if (err) { return message.inlineReply(`<:xis:835943511932665926> Não tenho poder suficiente para adicionar o cargo ${role}`) } })

    let sucess = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setDescription(`O cargo ${role} foi removido de ${user.user.username} com sucesso.`)
    return message.inlineReply(sucess)
}