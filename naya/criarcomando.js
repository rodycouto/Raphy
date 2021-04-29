const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        let permss = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: ADMINISTRADOR')
        return message.inlineReply(permss)
    }

    if (!args[0]) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let noargs = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'criarcomando Nome Resposta`')
            .addFields(
                {
                    name: 'Exemplo',
                    value: '`' + prefix + 'criarcomando Sorvete Eu amo sorvete`'
                }
            )
        return message.inlineReply(noargs)
    }

    let commandName = args[0].toLowerCase()
    if (commandName.length > 10) {
        let toname = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('O nome do comando não pode ultrapassar 10 letras')
        return message.inlineReply(toname)
    }

    let commandResponse = args.slice(1).join(" ")
    if (!commandResponse) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let noargs = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'criarcomando Nome Resposta`')
            .addFields(
                {
                    name: 'Exemplo',
                    value: '`' + prefix + 'criarcomando Sorvete Eu amo sorvete`'
                }
            )
        return message.inlineReply(noargs)
    }

    if (commandResponse.length > 30) {
        let toname = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('A resposta do comando não pode ultrapassar 30 letras')
            .setFooter('Meu banco de dados também sente dor sabia?')
        return message.inlineReply(toname)
    }

    let database = db.get(`guildConfigurations_${message.guild.id}.commands`)
    if (database && database.find(x => x.name === commandName.toLowerCase())) {
        let existe = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Este comando já existe')
        return message.inlineReply(existe)
    }

    let data = {
        name: commandName,
        response: commandResponse
    }

    db.push(`guildConfigurations_${message.guild.id}.commands`, data)
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('O comando `' + prefix + commandName.toLowerCase() + '` foi adicionado ao servidor!')

    return message.inlineReply(embed)
}