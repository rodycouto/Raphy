const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    let canal = client.channels.cache.get('830982931937624114')
    if (!canal) { message.inlineReply('<:xis:835943511932665926> | O canal de envio no Servidor Central não existe. Use `' + prefix + 'help` e notifique meu criador.') }

    function is_url(str) {
        let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)) { return true } else { return false }
    }

    let tema = args[0]
    let link = args[1]

    const noargs = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('📢 Envie Gifs')
        .setDescription('Por causa de tantos comandos e TANTOS gifs, ficou ruim para apenas uma pessoa pegar todos os gifs, então, este comando foi feito.\n \nEnvie gifs pra Raphy! Só seguir os requisitos.')
        .addField('Requisitos', '**NADA** pornografico ou de cunho criminoso.\nLink do imigur\nFale para qual tema você quer que eu coloque seu gif')
        .addField('Comando exemplo', '`' + prefix + 'gif Naruto https://imgur.com/D5KT1S`')
        .setImage('https://imgur.com/F1nJKHZ.gif')
        .setFooter('O Gif será enviado para o meu servidor, você pode encontra-lo no comando ' + prefix + 'help')

    const formato = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setTitle('Por favor, siga o formato correto')
        .setDescription('`' + prefix + 'gif Naruto LinkDoImigur`\n' + '`' + prefix + 'gif Naruto https://imgur.com/D5KT1S`')

    const newgif = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('📢 Novo Gif')
        .addField('Enviado por', `${message.author.tag} *(${message.author.id})*`, true)
        .addField('Servidor', message.guild.name, true)
        .addField('Tema', tema, true)
        .addField('Link do Gif', `[link](${link})`, true)

    if (!tema) { return message.inlineReply(noargs) }
    if (!link) { return message.inlineReply(formato) }
    if (is_url(link) === false) { return message.inlineReply(`Por favor, envie um link válido.`) }
    if (args[2]) { return message.inlineReply(formato) }

    canal.send(newgif)
    setTimeout(function () { message.inlineReply('<a:Check:836347816036663309> Gif enviado com sucesso!') }, 4100)
    return message.inlineReply('<a:Pulse:839682326211854337> Enviando Gif ao Servidor Central...').then(msg => msg.delete({ timeout: 4000 }))
}