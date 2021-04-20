const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member || message.mentions.users.first()
    var level = await db.fetch(`level_${user.id}`)
    if (level < 10) {
        return message.inlineReply('🚫 Libere este comando no level 10')
    }

    var linkserver = 'https://discord.gg/YpFWgJuuUV'
    var embed = new Discord.MessageEmbed()
        .setColor('#1e3ddf')
        .setTitle('BETA - Dicas da Maya - CommandFile')
        .setDescription('Permite você usar comandos em outras pastas e diminuir o tamanho do index')
        .addFields(
            {
                name: 'Como usar',
                value: 'Coloque este código no index.',
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
        message.inlineReply("```js\n    try {\n      const commandFile = require(`./NOME DA PASTA AQUI/${command}.js`)\n      commandFile.run(client, message, args)\n    } catch (err) { }\n```")
    }

    message.inlineReply(embed)
    setTimeout(code, 1000)
}