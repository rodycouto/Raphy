const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let status = args.join(' ')
    let stat = db.get(`titulo_${message.author.id}`)
    let perm = db.get(`title_${message.author.id}`)

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    var help = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('🔰 Permissão Título')
        .setDescription('Escolha um título para seu perfil. Se auto nomeie e mostre a todos o quão grandioso/a você é!\n' + 'Exemplo: `' + prefix + 'settitulo Rei do Discord`')

    var embed1 = new Discord.MessageEmbed()
        .setColor('#FF0000') // RED 
        .setTitle('Siga o formato correto')
        .setDescription('Exemplo: `' + prefix + 'settitulo Rei do Discord`')

    var iqualstats = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Esse já é seu título.')

    var confirm = new Discord.MessageEmbed()
        .setColor('BLUE')
        .addFields(
            {
                name: 'Confirmar alteração do Título?',
                value: '`' + status + '`'
            }
        )

    if (args[0] === 'help') { return message.inlineReply(help) }
    if (perm === null) { return message.inlineReply(`Você não tem a permissão 🔰 **Título**. Você pode comprar na **${prefix}loja**`) }
    if (!args[0]) { return message.inlineReply(embed1) }
    if (status === stat) { return message.inlineReply(iqualstats) }
    if (status.length > 20) { return message.inlineReply('O máximo suportado é de **20 caracteres**.') }

    await message.inlineReply(confirm).then(msg => {
        msg.react('✅') // Check
        msg.react('❌') // X

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            if (reaction.emoji.name === '✅') { // Check
                msg.delete().catch(err => { return })
                db.set(`titulo_${message.author.id}`, status)
                var embednewstatus = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle('Título alterado com sucesso!')
                message.inlineReply(embednewstatus)
            }
            if (reaction.emoji.name === '❌') { // MPEmbed
                msg.delete().catch(err => { return })
                var cancel = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle('Comando cancelado.')
                message.inlineReply(cancel)
            }
        })
    })
}