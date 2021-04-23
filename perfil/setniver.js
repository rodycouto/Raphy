const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (!args[0]) {
        var noargs = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('🎉 Data de Aniversário')
            .setDescription('Defina sua data de aniversário no seu perfil atráves deste comando. Claro, é tudo opicional.\n \nObs: É obrigatório seguir o formato do exemplo! Com espaçamento e no formato DD/MM/AAAA')
            .addField('`' + prefix + 'setniver 15 / 03 / 2007`', '**Desative**\n`' + prefix + 'setniver off`')
            .setFooter('Siga o formato, ok?')
        return message.inlineReply(noargs)
    }

    var erro = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Siga o formato correto')
        .setDescription('Exemplo: `' + prefix + 'setniver 15 / 03 / 2007`')

    if (['off'].includes(args[0])) {

        return message.inlineReply('Você realmente deseja deletar sua data de aniversário do perfil?').then(msg => {
            msg.react('✅').catch(err => { return })
            msg.react('❌').catch(err => { return })
            msg.delete({ timeout: 30000 }).catch(err => { return })

            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return

                if (reaction.emoji.name === '✅') {
                    msg.delete().catch(err => { return })
                    db.delete(`aniversario_${message.author.id}`)
                    var ok = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('✅ Sucesso!')
                        .setDescription('Sua data de aniversário foi deletada com sucesso.')
                    return message.inlineReply(ok)
                }

                if (reaction.emoji.name === '❌') {
                    msg.delete().catch(err => { return })
                    return message.inlineReply('Comando cancelado.')
                }
            })
        })
    }

    if (args[0] > 31) { // Dia
        return message.inlineReply('Hey, fala um dia do mês, eu acho que o mês acaba no dia 31', erro)
    }

    if (args[0] < 1) { // Dia
        return message.inlineReply('Hey, esse dia não existe nos meses', erro)
    }

    if (isNaN(args[0])) { // Dia
        return message.inlineReply('Números por favor, números.', erro)
    }

    if (args[0].length > 2) { // Dia
        return message.inlineReply('Hey, esse dia não existe nos meses', erro)
    }

    if (args[0].length < 2) { // Dia
        return message.inlineReply('Hey, esse dia não existe nos meses', erro)
    }

    var barra = "/"
    if (args[1] !== barra) {
        return message.inlineReply(erro)
    }

    if (args[2] > 12) {
        return message.inlineReply('Quantos meses tem seu ano?', erro)
    }

    if (args[2] < 1) {
        return message.inlineReply('Qual é, colabora!', erro)
    }

    if (isNaN(args[2])) {
        return message.inlineReply('Sem letras poxa', erro)
    }

    if (args[2].length < 2) {
        return message.inlineReply('Não trolla', erro)
    }

    if (args[2].length > 2) {
        return message.inlineReply('Tá de zoeira né?', erro)
    }

    if (args[3] !== barra) {
        return message.inlineReply('Qual é, colabora!', erro)
    }

    if (args[4] > 2014) {
        return message.inlineReply('Calminha, você tem menos de 7 anos? Você não deveria estar usando o Discord')
    }

    if (args[4] < 1902) {
        return message.inlineReply('Eu acho que você não é a pessoa mais velha do mundo...')
    }

    if (isNaN(args[4])) {
        return message.inlineReply('N Ú M E R O S....')
    }

    if (args[4].length > 4) {
        return message.inlineReply('Tá de zoeira né?', erro)
    }

    if (args[4].length < 4) {
        return message.inlineReply('Qual é...', erro)
    }

    if (args[5]) {
        return message.inlineReply('Espera um pouco, essa data não é válida!', erro)
    }

    var atual = db.get(`aniversario_${message.author.id}`)
    var niver = `${args[0]}/${args[2]}/${args[4]}`

    if (niver === atual) {
        return message.inlineReply('Esta já é sua data de aniversário atual.')
    }

    var confirm = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Sua data de aniversário está correta?')
        .setDescription('`' + niver + '`')
        .setFooter('Auto delete em 30 segundos.')

    return message.inlineReply(confirm).then(msg => {
        msg.react('✅').catch(err => { return })
        msg.react('❌').catch(err => { return })
        msg.delete({ timeout: 30000 }).catch(err => { return })

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            if (reaction.emoji.name === '✅') {
                msg.delete().catch(err => { return })
                db.set(`aniversario_${message.author.id}`, niver)
                var ok = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('🎉 Sucesso!')
                    .setDescription('Sua data de aniversário foi salva com sucesso.')
                return message.inlineReply(ok)
            }

            if (reaction.emoji.name === '❌') {
                msg.delete().catch(err => { return })
                return message.inlineReply('Comando cancelado.')
            }
        })
    })
}