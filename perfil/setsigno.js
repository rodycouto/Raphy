const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (args[1]) {
        return message.inlineReply('Por favor, mande apenas o comando. `' + prefix + 'setsigno`')
    }

    var embed = new Discord.MessageEmbed()
        .setColor('#AE24C0')
        .setTitle('Escolha seu signo')
        .setDescription('♈ Áries\n♉ Touro\n♊ Gêmeos\n♋ Câncer\n♌ Leão\n♍ Virgem\n♎ Libra\n♏ Escorpião\n♐ Sargitário\n♑ Capricórnio\n♒ Aquário\n♓ Peixes')
        .setFooter('Auto delete em 30 segundos.')

    var sucess = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('✅ Signo alterado com sucesso!')

    return message.inlineReply(embed).then(msg => {
        msg.react('♈').catch(err => { return }) // Áries
        msg.react('♉').catch(err => { return }) // Touro
        msg.react('♊').catch(err => { return }) // Gêmeos
        msg.react('♋').catch(err => { return }) // Câncer
        msg.react('♌').catch(err => { return }) // Leão
        msg.react('♍').catch(err => { return }) // Virgem
        msg.react('♎').catch(err => { return }) // Libra
        msg.react('♏').catch(err => { return }) // Escorpião
        msg.react('♐').catch(err => { return }) // Sargitário
        msg.react('♑').catch(err => { return }) // Capricórnio
        msg.react('♒').catch(err => { return }) // Aquário
        msg.react('♓').catch(err => { return }) // Peixes
        msg.delete({ timeout: 30000 }).catch(err => { return })

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return
            
            if (reaction.emoji.name === '♈') { // Áries
                msg.delete().catch(err => { return })
                db.set(`signo_${message.author.id}`, "♈ Áries")
                return message.channel.send(sucess)
            }

            if (reaction.emoji.name === '♉') { // Touro
                msg.delete().catch(err => { return })
                db.set(`signo_${message.author.id}`, "♉ Touro")
                return message.channel.send(sucess)
            }

            if (reaction.emoji.name === '♊') { // Gêmeos
                msg.delete().catch(err => { return })
                db.set(`signo_${message.author.id}`, "♊ Gêmeos")
                return message.channel.send(sucess)
            }

            if (reaction.emoji.name === '♋') { // Câncer
                msg.delete().catch(err => { return })
                db.set(`signo_${message.author.id}`, "♋ Câncer")
                return message.channel.send(sucess)
            }

            if (reaction.emoji.name === '♌') { // Leão
                msg.delete().catch(err => { return })
                db.set(`signo_${message.author.id}`, "♌ Leão")
                return message.channel.send(sucess)
            }

            if (reaction.emoji.name === '♍') { // Virgem
                msg.delete().catch(err => { return })
                db.set(`signo_${message.author.id}`, "♍ Virgem")
                return message.channel.send(sucess)
            }

            if (reaction.emoji.name === '♎') { // Libra
                msg.delete().catch(err => { return })
                db.set(`signo_${message.author.id}`, "♎ Libra")
                return message.channel.send(sucess)
            }

            if (reaction.emoji.name === '♏') { // Escorpião
                msg.delete().catch(err => { return })
                db.set(`signo_${message.author.id}`, "♏ Escorpião")
                return message.channel.send(sucess)
            }

            if (reaction.emoji.name === '♐') { // Sagitário
                msg.delete().catch(err => { return })
                db.set(`signo_${message.author.id}`, "♐ Sagitário")
                return message.channel.send(sucess)
            }

            if (reaction.emoji.name === '♑') { // Capricórnio
                msg.delete().catch(err => { return })
                db.set(`signo_${message.author.id}`, "♑ Capricórnio")
                return message.channel.send(sucess)
            }

            if (reaction.emoji.name === '♒') { // Aquário
                msg.delete().catch(err => { return })
                db.set(`signo_${message.author.id}`, "♒ Aquário")
                return message.channel.send(sucess)
            }

            if (reaction.emoji.name === '♓') { // Peixes
                msg.delete().catch(err => { return })
                db.set(`signo_${message.author.id}`, "♓ Peixes")
                return message.channel.send(sucess)
            }
        })
    })
}