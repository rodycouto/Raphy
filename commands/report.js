const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    message.delete().catch(err => { message.channel.send(err) })

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    if (['help', 'ajuda'].includes(args[0])) {
        var help = new Discord.MessageEmbed()
            .setColor('BLUE') // red
            .setTitle(':loudspeaker: Sistema de Report')
            .setDescription('Com este comando, você ativará o meu sistema de report. Isso é bastante útil.')
            .addField('❓ O que é o sistema de report?', 'Com o meu sistema de report, os membros poderão reportar coisas ou outros membros de qualquer canal do servidor, não precisa está indo chamar mod/adm no privado para reportar.')
            .addField('❓ Como funciona?', 'Simples! o membro só precisa escrever `' + prefix + 'report blá blá blá` e o report será encaminhado para o canal definido. As mensagens serão deletadas na hora do envio, tornando o report anônimo e seguro, os únicos que verão o report, serão as pessoas que tem permissão para ver o canal definido.')
            .addField('Comando de Ativação', '`' + prefix + 'setreportchannel #Canal`')
            .addField('Comando de Desativação', '`' + prefix + 'setreportchannel off`')
            .setFooter('A Maya não se responsabiliza pelo conteúdo enviado atráves deste sistema.')
        return message.inlineReply(help)
    }

    var channel = db.get(`reportchannel_${message.guild.id}`)
    if (!client.channels.cache.get(channel)) {
        var nochanel = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('❌ Parece que o canal de report foi excluido.')
            .setDescription('`' + prefix + 'setreportchannel #canal`')
            .addField('Quer ajuda?', '`' + prefix + 'help report`')
        return message.channel.send(nochanel)
    }

    if (channel === null) {
        var nochannel = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Nenhum canal de report definido.')
            .setDescription('Ooopa, parece que não definiram o canal de reports. Fale para alguém da Staff criar ou definir o canal, o comando é simples.\n \nCom está função, os membros são capazes de reportar coisas de qualquer canal para um canal especifico, geralmente exclusivo apenas para a moderação do servidor. As mensagens são apagadas, tornando anônimo o report, para evitar brigas e discussões.\n \nTem mais, não é necessário reportar só pessoas, você também pode reportar coisas do servidor sem precisar ficar marcando @alguém.')
            .addField('Comando de Ativação', '`' + prefix + 'setreportchannel #canal`')
            .addField('Comando de desativação', '`' + prefix + 'setreportchannel off`')
            .addField('Quer mais?', '`' + prefix + 'help report`')
        return message.channel.send(nochannel)
    }

    if (!args[0]) {
        var noargs = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('❌ Por favor, siga o formato correto')
            .setDescription(`Use o comando abaixo para reportar algo a equipe da ${message.guild.name}.\n \n*O **@user** é opcional, use se quiser reportar algum membro.*`)
            .addField('Comando', '`' + prefix + 'report @user O motivo da sua denúncia`')
        return message.channel.send(noargs)
    }

    let user = message.mentions.members.first()

    if (!user) {
        var embed1 = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle('📢 Novo Reporte Recebido')
            .addFields(
                {
                    name: 'Autor do Reporte',
                    value: message.author,
                    inline: true
                },
                {
                    name: 'Membro Reportado',
                    value: `Nenhum membro foi reportado`,
                    inline: true
                },
                {
                    name: 'Razão do Reporte',
                    value: args.join(" ")
                }
            )
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        client.channels.cache.get(channel).send(embed1)
        return message.author.send(`📨 O seu report foi enviado com sucesso para a equipe do servidor **${message.guild.name}**.\n \nMembro reportado: Ninguém\nConteúdo do Reporte: ${args.join(" ")}`).catch(err => { return })
    }

    if (args[0] !== user) {
        var embed1 = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle('📢 Novo Reporte Recebido')
            .addFields(
                {
                    name: 'Autor do Reporte',
                    value: message.author,
                    inline: true
                },
                {
                    name: 'Membro Reportado',
                    value: `${user}`,
                    inline: true
                },
                {
                    name: 'Razão do Reporte',
                    value: args.slice(1).join(" ")
                }
            )
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter(`${message.author.username}`)
        client.channels.cache.get(channel).send(embed1)
        return message.author.send(`📨 O seu report foi enviado com sucesso para a equipe do servidor **${message.guild.name}**.\n \nMembro reportado: ${user}\nConteúdo do Reporte: ${args.slice(1).join(" ")}`).catch(err => { return })
    }
}