const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (!args[0]) {
        var commands = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('📋 Comandos Exclusivos de Delete (OWNER)')
            .setDescription('Com este comando, o meu criador torna possivel a opção de Deletar qualquer item de qualquer pessoa.')
            .addField('Comando', '`' + prefix + 'delete Item @user`')
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
            return message.inlineReply('`' + prefix + 'del bank @user`')
        }

        db.delete(`banco_${user.id}`)
        return message.inlineReply(`O banco de ${user} foi deletado`)
    }

    if (['moneyid'].includes(args[0])) {
        let id = args[1]
        if (!id) {
            return message.inlineReply('`' + prefix + 'del moneyid ID`')
        }
        db.delete(`mpoints_${id}`)
        db.delete(`banco_${id}`)
        return message.inlineReply('Feito!')
    }

    if (['iscas', 'isca'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del iscas @user`')
        }

        db.delete(`iscas_${user.id}`)
        return message.inlineReply(`As iscas de ${user} foram deletadas..`)
    }

    if (['cartas', 'carta'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del cartas @user`')
        }

        db.delete(`cartas_${user.id}`)
        return message.inlineReply(`As cartas de ${user} foram deletadas..`)
    }

    if (['mp', 'money', 'carteira'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del money @user`')
        }

        db.delete(`mpoints_${user.id}`)
        return message.inlineReply(`O dinheiro da carteira de ${user} foi deletado.`)
    }

    if (['peixe', 'peixes', 'fish'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del peixes @user`')
        }

        db.delete(`peixes_${user.id}`)
        return message.inlineReply(`Os peixes de ${user} foram deletados.`)
    }

    if (['rp', 'reputação'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del rp @user`')
        }
        db.delete(`rp_${user.id}`)
        return message.inlineReply(`A reputação de ${user} foi deletada.`)
    }

    if (['status'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del status @user`')
        }

        db.delete(`status_${user.id}`)
        return message.inlineReply(`O status de ${user} foi deletado.`)
    }

    if (['xp', 'level'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del xp @user`')
        }

        db.delete(`xp_${user.id}`)
        db.delete(`level_${user.id}`)
        return message.inlineReply(`O level de ${user} foi deletado.`)
    }

    if (['marry', 'casal', 'casamento'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del marry @user`')
        }

        db.delete(`marry_${user.id}`)
        return message.inlineReply(`O relacionamento de ${user} foi deletado.`)
    }

    if (['family1'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del family1 @user`')
        }

        db.delete(`family1_${user.id}`)
        return message.inlineReply(`O family1 de ${user} foi deletado.`)
    }

    if (['family2'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del family2 @user`')
        }

        db.delete(`family2_${user.id}`)
        return message.inlineReply(`O family2 de ${user} foi deletado.`)
    }

    if (['family3'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del family2 @user`')
        }

        db.delete(`family3_${user.id}`)
        return message.inlineReply(`O family3 de ${user} foi deletado.`)
    }

    if (['title', 'titulo', 'título'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del título @user`')
        }

        db.delete(`title_${user.id}`)
        return message.inlineReply(`A permissão de alterar o título, foi deletada da conta de ${user}.`)
    }

    if (['blacklist'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del blacklist @user`')
        }

        db.delete(`blacklist_${user.id}`, user.id)
        return message.inlineReply(`Você deletou ${user} da blacklist.`)
    } //

    if (['niver', 'aniversário', 'aniversario'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del niver @user`')
        }

        db.delete(`aniversario_${user.id}`)
        return message.inlineReply(`Você deletou a data de aniversário de ${user}.`)
    }

    if (['whitelist'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del whitelist @user`')
        }

        db.delete(`whitelist_${user.id}`, user.id)
        return message.inlineReply(`Você deletou ${user} da whitelist.`)
    }

    if (['timeout', 'tempo', 'cooldown'].includes(args[0])) {

        if (!user) {
            return message.inlineReply('`' + prefix + 'del timeout @user')
        }

        db.delete(`dailyxp_${user.id}`)
        db.delete(`rptimeout_${user.id}`)
        db.delete(`robtime_${user.id}`)
        db.delete(`lotery_${user.id}`)
        db.delete(`worked_${user.id}`)
        db.delete(`slut_${user.id}`)
        db.delete(`preso_${user.id}`)
        db.delete(`pego_${user.id}`)
        db.delete(`procurado_${user.id}`)
        db.delete(`assaltotime_${user.id}`)
        db.delete(`roletatimeout_${user.id}`)
        return message.inlineReply(`Todos os Timeouts de ${user} foram deletados.`)
    }

    return message.inlineReply('Comando não encontrado no registro.')
}