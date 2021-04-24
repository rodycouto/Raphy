const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    var star = '<:StarPoint:766794021128765469>'
    var loli = '<:Loli:831571527744356422>'
    var StarM = '<:starM:832974891635572787>'
    let loteria = db.get(`loteria`)

    var loja = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setTitle('🏪 Lojinha Maya 24h')
        .setDescription('Aqui na Lojinha Maya, você pode comprar várias coisas para ter acesso a comandos e funções incriveis.')
        .addFields(
            {
                name: 'Disponiveis',
                value: '🛡️ `Escudo` (Em Breve)\n🎣 `Vara de Pesca` 140 <:StarPoint:766794021128765469>MPoints\n🔫 `Arma` 4.000 <:StarPoint:766794021128765469>MPoints\n⛏️ `Picareta` 85 <:StarPoint:766794021128765469>MPoints\n🪓 `Machado` 35 <:StarPoint:766794021128765469>MPoints\n🎟️ `Fichas` 2 <:StarPoint:766794021128765469>MPoints\n💌 `Carta de Amor` 1 <:StarPoint:766794021128765469>MPoints\n🪱 `Isca` 1 <:StarPoint:766794021128765469>MPoints\n🥤 `Água` 1 <:StarPoint:766794021128765469>MPoints'
            },
            {
                name: 'Loteria',
                value: '🎫 `Ticket Loteria` 10 <:StarPoint:766794021128765469>MPoints' + `\nPrêmio Atual: ${loteria} <:StarPoint:766794021128765469>MPoints`
            },
            {
                name: 'Jogos',
                value: '<:Loli:831571527744356422> `Loli` (Pesca)\n🔪 `Faca` (Pesca)\n<:fossil:831859111578173450> `Fossil` (Mineração)\n🦣 `Mamute` (Mineração)'
            },
            {
                name: 'Perfil',
                value: '<:starM:832974891635572787> `Estrela1` 500.000 <:StarPoint:766794021128765469>MPoints\n<:starM:832974891635572787><:starM:832974891635572787> `Estrela2` 1.000.000 <:StarPoint:766794021128765469>MPoints\n<:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787> `Estrela3` 2.000.000 <:StarPoint:766794021128765469>MPoints\n<:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787> `Estrela4` 4.000.000 <:StarPoint:766794021128765469>MPoints\n<:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787><:starM:832974891635572787> `Estrela5` 10.000.000 <:StarPoint:766794021128765469>MPoints\n🔰 `Título` 10.000<:StarPoint:766794021128765469>MPoints'
            },
            {
                name: 'Itens Coletaveis',
                value: '🍤 `Camarões` - Baú do Tesouro (Pesca)\n🐟 `Peixes` - Baú do Tesouro (Pesca)\n🪵 `Madeira` - Florestamento\n🍎 `Maça` - Florestamento\n🦴 `Ossos` Mineração\n🪨 `Minérios` - Mineração\n💎 `Diamantes` - Mineração'
            }
        )
        .setFooter(`${prefix}buy | ${prefix}itens`)
    return message.inlineReply(loja)
}