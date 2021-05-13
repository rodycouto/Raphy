const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (!args[0]) {
        let commands = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('📋 Comandos Exclusivos de Delete (OWNER)')
            .setDescription('Com este comando, o meu criador torna possivel a opção de Deletar qualquer item de qualquer pessoa.')
            .addField('Comando', '`' + prefix + 'del Item @user`')
        return message.channel.send(commands)
    }

    let rody = message.author.id === ("451619591320371213")
    if (!rody) {
        message.delete().catch(err => { return })
        return message.channel.send('⚠️ Este é um comando restrito.').then(msg => msg.delete({ timeout: 5000 }))
    }

    let user = message.mentions.members.first()

    if (['banco', 'bank'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del bank @user`') }

        db.delete(`banco_${user.id}`)
        return message.channel.send(`O banco de ${user} foi deletado`)
    }

    if (['banco', 'bank'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'del bancoid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send(`<:xis:835943511932665926> **${args[1]}** não é um número.`) }

        db.delete(`banco_${user.id}`)
        return message.channel.send(`O banco de ${user} foi deletado`)
    }

    if (['cachorro', 'doguinho', 'dog'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del cachorro @user`') }

        db.delete(`cachorro_${user.id}`)
        return message.channel.send(`Cachorrinho Brown foi deletado do slot de ${user}`)
    }

    if (['money', 'rp', 'rpoints'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del money @user`') }

        db.delete(`mpoints_${user.id}`)
        db.delete(`banco_${user.id}`)
        return message.channel.send(`Todo o dinheiro de ${user} foi deletado com sucesso!`)
    }

    if (['moneyid', 'rpid', 'rpointsid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.channel.send('`' + prefix + 'del moneyid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send('<:xis:835943511932665926> Esse ID não é um número.') }

        db.delete(`mpoints_${id}`)
        db.delete(`banco_${id}`)
        return message.channel.send(`Todo o dinheiro de <@${id}> *(${id})* foi deletado com sucesso!.`)
    }

    if (['medalha'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del medalha @user`') }

        db.delete(`medalha_${user.id}`)
        return message.channel.send(`A medalha de ${user} foi deletada com sucesso!`)
    }

    if (['medalhaid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.channel.send('`' + prefix + 'del medalhaid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send('<:xis:835943511932665926> Esse ID não é um número.') }

        db.delete(`medalha_${id}`)
        return message.channel.send(`A medalha de <@${id}> *(${id})* foi deletada com sucesso!.`)
    }

    if (['cachorroid', 'doguinhoid', 'dogid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.channel.send('`' + prefix + 'del cachorroid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send('<:xis:835943511932665926> Esse ID não é um número.') }

        db.delete(`cachorro_${id}`)
        return message.channel.send(`Cachorrinho Brown foi deletado do slot de <@${id}> *(${id})*.`)
    }

    if (['estrelas', 'estrela'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del estrelas @user`') }

        db.delete(`estrela1_${user.id}`)
        db.delete(`estrela2_${user.id}`)
        db.delete(`estrela3_${user.id}`)
        db.delete(`estrela4_${user.id}`)
        db.delete(`estrela5_${user.id}`)
        return message.channel.send(`<:starM:832974891635572787> Estrelas deletadas do slot de ${user}`)
    }

    if (['estrelasid', 'estrelaid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'del estrelasid ID Valor`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send(`<:xis:835943511932665926> **${args[1]}** não é um número.`) }

        db.delete(`estrela1_${id}`)
        db.delete(`estrela2_${id}`)
        db.delete(`estrela3_${id}`)
        db.delete(`estrela4_${id}`)
        db.delete(`estrela5_${id}`)
        return message.channel.send(`<:starM:832974891635572787> Estrelas deletadas do slot de <@${id}> *(${id})*`)
    }

    if (['status'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del status @user`') }

        db.delete(`status_${user.id}`)
        return message.channel.send(`O status de ${user} foi deletado.`)
    }

    if (['statusid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'del statusid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send(`<:xis:835943511932665926> **${args[1]}** não é um número.`) }

        db.delete(`status_${id}`)
        return message.channel.send(`O status de <@${id}> *(${id})* foi deletado.`)
    }

    if (['xp', 'level'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del xp @user`') }

        db.delete(`xp_${user.id}`)
        db.delete(`level_${user.id}`)
        return message.channel.send(`O level de ${user} foi deletado.`)
    }

    if (['xpid', 'levelid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'del xpid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send(`<:xis:835943511932665926> **${args[1]}** não é um número.`) }

        db.delete(`xp_${id}`)
        db.delete(`level_${id}`)
        return message.channel.send(`O level de <@${id}> *(${id})* foi deletado.`)
    }

    if (['marry', 'casal', 'casamento'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del marry @user`') }

        db.delete(`marry_${user.id}`)
        return message.channel.send(`O relacionamento de ${user} foi deletado.`)
    }

    if (['marryid', 'casalid', 'casamentoid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'del marryid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send(`<:xis:835943511932665926> **${args[1]}** não é um número.`) }

        db.delete(`marry_${id}`)
        return message.channel.send(`O relacionamento de <@${id}> *(${id})* foi deletado.`)
    }

    if (['family1'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del family1 @user`') }

        db.delete(`family1_${user.id}`)
        return message.channel.send(`O family1 de ${user} foi deletado.`)
    }

    if (['family1id'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'del family1id ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send(`<:xis:835943511932665926> **${args[1]}** não é um número.`) }

        db.delete(`family1_${id}`)
        return message.channel.send(`O family1 de <@${id}> *(${id})* foi deletado.`)
    }

    if (['family2'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del family2 @user`') }

        db.delete(`family2_${user.id}`)
        return message.channel.send(`O family2 de ${user} foi deletado.`)
    }

    if (['family2id'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'del family2id ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send(`<:xis:835943511932665926> **${args[1]}** não é um número.`) }

        db.delete(`family2_${id}`)
        return message.channel.send(`O family2 de <@${id}> *(${id})* foi deletado.`)
    }

    if (['family3'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del family2 @user`') }

        db.delete(`family3_${user.id}`)
        return message.channel.send(`O family3 de ${user} foi deletado.`)
    }

    if (['family3id'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'del family3id ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send(`<:xis:835943511932665926> **${args[1]}** não é um número.`) }

        db.delete(`family3_${id}`)
        return message.channel.send(`O family3 de <@${id}> *(${id})* foi deletado.`)
    }

    if (['title', 'titulo', 'título'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del título @user`') }

        db.delete(`title_${user.id}`)
        return message.channel.send(`A permissão de alterar o título, foi deletada da conta de ${user}.`)
    }

    if (['titleid', 'tituloid', 'títuloid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'del tituloid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send(`<:xis:835943511932665926> **${args[1]}** não é um número.`) }

        db.delete(`title_${id}`)
        return message.channel.send(`A permissão de alterar o título, foi deletada da conta de <@${id}> *(${id})*.`)
    }

    if (['remedio', 'remédio'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del remedio @user`') }

        db.delete(`remedio_${user.id}`)
        return message.channel.send(`O remédio Do Velho Welter foi deletado do slot de ${user}.`)
    }

    if (['remedioid', 'remédioid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'del remedioid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send(`<:xis:835943511932665926> **${args[1]}** não é um número.`) }

        db.delete(`remedio_${id}`)
        return message.channel.send(`O remédio Do Velho Welter foi deletado do slot de <@${id}> *(${id})*.`)
    }

    if (['niver', 'aniversário', 'aniversario'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del niver @user`') }

        db.delete(`aniversario_${user.id}`)
        return message.channel.send(`Você deletou a data de aniversário de ${user}.`)
    }

    if (['niverid', 'aniversárioid', 'aniversarioid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'del niverid ID`') }
        if (id.length < 17) { return message.channel.send("<:xis:835943511932665926> Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send(`<:xis:835943511932665926> **${args[1]}** não é um número.`) }

        db.delete(`aniversario_${id}`)
        return message.channel.send(`Você deletou a data de aniversário de <@${id}> *(${id})*.`)
    }

    return message.channel.send('Comando não encontrado no registro.')
}