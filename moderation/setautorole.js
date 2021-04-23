const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let botperm = message.guild.me.hasPermission("MANAGE_ROLES")
    let userperms = message.member.hasPermission("MANAGE_ROLES")
    let autorole = db.get(`autorole_${message.guild.id}`)
    var role = message.mentions.roles.first()

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    var adm = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Eu preciso da permissão "Manusear Cargos" para utilizar esta função.')

    var permss = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Permissão Necessária: Manusear Roles (cargos)')

    let cargoatual = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription(`O autorole atual é: <@&${db.get(`autorole_${message.guild.id}`)}>`)

    var noargs = new Discord.MessageEmbed()
        .setColor('BLUE') // red
        .setTitle('O Autorole System está desativado')
        .setDescription('Escolha o cargo que todos vão receber assim que entrar no servidor.')
        .addField('Defina o cargo', '`' + prefix + 'setautorole @Cargo`')
        .addField('Desative o Autorole', '`' + prefix + 'setautorole off`')

    if (!botperm) { return message.inlineReply(adm) }
    if (!userperms) { return message.inlineReply(permss) }

    if (!args[0]) {

        if (autorole !== null) {
            return message.inlineReply(cargoatual)
        } else {
            return message.inlineReply(noargs)
        }
    }

    if (args[0] === 'off') {

        if (autorole === null) {
            var noauto = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('O Autorole System já está desativado.')
            return message.channel.send(noauto)
        }

        var confirm1 = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(`Você deseja desligar o sistema de Autorole? O cargo <@&${autorole}> deixará de ser dado a todos os novos membros.`)
            .setFooter('Auto delete em 1 minuto.')

        return message.channel.send(confirm1).then(msg => {
            msg.react('✅').catch(err => { return }) // Check
            msg.react('❌').catch(err => { return }) // X
            msg.delete({ timeout: 60000 }).catch(err => { return })

            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return

                if (reaction.emoji.name === '✅') { // Sim
                    msg.delete().catch(err => { return })
                    db.delete(`autorole_${message.guild.id}`)

                    var desativado = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('✅ Autorole System foi desativado com sucesso.')

                    return message.channel.send('<a:loading:834782920287846430> Desativando o Autorole System...').then(msg => msg.delete({ timeout: 3400 })).then(msg => msg.channel.send(desativado))
                }

                if (reaction.emoji.name === '❌') { // MPEmbed
                    msg.delete().catch(err => { return })
                    return message.channel.send('Comando cancelado')
                }
            })
        })
    }

    var norole = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Siga o formato correto')
        .setDescription('`' + prefix + 'setautorole @cargo`')

    var soberol = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Este cargo é maior que o meu.')
        .addFields(
            {
                name: 'Suba meu cargo',
                value: '1 - Configurações do Servidor\n2 - Cargos\n3 - Procure meu cargo "Maya"\n4 - Arraste meu cargo para um dos primeiros\n5 - Salve as alterações e tente novamente.'
            }
        )

    var sobcarg = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setDescription('<a:loading:834782920287846430> Um erro foi encontrado. Buscando solução...')

    var iqual = new Discord.MessageEmbed()
        .setColor('#FF0000') // Red
        .setTitle('Este cargo já foi definido como Autorole!')

    var confirm = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription(`Você deseja definir o cargo ${role} como autorole?`)

    if (!role) { return message.channel.send(norole) }
    if (!role.editable) { return message.channel.send(sobcarg).then(msg => msg.delete({ timeout: 4000 })).then(msg => msg.channel.send(soberol)) }
    if (role.id === autorole) { return message.inlineReply(iqual) }

    await message.channel.send(confirm).then(msg => {
        msg.react('✅') // Check
        msg.react('❌') // X

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return
            if (reaction.emoji.name === '✅') { // Sim
                msg.delete().catch(err => { return })
                db.set(`autorole_${message.guild.id}`, role.id)

                var redefine = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`✅ O cargo ${role} foi definido como autorole com sucesso.`)

                var timing = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setDescription(`<a:loading:834782920287846430> Autenticando o cargo no banco de dados do servidor **${message.guild.name}**...`)

                return message.channel.send(timing).then(msg => msg.delete({ timeout: 8000 })).then(msg => msg.channel.send(redefine))
            }

            if (reaction.emoji.name === '❌') { // MPEmbed
                msg.delete().catch(err => { return })
                return message.channel.send('Comando cancelado')
            }
        })
    })
}