const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = '-' }

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

        let prize = db.get('loteria')
        if (prize === null) { prize = '0' }

        let data = db.get('datasorteio')
        if (data === null) { data = 'Sem data definida' }

        var embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle('💰 LOTERIA MAYA')
            .setDescription('<:02zero:832667759800352838> Seja bem vindo a Loteria Maya!\nSe você quiser concorrer ao prêmio, compre tickets na `' + prefix + 'loja`')
            .addField('Valor atual', `${prize}<:StarPoint:766794021128765469>MPoints`)
            .addField('Data do Sorteio', `${data}`)
            .setFooter(`${prefix}buy ticket | Sorteio ocorrem no meu servidor`)
        return message.inlineReply(embed)
    }
}