const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

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

        if (!args[0]) {
            var noargs = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('<:StarPoint:766794021128765469> Sistema de Vendas Maya')
                .setDescription('Aqui você pode vender seus itens em troca de MPoints. É muito simples, basta usar o comando, assim você pode vender os itens obtidos.\n \nDigite o nome do item com meu prefixo que eu te falo mais informações sobre ele.')
                .addField('Comando', '`' + prefix + 'sell NomeDoItem Quantidade`')
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

        if (['peixe', 'peixes', 'fish'].includes(args[0])) {

            if (peixes === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem peixes para vender.`)
                return message.inlineReply(nota)
            }

            if (!args[1]) {
                return message.inlineReply('Quantos peixes você quer vender? `' + prefix + 'sell peixes quantidade`')
            }

            if (peixes < args[1]) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem tudo isso de peixes para vender.`)
                return message.inlineReply(nota)
            }

            if (peixes == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem peixes para vender.`)
                return message.inlineReply(nota)
            }

            if (peixes < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem peixes para vender.`)
                return message.inlineReply(nota)
            }

            if (peixes = args[1] || peixes > args[1]) {
                db.subtract(`peixes_${message.author.id}`, args[1])
                db.add(`money_${message.author.id}`, args[1] * 7)
                db.subtract(`bank_${client.user.id}`, args[1] * 7)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 🐟 ${args[1]} peixes e obteve ${args[1] * 7}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        }

        if (['ossos', 'bone', 'osso'].includes(args[0])) {

            if (ossos === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem ossos para vender.`)
                return message.inlineReply(nota)
            }

            if (!args[1]) {
                return message.inlineReply('Quantos ossos você quer vender? `' + prefix + 'sell ossos quantidade`')
            }

            if (ossos < args[1]) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem tudo isso de ossos para vender.`)
                return message.inlineReply(nota)
            }

            if (ossos == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem ossos para vender.`)
                return message.inlineReply(nota)
            }

            if (ossos < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem ossos para vender.`)
                return message.inlineReply(nota)
            }

            if (ossos = args[1] || ossos > args[1]) {
                db.subtract(`ossos_${message.author.id}`, args[1])
                db.add(`money_${message.author.id}`, args[1] * 9)
                db.subtract(`bank_${client.user.id}`, args[1] * 9)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 🦴 ${args[1]} ossos e obteve ${args[1] * 5}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        }

        if (['camaroes', 'camarões', 'camarao', 'camarão'].includes(args[0])) {

            if (camarao === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem camarões para vender.`)
                return message.inlineReply(nota)
            }

            if (!args[1]) {
                return message.inlineReply('Quantos camarões você quer vender? `' + prefix + 'sell camarões quantidade`')
            }

            if (camarao < args[1]) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem tudo isso de camarões para vender.`)
                return message.inlineReply(nota)
            }

            if (camarao == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem camarões para vender.`)
                return message.inlineReply(nota)
            }

            if (camarao < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem camarões para vender.`)
                return message.inlineReply(nota)
            }

            if (camarao = args[1] || camarao > args[1]) {
                db.subtract(`camarao_${message.author.id}`, args[1])
                db.add(`money_${message.author.id}`, args[1] * 9)
                db.subtract(`bank_${client.user.id}`, args[1] * 9)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 🍤 ${args[1]} camarões e obteve ${args[1] * 12}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        }
        if (['minerio', 'min', 'minerios', 'pedra', 'ferro', 'minérios', 'minério'].includes(args[0])) {

            if (minerio === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem minerios para vender.`)
                return message.inlineReply(nota)
            }

            if (!args[1]) {
                return message.inlineReply('Quantos minerios você quer vender? `' + prefix + 'sell minerios quantidade`')
            }

            if (minerio < args[1]) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem tudo isso de minerios para vender.`)
                return message.inlineReply(nota)
            }

            if (minerio == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem minerios para vender.`)
                return message.inlineReply(nota)
            }

            if (minerio < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem minerios para vender.`)
                return message.inlineReply(nota)
            }

            if (minerio = args[1] || minerio > args[1]) {
                db.subtract(`minerio_${message.author.id}`, args[1])
                db.add(`money_${message.author.id}`, args[1] * 9)
                db.subtract(`bank_${client.user.id}`, args[1] * 9)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 🪨 ${args[1]} minerios e obteve ${args[1] * 15}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        }

        if (['diamantes', 'diamante', 'diamond'].includes(args[0])) {

            if (diamond === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem diamantes para vender.`)
                return message.inlineReply(nota)
            }

            if (!args[1]) {
                return message.inlineReply('Quantos diamantes você quer vender? `' + prefix + 'sell diamantes quantidade`')
            }

            if (diamond < args[1]) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem tudo isso de diamantes para vender.`)
                return message.inlineReply(nota)
            }

            if (diamond == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem diamantes para vender.`)
                return message.inlineReply(nota)
            }

            if (diamond < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem diamantes para vender.`)
                return message.inlineReply(nota)
            }

            if (diamond = args[1] || diamond > args[1]) {
                db.subtract(`diamond_${message.author.id}`, args[1])
                db.add(`money_${message.author.id}`, args[1] * 100)
                db.subtract(`bank_${client.user.id}`, args[1] * 100)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 💎 ${args[1]} diamantes e obteve ${args[1] * 100}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        }

        if (['madeira', 'madeiras', 'wood', 'tronco'].includes(args[0])) {

            if (madeira === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem madeiras para vender.`)
                return message.inlineReply(nota)
            }

            if (!args[1]) {
                return message.inlineReply('Quantas madeiras você quer vender? `' + prefix + 'sell madeira quantidade`')
            }

            if (madeira < args[1]) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem tudo isso de madeiras para vender.`)
                return message.inlineReply(nota)
            }

            if (madeira == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem madeiras para vender.`)
                return message.inlineReply(nota)
            }

            if (madeira < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem madeiras para vender.`)
                return message.inlineReply(nota)
            }

            if (madeira = args[1] || madeira > args[1]) {
                db.subtract(`madeira_${message.author.id}`, args[1])
                db.add(`money_${message.author.id}`, args[1] * 8)
                db.subtract(`bank_${client.user.id}`, args[1] * 8)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 🪵 ${args[1]} madeiras e obteve ${args[1] * 15}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        }

        if (['maças', 'apple', 'maça', 'apples'].includes(args[0])) {

            if (apple === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem maças para vender.`)
                return message.inlineReply(nota)
            }

            if (!args[1]) {
                return message.inlineReply('Quantas madeiras você quer vender? `' + prefix + 'sell maças quantidade`')
            }

            if (apple < args[1]) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem tudo isso de maças para vender.`)
                return message.inlineReply(nota)
            }

            if (apple == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem maças para vender.`)
                return message.inlineReply(nota)
            }

            if (apple < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Venda negada')
                    .setDescription(`${message.author}, você não tem maças para vender.`)
                return message.inlineReply(nota)
            }

            if (apple = args[1] || apple > args[1]) {
                db.subtract(`apple_${message.author.id}`, args[1])
                db.add(`money_${message.author.id}`, args[1] * 4)
                db.subtract(`bank_${client.user.id}`, args[1] * 4)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Venda aprovada')
                    .setDescription(`${message.author} vendeu 🍎 ${args[1]} maças e obteve ${args[1] * 4}<:StarPoint:766794021128765469>MPoints`)
                return message.inlineReply(buyarma)
            }
        } else {
            return message.inlineReply(`Eu não achei nenhum item com o nome **${args.join(" ")}** no meu banco de dados.`)
        }
    }
}