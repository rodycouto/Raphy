const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let user = message.mentions.members.first()

    if (!args[0]) {
        const embed1 = new Discord.MessageEmbed()
            .setColor('#9D24DD')
            .setTitle(`${message.author.username}`)
            .setDescription(`🆔 \`${message.author.id}\``)
        return message.inlineReply(embed1)
    }

    if (user) {
        const idembed = new Discord.MessageEmbed()
            .setColor('#9D24DD')
            .setTitle(`${user.user.username}`)
            .setDescription(`🆔 \`${user.user.id}\``)
        return message.inlineReply(idembed)
    }

    if (!user) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "-"

        const no = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Comando não reconhecido.')
            .setDescription('Neste comando, é preciso marcar alguém ou mandar apenas o comando sem conteúdo algúm.')
            .addFields(
                {
                    name: 'Exemplo',
                    value: '`' + prefix + 'id` ou `' + prefix + 'id @user`'
                }
            )
        return message.inlineReply(no)
    }
}