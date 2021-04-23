const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {
return message.inlineReply('Comando fechado para reajuste nos valores.')
    // 🏠 1  Casa - 🏦 2 Mansão - 🏛️ 3 Prefeitura - 🏣 4 Cartório - 📨 5 Correios - 💍 6 Joaleria - 🏢 7 Shopping - 🏭 8 Fabrica - 🏩 9 Motel - 🪙 10 Banco

    let user = message.author

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

        let timeout = 600000
        let author = await db.fetch(`procurado_${message.author.id}`)

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author))
            return message.inlineReply(`Xiiiiu ${message.author}!! Você está sendo procurado pela policia. A investigação vai durar mais ${time.minutes}m e ${time.seconds}s`)
        } else {

            let timeout2 = 1000000
            let author2 = await db.fetch(`preso_${message.author.id}`)

            if (author2 !== null && timeout2 - (Date.now() - author2) > 0) {
                let time = ms(timeout2 - (Date.now() - author2))
                return message.inlineReply(`Você está preso! Liberdade em: ${time.minutes}m e ${time.seconds}s`)
            } else {

                var newcrime = new Discord.MessageEmbed()
                    .setColor('GRAY')
                    .setTitle('🕵️‍♂️ Você está preste a entrar no mundo do crime 🕵️‍♂️ ')
                    .setDescription('O mundo do crime é um lugar perigoso, você pode ser preso e não conseguir fazer mais nada por horas.\n \nTem certeza que deseja entrar no mundo do crime?')
                    .setFooter('Auto delete em 30 segundos.')

                let timeout5 = 180000
                let crimetime = await db.fetch(`crimetimeout_${message.author.id}`)
                if (crimetime !== null && timeout5 - (Date.now() - crimetime) > 0) {
                    let time = ms(timeout5 - (Date.now() - crimetime))
                    return message.inlineReply(`Calminha! O mundo do crime é perigoso, volte em ${time.minutes}m, e ${time.seconds}s`)
                } else {

                    db.set(`crimetimeout_${message.author.id}`, Date.now())
                    await message.inlineReply(newcrime).then(msg => {
                        msg.react('🥷').catch(err => { return }) // Check
                        msg.react('❌').catch(err => { return }) // X
                        msg.delete({ timeout: 30000 }).catch(err => { return })


                        msg.awaitReactions((reaction, user) => {
                            if (message.author.id !== user.id) return

                            if (reaction.emoji.name === '🥷') { // Sim
                                msg.delete()

                                var embedcrime = new Discord.MessageEmbed()
                                    .setColor('#FF0000')
                                    .setTitle('🔎 Qual lugar da cidade você deseja roubar? :mag:')
                                    .setDescription('🏠 Casa\n🏦 Mansão\n🏛️ Prefeitura\n🏣 Cartório\n📨 Correios\n💍 Joaleria\n🏢 Shopping\n🏭 Fabrica\n🏩 Motel\n🪙 Banco')
                                    .setFooter('Auto delete em 1 minuto.')

                                return message.inlineReply(embedcrime).then(msg => {
                                    msg.react('🏠').catch(err => { return }) // 1
                                    msg.react('🏦').catch(err => { return }) // 2
                                    msg.react('🏛️').catch(err => { return }) // 3
                                    msg.react('🏣').catch(err => { return }) // 4
                                    msg.react('📨').catch(err => { return }) // 5
                                    msg.react('💍').catch(err => { return }) // 6
                                    msg.react('🏢').catch(err => { return }) // 7
                                    msg.react('🏭').catch(err => { return }) // 8
                                    msg.react('🏩').catch(err => { return }) // 9
                                    msg.react('🪙').catch(err => { return }) // 10
                                    msg.delete({ timeout: 60000 }).catch(err => { return })

                                    msg.awaitReactions((reaction, user) => { // CÓDIGOS DE OPÇÕES
                                        if (message.author.id !== user.id) return

                                        if (reaction.emoji.name === '🏠') { // 1
                                            msg.delete()

                                            var winlose = ['win', 'lose', 'win', 'win', 'fugiu']
                                            var result = winlose[Math.floor(Math.random() * winlose.length)]

                                            var embedcrime = new Discord.MessageEmbed()
                                                .setColor('#575353')
                                                .setDescription('🥷 Roubando uma casa...')

                                            var fugindo = new Discord.MessageEmbed()
                                                .setColor('RED')
                                                .setTitle('🚔 Haa nããão! A policia!!!')
                                                .setDescription('🏃 Fugindo...')

                                            var fugiu = new Discord.MessageEmbed()
                                                .setColor('YELLOW')
                                                .setTitle('Ufa, você escapou!')
                                                .setDescription('Você perdeu o dinheiro enquanto fugia.')

                                            if (result === "win") {
                                                let amount = (Math.floor(Math.random() * 100) + 1)
                                                db.add(`mpoints_${message.author.id}`, amount)
                                                db.set(`procurado_${message.author.id}`, Date.now())

                                                var win = new Discord.MessageEmbed()
                                                    .setColor('GREEN')
                                                    .setTitle(`${message.author.username} efetuou o roubo com sucesso!`)
                                                    .setDescription(`Com o roubo da casa, você obteve ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(win))
                                            } else if (result === "fugiu") {
                                                db.set(`procurado_${message.author.id}`, Date.now())
                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugiu))
                                            } else if (result === "lose") {
                                                let amount = (Math.floor(Math.random() * 100) + 1)
                                                db.subtract(`mpoints_${message.author.id}`, amount)
                                                db.set(`preso_${message.author.id}`, Date.now())

                                                var lose = new Discord.MessageEmbed()
                                                    .setColor('#FF0000')
                                                    .setTitle('🚨 Preso!')
                                                    .setDescription(`Você foi preso e perdeu ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(lose))
                                            }
                                        }
                                        if (reaction.emoji.name === '🏦') { // 2
                                            msg.delete()

                                            var winlose = ['win', 'lose', 'win', 'fugiu']
                                            var result = winlose[Math.floor(Math.random() * winlose.length)]

                                            var embedcrime = new Discord.MessageEmbed()
                                                .setColor('#575353')
                                                .setDescription('🥷 Roubando a mansão...')

                                            var fugindo = new Discord.MessageEmbed()
                                                .setColor('RED')
                                                .setTitle('🚔 Haa nããão! A policia!!!')
                                                .setDescription('🏃 Fugindo...')

                                            var fugiu = new Discord.MessageEmbed()
                                                .setColor('YELLOW')
                                                .setTitle('Ufa, você escapou!')
                                                .setDescription('Você perdeu o dinheiro enquanto fugia.')

                                            if (result === "win") {
                                                let amount = (Math.floor(Math.random() * 300) + 1)
                                                db.add(`mpoints_${message.author.id}`, amount)
                                                db.set(`procurado_${message.author.id}`, Date.now())

                                                var win = new Discord.MessageEmbed()
                                                    .setColor('GREEN')
                                                    .setTitle(`${message.author.username} efetuou o roubo com sucesso!`)
                                                    .setDescription(`Com o roubo da mansão, você obteve ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(win))
                                            } else if (result === "fugiu") {
                                                db.set(`procurado_${message.author.id}`, Date.now())
                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugiu))
                                            } else if (result === "lose") {
                                                let amount = (Math.floor(Math.random() * 300) + 1)
                                                db.subtract(`mpoints_${message.author.id}`, amount)
                                                db.set(`preso_${message.author.id}`, Date.now())

                                                var lose = new Discord.MessageEmbed()
                                                    .setColor('#FF0000')
                                                    .setTitle('🚨 Preso!')
                                                    .setDescription(`Você foi preso e perdeu ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(lose))
                                            }
                                        }
                                        if (reaction.emoji.name === '🏛️') { // 3
                                            msg.delete()

                                            var winlose = ['win', 'lose', 'lose', 'fugiu']
                                            var result = winlose[Math.floor(Math.random() * winlose.length)]

                                            var embedcrime = new Discord.MessageEmbed()
                                                .setColor('#575353')
                                                .setDescription('🥷 Roubando a prefeitura...')

                                            var fugindo = new Discord.MessageEmbed()
                                                .setColor('RED')
                                                .setTitle('🚔 Haa nããão! A policia!!!')
                                                .setDescription('🏃 Fugindo...')

                                            var fugiu = new Discord.MessageEmbed()
                                                .setColor('YELLOW')
                                                .setTitle('Ufa, você escapou!')
                                                .setDescription('Você perdeu o dinheiro enquanto fugia.')

                                            if (result === "win") {
                                                let amount = (Math.floor(Math.random() * 500) + 1)
                                                db.add(`mpoints_${message.author.id}`, amount)
                                                db.set(`procurado_${message.author.id}`, Date.now())

                                                var win = new Discord.MessageEmbed()
                                                    .setColor('GREEN')
                                                    .setTitle(`${message.author.username} efetuou o roubo com sucesso!`)
                                                    .setDescription(`Com o roubo da prefeitura, você obteve ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(win))
                                            } else if (result === "fugiu") {
                                                db.set(`procurado_${message.author.id}`, Date.now())
                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugiu))
                                            } else if (result === "lose") {
                                                let amount = (Math.floor(Math.random() * 500) + 1)
                                                db.subtract(`mpoints_${message.author.id}`, amount)
                                                db.set(`preso_${message.author.id}`, Date.now())

                                                var lose = new Discord.MessageEmbed()
                                                    .setColor('#FF0000')
                                                    .setTitle('🚨 Preso!')
                                                    .setDescription(`Você foi preso e perdeu ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(lose))
                                            }
                                        }
                                        if (reaction.emoji.name === '🏣') { // 4
                                            msg.delete()

                                            var winlose = ['win', 'lose', `win`, 'fugiu']
                                            var result = winlose[Math.floor(Math.random() * winlose.length)]

                                            var embedcrime = new Discord.MessageEmbed()
                                                .setColor('#575353')
                                                .setDescription('🥷 Roubando o cartório...')

                                            var fugindo = new Discord.MessageEmbed()
                                                .setColor('RED')
                                                .setTitle('🚔 Haa nããão! A policia!!!')
                                                .setDescription('🏃 Fugindo...')

                                            var fugiu = new Discord.MessageEmbed()
                                                .setColor('YELLOW')
                                                .setTitle('Ufa, você escapou!')
                                                .setDescription('Você perdeu o dinheiro enquanto fugia.')

                                            if (result === "win") {
                                                let amount = (Math.floor(Math.random() * 400) + 1)
                                                db.add(`mpoints_${message.author.id}`, amount)
                                                db.set(`procurado_${message.author.id}`, Date.now())

                                                var win = new Discord.MessageEmbed()
                                                    .setColor('GREEN')
                                                    .setTitle(`${message.author.username} efetuou o roubo com sucesso!`)
                                                    .setDescription(`Com o roubo do cartório, você obteve ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(win))
                                            } else if (result === "fugiu") {
                                                db.set(`procurado_${message.author.id}`, Date.now())
                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugiu))
                                            } else if (result === "lose") {
                                                let amount = (Math.floor(Math.random() * 400) + 1)
                                                db.subtract(`mpoints_${message.author.id}`, amount)
                                                db.set(`preso_${message.author.id}`, Date.now())

                                                var lose = new Discord.MessageEmbed()
                                                    .setColor('#FF0000')
                                                    .setTitle('🚨 Preso!')
                                                    .setDescription(`Você foi preso e perdeu ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(lose))
                                            }
                                        }
                                        if (reaction.emoji.name === '📨') { // 5
                                            msg.delete()

                                            var winlose = ['win', 'lose', `win`, 'fugiu', 'fugiu', 'fugiu']
                                            var result = winlose[Math.floor(Math.random() * winlose.length)]

                                            var embedcrime = new Discord.MessageEmbed()
                                                .setColor('#575353')
                                                .setDescription('🥷 Roubando os correios...')

                                            var fugindo = new Discord.MessageEmbed()
                                                .setColor('RED')
                                                .setTitle('🚔 Haa nããão! A policia!!!')
                                                .setDescription('🏃 Fugindo...')

                                            var fugiu = new Discord.MessageEmbed()
                                                .setColor('YELLOW')
                                                .setTitle('Ufa, você escapou!')
                                                .setDescription('Você perdeu o dinheiro enquanto fugia.')

                                            if (result === "win") {
                                                let amount = (Math.floor(Math.random() * 600) + 1)
                                                db.add(`mpoints_${message.author.id}`, amount)
                                                db.set(`procurado_${message.author.id}`, Date.now())

                                                var win = new Discord.MessageEmbed()
                                                    .setColor('GREEN')
                                                    .setTitle(`${message.author.username} efetuou o roubo com sucesso!`)
                                                    .setDescription(`Com o roubo do correios, você obteve ${amount}<:StarPoint:766794021128765469>MPoints`)
                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(win))
                                            } else if (result === "fugiu") {
                                                db.set(`procurado_${message.author.id}`, Date.now())
                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugiu))
                                            } else if (result === "lose") {
                                                let amount = (Math.floor(Math.random() * 600) + 1)
                                                db.subtract(`mpoints_${message.author.id}`, amount)
                                                db.set(`preso_${message.author.id}`, Date.now())

                                                var lose = new Discord.MessageEmbed()
                                                    .setColor('#FF0000')
                                                    .setTitle('🚨 Preso!')
                                                    .setDescription(`Você foi preso e perdeu ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(lose))
                                            }
                                        }
                                        if (reaction.emoji.name === '💍') { // 6
                                            msg.delete()

                                            var winlose = ['win', 'lose', 'lose', 'win', 'fugiu']
                                            var result = winlose[Math.floor(Math.random() * winlose.length)]

                                            var embedcrime = new Discord.MessageEmbed()
                                                .setColor('#575353')
                                                .setDescription('🥷 Roubando a joaleira...')

                                            var fugindo = new Discord.MessageEmbed()
                                                .setColor('RED')
                                                .setTitle('🚔 Haa nããão! A policia!!!')
                                                .setDescription('🏃 Fugindo...')

                                            var fugiu = new Discord.MessageEmbed()
                                                .setColor('YELLOW')
                                                .setTitle('Ufa, você escapou!')
                                                .setDescription('Você perdeu o dinheiro enquanto fugia.')

                                            if (result === "win") {
                                                let amount = (Math.floor(Math.random() * 700) + 1)
                                                db.add(`mpoints_${message.author.id}`, amount)
                                                db.set(`procurado_${message.author.id}`, Date.now())

                                                var win = new Discord.MessageEmbed()
                                                    .setColor('GREEN')
                                                    .setTitle(`${message.author.username} efetuou o roubo com sucesso!`)
                                                    .setDescription(`Com o roubo da joaleria, você obteve ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(win))
                                            } else if (result === "fugiu") {
                                                db.set(`procurado_${message.author.id}`, Date.now())
                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugiu))
                                            } else if (result === "lose") {
                                                let amount = (Math.floor(Math.random() * 7000) + 1)
                                                db.subtract(`mpoints_${message.author.id}`, amount)
                                                db.set(`preso_${message.author.id}`, Date.now())

                                                var lose = new Discord.MessageEmbed()
                                                    .setColor('#FF0000')
                                                    .setTitle('🚨 Preso!')
                                                    .setDescription(`Você foi preso e perdeu ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(lose))
                                            }
                                        }
                                        if (reaction.emoji.name === '🏢') { // 7
                                            msg.delete()

                                            var winlose = ['win', 'lose', 'lose', 'win', 'fugiu', 'fugiu']
                                            var result = winlose[Math.floor(Math.random() * winlose.length)]

                                            var embedcrime = new Discord.MessageEmbed()
                                                .setColor('#575353')
                                                .setDescription('🥷 Roubando o shopping...')

                                            var fugindo = new Discord.MessageEmbed()
                                                .setColor('RED')
                                                .setTitle('🚔 Haa nããão! A policia!!!')
                                                .setDescription('🏃 Fugindo...')

                                            var fugiu = new Discord.MessageEmbed()
                                                .setColor('YELLOW')
                                                .setTitle('Ufa, você escapou!')
                                                .setDescription('Você perdeu o dinheiro enquanto fugia.')

                                            if (result === "win") {
                                                let amount = (Math.floor(Math.random() * 700) + 1)
                                                db.add(`mpoints_${message.author.id}`, amount)
                                                db.set(`procurado_${message.author.id}`, Date.now())

                                                var win = new Discord.MessageEmbed()
                                                    .setColor('GREEN')
                                                    .setTitle(`${message.author.username} efetuou o roubo com sucesso!`)
                                                    .setDescription(`Com o roubo do shopping, você obteve ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(win))
                                            } else if (result === "fugiu") {
                                                db.set(`procurado_${message.author.id}`, Date.now())
                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugiu))
                                            } else if (result === "lose") {
                                                let amount = (Math.floor(Math.random() * 700) + 1)
                                                db.subtract(`mpoints_${message.author.id}`, amount)
                                                db.set(`preso_${message.author.id}`, Date.now())

                                                var lose = new Discord.MessageEmbed()
                                                    .setColor('#FF0000')
                                                    .setTitle('🚨 Preso!')
                                                    .setDescription(`Você foi preso e perdeu ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(lose))
                                            }
                                        }
                                        if (reaction.emoji.name === '🏭') { // 8
                                            msg.delete()

                                            var winlose = ['win', 'lose', 'fugiu']
                                            var result = winlose[Math.floor(Math.random() * winlose.length)]

                                            var embedcrime = new Discord.MessageEmbed()
                                                .setColor('#575353')
                                                .setDescription('🥷 Roubando a fabrica...')

                                            var fugindo = new Discord.MessageEmbed()
                                                .setColor('RED')
                                                .setTitle('🚔 Haa nããão! A policia!!!')
                                                .setDescription('🏃 Fugindo...')

                                            var fugiu = new Discord.MessageEmbed()
                                                .setColor('YELLOW')
                                                .setTitle('Ufa, você escapou!')
                                                .setDescription('Você perdeu o dinheiro enquanto fugia.')

                                            if (result === "win") {
                                                let amount = (Math.floor(Math.random() * 800) + 1)
                                                db.add(`mpoints_${message.author.id}`, amount)
                                                db.set(`procurado_${message.author.id}`, Date.now())

                                                var win = new Discord.MessageEmbed()
                                                    .setColor('GREEN')
                                                    .setTitle(`${message.author.username} efetuou o roubo com sucesso!`)
                                                    .setDescription(`Com o roubo da fabrica, você obteve ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(win))
                                            } else if (result === "fugiu") {
                                                db.set(`procurado_${message.author.id}`, Date.now())
                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugiu))
                                            } else if (result === "lose") {
                                                let amount = (Math.floor(Math.random() * 800) + 1)
                                                db.subtract(`mpoints_${message.author.id}`, amount)
                                                db.set(`preso_${message.author.id}`, Date.now())

                                                var lose = new Discord.MessageEmbed()
                                                    .setColor('#FF0000')
                                                    .setTitle('🚨 Preso!')
                                                    .setDescription(`Você foi preso e perdeu ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(lose))
                                            }
                                        }
                                        if (reaction.emoji.name === '🏩') { // 9
                                            msg.delete()

                                            var winlose = ['win', 'lose', 'fugiu', 'win']
                                            var result = winlose[Math.floor(Math.random() * winlose.length)]

                                            var embedcrime = new Discord.MessageEmbed()
                                                .setColor('#575353')
                                                .setDescription('🥷 Roubando o motel...')

                                            var fugindo = new Discord.MessageEmbed()
                                                .setColor('RED')
                                                .setTitle('🚔 Haa nããão! A policia!!!')
                                                .setDescription('🏃 Fugindo...')

                                            var fugiu = new Discord.MessageEmbed()
                                                .setColor('YELLOW')
                                                .setTitle('Ufa, você escapou!')
                                                .setDescription('Você perdeu o dinheiro enquanto fugia.')

                                            if (result === "win") {
                                                let amount = (Math.floor(Math.random() * 500) + 1)
                                                db.add(`mpoints_${message.author.id}`, amount)
                                                db.set(`procurado_${message.author.id}`, Date.now())

                                                var win = new Discord.MessageEmbed()
                                                    .setColor('GREEN')
                                                    .setTitle(`${message.author.username} efetuou o roubo com sucesso!`)
                                                    .setDescription(`Com o roubo do motel, você obteve ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(win))
                                            } else if (result === "fugiu") {
                                                db.set(`procurado_${message.author.id}`, Date.now())
                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugiu))
                                            } else if (result === "lose") {
                                                let amount = (Math.floor(Math.random() * 500) + 1)
                                                db.subtract(`mpoints_${message.author.id}`, amount)
                                                db.set(`preso_${message.author.id}`, Date.now())

                                                var lose = new Discord.MessageEmbed()
                                                    .setColor('#FF0000')
                                                    .setTitle('🚨 Preso!')
                                                    .setDescription(`Você foi preso e perdeu ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(lose))
                                            }
                                        }
                                        if (reaction.emoji.name === '🪙') { // 10
                                            msg.delete()

                                            var winlose = ['win', 'lose', 'fugiu', 'win', 'lose', 'lose', 'lose', 'lose', 'lose',]
                                            var result = winlose[Math.floor(Math.random() * winlose.length)]

                                            var embedcrime = new Discord.MessageEmbed()
                                                .setColor('#575353')
                                                .setDescription('🥷 Roubando o banco...')

                                            var fugindo = new Discord.MessageEmbed()
                                                .setColor('RED')
                                                .setTitle('🚔 Haa nããão! A policia!!!')
                                                .setDescription('🏃 Fugindo...')

                                            var fugiu = new Discord.MessageEmbed()
                                                .setColor('YELLOW')
                                                .setTitle('Ufa, você escapou!')
                                                .setDescription('Você perdeu o dinheiro enquanto fugia.')

                                            if (result === "win") {
                                                let amount = (Math.floor(Math.random() * 5000) + 1)
                                                db.add(`mpoints_${message.author.id}`, amount)
                                                db.set(`procurado_${message.author.id}`, Date.now())

                                                var win = new Discord.MessageEmbed()
                                                    .setColor('GREEN')
                                                    .setTitle(`${message.author.username} efetuou o roubo com sucesso!`)
                                                    .setDescription(`Com o roubo do banco, você obteve ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(win))
                                            } else if (result === "fugiu") {
                                                db.set(`procurado_${message.author.id}`, Date.now())
                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugiu))
                                            } else if (result === "lose") {
                                                let amount = (Math.floor(Math.random() * 5000) + 1)
                                                db.subtract(`mpoints_${message.author.id}`, amount)
                                                db.set(`preso_${message.author.id}`, Date.now())

                                                var lose = new Discord.MessageEmbed()
                                                    .setColor('#FF0000')
                                                    .setTitle('🚨 Preso!')
                                                    .setDescription(`Você foi preso e perdeu ${amount}<:StarPoint:766794021128765469>MPoints`)

                                                return message.inlineReply(embedcrime).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(fugindo)).then(msg => msg.delete({ timeout: 6000 })).then(msg => msg.channel.send(lose))
                                            }
                                        }
                                    })
                                })
                            }
                            if (reaction.emoji.name === '❌') { // Não
                                msg.delete().catch(err => { return })
                                return msg.channel.send("Roubo cancelado.")
                            }
                        })
                    })
                }
            }
        }
    }
}