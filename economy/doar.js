const db = require('quick.db')
const Discord = require('discord.js')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

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

        let money = db.get(`mpoints_${message.author.id}`)
        let rosas = db.get(`rosas_${message.author.id}`)
        let user = message.mentions.members.first()

        if (money === null) money = '0'
        if (!db.get(`mpoints_${message.author.id}`)) money = '0'

        if (rosas === null) rosas = '0'
        if (!db.get(`rosas_${message.author.id}`)) rosas = '0'

        if (!args[0]) { return message.inlineReply('Não sabe usar o comando doar?\n' + '`' + prefix + 'help doar`') } // Ativação a baixo

        if (!user) { return message.inlineReply('Não sabe usar o comando doar? ' + '`' + prefix + 'help doar`') }
        if (user.id === "837147659898191902") { return message.inlineReply('<:xis:835943511932665926> Sorry, mas não quero doações.') } // Naya ID
        if (user.id == message.author.id) { return message.inlineReply('<:xis:835943511932665926> Você não pode doar para você mesmo.') }
        if (message.mentions.members.bot) { return message.inlineReply('<:xis:835943511932665926> Você não pode doar para bots.') }

        if (['rosas', 'rosa'].includes(args[0])) {
            if (rosas === '0') { return message.inlineReply(`<:xis:835943511932665926> Você não tem rosas para doar.`) }
            if (rosas === null) { return message.inlineReply(`<:xis:835943511932665926> Você não tem rosas para doar.`) }

            let quantia = args[2]
            if (!quantia) { return message.inlineReply('<:xis:835943511932665926> Use o comando de forma correta! `' + prefix + 'doar rosas @user quantidade`') }
            if (isNaN(quantia)) { return message.inlineReply(`<:xis:835943511932665926> **${quantia}** não é um número!`) }
            if (rosas < quantia) { return message.inlineReply(`<:xis:835943511932665926> você não tem ${quantia} rosas para doar.`) }
            db.subtract(`rosas_${message.author.id}`, quantia)
            db.add(`cacherosas_${message.author.id}`, quantia)
            let quantiarosas = db.get(`cacherosas_${message.author.id}`)

            let ConfirmRosas = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('<a:attention:836101248183959562> Confirmação...')
                .setDescription(`Você confirma o envio de ${args[2]} 🌹 Rosas para ${user}?`)

            return message.inlineReply(ConfirmRosas).then(msg => {
                msg.react('✅').catch(err => { return }) // Check
                msg.react('❌').catch(err => { return }) // X
                msg.delete({ timeout: 120000 }).catch(err => { return })

                msg.awaitReactions((reaction, user) => {

                    if (message.author.id !== user.id) return

                    if (reaction.emoji.name === '✅') { // Sim
                        msg.delete().catch(err => { return })

                        db.add(`rosas_${message.mentions.members.first().id}`, quantiarosas)
                        db.delete(`cacherosas_${message.author.id}`)
                        db.add(`rp_${message.mentions.members.first().id}`, quantiarosas * 2)
                        return message.channel.send(`<a:Check:836347816036663309> Transação efetuada com sucesso!\n${message.mentions.members.first()} recebeu: ${quantiarosas * 2} Reputações e ${quantiarosas} 🌹 Rosas`).catch(err => { return })
                    }

                    if (reaction.emoji.name === '❌') { // Não
                        msg.delete().catch(err => { return })
                        db.add(`rosas_${message.author.id}`, quantiarosas)
                        db.delete(`cacherosas_${message.author.id}`)
                        return msg.channel.send(`<a:Check:836347816036663309> Transação cancelada.`)
                    }
                })
            })
        } else if (['money', 'mp', 'dinheiro', 'cash'].includes(args[0])) {

            if (["all", 'tudo'].includes(args[2])) {
                if (money === '0') { return message.inlineReply('<:xis:835943511932665926> Você não tem dinheiro para doar.') }
                if (money < '0') { return message.inlineReply('<:xis:835943511932665926> Você não pode doar dinheiro estando negativado.') }
                db.add(`cachemoney_${message.author.id}`, money)
                db.subtract(`mpoints_${message.author.id}`, money)
                let cachemoney = db.get(`cachemoney_${message.author.id}`)

                let confirm = new Discord.MessageEmbed() // Doar all
                    .setColor('BLUE')
                    .setTitle('Confirmação...')
                    .setDescription(`<a:attention:836101248183959562> Confirmar transação no valor de ${money}<:StarPoint:766794021128765469>MPoints para ${user}?`)

                return message.inlineReply(confirm).then(msg => {
                    msg.react('✅') // Check
                    msg.react('❌') // X
                    msg.delete({ timeout: 120000 }).catch(err => { return })

                    msg.awaitReactions((reaction, user) => {

                        if (message.author.id !== user.id) return

                        if (reaction.emoji.name === '✅') { // Sim
                            msg.delete().catch(err => { return })

                            db.add(`mpoints_${message.mentions.members.first().id}`, cachemoney)
                            db.delete(`cachemoney_${message.author.id}`)
                            return message.channel.send(`<a:Check:836347816036663309> Transação efetuada com sucesso!\nQuantia: ${money}<:StarPoint:766794021128765469>MPoints`).catch(err => { return })
                        }

                        if (reaction.emoji.name === '❌') { // Não
                            msg.delete().catch(err => { return })
                            db.add(`mpoints_${message.author.id}`, cachemoney)
                            db.delete(`cachemoney_${message.author.id}`)
                            return msg.channel.send(`<a:Check:836347816036663309> Transação cancelada.`)
                        }
                    })
                })
            } else {

                if (args[2] < '0') { return message.inlineReply('<a:attention:836101248183959562> Diga um valor maior que 0') }
                if (money === '0') { return message.inlineReply('<:xis:835943511932665926> Você não pode fazer doações sem dinheiro.') }
                if (money < args[2]) { return message.inlineReply('<:xis:835943511932665926> Você não tem todo esse dinheiro para doar.') }
                if (isNaN(args[2])) { return message.inlineReply(`<:xis:835943511932665926> **${args[2]}** não é um número.`) }
                if (args[3]) {return message.inlineReply(`<:xis:835943511932665926> **${args[3]}** não é um argumento válido, apenas retire.`)}
                db.add(`cachemoney2_${message.author.id}`, args[2])
                db.subtract(`mpoints_${message.author.id}`, args[2])
                let cachemoney2 = db.get(`cachemoney2_${message.author.id}`)

                let confirm2 = new Discord.MessageEmbed() // Doar quantia
                    .setColor('BLUE')
                    .setTitle('Confirmação...')
                    .setDescription(`<a:attention:836101248183959562> Confirmar transação no valor de ${args[2]}<:StarPoint:766794021128765469>MPoints para ${user}?`)

                return message.inlineReply(confirm2).then(msg => {
                    msg.react('✅').catch(err => { return }) // Check
                    msg.react('❌').catch(err => { return }) // X
                    msg.delete({ timeout: 120000 }).catch(err => { return })

                    msg.awaitReactions((reaction, user) => {

                        if (message.author.id !== user.id) return

                        if (reaction.emoji.name === '✅') { // Sim
                            msg.delete().catch(err => { return })

                            db.add(`mpoints_${message.mentions.members.first().id}`, cachemoney2)
                            db.delete(`cachemoney2_${message.author.id}`, args[2])
                            return message.channel.send(`<a:Check:836347816036663309> Transação efetuada com sucesso!\n${message.mentions.members.first()} recebeu ${args[2]}<:StarPoint:766794021128765469>MPoints`).catch(err => { return })
                        }

                        if (reaction.emoji.name === '❌') { // Não
                            msg.delete().catch(err => { return })
                            db.add(`mpoints_${message.author.id}`, cachemoney2)
                            db.delete(`cachemoney2_${message.author.id}`)
                            return msg.channel.send(`<a:Check:836347816036663309> Transação cancelada.`)
                        }
                    })
                })
            }
        } else {
            return message.inlineReply('<:xis:835943511932665926> Eu não achei nada com o nome **' + args[0] + '** no comando `' + prefix + 'doar`, use `' + prefix + 'help doar` para mais informações.')
        }
    }
}