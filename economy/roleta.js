const Discord = require("discord.js")
const db = require("quick.db")
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

        let timeout1 = 2400000
        let author1 = await db.fetch(`roletatimeout_${message.author.id}`)

        if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
            let time = ms(timeout1 - (Date.now() - author1))

            return message.channel.send(`❌ ${message.author}, as roletas estão voltando ao lugar, volte em: ${time.minutes}m e ${time.seconds}s`)
        } else {

            let fichas = db.get(`fichas_${message.author.id}`)
            let money = db.get(`mpoints_${message.author.id}`)

            let formato = 'Siga o formato correto: `' + prefix + 'roleta valor`'
            let valor = args[0]

            let chances = ["win", "lose", "empate"]
            let result = chances[Math.floor(Math.random() * chances.length)]

            let roletaembed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('🎲 Roleta Naya')
                .setDescription('<:pikachu:833378638291271680> Seja muito bem vindo a Roleta Naya!\n \n❓ **O que é a Roleta Naya?**\n- A Roleta é um simples jogo onde você ganha ou perde dinheiro.\n \nA Roleta consiste em uma variavel de sorte, onde depende de um resultado aleatório para você ganhar.')
                .addField('📜 Como jogar', '1. Compre algumas fichas na `' + prefix + 'loja`\n2. Digite `' + prefix + 'roleta Valor que quer apostar`\n Prontinho, é só isso.')
                .addField('📌 Informações adicionais', '**1.** Todo o dinheiro perdido, vai para o meu banco\n**2.** O resultado de vitória é de 20%, derrota é de 40% e empate 40%\n**3. Resultado**\nVitória: Recebe de volta até o dobro do valor apostado\nEmpate: Recebe de volta o dinheiro apostado\nDerrota: O dinheiro apostado vai para o meu banco.')
                .setFooter('A Naya não se responsabiliza por dinheiro perdido.')

            if (['all', 'tudo', 'ALL', 'All', 'Tudo', 'TUDO'].includes(args[0])) {
                if (args[1]) { return message.inlineReply('<:xis:835943511932665926> Nada além do "all", coisas a mais atrapalha meu processamento.') }
                if (fichas === null) { return message.inlineReply('<:xis:835943511932665926> Você não tem fichas para jogar.') }
                if (fichas === 0) { return message.inlineReply('<:xis:835943511932665926> Você não tem fichas para jogar.') }
                if (fichas < 0) { return message.inlineReply('<:xis:835943511932665926> Você não tem fichas para jogar.') }
                if (money === null) { money = '0' }
                if (money === '0') { return message.inlineReply('<:xis:835943511932665926> Você não tem dinheiro para jogar.') }
                if (money < '0') { return message.inlineReply('<:xis:835943511932665926> Você quer jogar na roleta estando negativado?.') }

                db.set(`roletatimeout_${message.author.id}`, Date.now())
                db.subtract(`fichas_${message.author.id}`, 1)
                db.add(`rolcache_${message.author.id}`, money)
                db.subtract(`mpoints_${message.author.id}`, money)
                let cache = db.get(`rolcache_${message.author.id}`)

                let winmoney2 = cache
                let winmoney3 = cache / 2
                let winmoney4 = cache / 4
                let winratemoney = [winmoney2, winmoney3, winmoney4, winmoney3, winmoney2, winmoney4, winmoney3, winmoney4, winmoney3, winmoney4]
                let winprize = winratemoney[Math.floor(Math.random() * winratemoney.length)]
                let finalprize = winprize + cache

                let jogando = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setDescription(`🔄 ${message.author} iniciou um jogo na roleta apostando todo o dinheiro da carteira...`)

                let winembed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('💰 GANHOU!')
                    .setDescription(`${message.author} apostou tudo na roleta e faturou ${winprize}<:StarPoint:766794021128765469>MPoints`)

                let loseembed = new Discord.MessageEmbed()
                    .setColor('#8B0000')
                    .setTitle('❌ PERDEU!')
                    .setDescription(`${message.author} jogou na roleta e perdeu todo o dinheiro da carteira.`)

                let empateembed = new Discord.MessageEmbed()
                    .setColor('YELLOW')
                    .setTitle('🏷️ EMPATE')
                    .setDescription(`${message.author} apostou tudo na roleta e não ganhou nada.`)

                if (result === "win") {
                    setTimeout(function () {
                        db.add(`mpoints_${message.author.id}`, finalprize)
                        db.delete(`rolcache_${message.author.id}`)
                        message.inlineReply(winembed)
                    }, 6300)
                    return message.inlineReply(jogando).then(msg => msg.delete({ timeout: 6000 }).catch(err => { return }))
                }

                if (result === "lose") {
                    setTimeout(function () {
                        db.add(`banco_${client.user.id}`, cache)
                        db.delete(`rolcache_${message.author.id}`)
                        message.inlineReply(loseembed)
                    }, 6300)
                    return message.inlineReply(jogando).then(msg => msg.delete({ timeout: 6000 }).catch(err => { return }))
                }

                if (result === "empate") {
                    setTimeout(function () {
                        db.add(`mpoints_${message.author.id}`, cache)
                        db.delete(`rolcache_${message.author.id}`)
                        message.inlineReply(empateembed)
                    }, 6300)
                    return message.inlineReply(jogando).then(msg => msg.delete({ timeout: 6000 }).catch(err => { return }))
                }
            }

            if (!args[0]) { return message.inlineReply(roletaembed) }
            if (['help', 'ajuda'].includes(args[0])) { return message.inlineReply(roletaembed) }
            if (fichas === null) { return message.inlineReply('<:xis:835943511932665926> Você não tem fichas para jogar.') }
            if (fichas === 0) { return message.inlineReply('<:xis:835943511932665926> Você não tem fichas para jogar.') }
            if (fichas < 0) { return message.inlineReply('<:xis:835943511932665926> Você não tem fichas para jogar.') }
            if (isNaN(args[0])) { return message.inlineReply(`<:xis:835943511932665926>  **${args.join(" ")}** não é um número.\n${formato}`) }
            if (money === null) { money = '0' }
            if (money === '0') { return message.inlineReply('<:xis:835943511932665926> Você não tem dinheiro para jogar.') }
            if (money < valor) { return message.inlineReply('<:xis:835943511932665926> Você não possui todo esse dinheiro na carteira.') }
            if (valor < '0' || valor === '0') { return message.inlineReply('❓ Informe uma quantia maior que 0.') }
            if (args[1]) { return message.inlineReply(formato) }

            db.set(`roletatimeout_${message.author.id}`, Date.now())
            db.subtract(`fichas_${message.author.id}`, 1)
            db.add(`rolcache_${message.author.id}`, valor)
            db.subtract(`mpoints_${message.author.id}`, valor)
            let cache = db.get(`rolcache_${message.author.id}`)

            let winmoney2 = valor
            let winmoney3 = valor / 2
            let winmoney4 = valor / 4
            let winratemoney = [winmoney2, winmoney3, winmoney4, winmoney3, winmoney2, winmoney4, winmoney3, winmoney4, winmoney3, winmoney4]
            let winprize = winratemoney[Math.floor(Math.random() * winratemoney.length)]
            let finalprize = winprize + cache

            let jogando = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription(`🔄 ${message.author} iniciou um jogo na roleta...`)

            let winembed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('💰 GANHOU!')
                .setDescription(`${message.author} apostou ${args[0]} na roleta e faturou ${winprize}<:StarPoint:766794021128765469>MPoints`)

            let loseembed = new Discord.MessageEmbed()
                .setColor('#8B0000')
                .setTitle('❌ PERDEU!')
                .setDescription(`${message.author} jogou na roleta e perdeu ${valor}<:StarPoint:766794021128765469>MPoints`)

            let empateembed = new Discord.MessageEmbed()
                .setColor('YELLOW')
                .setTitle('🏷️ EMPATE')
                .setDescription(`${message.author} jogou na roleta e não ganhou nada.`)

            if (result === "win") {
                setTimeout(function () {
                    db.add(`mpoints_${message.author.id}`, finalprize)
                    db.delete(`rolcache_${message.author.id}`)
                    message.inlineReply(winembed)
                }, 6300)
                return message.inlineReply(jogando).then(msg => msg.delete({ timeout: 6000 }).catch(err => { return }))
            }

            if (result === "lose") {
                setTimeout(function () {
                    db.add(`banco_${client.user.id}`, cache)
                    db.delete(`rolcache_${message.author.id}`)
                    message.inlineReply(loseembed)
                }, 6300)
                return message.inlineReply(jogando).then(msg => msg.delete({ timeout: 6000 }).catch(err => { return }))
            }

            if (result === "empate") {
                setTimeout(function () {
                    db.add(`mpoints_${message.author.id}`, cache)
                    db.delete(`rolcache_${message.author.id}`)
                    message.inlineReply(empateembed)
                }, 6300)
                return message.inlineReply(jogando).then(msg => msg.delete({ timeout: 6000 }).catch(err => { return }))
            }
        }
    }
}