const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    var star = '<:StarPoint:766794021128765469>'
    var loli = '<:Loli:831571527744356422>'
    var StarM  = '<:starM:832974891635572787>'

    var loja = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setTitle('🏪 Lojinha Maya 24h')
        .setDescription('Aqui na Lojinha Maya, você pode comprar várias coisas para ter acesso a comandos e funções incriveis.')
        .addFields(
            {
                name: 'Disponiveis',
                value: '🛡️ `Escudo` (Em Breve)\n🎣 `Vara de Pesca` 5.000 <:StarPoint:766794021128765469>MPoints\n🔫 `Arma` 100.000 <:StarPoint:766794021128765469>MPoints\n⛏️ `Picareta` 350 <:StarPoint:766794021128765469>MPoints\n🪓 `Machado` 400 <:StarPoint:766794021128765469>MPoints\n💌 `Carta de Amor` 1000 <:StarPoint:766794021128765469>MPoints\n🪱 `Isca` 10 <:StarPoint:766794021128765469>MPoints\n🥤 `Água` 10 <:StarPoint:766794021128765469>MPoints'
            },
            {
                name: 'Jogos',
                value: '<:Loli:831571527744356422> `Loli` (Pesca)\n🔪 `Faca` (Pesca)\n<:fossil:831859111578173450> `Fossil` (Mineração)\n🦣 `Mamute` (Mineração)'
            },
            {
                name: 'Perfil',
                value: '<:starM:832974891635572787> `Estrela` (Em breve)\n🔰 `Título` 10.000.000<:StarPoint:766794021128765469>MPoints'
            },
            {
                name: 'Itens Coletaveis',
                value: '🍤 `Camarões` - Baú do Tesouro (Pesca)\n🐟 `Peixes` - Baú do Tesouro (Pesca)\n🪵 `Madeira` - Florestamento\n🍎 `Maça` - Florestamento\n🦴 `Ossos` Mineração\n🪨 `Minérios` - Mineração\n💎 `Diamantes` - Mineração'
            }
        )
        .setFooter(`${prefix}buy Item`)
    return message.inlineReply(loja)
}