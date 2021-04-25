const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    let timeout1 = 9140000
    let author1 = await db.fetch(`pego_${message.author.id}`)

    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
        let time = ms(timeout1 - (Date.now() - author1))

        var presomax = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('🚨 Você está em prisão máxima!')
            .setDescription(`Liberdade em: ${time.hours}h ${time.minutes}m e ${time.seconds}s`)

        return message.inlineReply(presomax)
    } else {

        let user = message.mentions.members.first()

        if (!args[0]) {
            var noargs = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('<:StarPoint:766794021128765469> Sistema de Vendas Maya')
                .setDescription('Aqui você pode vender seus itens em troca de MPoints. É muito simples, basta usar o comando, assim você pode vender os itens obtidos.\n \nDigite o nome do item com meu prefixo que eu te falo mais informações sobre ele.')
                .addField('Comando', '`' + prefix + 'vender NomeDoItem Quantidade`')
                .addField('Todos os itens', '`' + prefix + 'loja`')
            return message.inlineReply(noargs)
        }

        let peixes = await db.get(`peixes_${message.author.id}`)
        if (peixes === null) { peixes = "0" }
        if (!db.get(`peixes_${message.author.id}`)) { peixes = 0 }

        let camarao = await db.get(`camarao_${message.author.id}`)
        if (camarao === null) { camarao = "0" }
        if (!db.get(`camarao_${message.author.id}`)) { camarao = 0 }

        let apple = await db.get(`apple_${message.author.id}`)
        if (apple === null) { apple = "0" }
        if (!db.get(`apple_${message.author.id}`)) { apple = 0 }

        let diamond = await db.get(`diamond_${message.author.id}`)
        if (diamond === null) { diamond = "0" }
        if (!db.get(`diamond_${message.author.id}`)) { diamond = 0 }

        let minerio = await db.get(`minerio_${message.author.id}`)
        if (minerio === null) { minerio = 0 }
        if (!db.get(`minerio_${message.author.id}`)) { minerio = 0 }

        let ossos = await db.get(`ossos_${message.author.id}`)
        if (ossos === null) { ossos = 0 }
        if (!db.get(`ossos_${message.author.id}`)) { ossos = 0 }

        let madeira = await db.get(`madeira_${message.author.id}`)
        if (madeira === null) { madeira = "0" }
        if (!db.get(`madeira_${message.author.id}`)) { madeira = "0" }

        if (user) { return message.inlineReply(`O sistema de venda inter-jogadores estará pronto dentro de 2 dias.`) }

        if (['peixe', 'peixes', 'fish'].includes(args[0])) {

            if (peixes === null) { return message.inlineReply(`❌ ${message.author}, você não tem peixes para vender.`) }
            if (!args[1]) { return message.inlineReply('Quantos peixes você quer vender? `' + prefix + 'vender peixes quantidade`') }
            if (peixes < args[1]) { return message.inlineReply(`❌ ${message.author}, você não tem tudo isso de peixes para vender.`) }
            if (peixes == 0) { return message.inlineReply(`❌ ${message.author}, você não tem peixes para vender.`) }
            if (peixes < 0) { return message.inlineReply(`❌ ${message.author}, você não tem peixes para vender.`) }

            if (peixes = args[1] || peixes > args[1]) {
                db.subtract(`peixes_${message.author.id}`, args[1])
                db.add(`mpoints_${message.author.id}`, args[1] * 3)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 🐟 ${args[1]} peixes e obteve ${args[1] * 3}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        }

        if (['ossos', 'bone', 'osso'].includes(args[0])) {

            if (ossos === null) { return message.inlineReply(`❌ ${message.author}, você não tem ossos para vender.`) }
            if (!args[1]) { return message.inlineReply('Quantos ossos você quer vender? `' + prefix + 'vender peixes quantidade`') }
            if (ossos < args[1]) { return message.inlineReply(`❌ ${message.author}, você não tem tudo isso de ossos para vender.`) }
            if (ossos == 0) { return message.inlineReply(`❌ ${message.author}, você não tem ossos para vender.`) }
            if (ossos < 0) { return message.inlineReply(`❌ ${message.author}, você não tem ossos para vender.`) }

            if (ossos = args[1] || ossos > args[1]) {
                db.subtract(`ossos_${message.author.id}`, args[1])
                db.add(`mpoints_${message.author.id}`, args[1] * 2)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 🦴 ${args[1]} ossos e obteve ${args[1] * 2}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        }

        if (['camaroes', 'camarões', 'camarao', 'camarão'].includes(args[0])) {

            if (camarao === null) { return message.inlineReply(`❌ ${message.author}, você não tem camarões para vender.`) }
            if (!args[1]) { return message.inlineReply('Quantos camarões você quer vender? `' + prefix + 'vender camarões quantidade`') }
            if (camarao < args[1]) { return message.inlineReply(`❌ ${message.author}, você não tem tudo isso de camarões para vender.`) }
            if (camarao == 0) { return message.inlineReply(`❌ ${message.author}, você não tem camarões para vender.`) }
            if (camarao < 0) { return message.inlineReply(`❌ ${message.author}, você não tem camarões para vender.`) }

            if (camarao = args[1] || camarao > args[1]) {
                db.subtract(`camarao_${message.author.id}`, args[1])
                db.add(`mpoints_${message.author.id}`, args[1] * 4)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 🍤 ${args[1]} camarões e obteve ${args[1] * 4}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        }

        if (['minerio', 'min', 'minerios', 'pedra', 'ferro', 'minérios', 'minério'].includes(args[0])) {

            if (minerio === null) { return message.inlineReply(`❌  ${message.author}, você não tem minerios para vender.`) }
            if (!args[1]) { return message.inlineReply('Quantos minerios você quer vender? `' + prefix + 'vender minerios quantidade`') }
            if (minerio < args[1]) { return message.inlineReply(`❌ ${message.author}, você não tem tudo isso de minerios para vender.`) }
            if (minerio == 0) { return message.inlineReply(`❌ ${message.author}, você não tem minerios para vender.`) }
            if (minerio < 0) { return message.inlineReply(`❌ ${message.author}, você não tem minerios para vender.`) }

            if (minerio = args[1] || minerio > args[1]) {
                db.subtract(`minerio_${message.author.id}`, args[1])
                db.add(`mpoints_${message.author.id}`, args[1] * 4)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 🪨 ${args[1]} minerios e obteve ${args[1] * 4}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        }

        if (['diamantes', 'diamante', 'diamond'].includes(args[0])) {

            if (diamond === null) { return message.inlineReply(`❌ ${message.author}, você não tem diamantes para vender.`) }
            if (!args[1]) { return message.inlineReply('Quantos diamantes você quer vender? `' + prefix + 'vender diamantes quantidade`') }
            if (diamond < args[1]) { return message.inlineReply(`❌ ${message.author}, você não tem tudo isso de diamantes para vender.`) }
            if (diamond == 0) { return message.inlineReply(`❌ ${message.author}, você não tem diamantes para vender.`) }
            if (diamond < 0) { return message.inlineReply(`❌ ${message.author}, você não tem diamantes para vender.`) }

            var amoutrand = Math.floor(Math.random() * 6000) + 1

            if (diamond = args[1] || diamond > args[1]) {
                db.subtract(`diamond_${message.author.id}`, args[1])
                db.add(`mpoints_${message.author.id}`, args[1] * amoutrand)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 💎 ${args[1]} diamantes e obteve ${args[1] * amoutrand}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        }

        if (['madeira', 'madeiras', 'wood', 'tronco'].includes(args[0])) {

            if (madeira === null) { return message.inlineReply(`❌ ${message.author}, você não tem madeiras para vender.`) }
            if (!args[1]) { return message.inlineReply('Quantas madeiras você quer vender? `' + prefix + 'vender madeira quantidade`') }
            if (madeira < args[1]) { return message.inlineReply(`❌ ${message.author}, você não tem tudo isso de madeiras para vender.`) }
            if (madeira == 0) { return message.inlineReply(`❌ ${message.author}, você não tem madeiras para vender.`) }
            if (madeira < 0) { return message.inlineReply(`❌ ${message.author}, você não tem madeiras para vender.`) }

            if (madeira = args[1] || madeira > args[1]) {
                db.subtract(`madeira_${message.author.id}`, args[1])
                db.add(`mpoints_${message.author.id}`, args[1] * 5)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 🪵 ${args[1]} madeiras e obteve ${args[1] * 5}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        }

        if (['maças', 'apple', 'maça', 'apples'].includes(args[0])) {

            if (apple === null) { return message.inlineReply(`❌ ${message.author}, você não tem maças para vender.`) }
            if (!args[1]) { return message.inlineReply('Quantas madeiras você quer vender? `' + prefix + 'vender maças quantidade`') }
            if (apple < args[1]) { return message.inlineReply(`❌ ${message.author}, você não tem tudo isso de maças para vender.`) }
            if (apple == 0) { return message.inlineReply(`❌ ${message.author}, você não tem maças para vender.`) }
            if (apple < 0) { return message.inlineReply(`❌ ${message.author}, você não tem maças para vender.`) }

            if (apple = args[1] || apple > args[1]) {
                db.subtract(`apple_${message.author.id}`, args[1])
                db.add(`mpoints_${message.author.id}`, args[1] * 2)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 🍎 ${args[1]} maças e obteve ${args[1] * 2}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        } else {
            return message.inlineReply(`Eu não achei nenhum item com o nome **${args.join(" ")}** no meu banco de dados.`)
        }
    }
}