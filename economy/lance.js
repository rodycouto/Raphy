const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {

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

        let timeout1 = 300000 // 5 minutos
        let author1 = await db.fetch(`lancetimeout_${message.author.id}`)

        if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
            let time = ms(timeout1 - (Date.now() - author1))

            return message.inlineReply(`<a:MoneyWings:834899137991540797> O dinheirinho está cansado, tente novamente em: ${time.minutes}m e ${time.seconds}s`)
        } else {

            let prefix = db.get(`prefix_${message.guild.id}`)
            if (prefix === null) prefix = "-"

            let money = db.get(`mpoints_${message.author.id}`)
            if (money === null) { money = '0' }

            const embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('<a:MoneyWings:834899137991540797> Comando Lance')
                .setDescription('Use este comando para lançar uma quantia de dinheiro no chat. Qualquer um pode tentar pegar a grana!')
                .addField('Comando', '`' + prefix + 'lance quantia`')

            const FormatoCorreto = '<:xis:835943511932665926> Siga o formato correto: `' + prefix + 'lance quantia`'
            const FormatoCorretoAll = '<:xis:835943511932665926> Siga o formato correto: `' + prefix + 'lance all`'


            const LanceEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription(`<a:MoneyWings:834899137991540797> ${message.author} lançou ${args[0]} <:StarPoint:766794021128765469>MPoints no chat.`)

            if (!args[0]) { return message.inlineReply(embed) }

            if (['all', 'tudo'].includes(args[0].toLowerCase())) {
                if (args[1]) { return message.inlineReply(FormatoCorretoAll) }
                if (money <= '0') { return message.inlineReply(`<:xis:835943511932665926> Você não tem dinheiro pra fazer lances no chat.`) }
                db.add(`lancechache_${message.author.id}`, money)
                db.subtract(`mpoints_${message.author.id}`, money)
                let cache = db.get(`lancechache_${message.author.id}`)
                db.set(`lancetimeout_${message.author.id}`, Date.now())

                const LanceEmbedAll = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`<a:MoneyWings:834899137991540797> ${message.author} lançou ${cache} <:StarPoint:766794021128765469>MPoints no chat.`)

                let m = await message.channel.send(LanceEmbedAll)
                m.react("✅")
                setTimeout(() => {
                    if (m.reactions.cache.get("✅").count <= 1) {
                        db.add(`mpoints_${message.author.id}`, cache)
                        db.delete(`lancechache_${message.author.id}`)
                        return message.channel.send('<:xis:835943511932665926> Lance cancelado por falta de participantes.')
                    }

                    let winner = m.reactions.cache.get("✅").users.cache.filter((u) => !u.bot).random()

                    let winembed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setDescription(`<a:MoneyWings:834899137991540797> ${winner} pegou o dinheiro lançado por ${message.author}.\n${cache} <:StarPoint:766794021128765469>MPoints`)

                    db.add(`mpoints_${winner.id}`, cache)
                    db.delete(`lancechache_${message.author.id}`)
                    return message.channel.send(winembed).catch(err => { return })
                }, 60000)
            } else {

                if (args[1]) { return message.inlineReply(FormatoCorreto) }
                if (isNaN(args[0])) { return message.inlineReply(`${FormatoCorreto}\n**${args[0]}** não é um número.`) }
                if (money < args[0]) { return message.inlineReply(`<:xis:835943511932665926> Você não tem ${args[0]} <:StarPoint:766794021128765469>MPoints na cateira.`) }
                if (money === '0') { return message.inlineReply(`<:xis:835943511932665926> Você não tem dinheiro pra fazer lances no chat.`) }
                db.add(`lancechache_${message.author.id}`, args[0])
                db.subtract(`mpoints_${message.author.id}`, args[0])
                let cache = db.get(`lancechache_${message.author.id}`)
                db.set(`lancetimeout_${message.author.id}`, Date.now())

                let m = await message.channel.send(LanceEmbed)
                m.react("✅")
                setTimeout(() => {
                    if (!m.reactions.cache.get("✅")) {
                        db.add(`mpoints_${message.author.id}`, cache)
                        db.delete(`lancechache_${message.author.id}`)
                        return message.channel.send('<:xis:835943511932665926> Lance cancelado. A reação "✅" foi removida ou a mensagem foi deletada.')
                    }

                    if (m.reactions.cache.get("✅").count <= 1) {
                        db.add(`mpoints_${message.author.id}`, cache)
                        db.delete(`lancechache_${message.author.id}`)
                        return message.channel.send('<:xis:835943511932665926> Lance cancelado por falta de participantes.')
                    }

                    let winner = m.reactions.cache.get("✅").users.cache.filter((u) => !u.bot).random()

                    let winembed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setDescription(`<a:MoneyWings:834899137991540797> ${winner} pegou o dinheiro lançado por ${message.author}.\n${args[0]} <:StarPoint:766794021128765469>MPoints`)

                    db.add(`mpoints_${winner.id}`, cache)
                    db.delete(`lancechache_${message.author.id}`)
                    return message.channel.send(winembed).catch(err => { return })
                }, 60000)
            }
        }
    }
}