const Discord = require('discord.js')
const quiz = require('./onepiece.json')

exports.run = async (client, message, args) => {
    var item = quiz[Math.floor(Math.random() * quiz.length)]
    var filter = response => { return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase()) }

    var pergunta = new Discord.MessageEmbed()
        .setColor('#DCDCDC')
        .setTitle(item.question)
        .setFooter('Responda em até 15 segundos.')

    var quiztime = new Discord.MessageEmbed()
        .setColor('GRAY')
        .setTitle(`MAYA QUIZ TIME!`)
        .setDescription('Prepare-se! Você tem apenas 15 segundos. | Perguntas e Repostas por MakolPedro#8508')

    message.channel.send(quiztime).then(msg => msg.delete({ timeout: 5000 })).then(msg => message.channel.send(pergunta)).then(() => {
        message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
            .then(collected => {
                var resposta = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle(`${collected.first().author.username} acertou a pergunta!`)
                message.channel.send(resposta)
            })
            .catch(collected => {
                var timeover = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle(`Ninguém acertou!`)
                    .setDescription('Que pena, o tempo acabou e ninguém acertou.')
                message.channel.send(timeover)
            })
    })
}