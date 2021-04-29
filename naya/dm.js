const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    let embed = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setTitle('Este comando está bloqueado sem previsão de volta')
        .setDescription('A equipe de proteção ao usuário do Discord pune os bots e os criadores por mensagens que não são rastreadas.\n \nUsuários costumam usar os bots com esses comandos para ofender e difamar pessoas anonimamente, sendo assim, o Discord desliga o bot e a conta do criador para sempre. \n \n> Por questão de segurança da Naya, este comando está bloqueado.')
        .setFooter('O comando correio está quase pronto.')
    return message.inlineReply(embed)
}