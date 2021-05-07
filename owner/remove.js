const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    let commands = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('📋 Comandos Exclusivos de Adição (OWNER)')
        .setDescription('Com este comando, o meu criador torna possivel a adição de qualquer item da loja para qualquer pessoa.')
        .addField('Comando', '`' + prefix + 'remove Item @user Quantidade`')

    if (!args[0]) { return message.channel.send(commands) }

    let rody = message.author.id === ("451619591320371213")
    if (!rody) {
        message.delete().catch(err => { return })
        return message.channel.send('⚠️ Este é um comando restrito.').then(msg => msg.delete({ timeout: 5000 }))
    }

    let user = message.mentions.members.first()

    if (['banco', 'bank'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove bank @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove bank @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`banco_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['bancoid', 'bankid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove bancoid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove bancoid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`banco_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['title', 'titulo', 'título'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove título @user`') }

        db.delete(`titulo_${user.id}`)
        return message.inlineReply(`O título de ${user} foi removido.`)
    }

    if (['titleid', 'tituloid', 'títuloid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove tituloid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`titulo_${id}`)
        return message.inlineReply(`O título de <@${id}> *(${id})* foi removido.`)
    }

    if (['iscas', 'isca'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove iscas @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove iscas @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`iscas_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['iscasid', 'iscaid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove iscasid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove iscasid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`iscas_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['cartas', 'carta'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove cartas @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.inlineReply('`' + prefix + 'remove cartas @user Valor`') }
        if (isNaN(amount)) { return message.inlineReply(`**${args[2]}** não é um número.`) }

        db.subtract(`cartas_${user.id}`, amount)
        return message.inlineReply(`Cartas removidas do slot de ${user}.`)
    }

    if (['cartasid', 'cartaid'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove cartasid @user Valor`') }

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove cartasid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }
        
        let amount = args[2]
        if (!amount) { return message.inlineReply('`' + prefix + 'remove cartasid @user Valor`') }
        if (isNaN(amount)) { return message.inlineReply(`**${args[2]}** não é um número.`) }

        db.subtract(`cartas_${id}`, amount)
        return message.inlineReply(`Cartas removidas do slot de <@${id}> *(${id})*.`)
    }

    if (['comida', 'food'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove comida @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove comida @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`comida_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['comidaid', 'foodid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove comidaid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove comidaid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`comida_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['fichas', 'ficha'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove fichas @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove fichas @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`fichas_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['fichasid', 'fichaid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove fichasid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove fichasid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`fichas_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['rp', 'money'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove money @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove money @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`mpoints_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['npid', 'moneyid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove moneyid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove moneyid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`mpoints_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['peixe', 'peixes', 'fish'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove peixes @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove peixes @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`peixes_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['peixeid', 'peixesid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove peixesid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove peixesid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`peixes_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['rp', 'reputação'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove rp @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove rp @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`rp_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['rpid', 'reputaçãoid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove rpid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove rpid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`rp_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['xp'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove xp @user Valor`') }
        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove xp @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`xp_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['xpid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove xpid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove xpid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`xp_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['agua', 'água', 'water'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove água @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove água @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`agua_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['aguaid', 'waterid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove aguaid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove aguaid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`agua_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['minerio', 'minério'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove minério @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove minério @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`minerio_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['minerioid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove minerioid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove minerioid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`minerio_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['diamantes', 'diamante', 'diamond'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove diamantes @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove diamantes @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`diamond_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['diamantesid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove diamantesid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove diamantesid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`diamond_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['ossos', 'bone', 'osso'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove ossos @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove ossos @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`ossos_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['ossosid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove ossosid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove ossosid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`ossos_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['maça', 'apple', 'maças'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove maça @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove maça @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`apple_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['maçaid', 'appleid', 'maçasid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove ossosid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove maça @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`apple_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['arma'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove arma @user`') }

        db.delete(`arma_${user.id}`)
        return message.inlineReply(`Arma removida do slot de ${user}.`)
    }

    if (['armaid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove armaid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`arma_${id}`)
        return message.inlineReply(`Arma removida do slot de ${id}> *(${id})*.`)
    }
    //--------------------
    if (['picareta'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove picareta @user`') }

        db.delete(`picareta_${user.id}`)
        return message.inlineReply(`Picareta removida do slot de ${user}.`)
    }

    if (['picaretaid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove picaretaid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`picareta_${user.id}`)
        return message.inlineReply(`Picareta removida do slot de <@${id}> *(${id})*.`)
    }

    if (['machado'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove machado @user`') }

        db.delete(`machado_${user.id}`)
        return message.inlineReply(`Machado removido do slot de ${user}.`)
    }

    if (['machadoid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove machadoid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`machado_${user.id}`)
        return message.inlineReply(`Machado removido do slot de <@${id}> *(${id})*.`)
    }

    if (['vara', 'vara de pesca'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove vara @user`') }

        db.delete(`vara_${user.id}`)
        return message.inlineReply(`Vara de pesca removida do slot de ${user}.`)
    }

    if (['varaid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove varaid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`vara_${user.id}`)
        return message.inlineReply(`Vara de pesca removida do slot de <@${id}> *(${id})*.`)
    }

    if (['faca'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove faca @user`') }

        db.delete(`faca_${user.id}`)
        return message.inlineReply(`Faca removida do slot de ${user}.`)
    }

    if (['facaid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove facaid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`faca_${user.id}`)
        return message.inlineReply(`Faca removida do slot de <@${id}> *(${id})*.`)
    }

    if (['loli'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove loli @user`') }

        db.delete(`loli_${user.id}`)
        return message.inlineReply(`Loli removida do slot de ${user}.`)
    }

    if (['loliid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove loliid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`loli_${id}`)
        return message.inlineReply(`Loli removida do slot de <@${id}> *(${id})*.`)
    }

    if (['fossil'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove fossil @user`') }

        db.delete(`fossil_${user.id}`)
        return message.inlineReply(`Fossil removido do slot de ${user}.`)
    }

    if (['fossiid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove fossiid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`fossil_${id}`)
        return message.inlineReply(`Fossil removida do slot de <@${id}> *(${id})*.`)
    }

    if (['mamute'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove mamute @user`') }

        db.delete(`mamute_${user.id}`)
        return message.inlineReply(`Mamute removido do slot de ${user}.`)
    }

    if (['mamuteid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove mamuteid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`mamute_${id}`)
        return message.inlineReply(`Mamute removido do slot de <@${id}> *(${id})*.`)
    }

    if (['madeira', 'wood', 'madeiras'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove madeiras @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove madeiras @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`madeira_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['madeiraid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove madeiraid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove madeiraid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`madeira_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['commandstotal', 'commands'].includes(args[0])) {

        let amount = args[1]
        if (!amount) { return message.channel.send('`' + prefix + 'remove commands Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[1]}** não é um número.`) }

        db.subtract('CommandCountGeneral', amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['commandsdaily'].includes(args[0])) {

        let amount = args[1]
        if (!amount) { return message.channel.send('`' + prefix + 'remove commandsdaily Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[1]}** não é um número.`) }

        db.subtract('CommandCountDaily', amount)
        return message.channel.send(`Feito!`)
    }

    if (['camarão', 'camarao'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove camarão @user Valor`') }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove camarão @user Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`camarao_${user.id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['camaraoid', 'caramarãoid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove camaraoid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        let amount = args[2]
        if (!amount) { return message.channel.send('`' + prefix + 'remove camaraoid ID Valor`') }
        if (isNaN(amount)) { return message.channel.send(`**${args[2]}** não é um número.`) }

        db.subtract(`camarao_${id}`, amount)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['blacklist'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove blacklist @user`') }

        db.subtract(`blacklist_${user.id}`, user.id)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['blacklistid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove blacklistid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.subtract(`blacklist_${id}`, id)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['whitelistid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove whitelistid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.subtract(`whitelist_${id}`, id)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['nochat', 'noglobal', 'ban', 'block', 'banlist', 'nogloabalchat', 'banchat'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove banchat ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.subtract(`noglobalchat_${id}`, id)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['moderadorglobal', 'modglobal', 'modchat', 'modchatglobal', 'modglobal'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove modglobal @user`') }

        db.subtract(`moderadoreschatglobal_${user.id}`, user.id)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['vip'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove vip @user`') }

        db.delete(`vip_${user.id}`, user.id)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['vipid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove vipid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`vip_${id}`, id)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['modserver', 'servermod', 'serverstaff', 'staffserver', 'serveradm'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove staffserver @user`') }

        db.delete(`modserver_${user.id}`, user.id)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['loteria', 'lotery'].includes(args[0])) {

        let valor = args[1]
        if (!valor) { return message.channel.send('`' + prefix + 'remove lotery Valor`') }
        if (args[2]) { return message.channel.send('Sem args[2] por favor') }
        if (isNaN(valor)) { return message.channel.send(`**${valor}** não é um número.`) }

        db.subtract(`loteria`, valor)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['moderadorglobal', 'modglobal', 'modchat', 'modchatglobal'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove modchat ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(args[1])) { return message.channel.send("Isso não é um número.") }

        db.delete(`moderadoreschatglobal_${id}`, id)
        return message.channel.send(`<@${id}>  foi removido do No Global Chat com sucesso e agora consegue mais falar no chat global!`)
    }

    if (['nochat', 'noglobal', 'ban', 'block', 'banlist', 'nogloabalchat', 'banchat'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove banchat ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`noglobalchat_${id}`, id)
        return message.channel.send(`${user} foi removido do No Global Chat com sucesso e agora consegue mais falar no chat global!`)
    }

    if (['whitelist'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'remove whitelist @user`') }

        db.delete(`whitelist_${user.id}`, user.id)
        return message.channel.send(`<a:Check:836347816036663309> Sucesso!`)
    }

    if (['whitelistid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove whitelistid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`whitelist_${id}`, id)
        return message.inlineReply(`Você removeu <@${id}> *(${id})*da whitelist.`)
    }

    if (['blacklist'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove blacklist @user Valor`') }

        db.delete(`blacklist_${user.id}`, user.id)
        return message.inlineReply(`Você removeu ${user} da blacklist.`)
    }

    if (['blacklistid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove blacklistid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`blacklist_${id}`, id)
        return message.inlineReply(`Você removeu <@${id}> *(${id})* da blacklist.`)
    }

    if (['timeout', 'tempo', 'cooldown'].includes(args[0])) {

        if (!user) { return message.inlineReply('`' + prefix + 'remove timeout @user') }

        db.delete(`dailyxp_${user.id}`)
        db.delete(`rptimeout_${user.id}`)
        db.delete(`robtime_${user.id}`)
        db.delete(`lotery_${user.id}`)
        db.delete(`work_${user.id}`)
        db.delete(`slut_${user.id}`)
        db.delete(`PorquinhoTimeout_${user.id}`)
        db.delete(`preso_${user.id}`)
        db.delete(`pego_${user.id}`)
        db.delete(`procurado_${user.id}`)
        db.delete(`assaltotime_${user.id}`)
        return message.inlineReply(`Todos os Timeouts de ${user} foram removidos.`)
    }

    if (['timeoutid', 'tempoid', 'cooldownid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'remove timeoutid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("<:xis:835943511932665926> Isso não é um número.") }

        db.delete(`dailyxp_${id}`)
        db.delete(`rptimeout_${id}`)
        db.delete(`robtime_${id}`)
        db.delete(`lotery_${id}`)
        db.delete(`work_${id}`)
        db.delete(`slut_${id}`)
        db.delete(`preso_${id}`)
        db.delete(`pego_${id}`)
        db.delete(`PorquinhoTimeout_${user.id}`)
        db.delete(`procurado_${id}`)
        db.delete(`assaltotime_${id}`)
        return message.inlineReply(`Todos os Timeouts de <@${id}> *(${id})* foram removidos.`)
    }

    return message.channel.send('Comando não encontrado no registro.')
}