const Discord = require('discord.js')
const translate = require('@iamtraction/google-translate')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let googlepng = 'https://i.imgur.com/oZA4FaQ.png'
    let language = args[0]
    let text = args.slice(1).join(" ")

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    const lan = new Discord.MessageEmbed()
        .setColor('#8B0000') // Red
        .setTitle('Siga o formato correto')
        .setDescription('`' + prefix + 't en/pt/fr/lt A frase que deseja traduzir`')

    if (!language || language.length !== 2 || !text) { return message.inlineReply(lan) }

    translate(args.slice(1).join(" "), { to: language }).then(res => {
        const translateEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setAuthor(`Google Tradutor`, googlepng)
            .setDescription("```css\n" + `${res.text}` + "\n```", false)
            .setColor("#6959CD")
        message.inlineReply(translateEmbed)
    }).catch(err => {
        message.inlineReply("Eu tive um problema com a tradução.\n`Tente novamente usando o padrão do comando, se o problema persistir, por favor, user o comando de `-sup`")
        console.log(err)
    })
}