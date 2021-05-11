const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    if (!message.member.hasPermission("MANAGE_CHANNELS")) { return message.inlineReply('<:xis:835943511932665926> Permissão Necessária: Gerenciar Canais') }
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) { return message.inlineReply('<:xis:835943511932665926> Eu preciso da permissão "Gerenciar Canais" para utilizar esta função.') }

    const noargs = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('🛠️ Gerenciamento de Canais')
        .setDescription('Com este comando você pode gerenciar os canais rapidamente.')
        .addField('Mude o Nome', '`' + prefix + 'channel name #canal NomeDoCanal` Edite o nome do canal\n')
        .addField('Mude o Tópico', '`' + prefix + 'channel topic O novo tópico irado do canal`')
        .addField('Crie e Delete', '`' + prefix + 'channel create text/voice NomeDoCanal`\n' + '`' + prefix + 'channel delete NomeDoCanal`')
        .setFooter(`Precisa de Ajuda? ${prefix}support`)

    if (!args[0]) { return message.inlineReply(noargs) }

    if (['name', 'nome'].includes(args[0])) {

        const canal = message.mentions.channels.first()
        if (!canal) { return message.inlineReply('<:xis:835943511932665926> Você não mencionou o canal que quer editar.\n`' + prefix + 'channel name #canal NomeDoCanal`') }

        const NovoNome = args.slice(2).join(" ").toLowerCase()
        if (!NovoNome) { return message.inlineReply('<:xis:835943511932665926> Você não me disse o novo nome do canal.\n`' + prefix + 'channel name #canal NomeDoCanal`') }
        if (NovoNome.length > 40) { return message.inlineReply('<:xis:835943511932665926> O nome do canal não pode ultrapassar **40 caracteres**') }

        canal.setName(NovoNome).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })

        const sucess = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(`<a:Check:836347816036663309> Canal renomeado para **${NovoNome}**`)
        return message.inlineReply(sucess)
    } else if (['tópico', 'topic'].includes(args[0])) {

        const TopicoDoCanal = args.slice(1).join(" ")
        if (!TopicoDoCanal) { return message.inlineReply('<:xis:835943511932665926> Você não disse o tópico do canal.\n`' + prefix + 'channel topic O tópico do canal em diante.`') }
        if (TopicoDoCanal.length > 1024) { return message.inlineReply('<:xis:835943511932665926> O nome do canal não pode ultrapassar **1024 caracteres**') }

        message.channel.setTopic(TopicoDoCanal)
        const sucess = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription('<a:Check:836347816036663309> Tópico do Canal alterado com sucesso.')
        return message.inlineReply(sucess)

    } else if (['create', 'criar'].includes(args[0])) {

        if (!args[1]) { return message.inlineReply('<:xis:835943511932665926> Por favor, siga o formato correto.\n`' + prefix + 'channel create text/voice NomeDoCanal`') }

        if (['texto', 'text'].includes(args[1])) {

            const NomeDoCanal = args.slice(2).join(" ").toLowerCase()
            if (!NomeDoCanal) { return message.inlineReply('<:xis:835943511932665926> Você se esqueceu do nome do canal.\n`' + prefix + 'channel create text NomeDoCanal`') }
            if (NomeDoCanal.length > 40) { return message.inlineReply('<:xis:835943511932665926> O nome do canal não pode ultrapassar **40 caracteres**') }

            message.guild.channels.create(NomeDoCanal, { type: 'text' })
            const sucess = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription('<a:Check:836347816036663309> Canal de texto criado com sucesso.')
            return message.inlineReply(sucess)

        } else if (['voice', 'voz'].includes(args[1])) {

            const NomeDoCanal = args.slice(2).join(" ")
            if (!NomeDoCanal) { return message.inlineReply('<:xis:835943511932665926> Você se esqueceu do nome do canal.\n`' + prefix + 'channel create voice NomeDoCanal`') }
            if (NomeDoCanal.length > 40) { return message.inlineReply('<:xis:835943511932665926> O nome do canal não pode ultrapassar **40 caracteres**') }

            message.guild.channels.create(NomeDoCanal, { type: 'voice' })

            const sucess = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription('<a:Check:836347816036663309> Canal de voz criado com sucesso.')
            return message.inlineReply(sucess)
        } else {
            return message.inlineReply('<:xis:835943511932665926> Por favor, siga o formato correto.\n`' + prefix + 'channel create text/voice NomeDoCanal`')
        }

    } else if (['delete', 'deletar'].includes(args[0])) {

        const canal = message.mentions.channels.first()
        if (!canal) { return message.inlineReply('<:xis:835943511932665926> Por favor, siga o formato correto.\n`' + prefix + 'channel delete #Canal`') }
        if (args[2]) { return message.inlineReply('<:xis:835943511932665926> Por favor, siga o formato correto.\n`' + prefix + 'channel delete #Canal`') }

        const confirm = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription('Este é um comando perigoso, deseja prosseguir?')

        return message.inlineReply(confirm).then(msg => {
            msg.react('✅') // Check
            msg.react('❌') // X

            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return

                if (reaction.emoji.name === '✅') { // sim
                    msg.delete().catch(err => { return })

                    const confirm2 = new Discord.MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`O canal ${canal} será excluido e não será possivel recupera-lo, deseja prosseguir?`)

                    message.inlineReply(confirm2).then(msg => {
                        msg.react('✅') // Check
                        msg.react('❌') // X

                        msg.awaitReactions((reaction, user) => {
                            if (message.author.id !== user.id) return

                            if (reaction.emoji.name === '✅') { // sim
                                msg.delete().catch(err => { return })

                                const confirm3 = new Discord.MessageEmbed()
                                    .setColor('BLUE')
                                    .setDescription(`Último aviso. Você realmente deseja prosseguir com a exclusão do canal ${canal}?`)

                                message.inlineReply(confirm3).then(msg => {
                                    msg.react('✅') // Check
                                    msg.react('❌') // X

                                    msg.awaitReactions((reaction, user) => {
                                        if (message.author.id !== user.id) return

                                        if (reaction.emoji.name === '✅') { // sim
                                            msg.delete().catch(err => { return })

                                            const sucess = new Discord.MessageEmbed()
                                                .setColor('GREEN')
                                                .setDescription(`${message.author} excluiu o canal #${canal.name}`)
                                            message.inlineReply(sucess)

                                            canal.delete().catch(err => {
                                                return message.inlineReply('Ocorreu um erro na exclusão do canal.\n \n ' + err)
                                            })
                                        }

                                        if (reaction.emoji.name === '❌') { // NPEmbed
                                            msg.delete().catch(err => { return })

                                            const canceled3 = new Discord.MessageEmbed()
                                                .setColor('GREEN')
                                                .setTitle('Comando cancelado.')
                                            message.inlineReply(canceled3)
                                        }
                                    })
                                })
                            }
                            if (reaction.emoji.name === '❌') { // NPEmbed
                                msg.delete().catch(err => { return })

                                const canceled2 = new Discord.MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle('Comando cancelado.')
                                message.inlineReply(canceled2)
                            }
                        })
                    })
                }

                if (reaction.emoji.name === '❌') { // NPEmbed
                    msg.delete().catch(err => { return })
                    const canceled = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Comando cancelado.')
                    message.inlineReply(canceled)
                }
            })
        })
    } else {
        return message.inlineReply('<:xis:835943511932665926> Eu não achei nada na minha lista de comandos...\nUse `' + prefix + 'channel` que eu te mando os comandos.')
    }
}