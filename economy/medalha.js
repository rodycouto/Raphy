const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    message.delete().catch(err => { return message.channel.send('Eu preciso da permissão `Gerenciar Mensagens` para executar este comando. Este comando tem segredos que não pode ser expostos.') })

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let discriminator = message.author.discriminator // Code 1
    let id = message.author.id // Code 2
    let code1 = db.get(`code1_${message.author.id}`)
    let floresta2 = db.get(`floresta2_${message.author.id}`)
    let brown = db.get(`cachorro_${message.author.id}`)
    let bola = db.get(`bola_${message.author.id}`)
    let medalha = db.get(`medalha_${message.author.id}`)
    let remedio = db.get(`remedio_${message.author.id}`)

    const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('🏅 Medalha Cammum')
        .setDescription('Por seus esforços, o Rei Vouwer Heslow te nomeará Cavaleiro(a) Pessoal da Princesa Kaya! Por este mérito, você ganhará uma medalha!')
        .addField('Comando de Ativação', '`' + prefix + 'medalha Código Pessoal 1`\n' + '`' + prefix + 'medalha Código Pessoal 2`')
        .setFooter('Se você desvendou o enigma do código, não repasse para ninguém.')

    const CódigoErradoEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('<:xis:835943511932665926> Código errado!')
        .setDescription('Você não sabe os seus códigos pessoais? Leia com atenção a história. `' + prefix + 'floresta continue`')

    const CódigoCertoEmbed1 = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('1/2 Você disse o primeiro código com sucesso!')

    const CódigoCertoEmbed2 = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('🏅 Medalha Cammum Adquirida')
        .setDescription('Você adquiriu um item de classe especial!')

    if (brown === null) { return message.channel.send('<:xis:835943511932665926> Você ainda não resgatou o Brown!') }
    if (!db.get(`cachorro_${message.author.id}`)) { return message.channel.send('<:xis:835943511932665926> Você ainda não resgatou o Brown!') }
    if (remedio === null) { return message.channel.send('<:xis:835943511932665926> Você ainda não achou os remédios do Velho Walker!') }
    if (!db.get(`remedio_${message.author.id}`)) { return message.channel.send('<:xis:835943511932665926> Você ainda não achou os remédios do Velho Walker!') }
    if (bola === null) { return message.channel.send('<:xis:835943511932665926> Brown está triste porque você não achou a bolinha dele. Volte para a Floresta Cammum e ache a bolinha.') }
    if (!db.get(`bola_${message.author.id}`)) { return message.channel.send('<:xis:835943511932665926> Brown está triste porque você não achou a bolinha dele. Volte para a Floresta Cammum e ache a bolinha.') }
    if (medalha) { return message.channel.send('<:xis:835943511932665926> Você já adquiriu sua medalha!') }
    if (!floresta2) { return message.channel.send('<:xis:835943511932665926> Leia a história #4 Final e ache seu código!') }

    if (args[0]) { return message.channel.send(embed) }
    if (args[1]) { return message.channel.send(CódigoErradoEmbed) }

    if (args[0] === discriminator) {
        if (code1) { return message.channel.send('<:xis:835943511932665926> Soldado, você já disse o primeiro código.') }

        setTimeout(function () {
            db.set(`code1_${message.author.id}`, "OK")
            message.channel.send(CódigoCertoEmbed1)
        }, 7100)
        return message.channel.send('<a:carregando:836101628083437608> Verificando primeiro código pessoal...').then(msg => msg.delete({ timeout: 7000 }))

    } else if (args[0] === id) {
        if (!code1) { return message.channel.send('<:xis:835943511932665926> Soldado, parece que você já descobriu qual é o segundo código. Porém, diga primeiro código antes.') }

        setTimeout(function () {
            db.delete(`code1_${message.author.id}`)
            db.delete(`floresta2_${message.author.id}`)
            db.set(`medalha_${message.author.id}`, "ON")
            message.channel.send(CódigoCertoEmbed2)
        }, 9100)
        return message.channel.send('<a:carregando:836101628083437608> Verificando segundo código pessoal...').then(msg => msg.delete({ timeout: 9000 }))

    } else {
        return message.channel.send(CódigoErradoEmbed)
    }
}