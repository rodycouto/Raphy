const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (!args[0]) {
        var dados = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Quantos dados você quer rolar?')
            .setDescription('`Você pode usar ' + prefix + 'dado 1/2/3/4`' + '\n \n1 | 2 | 3 | 4 | ❌ - Cancelar')
        await message.channel.send(dados).then(msg => {
            msg.react('🟧') // 1
            msg.react('🟦') // 2
            msg.react('🟥') // 3
            msg.react('🟫') // 4
            msg.react('❌') // cancel

            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return

                if (reaction.emoji.name === '🟧') { // 1
                    msg.delete().catch(err => { return })
                    var numb = ['1', '2', '3', '4', '5', '6']
                    var rand = numb[Math.floor(Math.random() * numb.length)]

                    var embed = new Discord.MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('🎲 Rolando os dados...')
                    return message.channel.send(embed).then(msg => msg.delete({ timeout: 2500 })).then(msg => msg.channel.send("🎲 `" + rand + '`'))
                }
                if (reaction.emoji.name === '🟦') { // 2
                    msg.delete().catch(err => { return })
                    var numb = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                    var rand = numb[Math.floor(Math.random() * numb.length)]

                    var embed = new Discord.MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('🎲 Rolando os dados...')
                    return message.channel.send(embed).then(msg => msg.delete({ timeout: 2500 })).then(msg => msg.channel.send("🎲 `" + rand + '`'))
                }
                if (reaction.emoji.name === '🟥') { // 3
                    msg.delete().catch(err => { return })
                    var numb = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
                    var rand = numb[Math.floor(Math.random() * numb.length)]

                    var embed = new Discord.MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('🎲 Rolando os dados...')
                    return message.channel.send(embed).then(msg => msg.delete({ timeout: 2500 })).then(msg => msg.channel.send("🎲 `" + rand + '`'))
                }
                if (reaction.emoji.name === '🟫') { // 4
                    msg.delete().catch(err => { return })
                    var numb = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
                    var rand = numb[Math.floor(Math.random() * numb.length)]

                    var embed = new Discord.MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('🎲 Rolando os dados...')
                    return message.channel.send(embed).then(msg => msg.delete({ timeout: 2500 })).then(msg => msg.channel.send("🎲 `" + rand + '`'))
                }
                if (reaction.emoji.name === '❌') { // Não
                    msg.delete().catch(err => { return })
                    message.delete().catch(err => { return })
                    return msg.channel.send("Comando cancelado.").then(msg => msg.delete({ timeout: 3000 })).catch(err => { return })
                }
            })
        })
    }

    if (args[0] === '1') {
        var numb = ['1', '2', '3', '4', '5', '6']
        var rand = numb[Math.floor(Math.random() * numb.length)]

        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('🎲 Rolando os dados...')
        return message.channel.send(embed).then(msg => msg.delete({ timeout: 2500 })).then(msg => msg.channel.send("🎲 `" + rand + '`'))
    }

    if (args[0] === '2') {
        var numb = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        var rand = numb[Math.floor(Math.random() * numb.length)]

        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('🎲 Rolando os dados...')
        return message.channel.send(embed).then(msg => msg.delete({ timeout: 2500 })).then(msg => msg.channel.send("🎲 `" + rand + '`'))
    }

    if (args[0] === '3') {
        var numb = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
        var rand = numb[Math.floor(Math.random() * numb.length)]

        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('🎲 Rolando os dados...')
        return message.channel.send(embed).then(msg => msg.delete({ timeout: 2500 })).then(msg => msg.channel.send("🎲 `" + rand + '`'))
    }

    if (args[0] === '4') {
        var numb = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
        var rand = numb[Math.floor(Math.random() * numb.length)]

        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('🎲 Rolando os dados...')
        return message.channel.send(embed).then(msg => msg.delete({ timeout: 2500 })).then(msg => msg.channel.send("🎲 `" + rand + '`'))
    }
}