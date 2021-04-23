const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (!args[0]) {
        var commands = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('📋 Comandos Exclusivos de Remoção (OWNER)')
            .setDescription('Com este comando, o meu criador torna possivel a remoção de qualquer item do slot de qualquer pessoa.')
            .addField('Comando', '`' + prefix + 'remove Item @user Quantidade`')
        return message.inlineReply(commands)
    }

    var rody = message.author.id === ("451619591320371213")
    if (!rody) {
        message.delete().catch(err => { return })
        return message.inlineReply('⚠️ Este comando é um restrito.').then(msg => msg.delete({ timeout: 5000 }))
    }

    let user = message.mentions.members.first()

    if (['banco', 'bank'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove bank @user Valor`')
        }

        let amount = args[2]
        if (!amount || isNaN(amount)) {
            return message.inlineReply('`' + prefix + 'remove bank @user Valor`')
        }

        db.subtract(`banco_${user.id}`, amount)
        return message.inlineReply(`O dinheiro foi removido do banco de ${user}`)
    }

    if (['title', 'titulo', 'título'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove título @user`')
        }

        db.delete(`titulo_${user.id}`)
        return message.inlineReply(`O título de ${user} foi removido.`)
    }

    if (['iscas', 'isca'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove iscas @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'remove iscas @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.subtract(`iscas_${user.id}`, amount)
        return message.inlineReply(`Iscas removidas do slot de ${user}.`)
    }

    if (['cartas', 'carta'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove cartas @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'remove cartas @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.subtract(`cartas_${user.id}`, amount)
        return message.inlineReply(`Cartas removidas do slot de ${user}.`)
    }

    if (['maça', 'apple', 'maças'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove maça @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'remove maça @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.subtract(`apple_${user.id}`, amount)
        return message.inlineReply(`${amount} Maças foram removidas do slot de ${user}.`)
    }

    if (['mp', 'money'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove money @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'remove money @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.subtract(`mpoints_${user.id}`, amount)
        return message.inlineReply(`Dinheiro removido da conta de ${user}.`)
    }

    if (['peixe', 'peixes', 'fish'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove peixes @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'remove peixes @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.subtract(`peixes_${user.id}`, amount)
        return message.inlineReply(`Peixes removidos do slot de ${user}.`)
    }

    if (['ficha', 'fichas'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove fichas @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'remove fichas @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.subtract(`fichas_${user.id}`, amount)
        return message.inlineReply(`Fichas removidas do slot de ${user}.`)
    }

    if (['arma'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove arma @user`')
        }

        db.delete(`arma_${user.id}`)
        return message.inlineReply(`Arma removida do slot de ${user}.`)
    }

    if (['picareta'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove picareta @user`')
        }

        db.delete(`picareta_${user.id}`)
        return message.inlineReply(`Picareta removida do slot de ${user}.`)
    }

    if (['machado'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove machado @user`')
        }

        db.delete(`machado_${user.id}`)
        return message.inlineReply(`Machado removido do slot de ${user}.`)
    }

    if (['vara', 'vara de pesca'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove vara @user`')
        }

        db.delete(`vara_${user.id}`)
        return message.inlineReply(`Vara de pesca removida do slot de ${user}.`)
    }

    if (['faca'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove faca @user`')
        }

        db.delete(`faca_${user.id}`)
        return message.inlineReply(`Faca removida do slot de ${user}.`)
    }

    if (['loli'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove loli @user`')
        }

        db.delete(`loli_${user.id}`)
        return message.inlineReply(`Loli removida do slot de ${user}.`)
    }

    if (['fossil'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove fossil @user`')
        }

        db.delete(`fossil_${user.id}`)
        return message.inlineReply(`Fossil removido do slot de ${user}.`)
    }

    if (['mamute'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove mamute @user`')
        }

        db.delete(`mamute_${user.id}`)
        return message.inlineReply(`Mamute removido do slot de ${user}.`)
    }

    if (['rp', 'reputação'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove rp @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'remove rp @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.subtract(`rp_${user.id}`, amount)
        return message.inlineReply(`Reputação removida ao perfil de ${user}.`)
    }

    if (['xp'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove xp @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'remove xp @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.subtract(`xp_${user.id}`, amount)
        return message.inlineReply(`Experiência removida ao perfil de ${user}.`)
    }

    if (['blacklist'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove blacklist @user Valor`')
        }

        db.delete(`blacklist_${user.id}`, user.id)
        return message.inlineReply(`Você removeu ${user} da blacklist.`)
    }

    if (['whitelist'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove whitelist @user`')
        }

        db.delete(`whitelist_${user.id}`, user.id)
        return message.inlineReply(`Você removeu ${user} da whitelist.`)
    }

    if (['whitelistid'].includes(args[0])) {

        var id = args[1]
        if (!id) {
            return message.inlineReply('`' + prefix + 'remove whitelist ID`')
        }

        db.delete(`whitelist_${id}`, id)
        return message.inlineReply(`Você removeu <@${user}> da whitelist.`)
    }

    if (['timeout', 'tempo', 'cooldown'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'remove timeout @user')
        }

        db.delete(`dailyxp_${user.id}`)
        db.delete(`rptimeout_${user.id}`)
        db.delete(`robtime_${user.id}`)
        db.delete(`lotery_${user.id}`)
        db.delete(`work_${user.id}`)
        db.delete(`slut_${user.id}`)
        db.delete(`preso_${user.id}`)
        db.delete(`pego_${user.id}`)
        db.delete(`procurado_${user.id}`)
        db.delete(`assaltotime_${user.id}`)
        await message.inlineReply(`Todos os Timeouts de ${user} foram removidos.`)
    } else {
        return message.inlineReply(`Não achei nada com o nome **${args[0]}** no meu banco de dados.`)
    }
}