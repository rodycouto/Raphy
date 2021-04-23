const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (!args[0]) {
        var commands = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('📋 Comandos Exclusivos de Adição (OWNER)')
            .setDescription('Com este comando, o meu criador torna possivel a adição de qualquer item da loja para qualquer pessoa.')
            .addField('Comando', '`' + prefix + 'add Item @user Quantidade`')
        return message.inlineReply(commands)
    }

    var rody = message.author.id === ("451619591320371213")
    if (!rody) {
        message.delete()
        return message.inlineReply('⚠️ Este comando é um comando restrito.').then(msg => msg.delete({ timeout: 5000 }))
    }

    let user = message.mentions.members.first()

    if (['banco', 'bank'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add bank @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add bank @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`banco_${user.id}`, amount)
        return message.inlineReply(`O dinheiro foi adicionado no banco de ${user}`)
    }

    if (['iscas', 'isca'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add iscas @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add iscas @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`iscas_${user.id}`, amount)
        return message.inlineReply(`${args[1]} iscas foram adicionadas ao slot de ${user}.`)
    }

    if (['fichas', 'ficha'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add fichas @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add fichas @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`fichas_${user.id}`, amount)
        return message.inlineReply(`${args[1]} fichas foram adicionadas ao slot de ${user}.`)
    }

    if (['mp', 'money'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add money @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add money @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`mpoints_${user.id}`, amount)
        return message.inlineReply(`Dinheiro adicionado a conta de ${user}.`)
    }

    if (['peixe', 'peixes', 'fish'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add peixes @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add peixes @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`peixes_${user.id}`, amount)
        return message.inlineReply(`${args[1]} peixes foram adicionados ao slot de ${user}.`)
    }

    if (['rp', 'reputação'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add rp @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add rp @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`rp_${user.id}`, amount)
        return message.inlineReply(`${args[1]} reputações foram adicionadas ao perfil de ${user}.`)
    }

    if (['xp'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add xp @user Valor`')
        }
        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add xp @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`xp_${user.id}`, amount)
        return message.inlineReply(`Experiência adicionada ao perfil de ${user}.`)
    }

    if (['agua', 'água', 'water'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add água @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add água @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`agua_${user.id}`, amount)
        return message.inlineReply(`${args[1]} águas foram adicionadas ao slot de ${user}.`)
    }

    if (['minerio', 'minério'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add minério @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add minério @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`minerio_${user.id}`, amount)
        return message.inlineReply(`${args[1]} minérios foram adicionadas ao slot de ${user}.`)
    }

    if (['diamantes', 'diamante', 'diamond'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add diamantes @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add diamantes @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`diamond_${user.id}`, amount)
        return message.inlineReply(`${args[1]} diamantes foram adicionadas ao slot de ${user}.`)
    }

    if (['ossos', 'bone', 'osso'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add ossos @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add ossos @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`ossos_${user.id}`, amount)
        return message.inlineReply(`${args[1]} ossos foram adicionadas ao slot de ${user}.`)
    }

    if (['maça', 'apple', 'maças'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add maça @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add maça @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`apple_${user.id}`, amount)
        return message.inlineReply(`${args[1]} maças foram adicionadas ao slot de ${user}.`)
    }

    if (['madeira', 'wood', 'madeiras'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add madeiras @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add madeiras @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`madeira_${user.id}`, amount)
        return message.inlineReply(`${args[1]} madeiras foram adicionadas ao slot de ${user}.`)
    }

    if (['camarão', 'camarao'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add camarão @user Valor`')
        }

        let amount = args[2]
        if (!amount) {
            return message.inlineReply('`' + prefix + 'add camarão @user Valor`')
        }
        if (isNaN(amount)) {
            return message.inlineReply(`**${args[2]}** não é um número.`)
        }

        db.add(`camarao_${user.id}`, amount)
        return message.inlineReply(`${args[1]} camarões foram adicionadas ao slot de ${user}.`)
    }

    if (['blacklist'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add blacklist @user Valor`')
        }

        db.add(`blacklist_${user.id}`, user.id)
        return message.inlineReply(`${user} foi adicionado a blacklist com sucesso!`)
    }

    if (['whitelist'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'add whitelist @user Valor`')
        }

        db.add(`whitelist_${user.id}`, user.id)
        return message.inlineReply(`${user} foi adicionado a whitelist com sucesso!`)
    }

    return message.inlineReply('Comando não encontrado no registro.')
}