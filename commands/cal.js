const Discord = require('discord.js')
const math = require('mathjs')

exports.run = async (client, message, args) => {

    if (!args[0]) {
        const noargs = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('🛠️ Calculadora -  BETA')
            .setDescription('Acho que não preciso explicar a função de um calculadora')
            .addField('Formato suportado', 'Adição: `10 + 10`\nDivisão: `10 / 10`\nSubtração: `10 - 10`\nMultiplicação: `10 * 10`')
            .setFooter('Comando instável...')
        return message.inlineReply(noargs)
    }

    let resp
    try {
        resp = math.evaluate(args.join(" "))
    } catch (e) {
        const noargs = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Por favor, siga o formato correto')
            .setDescription('Adição: `10 + 10`\nDivisão: `10 / 10`\nSubtração: `10 - 10`\nMultiplicação: `10 * 10`')
        return message.inlineReply(noargs)
    }

    const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .addField('📊 Conta', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('📝 Resultado', `\`\`\`css\n${resp}\`\`\``)
    return message.inlineReply(embed)
}