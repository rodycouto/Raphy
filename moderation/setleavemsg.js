const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
        let perms = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: Gerenciar Canais, Gerenciar Mensagens')
        return message.inlineReply(perms)
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        let noperms = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: Gerenciar Canais, Gerenciar Mensagens')
        return message.inlineReply(noperms)
    }

    if (args[0] === 'off') {
        let canal = db.get(`msgleave_${message.guild.id}`)
        if (canal === null) {
            let semcanal = new Discord.MessageEmbed()
                .setColor('#8B0000')
                .setTitle(message.guild.name + ' não tem nenhuma mensagem definida.')

            return message.inlineReply(semcanal)
        } else if (canal) {
            db.delete(`msgleave_${message.guild.id}`)
            let comcanal = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('A mensagem de saída foi delatada com sucesso.')
            return message.inlineReply(comcanal)
        }
    }

    let canal = db.get(`leavechannel_${message.guild.id}`)
    if (canal === null) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let nocanal = new Discord.MessageEmbed()
            .setColor('#8B0000') // Red Color
            .setTitle('O Leave System está desativado.')
            .setDescription('`' + prefix + 'setleave`')
        return message.inlineReply(nocanal)
    }

    let mensagem = args.slice(0).join(" ")
    if (!mensagem) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        let noargs = new Discord.MessageEmbed()
            .setColor('#8B0000') // red
            .setTitle('Siga o formato abaixo')
            .setDescription('`' + prefix + 'setleavemsg Mensagem de saída`')
        return message.inlineReply(noargs)
    }

    if (mensagem) {
        db.set(`msgleave_${message.guild.id}`, mensagem)

        let sucess = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('A mensagem foi armazenada com sucesso.')
            .setDescription('Mensagem: `' + mensagem + '`')

        return message.inlineReply(sucess)
    }
}