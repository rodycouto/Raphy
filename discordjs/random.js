const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member || message.mentions.users.first()
    var level = await db.fetch(`level_${user.id}`)
    if (level < 5) {
        return message.inlineReply('🚫 Libere este comando no level 5')
    }

    var linkserver = 'https://discord.gg/YpFWgJuuUV'
    var embed = new Discord.MessageEmbed()
        .setColor('#1e3ddf')
        .setTitle('BETA - Dicas da Maya - Random  Result')
        .setDescription('Consiga um resultado randomico (aleatório) dentro de um array')
        .addFields(
            {
                name: 'Como usar',
                value: 'Só implantar o código abaixo do seu array\ntroque o nome **ARRAY** pelo nome do seu Array',
                inline: true
            },
            {
                name: 'Quer um support?',
                value: `[Clique aqui](${linkserver})`,
                inline: true
            }
        )
        .setFooter('Apoio Maya - Developers')

    function code() {
        message.inlineReply("```js\n var resultado = ARRAY[Math.floor(Math.random() * ARRAY.length)]\n```")
    }

    message.inlineReply(embed)
    setTimeout(code, 1000)
}