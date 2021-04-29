const Discord = require('discord.js')
const db = require('quick.db')

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

        let star = '<:StarPoint:766794021128765469>'
        let loli = '<:Loli:831571527744356422>'
        let StarM = '<:starM:832974891635572787>'
        let loteria = db.get(`loteria`)

        let loja = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle('🏪 Lojinha Naya 24h')
            .setDescription('Aqui na Lojinha Naya, você pode comprar várias coisas para ter acesso a comandos e funções incriveis.')
            .addFields(
                {
                    name: 'Disponiveis',
                    value: '🛡️ `Escudo` (Em Breve)\n🎣 `Vara de Pesca` 140 <:StarPoint:766794021128765469>MPoints\n🔫 `Arma` 4.000 <:StarPoint:766794021128765469>MPoints\n⛏️ `Picareta` 85 <:StarPoint:766794021128765469>MPoints\n🪓 `Machado` 35 <:StarPoint:766794021128765469>MPoints\n🎟️ `Fichas` 2 <:StarPoint:766794021128765469>MPoints\n💌 `Carta de Amor` 1 <:StarPoint:766794021128765469>MPoints\n🥘 `Comida` 2 <:StarPoint:766794021128765469>MPoints\n🪱 `Isca` 1 <:StarPoint:766794021128765469>MPoints\n🥤 `Água` 1 <:StarPoint:766794021128765469>MPoints'
                },
                {
                    name: 'Loteria',
                    value: '🎫 `Ticket Loteria` 10 <:StarPoint:766794021128765469>MPoints' + `\nPrêmio Atual: ${loteria} <:StarPoint:766794021128765469>MPoints`
                },
                {
                    name: 'Perfil',
                    value: '<:starM:832974891635572787> `Estrela1` 500.000 <:StarPoint:766794021128765469>MPoints\n<:starM:832974891635572787><:starM:832974891635572787> `Estrela2` 1.000.000 <:StarPoint:766794021128765469>MPoints\n<:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787> `Estrela3` 2.000.000 <:StarPoint:766794021128765469>MPoints\n<:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787> `Estrela4` 4.000.000 <:StarPoint:766794021128765469>MPoints\n<:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787> `Estrela5` 10.000.000 <:StarPoint:766794021128765469>MPoints\n🔰 `Título` 10.000<:StarPoint:766794021128765469>MPoints'
                }
            )
            .setFooter(`${prefix}buy | ${prefix}itens | ${prefix}vender | ${prefix}doar | ${prefix}slot`)
        return message.inlineReply(loja)
    }
}