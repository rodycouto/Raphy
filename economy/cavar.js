const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

    let timeout2 = 1500
    let author2 = await db.fetch(`minetiming_${message.author.id}`)

    if (author2 !== null && timeout2 - (Date.now() - author2) > 0) {
        let time = ms(timeout2 - (Date.now() - author2))

        return message.inlineReply(`Espere mais ${time.seconds}s`)
    } else {

        let timeout1 = 6140000
        let author1 = await db.fetch(`pego_${message.author.id}`)

        if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
            let time = ms(timeout1 - (Date.now() - author1))

            var presomax = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('🚨 Você está em prisão máxima!')
                .setDescription(`Liberdade em: ${time.minutes}m e ${time.seconds}s`)

            return message.inlineReply(presomax)
        } else {
            let prefix = db.get(`prefix_${message.guild.id}`)
            if (prefix === null) { prefix = "-" }

            var canal = db.get(`minechannel_${message.guild.id}`)
            if (canal === null) {
                var nocanal = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Canal de Mineração não definido')
                    .setDescription('Peça para algúm administrador digitar o comando para habilitar o Canal de Mineração')
                    .addField('Comando de Ativação', '`' + prefix + 'setminechannel #Canal`')
                return message.inlineReply(nocanal)
            }

            if (!db.get(`minechannel_${message.guild.id}`)) {
                var notcanal = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Canal de Mineração excluido.')
                    .setDescription('Parece que o Canal de Mineração foi desativado ou excluido.')
                    .addField('Comando de Ativação', '`' + prefix + 'setminechannel #Canal`')
                return message.inlineReply(notcanal)
            }

            var canaloficial = message.channel.id === db.get(`minechannel_${message.guild.id}`)
            if (!canaloficial) {
                message.delete().catch(err => { return })
                return message.inlineReply(`Este não é o canal de mineração. A mina é aqui: ${client.channels.cache.get(canal)}`)
            }

            var picareta = db.get(`minechannel_${message.guild.id}`)
            if (picareta === null) {
                var nopicareta = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Comando bloqueado')
                    .setDescription(`${message.author}, você precisa de uma picareta. Compre uma na ${prefix}loja`)
                return message.inlineReply(nopicareta)
            }

            if (!db.get(`picareta_${message.author.id}`)) {
                var nopicareta = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Comando bloqueado')
                    .setDescription(`${message.author}, você precisa de uma picareta. Compre uma na ${prefix}loja`)
                return message.inlineReply(nopicareta)
            }

            let agua = db.get(`agua_${message.author.id}`)
            if (agua === null) {
                var nopicareta = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Comando bloqueado')
                    .setDescription(`${message.author}, você não possui copos de água. Compre alguns na ${prefix}loja`)
                return message.inlineReply(nopicareta)
            }

            if (!db.get(`agua_${message.author.id}`)) { agua = 0 }

            if (agua == 0) {
                var nopicareta = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Comando bloqueado')
                    .setDescription(`${message.author}, você não possui copos de água. Compre alguns na ${prefix}loja`)
                return message.inlineReply(nopicareta)
            }

            if (agua > 0) {
                var num = ['win', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose']
                var rand = num[Math.floor(Math.random() * num.length)]

                var vezesmin = db.subtract(`offpicareta_${message.author.id}`, 1)
                if (vezesmin === 0 || vezesmin < 0) {
                    db.delete(`picareta_${message.author.id}`)
                    var sempicareta = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Que peeena')
                        .setDescription(`${message.author}, a sua picareta quebrou. Você precisa comprar outra.`)
                    return message.inlineReply(sempicareta)
                }

                var a = ['wiin', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'mamute', 'nomamute', 'fossil', 'nomamute', 'nomamute', 'nomamute', 'nomamute']
                var randa = a[Math.floor(Math.random() * a.length)]
                db.set(`minetiming_${message.author.id}`, Date.now())

                if (rand === 'win') {

                    if (randa === 'fossil') {
                        var fossil = db.get(`fossil_${message.author.id}`)
                        if (fossil === null) {
                            var dinh = Math.floor(Math.random() * 100) + 1
                            var ossos = Math.floor(Math.random() * 3) + 1
                            var minerios = Math.floor(Math.random() * 3) + 1
                            var diamantes = Math.floor(Math.random() * 1) + 1
                            db.subtract(`agua_${message.author.id}`, 1)
                            db.add(`minerio_${message.author.id}`, minerios)
                            db.add(`ossos_${message.author.id}`, ossos)
                            db.add(`diamond_${message.author.id}`, diamantes)
                            db.add(`mpoints_${message.author.id}`, dinh)
                            db.set(`fossil_${message.author.id}`, "Fossil")
                            var pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Classe Especial')
                                .addField('Classe Especial: <:fossil:831859111578173450> Fossil', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${minerios} 🪨 Minerios, ${ossos} 🦴 Ossos e ${diamantes} 💎 Diamantes`)
                            return message.inlineReply(pescaembed)
                        } else if (!db.get(`fossil_${message.author.id}`)) {
                            var dinh = Math.floor(Math.random() * 100) + 1
                            var ossos = Math.floor(Math.random() * 3) + 1
                            var minerios = Math.floor(Math.random() * 3) + 1
                            var diamantes = Math.floor(Math.random() * 1) + 1
                            db.subtract(`agua_${message.author.id}`, 1)
                            db.add(`minerio_${message.author.id}`, minerios)
                            db.add(`ossos_${message.author.id}`, ossos)
                            db.add(`diamond_${message.author.id}`, diamantes)
                            db.add(`mpoints_${message.author.id}`, dinh)
                            db.set(`fossil_${message.author.id}`, "Fossil")
                            var pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Classe Especial')
                                .addField('Classe Especial: <:fossil:831859111578173450> Fossil', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${minerios} 🪨 Minerios, ${ossos} 🦴 Ossos e ${diamantes} 💎 Diamantes`)
                            return message.inlineReply(pescaembed)
                        } else {

                            var dinh = Math.floor(Math.random() * 100) + 1
                            var ossos = Math.floor(Math.random() * 2) + 1
                            var minerios = Math.floor(Math.random() * 2) + 1
                            var diamantes = Math.floor(Math.random() * 2) + 1
                            db.subtract(`agua_${message.author.id}`, 1)
                            db.add(`minerio_${message.author.id}`, minerios)
                            db.add(`ossos_${message.author.id}`, ossos)
                            db.add(`diamond_${message.author.id}`, diamantes)
                            db.add(`mpoints_${message.author.id}`, dinh)
                            var pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⛏️ Você cavou itens valiosos!')
                                .addField('<:StarPoint:766794021128765469> <:StarPoint:766794021128765469> Você achou novos itens! <:StarPoint:766794021128765469> <:StarPoint:766794021128765469>', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${minerios} 🪨 Minerios, ${ossos} 🦴 Ossos e ${diamantes} 💎 Diamantes`)
                            return message.inlineReply(pescaembed)

                        }
                    }

                    if (randa === "loose") {

                        var dinh = Math.floor(Math.random() * 80) + 1
                        var ossos = Math.floor(Math.random() * 2) + 1
                        var minerios = Math.floor(Math.random() * 2) + 1
                        var diamantes = Math.floor(Math.random() * 1) + 1
                        db.subtract(`agua_${message.author.id}`, 1)
                        db.add(`minerio_${message.author.id}`, minerios)
                        db.add(`ossos_${message.author.id}`, ossos)
                        db.add(`diamond_${message.author.id}`, diamantes)
                        db.add(`mpoints_${message.author.id}`, dinh)
                        var pescaembed = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('⛏️ Você cavou itens valiosos!')
                            .addField('<:StarPoint:766794021128765469> <:StarPoint:766794021128765469> Você achou novos itens! <:StarPoint:766794021128765469> <:StarPoint:766794021128765469>', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${minerios} 🪨 Minerios, ${ossos} 🦴 Ossos e ${diamantes} 💎 Diamantes`)
                        return message.inlineReply(pescaembed)
                    }

                    var mamute = db.get(`mamute_${message.author.id}`)
                    if (randa === "mamute") {
                        if (mamute === null) {
                            db.set(`mamute_${message.author.id}`, "Mamute")
                            var pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Clase Especial')
                                .setDescription(`**Mamute Pré Histórico:** 🦣, *sons de mamute*`)
                            return message.inlineReply(pescaembed)
                        } else if (!db.get(`mamute_${message.author.id}`)) {
                            db.set(`mamute_${message.author.id}`, "Mamute")
                            var pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Clase Especial')
                                .setDescription(`**Mamute Pré Histórico:** 🦣, *sons de mamute*`)
                            return message.inlineReply(pescaembed)
                        } else {
                            var looli = new Discord.MessageEmbed()
                                .setColor('BLUE')
                                .setTitle('Há um mamute por perto')
                                .setDescription(`🦣 *Sons de mamute*`)
                            return message.inlineReply(looli)
                        }
                    }

                    if (randa === "nomamute") {
                        var looli = new Discord.MessageEmbed()
                            .setColor('BLUE')
                            .setTitle('Há um mamute por perto')
                            .setDescription(`🦣 *Sons de mamute*`)
                        return message.inlineReply(looli)
                    }
                }

                if (rand === 'lose') {
                    var dinh = Math.floor(Math.random() * 70) + 1
                    var minerios = Math.floor(Math.random() * 2) + 1
                    db.subtract(`agua_${message.author.id}`, 1)
                    db.add(`minerio_${message.author.id}`, minerios)
                    var pescaembed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('⛏️ Você minerou com sucesso!')
                        .setDescription(`Com a mineração, você obteve 🪨 ${minerios} minerios.`)
                    return message.inlineReply(pescaembed)
                }
            } else { return message.inlineReply(`:x: ${message.author}, você não tem águas suficiente.`) }
        }
    }
}