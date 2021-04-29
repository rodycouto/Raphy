const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    const commands = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('📋 Comandos Exclusivos de Doação (OWNER)')
        .setDescription('Com este comando, o meu criador torna possivel a doação de qualquer item da loja para qualquer pessoa.')
        .addField('Comando', '`' + prefix + 'give Item @user`')

    if (!args[0]) { return message.channel.send(commands) }

    const rody = message.author.id === ("451619591320371213")
    if (!rody) {
        message.delete().catch(err => { return })
        return message.channel.send('⚠️ Este é um comando restrito.').then(msg => msg.delete({ timeout: 5000 }))
    }

    let user = message.mentions.members.first()

    if (['arma', 'gun'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'give arma @user`') }

        db.set(`arma_${user.id}`, "Arma")
        return message.channel.send(`Uma arma adicionada ao slot de ${user}`)
    }

    if (['title', 'título', 'titulo'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'give titulo @user`') }

        db.set(`title_${user.id}`, "ON")
        return message.channel.send(`A permissão de alterar título foi adicionada ao slot de ${user}`)
    }

    if (['picareta'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'give picareta @user`') }

        db.set(`picareta_${user.id}`, "Picareta")
        db.add(`offpicareta_${user.id}`, 50)
        return message.channel.send(`Uma picareta adicionada ao slot de ${user}`)
    }

    if (['remedio', 'remédio'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'give remedio @user`') }

        db.set(`remedio_${user.id}`, "Remedio")
        return message.channel.send(`Remédio do Velho Welter foi adicionada ao slot de ${user}`)
    }

    if (['vara'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'give vara @user`') }

        db.set(`vara_${user.id}`, "Vara")
        return message.channel.send(`Uma vara de pesca adicionada ao slot de ${user}`)
    }

    if (['faca'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'give faca @user`') }

        db.set(`faca_${user.id}`, "Faca")
        return message.channel.send(`Uma faca adicionada ao slot de ${user}`)
    }

    if (['cachorro', 'doguinho', 'dog'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'give cachorro @user`') }

        db.set(`cachorro_${user.id}`, "Cachorro Brown")
        return message.channel.send(`Cachorrinho Brown foi adicionado ao slot de ${user}`)
    }

    if (['machado'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'give machado @user`') }

        db.set(`machado_${user.id}`, "Machado")
        return message.channel.send(`Um machado adicionada ao slot de ${user}`)
    }

    if (['loli'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'give loli @user`') }

        db.set(`loli_${user.id}`, "Loli")
        return message.channel.send(`Uma loli adicionada ao slot de ${user}`)
    }

    if (['fossil'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'give fossil @user`') }

        db.set(`fossil_${user.id}`, "Fossil")
        return message.channel.send(`Um fossil adicionada ao slot de ${user}`)
    }

    if (['mamute'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'give mamute @user`') }

        db.set(`mamute_${user.id}`, "Mamute")
        return message.channel.send(`Um mamute adicionada ao slot de ${user}`)
    }

    if (['lotery', 'loteria'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'give lotery @user`') }
        let loteria = db.get('loteria')

        db.add(`banco_${user.id}`, loteria)
        db.delete('loteria')
        return message.channel.send(`O prêmio da loteria foi depositado no banco de ${user}.`)
    }

    return message.channel.send('Comando não encontrado no registro.')
}