const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    if (!args[0]) {
        var embed1 = new Discord.MessageEmbed()
            .setColor('#FF0000') // RED 
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'setstatus Um peixinho nadando no mar azul`')
        return message.inlineReply(embed1)
    }

    if (args[20]) {
        var embed15 = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('É permito até 20 palavras no status.')
        return message.inlineReply(embed15)
    }

    var status = args.join(' ')
    var stat = db.get(`status_${message.author.id}`)
    if (status === stat) {
        var iqualstats = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription('O seu status é igual ao do seu perfil.')
        return message.inlineReply(iqualstats)
    }

    var confirm = new Discord.MessageEmbed()
        .setColor('BLUE')
        .addFields(
            {
                name: 'Confirmar alteração do Status?',
                value: '`' + status + '`'
            }
        )

    await message.inlineReply(confirm).then(msg => {
        msg.react('✅') // Check
        msg.react('❌') // X

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            if (reaction.emoji.name === '✅') { // Check
                msg.delete().catch(err => { return })
                db.set(`status_${message.author.id}`, status)
                var embednewstatus = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle('Status alterado com sucesso!')
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