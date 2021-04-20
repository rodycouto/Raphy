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
                .setTitle('<:StarPoint:766794021128765469> Sistema de Compras Maya')
                .setDescription('Aqui você pode comprar os itens da lojinha. É muito simples, basta usar o comando, assim você compra itens e pode usa-lo.\n \nDigite o nome do item com meu prefixo que eu te falo mais informações sobre ele.')
                .addField('Comando', '`' + prefix + 'buy Nome do item`')
                .addField('Todos os itens', '`' + prefix + 'loja`')
            return message.inlineReply(noargs)
        }

        if (['vara de pesca', 'vara', 'pesca', 'Vara de Pesca'].includes(args.join(" "))) {

            if (db.get(`vara_${message.author.id}`)) {
                return message.inlineReply(`Você já possui este item.`)
            }

            var money = db.get(`money_${message.author.id}`)
            if (money === null) { money = 0 }

            if (money === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (money < 5000) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro suficiente para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (money == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você não tem dinheiro.`)
                return message.inlineReply(nota)
            }

            if (money < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você está com divida.`)
                return message.inlineReply(nota)
            }

            if (money = 5000 || money > 5000) {
                db.subtract(`money_${message.author.id}`, 5000)
                db.add(`bank_${client.user.id}`, 5000)
                db.set(`vara_${message.author.id}`, "Vara de pesca")

                var buypesca = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}` + ', você comprou uma 🎣 `Vara de Pesca`')
                return message.inlineReply(buypesca)
            }
        }

        if (['machado', 'Machado'].includes(args[0])) {

            if (db.get(`machado_${message.author.id}`)) {
                return message.inlineReply(`Você já possui este item.`)
            }

            var money = db.get(`money_${message.author.id}`)
            if (money === null) { money = 0 }

            if (money === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (money < 400) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro suficiente para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (money == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você não tem dinheiro.`)
                return message.inlineReply(nota)
            }

            if (money < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você está com divida.`)
                return message.inlineReply(nota)
            }

            if (money = 400 || money > 400) {
                db.subtract(`money_${message.author.id}`, 400)
                db.add(`bank_${client.user.id}`, 400)
                db.set(`machado_${message.author.id}`, "Machado")

                var buypesca = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}` + ', você comprou um 🪓 `Machado`')
                return message.inlineReply(buypesca)
            }
        }

        if (['arma', 'gun', 'Arma'].includes(args[0])) {

            if (db.get(`arma_${message.author.id}`)) {
                return message.inlineReply(`Você já possui este item.`)
            }

            var money = db.get(`money_${message.author.id}`)
            if (money === null) { money = 0 }

            if (money === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (money < 100000) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro suficiente para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (money == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro.`)
                return message.inlineReply(nota)
            }

            if (money < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você está com divida.`)
                return message.inlineReply(nota)
            }

            if (money = 100000 || money > 100000) {
                db.subtract(`money_${message.author.id}`, 100000)
                db.add(`bank_${client.user.id}`, 100000)
                db.set(`arma_${message.author.id}`, "Arma")
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}` + ', você comprou uma 🔫 `Arma`')
                return message.inlineReply(buyarma)
            }
        }

        if (['agua', 'Água', 'água', 'water', 'águas', 'aguas', 'copo', 'd\água'].includes(args[0])) {

            var money = db.get(`money_${message.author.id}`)
            if (money === null) { money = 0 }

            if (money === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (!args[1]) {
                return message.inlineReply('Quantas águas você quer comprar? `' + prefix + 'buy aguas quantidade`')
            }
            if (money < args[1] * 10) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro suficiente para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (money == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro.`)
                return message.inlineReply(nota)
            }

            if (money < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('✅ Compra negada')
                    .setDescription(`${message.author}, você está com divida.`)
                return message.inlineReply(nota)
            }

            db.add(`agua_${message.author.id}`, args[1] * 1)
            var acima = db.get(`agua_${message.author.id}`)
            if (acima > 70) {
                db.subtract(`agua_${message.author.id}`, args[1] * 1)
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('LIMITE DE ÁGUAS ATINGIDO!')
                    .setDescription(`${message.author}, você não pode passar de **70 copos d'água**.`)
                return message.inlineReply(nota)
            }

            if (money = 10 || money > 10) {
                db.subtract(`money_${message.author.id}`, args[1] * 10)
                db.add(`bank_${client.user.id}`, args[1] * 10)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}` + ', ' + 'você comprou ' + `${args[1]}` + ' 🥤 `Copos de água`')
                return message.inlineReply(buyarma)
            }
        }

        if (['picareta', "Picareta"].includes(args[0])) {

            if (db.get(`picareta_${message.author.id}`)) {
                return message.inlineReply(`Você já possui este item.`)
            }

            var money = db.get(`money_${message.author.id}`)
            if (money === null) { money = 0 }

            if (money === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (money < 350) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro suficiente para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (money == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro.`)
                return message.inlineReply(nota)
            }

            if (money < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você está com divida.`)
                return message.inlineReply(nota)
            }

            if (money = 350 || money > 350) {
                db.subtract(`money_${message.author.id}`, 350)
                db.add(`bank_${client.user.id}`, 350)
                db.set(`picareta_${message.author.id}`, "Picareta")
                db.add(`offpicareta_${message.author.id}`, 50)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}` + ', você comprou uma ⛏️ `Picareta`')
                return message.inlineReply(buyarma)
            }
        }

        if (['título', 'title', 'titulo', 'Título', 'TITULO', 'TÍTULO'].includes(args[0])) {

            if (db.get(`title_${message.author.id}`)) {
                return message.inlineReply(`Você já possui a permissão de alterar seu título.`)
            }

            var money = db.get(`money_${message.author.id}`)
            if (money === null) { money = 0 }

            if (money === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro para comprar esta permissão.`)
                return message.inlineReply(nota)
            }

            if (money < 10000000) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro suficiente para comprar esta permissão.`)
                return message.inlineReply(nota)
            }

            if (money == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro.`)
                return message.inlineReply(nota)
            }

            if (money < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}, você está com divida.`)
                return message.inlineReply(nota)
            }

            if (money = 10000000 || money > 10000000) {
                db.subtract(`money_${message.author.id}`, 10000000)
                db.add(`bank_${client.user.id}`, 10000000)
                db.set(`title_${message.author.id}`, "ON")
                var buyTitle = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}` + ', você comprou a permissão 🔰 `Título`')
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

            var money = db.get(`money_${message.author.id}`)
            if (money === null) { money = 0 }

            if (money === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (!args[1]) {
                return message.inlineReply('Quantas iscas você quer comprar? `' + prefix + 'buy iscas quantidade`')
            }
            if (money < args[1] * 10) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro suficiente para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (money == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro.`)
                return message.inlineReply(nota)
            }

            if (money < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('✅ Compra negada')
                    .setDescription(`${message.author}, você está com divida.`)
                return message.inlineReply(nota)
            }

            db.add(`iscas_${message.author.id}`, args[1] * 1)
            var acima = db.get(`iscas_${message.author.id}`)
            if (acima > 50) {
                db.subtract(`iscas_${message.author.id}`, args[1] * 1)
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('LIMITE DE ISCAS ATINGIDO!')
                    .setDescription(`${message.author}, você não pode passar de **50 iscas**.`)
                return message.inlineReply(nota)
            }

            if (money > args[1] * 10) {
                db.subtract(`money_${message.author.id}`, args[1] * 10)
                db.add(`bank_${client.user.id}`, args[1] * 10)
                var buyarma = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('✅ Compra aprovada')
                    .setDescription(`${message.author}` + ', ' + 'você comprou ' + `${args[1]}` + ' 🪱 `Iscas`')
                return message.inlineReply(buyarma)
            }
        }

        if (['Carta', 'carta', 'cartas', 'Cartas', 'letter', 'Letter'].includes(args[0])) {

            var money = db.get(`money_${message.author.id}`)
            if (money === null) { money = 0 }

            if (money === null) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro para comprar este item.`)
                return message.inlineReply(nota)
            }

            if (!args[1]) {
                return message.inlineReply('Quantas cartas você quer comprar? `' + prefix + 'buy cartas quantidade`')
            }

            if (money == 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro.`)
                return message.inlineReply(nota)
            }

            if (money < 0) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('✅ Compra negada')
                    .setDescription(`${message.author}, você está com divida.`)
                return message.inlineReply(nota)
            }

            if (!money > args[1] * 1000) {
                var nota = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('❌ Compra negada')
                    .setDescription(`${message.author}, você não tem dinheiro suficiente para comprar este item.`)
                return message.inlineReply(nota)
            }

            db.add(`cartas_${message.author.id}`, args[1])

            var acima = db.get(`cartas_${message.author.id}`)
            if (acima > 10) {
                db.subtract(`cartas_${message.author.id}`, args[1])
                var limit = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('LIMITE DE CARTAS ATINGIDO!')
                    .setDescription(`${message.author}, você não pode passar de **10 cartas**.`)
                return message.inlineReply(limit)
            }

            db.subtract(`money_${message.author.id}`, args[1] * 1000)
            db.add(`bank_${client.user.id}`, args[1] * 1000)

            var buycarta = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('✅ Compra aprovada')
                .setDescription(`${message.author}` + ', ' + 'você comprou ' + `${args[1]}` + ' 💌 `Cartas`')
            return message.inlineReply(buycarta)
        }

        if (['Estrelas', 'Estrela', 'Star', 'estrela', 'stars', 'estrelas'].includes(args[0])) {
            return message.inlineReply('Este item ainda não está a venda.')
        }

        if (['Escudo', 'escudo', 'shield'].includes(args[0])) {
            return message.inlineReply('Este item ainda não está a venda.')
        } else {
            return message.inlineReply(`Eu não achei nenhum item com o nome **${args.join(" ")}** na minha loja, tente digitar um único nome, tipo "vara" ou "água".`)
        }
    }
}