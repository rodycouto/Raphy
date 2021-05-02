const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (!args[0]) {
        let commands = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('📋 Comandos Exclusivos de Delete (OWNER)')
            .setDescription('Com este comando, o meu criador torna possivel a opção de Deletar qualquer item de qualquer pessoa.')
            .addField('Comando', '`' + prefix + 'delete Item @user`')
        return message.channel.send(commands)
    }

    let rody = message.author.id === ("451619591320371213")
    if (!rody) {
        message.delete().catch(err => { return })
        return message.channel.send('⚠️ Este é um comando restrito.').then(msg => msg.delete({ timeout: 5000 }))
    }

    let user = message.mentions.members.first()

    if (['banco', 'bank'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete bank @user`') }

        db.delete(`banco_${user.id}`)
        return message.channel.send(`O banco de ${user} foi deletado`)
    }

    if (['comida', 'food'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete comida @user`') }

        db.delete(`comida_${user.id}`)
        return message.channel.send(`As comidas de ${user} foram deletadas`)
    }

    if (['moneyid', 'mpid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.channel.send('`' + prefix + 'delete moneyid ID`') }

        db.delete(`mpoints_${id}`)
        db.delete(`banco_${id}`)
        return message.channel.send('Feito!')
    }

    if (['iscas', 'isca'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete iscas @user`') }

        db.delete(`iscas_${user.id}`)
        return message.channel.send(`As iscas de ${user} foram deletadas..`)
    }

    if (['cartas', 'carta'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete cartas @user`') }

        db.delete(`cartas_${user.id}`)
        return message.channel.send(`As cartas de ${user} foram deletadas..`)
    }

    if (['np', 'money', 'carteira'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete money @user`') }

        db.delete(`mpoints_${user.id}`)
        return message.channel.send(`O dinheiro da carteira de ${user} foi deletado.`)
    }

    if (['peixe', 'peixes', 'fish'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete peixes @user`') }

        db.delete(`peixes_${user.id}`)
        return message.channel.send(`Os peixes de ${user} foram deletados.`)
    }

    if (['rp', 'reputação'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete rp @user`') }
        db.delete(`rp_${user.id}`)
        return message.channel.send(`A reputação de ${user} foi deletada.`)
    }

    if (['status'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete status @user`') }

        db.delete(`status_${user.id}`)
        return message.channel.send(`O status de ${user} foi deletado.`)
    }

    if (['xp', 'level'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete xp @user`') }

        db.delete(`xp_${user.id}`)
        db.delete(`level_${user.id}`)
        return message.channel.send(`O level de ${user} foi deletado.`)
    }

    if (['xpid', 'levelid'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.channel.send('`' + prefix + 'delete xpid @user`') }

        db.delete(`xp_${id}`)
        db.delete(`level_${id}`)
        return message.channel.send(`O level de <@${user}> foi deletado.`)
    }

    if (['marry', 'casal', 'casamento'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete marry @user`') }

        db.delete(`marry_${user.id}`)
        return message.channel.send(`O relacionamento de ${user} foi deletado.`)
    }

    if (['family1'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete family1 @user`') }

        db.delete(`family1_${user.id}`)
        return message.channel.send(`O family1 de ${user} foi deletado.`)
    }

    if (['family2'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete family2 @user`') }

        db.delete(`family2_${user.id}`)
        return message.channel.send(`O family2 de ${user} foi deletado.`)
    }

    if (['family3'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete family2 @user`') }

        db.delete(`family3_${user.id}`)
        return message.channel.send(`O family3 de ${user} foi deletado.`)
    }

    if (['dailycommands'].includes(args[0])) {

        db.delete('CommandCountDaily')
        return message.channel.send(`Feito!`)
    }

    if (['title', 'titulo', 'título'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete título @user`') }

        db.delete(`title_${user.id}`)
        return message.channel.send(`A permissão de alterar o título, foi deletada da conta de ${user}.`)
    }

    if (['remedio', 'remédio'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'del remedio @user`') }

        db.delete(`remedio_${user.id}`)
        return message.channel.send(`O remédio Do Velho Welter foi deletado do slot de ${user}.`)
    }

    if (['blacklist'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete blacklist @user`') }

        db.delete(`blacklist_${user.id}`, user.id)
        return message.channel.send(`Você deletou ${user} da blacklist.`)
    } //

    if (['niver', 'aniversário', 'aniversario'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete niver @user`') }

        db.delete(`aniversario_${user.id}`)
        return message.channel.send(`Você deletou a data de aniversário de ${user}.`)
    }

    if (['whitelist'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete whitelist @user`') }

        db.delete(`whitelist_${user.id}`, user.id)
        return message.channel.send(`Você deletou ${user} da whitelist.`)
    }

    if (['nochat', 'noglobal', 'ban', 'block', 'banlist', 'nogloabalchat', 'banglobal'].includes(args[0])) {

        let id = args[1]
        if (!id) { return message.inlineReply('`' + prefix + 'delete banglobal ID`') }
        if (id.length < 17) { return message.channel.send("Isso não é um ID") }
        if (isNaN(id)) { return message.channel.send("Isso não é um número.") }

        db.delete(`noglobalchat_${id}`, id)
        return message.channel.send(`${user} foi removido do No Global Chat com sucesso e agora consegue mais falar no chat global!`)
    }

    if (['timeout', 'tempo', 'cooldown'].includes(args[0])) {

        if (!user) { return message.channel.send('`' + prefix + 'delete timeout @user') }

        db.delete(`dailyxp_${user.id}`)
        db.delete(`rptimeout_${user.id}`)
        db.delete(`robtime_${user.id}`)
        db.delete(`lotery_${user.id}`)
        db.delete(`worked_${user.id}`)
        db.delete(`slut_${user.id}`)
        db.delete(`preso_${user.id}`)
        db.delete(`pego_${user.id}`)
        db.delete(`globaltiming_${user.id}`)
        db.delete(`esmolatimeout_${user.id}`)
        db.delete(`lancetimeout_${user.id}`)
        db.delete(`procurado_${user.id}`)
        db.delete(`assaltotime_${user.id}`)
        db.delete(`roletatimeout_${user.id}`)
        return message.channel.send(`Todos os Timeouts de ${user} foram deletados.`)
    }

    return message.channel.send('Comando não encontrado no registro.')
}