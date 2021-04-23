const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (!args[0]) {
        const commands = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('📋 Comandos Exclusivos de Doação (OWNER)')
            .setDescription('Com este comando, o meu criador torna possivel a doação de qualquer item da loja para qualquer pessoa.')
            .addField('Comando', '`' + prefix + 'give Item @user`')
        return message.inlineReply(commands)
    }

    const rody = message.author.id === ("451619591320371213")
    if (!rody) {
        message.delete().catch(err => { return })
        return message.inlineReply('⚠️ Este comando é um restrito.').then(msg => msg.delete({ timeout: 5000 }))
    }

    let user = message.mentions.members.first()

    if (['arma', 'gun'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'give arma @user')
        }

        db.set(`arma_${user.id}`, "Arma")
        return message.inlineReply(`Uma arma adicionada ao slot de ${user}`)
    }

    if (['title', 'título', 'titulo'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'give titulo @user')
        }

        db.set(`title_${user.id}`, "ON")
        return message.inlineReply(`A permissão de alterar título foi adicionada ao slot de ${user}`)
    }

    if (['picareta'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'give picareta @user')
        }

        db.set(`picareta_${user.id}`, "Picareta")
        db.add(`offpicareta_${user.id}`, 50)
        return message.inlineReply(`Uma picareta adicionada ao slot de ${user}`)
    }

    if (['vara'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'give vara @user')
        }

        db.set(`vara_${user.id}`, "Vara")
        return message.inlineReply(`Uma vara de pesca adicionada ao slot de ${user}`)
    }

    if (['faca'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'give faca @user')
        }

        db.set(`faca_${user.id}`, "Faca")
        return message.inlineReply(`Uma faca adicionada ao slot de ${user}`)
    }

    if (['machado'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'give machado @user')
        }

        db.set(`machado_${user.id}`, "Machado")
        return message.inlineReply(`Um machado adicionada ao slot de ${user}`)
    }

    if (['loli'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'give loli @user')
        }

        db.set(`loli_${user.id}`, "Loli")
        return message.inlineReply(`Uma loli adicionada ao slot de ${user}`)
    }

    if (['fossil'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'give fossil @user')
        }

        db.set(`fossil_${user.id}`, "Fossil")
        return message.inlineReply(`Uma fossil adicionada ao slot de ${user}`)
    }

    if (['mamute'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'give mamute @user')
        }

        db.set(`mamute_${user.id}`, "Mamute")
        return message.inlineReply(`Uma mamute adicionada ao slot de ${user}`)
    }

    return message.inlineReply('Comando não encontrado no registro.')
}