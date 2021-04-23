const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

    let timeout2 = 1500
    let author2 = await db.fetch(`pescatiming_${message.author.id}`)

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
                .setDescription('`Liberdade em: ' + `${time.minutes}` + 'm e ' + `${time.seconds}` + 's`')

            return message.inlineReply(presomax)
        } else {
            let prefix = db.get(`prefix_${message.guild.id}`)
            if (prefix === null) { prefix = "-" }

            var canal = db.get(`pescachannel_${message.guild.id}`)
            if (canal === null) {
                var nocanal = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Canal de pesca não definido')
                    .setDescription('Peça para algúm administrador digitar o comando para habilitar o Canal de Pesca')
                    .addField('Comando de Ativação', '`' + prefix + 'setpescachannel #Canal`')
                return message.inlineReply(nocanal)
            }

            if (!db.get(`pescachannel_${message.guild.id}`)) {
                var notcanal = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Canal de pesca excluido.')
                    .setDescription('Parece que o Canal de Pesca foi desativado ou excluido.')
                    .addField('Comando de Ativação', '`' + prefix + 'setpescachannel #Canal`')
                return message.inlineReply(notcanal)
            }

            var canaloficial = message.channel.id === db.get(`pescachannel_${message.guild.id}`)
            if (!canaloficial) {
                message.delete()
                return message.inlineReply(`Este não é o canal de pesca. Chega mais, é aqui: ${client.channels.cache.get(canal)}`).then(msg => msg.delete({ timeout: 7000 })).catch(err => { return })
            }

            var vara = db.get(`vara_${message.author.id}`)
            if (vara === null) { return message.inlineReply(`❌ ${message.author}, você precisa de uma vara de pesca. Compre uma na ${prefix}loja`) }

            if (!db.get(`vara_${message.author.id}`)) { return message.inlineReply(`❌ ${message.author}, você precisa de uma vara de pesca. Compre uma na ${prefix}loja`) }

            let iscas = db.get(`iscas_${message.author.id}`)
            if (!iscas) { iscas = 0 }
            if (iscas === null) { return message.inlineReply(`❌ ${message.author}, você não possui iscas para pescar. Compre algumas na ${prefix}loja`) }
            if (iscas == 0) { return message.inlineReply(`❌ ${message.author}, você não possui iscas para pescar. Compre algumas na ${prefix}loja`) }

            if (iscas > 0) {
                var num = ['win', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose', 'lose']
                var rand = num[Math.floor(Math.random() * num.length)]
                var din = Math.floor(Math.random() * 10) + 1

                var a = ['wiin', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loose', 'loli', 'nololi', 'faca', 'nololi', 'nololi', 'nololi', 'nololi']
                var randa = a[Math.floor(Math.random() * a.length)]
                db.set(`pescatiming_${message.author.id}`, Date.now())

                if (rand === 'win') {

                    if (randa === 'faca') {
                        var faca = db.get(`faca_${message.author.id}`)
                        if (faca === null) {
                            var dinh = Math.floor(Math.random() * 30) + 1
                            var peixes = Math.floor(Math.random() * 4) + 1
                            var iiscas = Math.floor(Math.random() * 3) + 1
                            var camarao = Math.floor(Math.random() * 2) + 1
                            db.subtract(`iscas_${message.author.id}`, 1)
                            db.add(`iscas_${message.author.id}`, iiscas)
                            db.add(`peixes_${message.author.id}`, peixes)
                            db.add(`camarao_${message.author.id}`, camarao)
                            db.add(`mpoints_${message.author.id}`, dinh)
                            db.set(`faca_${message.author.id}`, "Faca")
                            db.set(`pescatimeout_${message.author.id}`, Date.now())
                            var pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Classe Especial')
                                .addField('Classe Especial: 🔪 Faca', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${peixes} 🐟 peixes, ${iiscas} 🪱 Iscas e ${camarao} 🍤 Camarões`)
                            return message.inlineReply(pescaembed)
                        } else if (!db.get(`faca_${message.author.id}`)) {
                            var dinh = Math.floor(Math.random() * 30) + 1
                            var peixes = Math.floor(Math.random() * 4) + 1
                            var iiscas = Math.floor(Math.random() * 3) + 1
                            var camarao = Math.floor(Math.random() * 2) + 1
                            db.subtract(`iscas_${message.author.id}`, 1)
                            db.add(`iscas_${message.author.id}`, iiscas)
                            db.add(`peixes_${message.author.id}`, peixes)
                            db.add(`camarao_${message.author.id}`, camarao)
                            db.add(`mpoints_${message.author.id}`, dinh)
                            db.set(`faca_${message.author.id}`, "Faca")
                            db.set(`pescatimeout_${message.author.id}`, Date.now())
                            var pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Classe Especial')
                                .addField('Classe Especial: 🔪 Faca', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${peixes} 🐟 peixes, ${iiscas} 🪱 Iscas e ${camarao} 🍤 Camarões`)
                            return message.inlineReply(pescaembed)
                        } else {

                            var dinh = Math.floor(Math.random() * 25) + 1
                            var peixes = Math.floor(Math.random() * 4) + 1
                            var iiscas = Math.floor(Math.random() * 3) + 1
                            var camarao = Math.floor(Math.random() * 2) + 1
                            db.subtract(`iscas_${message.author.id}`, 1)
                            db.add(`iscas_${message.author.id}`, iiscas)
                            db.add(`peixes_${message.author.id}`, peixes)
                            db.add(`camarao_${message.author.id}`, camarao)
                            db.add(`mpoints_${message.author.id}`, dinh)
                            db.set(`pescatimeout_${message.author.id}`, Date.now())
                            var pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('🎣 Você pescou com sucesso!')
                                .addField('<:StarPoint:766794021128765469> <:StarPoint:766794021128765469> Você achou um baú do tesouro! <:StarPoint:766794021128765469> <:StarPoint:766794021128765469>', `Você obteve: ${dinh}<:StarPoint:766794021128765469>MPoints, ${peixes} 🐟 peixes, ${iiscas} 🪱 Iscas e ${camarao} 🍤 Camarões`)
                            return message.inlineReply(pescaembed)
                        }
                    }

                    if (randa === "loose") {

                        var peixes = Math.floor(Math.random() * 4) + 1
                        var iiscas = Math.floor(Math.random() * 3) + 1
                        var camarao = Math.floor(Math.random() * 2) + 1
                        db.subtract(`iscas_${message.author.id}`, 1)
                        db.add(`iscas_${message.author.id}`, iiscas)
                        db.add(`peixes_${message.author.id}`, peixes)
                        db.add(`camarao_${message.author.id}`, camarao)
                        db.add(`mpoints_${message.author.id}`, din)
                        db.set(`pescatimeout_${message.author.id}`, Date.now())
                        var pescaembed = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('🎣 Você pescou com sucesso')
                            .addField('<:StarPoint:766794021128765469> <:StarPoint:766794021128765469> Você achou um baú do tesouro! <:StarPoint:766794021128765469> <:StarPoint:766794021128765469>', `Você obteve: ${din}<:StarPoint:766794021128765469>MPoints, ${peixes} 🐟 peixes, ${iiscas} 🪱 Iscas e ${camarao} 🍤 Camarões `)
                        return message.inlineReply(pescaembed)
                    }

                    var loli = db.get(`loli_${message.author.id}`)
                    if (randa === "loli") {
                        if (loli === null) {
                            db.set(`loli_${message.author.id}`, "Loli")
                            var pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Clase Especial')
                                .setDescription(`**Loli:** <:Loli:831571527744356422> Oooi ${message.author}, tudo bem com você? De agora em diante eu vou ser a sua parceira :heart:`)
                            return message.inlineReply(pescaembed)
                        } else if (!db.get(`loli_${message.author.id}`)) {
                            db.set(`loli_${message.author.id}`, "Loli")
                            var pescaembed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('⭐ Você adquiriu um item de Clase Especial')
                                .setDescription(`**Loli:** <:Loli:831571527744356422> Oooi ${message.author}, tudo bem com você? De agora em diante eu vou ser a sua parceira :heart:`)
                            return message.inlineReply(pescaembed)
                        } else {
                            var frase = ['Oii, sabia que eu gosto de passear enquanto vejo os passarinhos?', 'Sabia que um dia eu cai da cama e machuquei meu braço?', 'Ei, eu tenho medo de pessoas más.']
                            var result = frase[Math.floor(Math.random() * frase.length)]
                            var looli = new Discord.MessageEmbed()
                                .setColor('BLUE')
                                .setTitle('Uma garotinha atrapalhou sua pesca.')
                                .setDescription(`<:Loli:831571527744356422> ${result}`)
                            return message.inlineReply(looli)
                        }
                    }

                    if (randa === "nololi") {
                        var frase = ['Oii, sabia que eu gosto de passear enquanto vejo os passarinhos?', 'Sabia que um dia eu cai da cama e machuquei meu braço?', 'Ei, eu tenho medo de pessoas más.']
                        var result = frase[Math.floor(Math.random() * frase.length)]
                        var looli = new Discord.MessageEmbed()
                            .setColor('BLUE')
                            .setTitle('Uma garotinha atrapalhou sua pesca.')
                            .setDescription(`<:Loli:831571527744356422> ${result}`)
                        return message.inlineReply(looli)
                    }
                }

                if (rand === 'lose') {
                    var peixes = Math.floor(Math.random() * 2) + 1
                    db.subtract(`iscas_${message.author.id}`, 1)
                    db.add(`peixes_${message.author.id}`, peixes)
                    db.set(`pescatimeout_${message.author.id}`, Date.now())
                    var pescaembed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('🎣 Você pescou com sucesso!')
                        .setDescription(`Com a pesca, você obteve ${peixes} peixes.`)
                    return message.inlineReply(pescaembed)
                }
            } else {
                var novara = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Comando bloqueado')
                    .setDescription(`${message.author}, você não tem iscas suficiente.`)
                return message.inlineReply(novara)
            }
        }
    }
}