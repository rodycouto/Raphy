const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

    let timeout2 = 1500
    let author2 = await db.fetch(`minetiming_${message.author.id}`)

    if (author2 !== null && timeout2 - (Date.now() - author2) > 0) {
        let time = ms(timeout2 - (Date.now() - author2))
        return
    } else {

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
            let prefix = db.get(`prefix_${message.guild.id}`)
            if (prefix === null) { prefix = "-" }

            let canal = db.get(`minechannel_${message.guild.id}`)
            if (canal === null) {
                let nocanal = new Discord.MessageEmbed()
                    .setColor('#8B0000')
                    .setTitle('Canal de Mineração não definido')
                    .setDescription('Peça para algúm administrador digitar o comando para habilitar o Canal de Mineração')
                    .addField('Comando de Ativação', '`' + prefix + 'setminechannel #Canal`')
                return message.inlineReply(nocanal)
            }

            if (!db.get(`minechannel_${message.guild.id}`)) {
                let notcanal = new Discord.MessageEmbed()
                    .setColor('#8B0000')
                    .setTitle('Canal de Mineração excluido.')
                    .setDescription('Parece que o Canal de Mineração foi desativado ou excluido.')
                    .addField('Comando de Ativação', '`' + prefix + 'setminechannel #Canal`')
                return message.inlineReply(notcanal)
            }

            let canaloficial = message.channel.id === db.get(`minechannel_${message.guild.id}`)
            if (!canaloficial) {
                message.delete().catch(err => { return })
                return message.inlineReply(`Este não é o canal de mineração. A mina é aqui: ${client.channels.cache.get(canal)}`)
            }

            let picareta = db.get(`minechannel_${message.guild.id}`)
            if (picareta === null) {
                let nopicareta = new Discord.MessageEmbed()
                    .setColor('#8B0000')
                    .setTitle('❌ Comando bloqueado')
                    .setDescription(`${message.author}, você precisa de uma picareta. Compre uma na ${prefix}loja`)
                return message.inlineReply(nopicareta)
            }

            if (!db.get(`picareta_${message.author.id}`)) {
                let nopicareta = new Discord.MessageEmbed()
                    .setColor('#8B0000')
                    .setTitle('❌ Comando bloqueado')
                    .setDescription(`${message.author}, você precisa de uma picareta. Compre uma na ${prefix}loja`)
                return message.inlineReply(nopicareta)
            }

            let agua = db.get(`agua_${message.author.id}`)
            if (agua === null) {
                let nopicareta = new Discord.MessageEmbed()
                    .setColor('#8B0000')
                    .setTitle('❌ Comando bloqueado')
                    .setDescription(`${message.author}, você não possui copos de água. Compre alguns na ${prefix}loja`)
                return message.inlineReply(nopicareta)
            }

            if (!db.get(`agua_${message.author.id}`)) { agua = 0 }

            if (agua == 0) {
                let nopicareta = new Discord.MessageEmbed()
                    .setColor('#8B0000')
                    .setTitle('❌ Comando bloqueado')
                    .setDescription(`${message.author}, você não possui copos de água. Compre alguns na ${prefix}loja`)
                return message.inlineReply(nopicareta)
            }

            if (agua > 0) {
                let num = ['win', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose']
                let rand = num[Math.floor(Math.random() * num.length)]

                let vezesmin = db.subtract(`offpicareta_${message.author.id}`, 1)
                if (vezesmin === 0 || vezesmin < 0) {
                    db.delete(`picareta_${message.author.id}`)
                    let sempicareta = new Discord.MessageEmbed()
                        .setColor('#8B0000')
                        .setTitle('Que peeena')
                        .setDescription(`${message.author}, a sua picareta quebrou. Você precisa comprar outra.`)
                    return message.inlineReply(sempicareta)
                }

                let a = ['wiin', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'mamute', 'nomamute', 'fossil', 'nomamute', 'nomamute', 'nomamute', 'nomamute']
                let randa = a[Math.floor(Math.random() * a.length)]
                db.set(`minetiming_${message.author.id}`, Date.now())

                if (rand === 'win') {

                    if (randa === 'fossil') {
                        let fossil = db.get(`fossil_${message.author.id}`)
                        if (fossil === null) {
                            let dinh = Math.floor(Math.random() * 100) + 1
                            let ossos = Math.floor(Math.random() * 3) + 1
                            let minerios = Math.floor(Math.random() * 3) + 1
                            let diamantes = Math.floor(Math.random() * 1) + 1
                            db.subtract(`agua_${message.author.id}`, 1)
                            db.add(`minerio_${message.author.id}`, minerios)
                            db.add(`ossos_${message.author.id}`, ossos)
                            db.add(`diamond_${message.author.id}`, diamantes)
                            db.add(`mpoints_${message.author.id}`, dinh)
                            db.set(`fossil_${message.author.id}`, "Fossil")
                            let pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Classe Especial')
                                .addField('Classe Especial: <:fossil:831859111578173450> Fossil', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${minerios} 🪨 Minerios, ${ossos} 🦴 Ossos e ${diamantes} 💎 Diamantes`)
                            return message.inlineReply(pescaembed)
                        } else if (!db.get(`fossil_${message.author.id}`)) {
                            let dinh = Math.floor(Math.random() * 100) + 1
                            let ossos = Math.floor(Math.random() * 3) + 1
                            let minerios = Math.floor(Math.random() * 3) + 1
                            let diamantes = Math.floor(Math.random() * 1) + 1
                            db.subtract(`agua_${message.author.id}`, 1)
                            db.add(`minerio_${message.author.id}`, minerios)
                            db.add(`ossos_${message.author.id}`, ossos)
                            db.add(`diamond_${message.author.id}`, diamantes)
                            db.add(`mpoints_${message.author.id}`, dinh)
                            db.set(`fossil_${message.author.id}`, "Fossil")
                            let pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Classe Especial')
                                .addField('Classe Especial: <:fossil:831859111578173450> Fossil', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${minerios} 🪨 Minerios, ${ossos} 🦴 Ossos e ${diamantes} 💎 Diamantes`)
                            return message.inlineReply(pescaembed)
                        } else {

                            let dinh = Math.floor(Math.random() * 100) + 1
                            let ossos = Math.floor(Math.random() * 2) + 1
                            let minerios = Math.floor(Math.random() * 2) + 1
                            let diamantes = Math.floor(Math.random() * 2) + 1
                            db.subtract(`agua_${message.author.id}`, 1)
                            db.add(`minerio_${message.author.id}`, minerios)
                            db.add(`ossos_${message.author.id}`, ossos)
                            db.add(`diamond_${message.author.id}`, diamantes)
                            db.add(`mpoints_${message.author.id}`, dinh)
                            let pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⛏️ Você cavou itens valiosos!')
                                .addField('<:StarPoint:766794021128765469> <:StarPoint:766794021128765469> Você achou novos itens! <:StarPoint:766794021128765469> <:StarPoint:766794021128765469>', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${minerios} 🪨 Minerios, ${ossos} 🦴 Ossos e ${diamantes} 💎 Diamantes`)
                            return message.inlineReply(pescaembed)

                        }
                    }

                    if (randa === "loose") {

                        let dinh = Math.floor(Math.random() * 80) + 1
                        let ossos = Math.floor(Math.random() * 2) + 1
                        let minerios = Math.floor(Math.random() * 2) + 1
                        let diamantes = Math.floor(Math.random() * 1) + 1
                        db.subtract(`agua_${message.author.id}`, 1)
                        db.add(`minerio_${message.author.id}`, minerios)
                        db.add(`ossos_${message.author.id}`, ossos)
                        db.add(`diamond_${message.author.id}`, diamantes)
                        db.add(`mpoints_${message.author.id}`, dinh)
                        let pescaembed = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('⛏️ Você cavou itens valiosos!')
                            .addField('<:StarPoint:766794021128765469> <:StarPoint:766794021128765469> Você achou novos itens! <:StarPoint:766794021128765469> <:StarPoint:766794021128765469>', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${minerios} 🪨 Minerios, ${ossos} 🦴 Ossos e ${diamantes} 💎 Diamantes`)
                        return message.inlineReply(pescaembed)
                    }

                    let mamute = db.get(`mamute_${message.author.id}`)
                    if (randa === "mamute") {
                        if (mamute === null) {
                            db.set(`mamute_${message.author.id}`, "Mamute")
                            let pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Clase Especial')
                                .setDescription(`**Mamute Pré Histórico:** 🦣, *sons de mamute*`)
                            return message.inlineReply(pescaembed)
                        } else if (!db.get(`mamute_${message.author.id}`)) {
                            db.set(`mamute_${message.author.id}`, "Mamute")
                            let pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Clase Especial')
                                .setDescription(`**Mamute Pré Histórico:** 🦣, *sons de mamute*`)
                            return message.inlineReply(pescaembed)
                        } else {
                            let looli = new Discord.MessageEmbed()
                                .setColor('BLUE')
                                .setTitle('Há um mamute por perto')
                                .setDescription(`🦣 *Sons de mamute*`)
                            return message.inlineReply(looli)
                        }
                    }

                    if (randa === "nomamute") {
                        let looli = new Discord.MessageEmbed()
                            .setColor('BLUE')
                            .setTitle('Há um mamute por perto')
                            .setDescription(`🦣 *Sons de mamute*`)
                        return message.inlineReply(looli)
                    }
                }

                if (rand === 'lose') {
                    let dinh = Math.floor(Math.random() * 70) + 1
                    let minerios = Math.floor(Math.random() * 2) + 1
                    db.subtract(`agua_${message.author.id}`, 1)
                    db.add(`minerio_${message.author.id}`, minerios)
                    let pescaembed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('⛏️ Você minerou com sucesso!')
                        .setDescription(`Com a mineração, você obteve 🪨 ${minerios} minerios.`)
                    return message.inlineReply(pescaembed)
                }
            } else { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem águas suficiente.`) }
        }
    }
}