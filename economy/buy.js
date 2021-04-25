const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

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

        var money = db.get(`mpoints_${message.author.id}`)
        if (money === null) { money = 0 }

        if (!args[0]) {
            var noargs = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('<:StarPoint:766794021128765469> Sistema de Compras Maya')
                .setDescription('Aqui você pode comprar os itens da lojinha. É muito simples, basta usar o comando, assim você compra itens e pode usa-lo.\n \nDigite o nome do item com meu prefixo que eu te falo mais informações sobre ele.')
                .addField('Comando', '`' + prefix + 'buy Nome do item`')
                .addField('Todos os itens', '`' + prefix + 'loja`')
            return message.inlineReply(noargs)
        }

        if (['vara de pesca', 'vara', 'pesca', 'Vara de Pesca'].includes(args.join(" "))) {

            if (db.get(`vara_${message.author.id}`)) { return message.inlineReply(`❗ Você já possui este item.`) }
            if (money < 140) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar este item.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }

            if (money = 140 || money > 140) {
                db.subtract(`mpoints_${message.author.id}`, 140)
                db.add(`banco_${client.user.id}`, 140)
                db.set(`vara_${message.author.id}`, "Vara de pesca")

                var buypesca = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você comprou uma 🎣` + ' `Vara de Pesca`')
                return message.inlineReply(buypesca)
            }
        }

        if (['machado', 'Machado'].includes(args[0])) {

            if (db.get(`machado_${message.author.id}`)) { return message.inlineReply(`❗ Você já possui este item.`) }
            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money < 35) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar este item.`) }

            if (money = 35 || money > 35) {
                db.subtract(`mpoints_${message.author.id}`, 35)
                db.add(`banco_${client.user.id}`, 35)
                db.set(`machado_${message.author.id}`, "Machado")

                var buypesca = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você comprou um 🪓` + ' `Machado`')
                return message.inlineReply(buypesca)
            }
        }

        if (['arma', 'gun', 'Arma'].includes(args[0])) {

            if (db.get(`arma_${message.author.id}`)) { return message.inlineReply(`❗ Você já possui este item.`) }
            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money < 4000) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar este item.`) }

            if (money = 4000 || money > 4000) {
                db.subtract(`mpoints_${message.author.id}`, 4000)
                db.add(`banco_${client.user.id}`, 4000)
                db.set(`arma_${message.author.id}`, "Arma")
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você comprou uma 🔫` + ' `Arma`')
                return message.inlineReply(buyarma)
            }
        }

        if (['ticketloteria', 'ticket', 'Ticket', 'tickets', 'Tickets'].includes(args[0])) {

            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (!args[1]) { return message.inlineReply('Quantos tickets você quer comprar? `' + prefix + 'buy tickets quantidade`') }
            if (isNaN(args[1])) { return message.inlineReply(`${args[1]} não é um número.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < args[1] * 10) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar este item.`) }

            db.add(`ticketloteria_${message.author.id}`, args[1])
            db.subtract(`mpoints_${message.author.id}`, args[1] * 10)
            db.add('loteria', args[1] * 10)
            var buyarma = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('✅ Compra aprovada')
                .setDescription(`${message.author}, você comprou ${args[1]}` + ' 🎫 `Tickets da Loteria`')
            return message.inlineReply(buyarma)
        }

        if (['ficha', 'fichas'].includes(args[0])) {

            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (!args[1]) { return message.inlineReply('Quantas fichas você quer comprar? `' + prefix + 'buy fichas quantidade`') }
            if (isNaN(!args[1])) { return message.inlineReply(`${args[1]} não é um número.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money < args[1] * 2) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar este item.`) }

            db.add(`fichas_${message.author.id}`, args[1])
            var acima = db.get(`fichas_${message.author.id}`)
            if (acima > 50) {
                db.subtract(`fichas_${message.author.id}`, args[1])
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('LIMITE DE FICHAS ATINGIDO!')
                    .setDescription(`${message.author}, você não pode passar de **50 fichas**.`)
                return message.inlineReply(nota)
            }

            db.subtract(`mpoints_${message.author.id}`, args[1] * 2)
            db.add(`banco_${client.user.id}`, args[1] * 2)
            var buyarma = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('✅ Compra aprovada')
                .setDescription(`${message.author}, você comprou ${args[1]} ` + '🎟️ `Fichas`')
            return message.inlineReply(buyarma)
        }

        if (['agua', 'Água', 'água', 'water', 'águas', 'aguas', 'copo', 'd\água'].includes(args[0])) {

            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (!args[1]) { return message.inlineReply('Quantas águas você quer comprar? `' + prefix + 'buy águas quantidade`') }
            if (isNaN(args[1])) { return message.inlineReply('`' + prefix + 'buy águas quantidade`') }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money < args[1]) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar este item.`) }

            db.add(`agua_${message.author.id}`, args[1])
            var acima = db.get(`agua_${message.author.id}`)
            if (acima > 70) {
                db.subtract(`agua_${message.author.id}`, args[1])
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('LIMITE DE ÁGUAS ATINGIDO!')
                    .setDescription(`${message.author}, você não pode passar de **70 copos d'água**.`)
                return message.inlineReply(nota)
            }

            if (money = 1 || money > 1) {
                db.subtract(`mpoints_${message.author.id}`, args[1])
                db.add(`banco_${client.user.id}`, args[1])
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você comprou ${args[1]} ` + '🥤 `Copos de água`')
                return message.inlineReply(buyarma)
            }
        }

        if (['picareta', "Picareta"].includes(args[0])) {

            if (db.get(`picareta_${message.author.id}`)) { return message.inlineReply(`❗ Você já possui este item.`) }
            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money < 85) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar este item.`) }

            if (money = 85 || money > 85) {
                db.subtract(`mpoints_${message.author.id}`, 85)
                db.add(`banco_${client.user.id}`, 85)
                db.set(`picareta_${message.author.id}`, "Picareta")
                db.set(`offpicareta_${message.author.id}`, 50)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você comprou uma ⛏️` + ' `Picareta`')
                return message.inlineReply(buyarma)
            }
        }

        if (['título', 'title', 'titulo', 'Título', 'TITULO', 'TÍTULO'].includes(args[0])) {

            if (db.get(`title_${message.author.id}`)) { return message.inlineReply(`Você já possui a permissão de alterar seu título.`) }
            if (money === null) { return message.inlineReply(`${message.author}, você não tem dinheiro para comprar esta permissão.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money < 10000) { return message.inlineReply(`${message.author}, você não tem dinheiro suficiente para comprar esta permissão.`) }

            if (money = 10000 || money > 10000) {
                db.subtract(`mpoints_${message.author.id}`, 10000)
                db.add(`banco_${client.user.id}`, 10000)
                db.set(`title_${message.author.id}`, "ON")
                var buyTitle = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você comprou a permissão 🔰` + '`Título`')
                message.inlineReply(buyTitle)

                var premium = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Você liberou uma nova função')
                    .setDescription(`${message.author}, você agora consegue escolher um Título que será mostrado no seu perfil.`)
                    .addFields(
                        {
                            name: 'Comando',
                            value: '`' + prefix + 'settitulo Seu Novo Título`'
                        }
                    )
                    .setFooter('O título suporta até 3 palavras.')
                return message.inlineReply(premium)
            }
        }

        if (['isca', 'minhoca', 'iscas', 'minhocas', 'Isca', 'Iscas'].includes(args[0])) {

            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (!args[1]) { return message.inlineReply('Quantas iscas você quer comprar? `' + prefix + 'buy iscas quantidade`') }
            if (isNaN(args[1])) { return message.inlineReply(args[1] + ', não é um número, ok?`' + prefix + 'buy iscas quantidade`') }
            if (money < args[1]) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar este item.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }

            db.add(`iscas_${message.author.id}`, args[1])
            var acima = db.get(`iscas_${message.author.id}`)
            if (acima > 50) {
                db.subtract(`iscas_${message.author.id}`, args[1])
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('LIMITE DE ISCAS ATINGIDO!')
                    .setDescription(`${message.author}, você não pode passar de **50 iscas**.`)
                return message.inlineReply(nota)
            }

            if (money > args[1]) {
                db.subtract(`mpoints_${message.author.id}`, args[1])
                db.add(`banco_${client.user.id}`, args[1])
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}` + ', ' + 'você comprou ' + `${args[1]}` + ' 🪱 `Iscas`')
                return message.inlineReply(buyarma)
            }
        }

        if (['Carta', 'carta', 'cartas', 'Cartas', 'letter', 'Letter'].includes(args[0])) {

            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (!args[1]) { return message.inlineReply('Quantas cartas você quer comprar? `' + prefix + 'buy cartas quantidade`') }
            if (isNaN(args[1])) { return message.inlineReply('A quantidade precisa ser um número. `' + prefix + 'buy cartas quantidade`') }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money < args[1]) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar este item.`) }

            db.add(`cartas_${message.author.id}`, args[1])
            var acima = db.get(`cartas_${message.author.id}`)
            if (acima > 20) {
                db.subtract(`cartas_${message.author.id}`, args[1])
                var limit = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('LIMITE DE CARTAS ATINGIDO!')
                    .setDescription(`${message.author}, você não pode passar de **20 cartas**.`)
                return message.inlineReply(limit)
            }

            db.subtract(`mpoints_${message.author.id}`, args[1])
            db.add(`banco_${client.user.id}`, args[1])
            var buycarta = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('✅ Compra aprovada')
                .setDescription(`${message.author}, você comprou ${args[1]}` + ' 💌 `Cartas de Amor`')
            return message.inlineReply(buycarta)
        }

        if (['Escudo', 'escudo', 'shield'].includes(args[0])) {
            return message.inlineReply('Este item ainda não está a venda.')
        }

        if (['estrela1', 'Estrela1'].includes(args[0].toLowerCase())) {

            if (db.get(`estrela1_${message.author.id}`)) { return message.inlineReply(`<:xis:835943511932665926> Você já possui este item.`) }
            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money < 500000) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar esta permissão.`) }

            if (money = 500000 || money > 500000) {
                db.subtract(`mpoints_${message.author.id}`, 500000)
                db.add(`banco_${client.user.id}`, 500000)
                db.set(`estrela1_${message.author.id}`, "ON")

                var buyStar1 = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você comprou <:starM:832974891635572787>` + '`Estrela 1`')
                return message.inlineReply(buyStar1)
            }
        }

        if (['estrela2', 'Estrela2'].includes(args[0].toLowerCase())) {

            if (!db.get(`estrela1_${message.author.id}`)) { return message.inlineReply(`<:xis:835943511932665926> Você precisa da Estrela 1 para comprar a Estrela 2.`) }
            if (db.get(`estrela2_${message.author.id}`)) { return message.inlineReply(`<:xis:835943511932665926> Você já possui este item.`) }
            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money < 1000000) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar esta permissão.`) }

            if (money = 1000000 || money > 1000000) {
                db.subtract(`mpoints_${message.author.id}`, 1000000)
                db.add(`banco_${client.user.id}`, 1000000)
                db.set(`estrela2_${message.author.id}`, "ON")

                var buyStar1 = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você comprou <:starM:832974891635572787><:starM:832974891635572787>` + '`Estrela 2`')
                return message.inlineReply(buyStar1)
            }
        }

        if (['estrela3', 'Estrela3'].includes(args[0].toLowerCase())) {

            if (!db.get(`estrela2_${message.author.id}`)) { return message.inlineReply(`<:xis:835943511932665926> Você precisa da Estrela 2 para comprar a Estrela 3.`) }
            if (db.get(`estrela3_${message.author.id}`)) { return message.inlineReply(`<:xis:835943511932665926> Você já possui este item.`) }
            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money < 2000000) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar esta permissão.`) }

            if (money = 2000000 || money > 2000000) {
                db.subtract(`mpoints_${message.author.id}`, 2000000)
                db.add(`banco_${client.user.id}`, 2000000)
                db.set(`estrela3_${message.author.id}`, "ON")

                var buyStar1 = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você comprou <:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787>` + '`Estrela 3`')
                return message.inlineReply(buyStar1)
            }
        }

        if (['estrela4', 'Estrela4'].includes(args[0].toLowerCase())) {

            if (!db.get(`estrela3_${message.author.id}`)) { return message.inlineReply(`<:xis:835943511932665926> Você precisa da Estrela 3 para comprar a Estrela 4.`) }
            if (db.get(`estrela4_${message.author.id}`)) { return message.inlineReply(`<:xis:835943511932665926> Você já possui este item.`) }
            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money < 4000000) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar esta permissão.`) }

            if (money = 4000000 || money > 4000000) {
                db.subtract(`mpoints_${message.author.id}`, 4000000)
                db.add(`banco_${client.user.id}`, 4000000)
                db.set(`estrela4_${message.author.id}`, "ON")

                var buyStar1 = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você comprou <:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787>` + '`Estrela 4`')
                return message.inlineReply(buyStar1)
            }
        }

        if (['estrela5', 'Estrela5'].includes(args[0].toLowerCase())) {

            if (!db.get(`estrela4_${message.author.id}`)) { return message.inlineReply(`<:xis:835943511932665926> Você precisa da Estrela 4 para comprar a Estrela 5.`) }
            if (db.get(`estrela5_${message.author.id}`)) { return message.inlineReply(`<:xis:835943511932665926> Você já possui este item.`) }
            if (money === null) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro para comprar este item.`) }
            if (money === 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro.`) }
            if (money < 0) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você está com divida.`) }
            if (money < 10000000) { return message.inlineReply(`<:xis:835943511932665926> ${message.author}, você não tem dinheiro suficiente para comprar esta permissão.`) }

            if (money = 10000000 || money > 10000000) {
                db.subtract(`mpoints_${message.author.id}`, 10000000)
                db.add(`banco_${client.user.id}`, 10000000)
                db.set(`estrela5_${message.author.id}`, "ON")

                var buyStar1 = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você comprou <:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787>` + '`Estrela 5`')
                return message.inlineReply(buyStar1)
            }
        } else {
            return message.inlineReply(`Eu não achei nenhum item com o nome **${args.join(" ")}** na minha loja, tente digitar um único nome, tipo "vara" ou "água".`)
        }
    }
}