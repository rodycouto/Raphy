const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (!args[0]) {
        var rank = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('🌐 Ranking Global')
            .setDescription('Aqui você pode ver os top 10 globais em experiência e dinheiro.')
            .addField('Ranking XP', '`' + prefix + 'rank xp`')
            .addField('Ranking Money', '`' + prefix + 'rank money`')
        return message.inlineReply(rank)
    }

    if (['xp', 'level', 'nivel'].includes(args[0])) {
        let data = db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data)
        let myrank = data.map(m => m.ID).indexOf(`xp_${message.author.id}`) + 1 || "N/A"
        data.length = 10
        let lb = []
        for (let i in data) {
            let id = data[i].ID.split("_")[1]
            let user = await client.users.fetch(id)
            user = user ? user.tag : "Usuário não encontrado"
            let rank = data.indexOf(data[i]) + 1
            let level = db.get(`level_${id}`)
            let xp = data[i].data
            let xpreq = Math.floor(Math.pow(level / 0.1, 2))
            lb.push({
                user: { id, tag: user },
                rank,
                level,
                xp,
                xpreq
            })
        }

        var embedxp = new Discord.MessageEmbed()
            .setTitle("👑 Ranking Global - XP")
            .setColor("YELLOW")
        lb.forEach(d => {
            embedxp.addField(`${d.rank}. ${d.user.tag}`, `Lvl. - ${d.level} (${d.xp} / ${d.xpreq})`)
        })
        embedxp.setFooter(`Seu ranking: ${myrank}`)
        return message.channel.send(embedxp)
    }

    if (['dinheiro', 'money', 'cash', 'mp', 'coin', 'moeda'].includes(args[0])) {
        let data = db.all().filter(i => i.ID.startsWith("bank_")).sort((a, b) => b.data - a.data)
        let myrank = data.map(m => m.ID).indexOf(`bank_${message.author.id}`) + 1 || "N/A"
        data.length = 10
        let lb = []
        for (let i in data) {
            let id = data[i].ID.split("_")[1]
            let user = await client.users.fetch(id)
            user = user ? user.tag : "Usuário não encontrado"
            let rank = data.indexOf(data[i]) + 1
            let level = db.get(`money_${id}`)
            let xp = data[i].data
            lb.push({
                user: { id, tag: user },
                rank,
                level,
                xp,
            })
        }

        var embedxp = new Discord.MessageEmbed()
            .setTitle("👑 Ranking Global - MPoints")
            .setDescription("")
            .setColor("YELLOW")
        lb.forEach(d => {
            embedxp.addField(`${d.rank}. ${d.user.tag}`, `💸 Carteira - ${d.level} <:StarPoint:766794021128765469>MPoints\n🏦 Banco - ${d.xp} <:StarPoint:766794021128765469>MPoints`)
        })
        embedxp.setFooter(`Seu ranking: ${myrank}`)
        return message.channel.send(embedxp)
    }

    if (!['dinheiro', 'money', 'cash', 'mp', 'coin', 'moeda', 'xp', 'level', 'nivel'].includes(args[0])) {
        return message.inlineReply('Ranking não encontrado, digite `' + prefix + 'rank`')
    }

}