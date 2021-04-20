const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member || message.mentions.users.first()
    var level = await db.fetch(`level_${user.id}`)
    if (level < 20) {
        return message.inlineReply('🚫 Libere este comando no level 20')
    }

    var linkserver = 'https://discord.gg/YpFWgJuuUV'
    var embed = new Discord.MessageEmbed()
        .setColor('#1e3ddf')
        .setTitle('BETA - Dicas da Maya - Global Level System')
        .setDescription('Sistema de XP Global')
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
        message.inlineReply("```js\n function xp(message) {\n            if (message) {\n                let xp = db.add(`xp_${message.author.id}`, 2)\n                let level = Math.floor(0.5 * Math.sqrt(xp))\n                let lvl = db.get(`level_${message.author.id}`) || db.set(`level_${message.author.id}`, 1)\n                if (level > lvl) {\n                    let newLevel = db.set(`level_${message.author.id}`, level)\n                    let xpchannel = db.get(`xpchannel_${message.guild.id}`)\n                    if (xpchannel === null) { return }\n                    if (!db.get(`xpchannel_${message.guild.id}`)) { return false }\n                    if (client.channels.cache.get(xpchannel)) {\n                        const newlevel = new Discord.MessageEmbed()\n                            .setColor('GREEN')\n                            .setDescription(`:tada: ${message.author}, você subiu para o level ${newLevel}!`)\n                        client.channels.cache.get(xpchannel).send(newlevel)\n                    }\n                }\n            }\n        }\n```")
    }

    message.inlineReply(embed)
    setTimeout(code, 1000)
}