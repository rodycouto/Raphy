const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

    let timeout2 = 1500
    let author2 = await db.fetch(`florestatiming_${message.author.id}`)

    if (author2 !== null && timeout2 - (Date.now() - author2) > 0) {
        return
    } else {

        let timeout1 = 9140000
        let author1 = await db.fetch(`pego_${message.author.id}`)

        if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
            let time = ms(timeout1 - (Date.now() - author1))

            const presomax = new Discord.MessageEmbed()
                .setColor('#8B0000')
                .setTitle('🚨 Você está em prisão máxima!')
                .setDescription(`Liberdade em: ${time.hours}h ${time.minutes}m e ${time.seconds}s`)

            return message.inlineReply(presomax)
        } else {

            let prefix = db.get(`prefix_${message.guild.id}`)
            if (prefix === null) { prefix = "-" }

            let canal = client.channels.cache.get(db.get(`buscachannel_${message.guild.id}`))
            if (canal === null) {
                const nocanal = new Discord.MessageEmbed()
                    .setColor('#8B0000')
                    .setTitle('Canal de busca não definido')
                    .setDescription('Peça para algúm administrador digitar o comando para habilitar o Canal de Busca')
                    .addField('Comando de Ativação', '`' + prefix + 'setbuscachannel #Canal`')
                return message.inlineReply(nocanal)
            }

            if (!canal) {
                const notcanal = new Discord.MessageEmbed()
                    .setColor('#8B0000')
                    .setTitle('Canal de Busca excluido.')
                    .setDescription('Parece que o Canal de Busca foi desativado ou excluido.')
                    .addField('Comando de Ativação', '`' + prefix + 'setbuscachannel #Canal`')
                return message.inlineReply(notcanal)
            }

            let canaloficial = message.channel.id === db.get(`buscachannel_${message.guild.id}`)
            if (!canaloficial) {
                message.delete().catch(err => { return })
                return message.inlineReply(`Este não é o canal de busca. Chega mais, é aqui: ${client.channels.cache.get(db.get(`buscachannel_${message.guild.id}`))}`).then(msg => msg.delete({ timeout: 7000 })).catch(err => { return })
            }

            let machado = db.get(`machado_${message.author.id}`)
            if (machado === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você precisa de um machado. Compre um na ${prefix}loja`) }

            if (!db.get(`machado_${message.author.id}`)) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você precisa de um machado. Compre um na ${prefix}loja`) }

            let comida = db.get(`comida_${message.author.id}`)
            if (!comida) { comida = 0 }
            if (comida === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não possui comidas para buscar o Brown. Compre algumas na ${prefix}loja`) }
            if (comida == 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não possui comidas para buscar o Brown. Compre algumas na ${prefix}loja`) }

            if (comida === 1 || comida > 0) {

                let num = ['win', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose']
                let rand = num[Math.floor(Math.random() * num.length)]

                let a = ['wiin', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'remédio', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'cachorro', 'nodog', 'bola', 'nodog', 'nodog', 'nodog', 'nodog']
                let randa = a[Math.floor(Math.random() * a.length)]
                db.set(`florestatiming_${message.author.id}`, Date.now())
                db.subtract(`comida_${message.author.id}`, 1)

                if (rand === 'win') {

                    if (randa === 'bola') {
                        let bola = db.get(`bola_${message.author.id}`)
                        if (bola === null) {
                            let dinh = Math.floor(Math.random() * 30) + 1
                            let apple = Math.floor(Math.random() * 4) + 1
                            let comidas = Math.floor(Math.random() * 3) + 1
                            let rosas = Math.floor(Math.random() * 2) + 1
                            db.add(`apple_${message.author.id}`, apple)
                            db.add(`comida_${message.author.id}`, comidas)
                            db.add(`rosas_${message.author.id}`, rosas)
                            db.add(`mpoints_${message.author.id}`, dinh)
                            db.set(`bola_${message.author.id}`, "Bola")
                            const FlorestaEmbed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Classe Especial')
                                .addField('Classe Especial: 🥎 Bola do Brown', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${apple} 🍎 Maças, ${comidas} 🥘 Comidas e ${rosas} 🌹 Rosas`)
                            return message.inlineReply(FlorestaEmbed)
                        } else if (!db.get(`bola_${message.author.id}`)) {
                            let dinh = Math.floor(Math.random() * 30) + 1
                            let apple = Math.floor(Math.random() * 4) + 1
                            let comidas = Math.floor(Math.random() * 3) + 1
                            let rosas = Math.floor(Math.random() * 2) + 1
                            db.add(`apple_${message.author.id}`, apple)
                            db.add(`comida_${message.author.id}`, comidas)
                            db.add(`rosas_${message.author.id}`, rosas)
                            db.add(`mpoints_${message.author.id}`, dinh)
                            db.set(`bola_${message.author.id}`, "Bola")
                            const FlorestaEmbed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Classe Especial')
                                .addField('Classe Especial: 🥎 Bola do Brown', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${apple} 🍎 Maças, ${comidas} 🥘 Comidas e ${rosas} 🌹 Rosas`)
                            return message.inlineReply(FlorestaEmbed)
                        } else {

                            let dinh = Math.floor(Math.random() * 30) + 1
                            let apple = Math.floor(Math.random() * 4) + 1
                            let comidas = Math.floor(Math.random() * 3) + 1
                            let rosas = Math.floor(Math.random() * 2) + 1
                            db.add(`apple_${message.author.id}`, apple)
                            db.add(`comida_${message.author.id}`, comidas)
                            db.add(`rosas_${message.author.id}`, rosas)
                            db.add(`mpoints_${message.author.id}`, dinh)
                            const FlorestaEmbed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('🌲 Você achou um baú perdido!')
                                .addField('<:StarPoint:766794021128765469> <:StarPoint:766794021128765469> Você achou um baú perdido! <:StarPoint:766794021128765469> <:StarPoint:766794021128765469>', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${apple} 🍎 Maças, ${comidas} 🥘 Comidas e ${rosas} 🌹 Rosas`)
                            return message.inlineReply(FlorestaEmbed)
                        }
                    }

                    if (randa === "loose") {

                        let apple = Math.floor(Math.random() * 4) + 1
                        let comidas = Math.floor(Math.random() * 2) + 1
                        let rosas = Math.floor(Math.random() * 2) + 1
                        let dinh = Math.floor(Math.random() * 20) + 1
                        db.add(`apple_${message.author.id}`, apple)
                        db.add(`comida_${message.author.id}`, comidas)
                        db.add(`rosas_${message.author.id}`, rosas)
                        db.add(`mpoints_${message.author.id}`, dinh)
                        const FlorestaEmbed = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('🌲 Você achou um baú perdido!')
                            .addField('<:StarPoint:766794021128765469> <:StarPoint:766794021128765469> Você achou um baú perdido! <:StarPoint:766794021128765469> <:StarPoint:766794021128765469>', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${apple} 🍎 Maças, ${comidas} 🥘 Comidas e ${rosas} 🌹 Rosas`)
                        return message.inlineReply(FlorestaEmbed)
                    }

                    let cachorro = db.get(`cachorro_${message.author.id}`)
                    if (randa === "cachorro") {
                        if (cachorro === null) {

                            const embed = new Discord.MessageEmbed()
                                .setColor('BLUE')
                                .setTitle('🐶 Você achou o Brown!!!')
                                .setDescription('Ele está com medo! Dê 5 🦴 `Ossos` para ele se acalmar.')
                                .setFooter('Você tem 20 segundos até as reações sumir!')

                            await message.inlineReply(embed).then(msg => {
                                msg.react('✅').catch(err => { return }) // Check
                                msg.react('❌').catch(err => { return }) // X
                                setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 20000)

                                msg.awaitReactions((reaction, user) => {
                                    if (message.author.id !== user.id) return

                                    if (reaction.emoji.name === '✅') { // Sim
                                        msg.delete().catch(err => { return })

                                        let ossos = db.get(`ossos_${message.author.id}`)
                                        if (ossos === null) { return message.inlineReply(`<:xis:835943511932665926> Você não tem ossos suficiente! Brown se assustou e saiu correndo.`) }
                                        if (ossos < 5) { return message.inlineReply(`<:xis:835943511932665926> Você não tem ossos suficiente! Brown se assustou e saiu correndo.`) }

                                        if (ossos === 5 || ossos > 5) {
                                            db.subtract(`ossos_${message.author.id}`, 5)
                                            db.set(`cachorro_${message.author.id}`, "Cachorro Brown")
                                            const FlorestaEmbed = new Discord.MessageEmbed()
                                                .setColor('GREEN')
                                                .setTitle('🌲 Você adquiriu um item de Clase Especial')
                                                .setDescription(`🐶 Au au au!`)
                                            return message.inlineReply(FlorestaEmbed)
                                        } else {
                                            message.inlineReply('Algo deu errado! Digite `' + prefix + 'help` e adquira suporte no servidor. Prints são bem vindos :hearts: #516485')
                                        }
                                    }
                                    if (reaction.emoji.name === '❌') { // Não
                                        msg.delete().catch(err => { return })
                                        message.inlineReply("Você se recusou a adotar o Brown!")
                                    }
                                })
                            })

                        } else if (!db.get(`cachorro_${message.author.id}`)) {

                            const embed = new Discord.MessageEmbed()
                                .setColor('BLUE')
                                .setTitle('🐶 Você achou o Brown!!!')
                                .setDescription('Ele está com medo! Dê 5 🦴 `Ossos` para ele se acalmar.')
                                .setFooter('Você tem 20 segundos até as reações sumir!')

                            await message.inlineReply(embed).then(msg => {
                                msg.react('✅').catch(err => { return }) // Check
                                msg.react('❌').catch(err => { return }) // X
                                setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 20000)

                                msg.awaitReactions((reaction, user) => {
                                    if (message.author.id !== user.id) return

                                    if (reaction.emoji.name === '✅') { // Sim
                                        msg.delete().catch(err => { return })

                                        let ossos = db.get(`ossos_${message.author.id}`)
                                        if (ossos === null) { return message.inlineReply(`<:xis:835943511932665926> Você não tem ossos suficiente! Brown se assustou e saiu correndo.`) }
                                        if (ossos < 5) { return message.inlineReply(`<:xis:835943511932665926> Você não tem ossos suficiente! Brown se assustou e saiu correndo.`) }

                                        if (ossos === 5 || ossos > 5) {
                                            db.subtract(`ossos_${message.author.id}`, 5)
                                            db.set(`cachorro_${message.author.id}`, "Cachorro Brown")
                                            const FlorestaEmbed = new Discord.MessageEmbed()
                                                .setColor('GREEN')
                                                .setTitle('🌲 Você adquiriu um item de Clase Especial')
                                                .setDescription(`🐶 Au au au!`)
                                            return message.inlineReply(FlorestaEmbed)
                                        } else {
                                            message.inlineReply('Algo deu errado! Digite `' + prefix + 'help` e adquira suporte no servidor. Prints são bem vindos :hearts: #516485')
                                        }
                                    }
                                    if (reaction.emoji.name === '❌') { // Não
                                        msg.delete().catch(err => { return })
                                        message.inlineReply("Você se recusou a adotar o Brown!")
                                    }
                                })
                            })
                        } else {
                            const PegadasEmbed = new Discord.MessageEmbed()
                                .setColor('BLUE')
                                .setTitle('🐾 Você encontrou pegadas do Brown.')
                            return message.inlineReply(PegadasEmbed)
                        }
                    }

                    let remedio = db.get(`remedio_${message.author.id}`)
                    if (randa === "remédio") {
                        if (remedio === null) {

                            const embed = new Discord.MessageEmbed()
                                .setColor('BLUE')
                                .setTitle('💊 Remédio!!')
                                .setDescription('Você achou o Remédio do Velho Welter!')

                            db.set(`remedio_${message.author.id}`, "ON")

                            return message.inlineReply(embed)

                        } else if (!db.get(`remedio_${message.author.id}`)) {

                            const embed = new Discord.MessageEmbed()
                                .setColor('BLUE')
                                .setTitle('💊 Remédio!!')
                                .setDescription('Você achou o Remédio do Velho Welter!')

                            db.set(`remedio_${message.author.id}`, "ON")

                            return message.inlineReply(embed)
                        } else {
                            const PegadasEmbed = new Discord.MessageEmbed()
                                .setColor('BLUE')
                                .setTitle('💊 Você encontrou pilulas quebradas.')
                            return message.inlineReply(PegadasEmbed)
                        }
                    }

                    if (randa === "nodog") {
                        const PegadasEmbed = new Discord.MessageEmbed()
                            .setColor('BLUE')
                            .setTitle('🐾 Você encontrou pegadas do Brown.')
                        return message.inlineReply(PegadasEmbed)
                    }
                }

                if (rand === 'lose') {
                    let apple = Math.floor(Math.random() * 2) + 1
                    db.add(`apple_${message.author.id}`, apple)
                    return message.inlineReply(`🍎 Você encontrou ${apple} maças!`)
                }

            } else {
                const NoFood = new Discord.MessageEmbed()
                    .setColor('#8B0000')
                    .setDescription(`<: xis: 835943511932665926 > ${message.author}, você não tem comida para buscar o Brown.`)
                return message.inlineReply(NoFood)
            }
        }
    }
}