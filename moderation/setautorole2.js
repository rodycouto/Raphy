const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

    let botperm = message.guild.me.hasPermission("MANAGE_ROLES")
    let userperms = message.member.hasPermission("MANAGE_ROLES")
    let autorole = db.get(`autorole2_${message.guild.id}`)
    let role = message.mentions.roles.first()

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let autorole1 = db.get(`autorole_${message.guild.id}`)
    if (!autorole1) { return message.inlineReply('<:xis:835943511932665926> O Autorole 1 tem que estar ativado para habilitar o Autorole 2. `' + prefix + 'setautorole`') }

    const adm = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setTitle('Eu preciso da permissão "Gerenciar Cargos" para utilizar esta função.')

    const permss = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setTitle('Permissão Necessária: Gerenciar Roles (cargos)')

    const cargoatual = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription(`O autorole 2 atual é: <@&${db.get(`autorole2_${message.guild.id}`)}>`)

    const noargs = new Discord.MessageEmbed()
        .setColor('BLUE') // red
        .setTitle('O Autorole System 2 está desativado')
        .setDescription('Escolha o cargo que todos vão receber assim que entrar no servidor.')
        .addField('Defina o cargo', '`' + prefix + 'setautorole2 @Cargo`')
        .addField('Desative o Autorole', '`' + prefix + 'setautorole2 off`')

    if (!botperm) { return message.inlineReply(adm) }
    if (!userperms) { return message.inlineReply(permss) }

    if (!args[0]) {
        if (autorole !== null) { return message.inlineReply(cargoatual) } else { return message.inlineReply(noargs) }
    }

    if (args[0] === 'off') {

        if (autorole === null) {
            let noauto = new Discord.MessageEmbed()
                .setColor('#8B0000')
                .setTitle('O Autorole System 2 já está desativado.')
            return message.channel.send(noauto)
        }

        const confirm1 = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(`Você deseja desligar o Sistema de Autorole 2? O cargo <@&${autorole}> deixará de ser dado a todos os novos membros.`)
            .setFooter('Auto delete em 1 minuto.')

        return message.channel.send(confirm1).then(msg => {
            msg.react('✅').catch(err => { return }) // Check
            msg.react('❌').catch(err => { return }) // X
            msg.delete({ timeout: 60000 }).catch(err => { return })

            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return

                if (reaction.emoji.name === '✅') { // Sim
                    msg.delete().catch(err => { return })
                    db.delete(`autorole2_${message.guild.id}`)

                    const desativado = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('<a:Check:836347816036663309> Autorole System 2 foi desativado com sucesso.')

                    return message.channel.send('<a:Pulse:839682326211854337> Desativando o Autorole System 2...').then(msg => msg.delete({ timeout: 3400 })).then(msg => msg.channel.send(desativado))
                }

                if (reaction.emoji.name === '❌') { // NPEmbed
                    msg.delete().catch(err => { return })
                    return message.channel.send('Comando cancelado')
                }
            })
        })
    }

    let norole = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setTitle('Siga o formato correto')
        .setDescription('`' + prefix + 'setautorole2 @cargo`')

    const soberol = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Este cargo é maior que o meu.')
        .addFields(
            {
                name: 'Suba meu cargo',
                value: '1 - Configurações do Servidor\n2 - Cargos\n3 - Procure meu cargo "Raphy"\n4 - Arraste meu cargo para um dos primeiros\n5 - Salve as alterações e tente novamente.'
            }
        )

    const sobcarg = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setDescription('<a:Pulse:839682326211854337> Um erro foi encontrado. Buscando solução...')

    const iqual = new Discord.MessageEmbed()
        .setColor('#8B0000') // Red
        .setTitle('Este cargo já foi definido como Autorole!')

    const iqual1 = new Discord.MessageEmbed()
        .setColor('#8B0000') // Red
        .setTitle('Este cargo já foi definido como Autorole 1!')

    const confirm = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription(`Você deseja definir o cargo ${role} como Autorole 2?`)
        .setFooter('Cancelamento em 30 segundos.')

    if (!role) { return message.channel.send(norole) }
    if (!role.editable) { return message.channel.send(sobcarg).then(msg => msg.delete({ timeout: 4000 })).then(msg => msg.channel.send(soberol)) }
    if (role.id === autorole) { return message.inlineReply(iqual) }
    if (role.id === autorole1) { return message.inlineReply(iqual1) }

    if (message.author.id !== message.guild.owner.id) {
        if (role.comparePositionTo(message.member.roles.highest) > -1) { return message.inlineReply(`<:xis:835943511932665926> Você não tem permissão para gerenciar o cargo ${role}.`) }
    }

    await message.channel.send(confirm).then(msg => {
        msg.react('✅').catch(err => { return }) // Check
        msg.react('❌').catch(err => { return }) // X
        setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return
            if (reaction.emoji.name === '✅') { // Sim
                msg.delete().catch(err => { return })
                db.set(`autorole2_${message.guild.id}`, role.id)

                const redefine = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`<a:Check:836347816036663309> O cargo ${role} foi definido como Autorole 2 com sucesso.`)

                const timing = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setDescription(`<a:Pulse:839682326211854337> Autenticando o cargo no banco de dados do servidor **${message.guild.name}**...`)

                return message.channel.send(timing).then(msg => msg.delete({ timeout: 8000 })).then(msg => msg.channel.send(redefine))
            }

            if (reaction.emoji.name === '❌') { // NPEmbed
                msg.delete().catch(err => { return })
                return message.channel.send('Comando cancelado')
            }
        })
    })
}