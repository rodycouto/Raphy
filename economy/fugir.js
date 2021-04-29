const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

    let timeout1 = 9140000
    let author1 = await db.fetch(`pego_${message.author.id}`)

    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
        let time = ms(timeout1 - (Date.now() - author1))

        let presomax = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('🚨 Você está em prisão máxima!')
            .setDescription(`Liberdade em: ${time.hours}h ${time.minutes}m e ${time.seconds}s`)

        return message.inlineReply(presomax)
    } else {

        let timeout2 = 1000000
        let author2 = await db.fetch(`preso_${message.author.id}`)

        if (author2 !== null && timeout2 - (Date.now() - author2) > 0) {
            let time = ms(timeout2 - (Date.now() - author2))

            let fuga = new Discord.MessageEmbed()
                .setColor('GRAY')
                .setDescription('‼️ Você está prestes a tentar fungir da penitenciária. A sua pena pode aumentar.\n \nVocê deseja tentar a fuga?')

            await message.inlineReply(fuga).then(msg => {
                msg.react('✅') // Check
                msg.react('❌') // X

                msg.awaitReactions((reaction, user) => {
                    if (message.author.id !== user.id) return

                    if (reaction.emoji.name === '✅') { // Sim
                        msg.delete().catch(err => { return })

                        let luck = ['win', 'lose']
                        let result = luck[Math.floor(Math.random() * luck.length)]

                        let fugindo = new Discord.MessageEmbed()
                            .setColor('BLUE')
                            .setTitle('🏃 Fugindo da detenção...')

                        let wins = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setDescription('<a:Check:836347816036663309> Você fugiu da detenção com sucesso.')

                        let lose = new Discord.MessageEmbed()
                            .setColor('#8B0000')
                            .setTitle('🚨 Você foi pego!')
                            .setDescription(`${message.author} foi pego tentando escapar. Prisão máxima!`)

                        if (result == 'win') {
                            db.delete(`preso_${message.author.id}`)
                            return message.channel.send(fugindo).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(wins))
                        } else if (result === "lose") {
                            db.set(`pego_${message.author.id}`, Date.now())
                            return message.channel.send(fugindo).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(lose))
                        }
                    }
                    if (reaction.emoji.name === '❌') { // Não
                        msg.delete().catch(err => { return })
                        message.inlineReply("Fuga cancelada.")
                    }
                })
            })
        } else {
            return message.channel.send(`Você não está preso.`)
        }
    }
}