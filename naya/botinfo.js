const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let TotalCommands = db.get('CommandCountGeneral')
    let DailyCommands = db.get('CommandCountDaily')

    if (TotalCommands === null) TotalCommands = '0'
    if (DailyCommands === null) DailyCommands = '0'

    let embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle('📃 Centralzinha de Informações 📃')
        .setColor('BLUE')
        .setDescription('Meu nome é Naya. Eu fui criada para ser uma bot de diversão e admnistração. Porém tenho alguns recursos além disso. Sou capaz de substituir vááários bots. Minha missão é ser a bot mais completa de todas.')
        .addFields(
            {
                name: 'Páginas da Centralzinha',
                value: '📃 Essa página aqui\n⚙️ Informações Técnicas\n❤️ Colaboradores\n💬 Suporte\n❌ Apaga a Central de Informações'
            }
        )

    let embed2 = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle('⚙️ Centralzinha Tecnica ⚙️')
        .setColor("BLUE")
        .addFields(
            {
                name: 'Informações Técinas',
                value: (`🌐 Servidores: ${client.guilds.cache.size}\n💬 Canais: ${client.channels.cache.size}\n🫂 Usuários: ${client.users.cache.size}\n🛠️ Comandos usados: ${TotalCommands}\n🛠️ Comandos diário: ${DailyCommands}\n⏳ Ping Atual: ${Math.round(client.ws.ping)}ms\n🕛 Criada em: 15/03/2021\n💡 Idealizada por: Rody#4191 \n:gear: Criada por: Rody#4191\n🖌️ Design: Rody#4191 | Sayu\n🖊️ Start Cooper: Gowther#9233\n📡 Host: DisCloud\n🇩 Discord.js Version: 12.5.3\n🇯 Linguagem: 100% JavaScript`)
            }
        )

    let Thanks = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle(':hearts: OBRIGADA a todos que me ajuda a crescer! :hearts:')
        .setURL('https://github.com/rodycouto/NayaCommands/blob/main/README.md#-naya-assistence')
        .addFields(
            {
                name: 'Listinha de pessoas que me ajuda',
                value: '[Clique aqui pra ver a listinha](https://github.com/rodycouto/NayaCommands/blob/main/README.md#-naya-assistence)'
            }
        )

    let support = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('💬 Centralzinha de Suporte 💬')
        .setURL('https://discord.gg/YpFWgJuuUV')
        .setDescription('A Central de Suporte consegue atender a qualquer problema ou crítica que você tenha :heart:')
        .setThumbnail('https://imgur.com/KyjyfRg.gif')
        .addFields(
            {
                name: 'Discord Server',
                value: `[Clique aqui](https://discord.gg/YpFWgJuuUV)`,
                inline: true
            },
            {
                name: 'Desenvolvedor',
                value: 'Rody#4191',
                inline: true
            },
            {
                name: 'Central de Suporte',
                value: `[Clique aqui](https://discord.gg/YpFWgJuuUV)`,
                inline: true
            }
        )
        .setFooter('Desativando em 1 minuto...')

    await message.inlineReply(embed).then(msg => {
        msg.react('📃').catch(err => { return }) // 1º Embed
        msg.react('⚙️').catch(err => { return }) // 2º Embed
        msg.react('❤️').catch(err => { return }) // Thanks
        msg.react('💬').catch(err => { return }) // Support
        msg.react('❌').catch(err => { return }) // Delete
        setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 60000)

        msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return;

            if (reaction.emoji.name === '📃') { // 1º Embed - Principal
                reaction.users.remove(user)
                msg.edit(embed)
            }
            if (reaction.emoji.name === '⚙️') { // 2º Embed - Técnico
                reaction.users.remove(user)
                msg.edit(embed2)
            }
            if (reaction.emoji.name === '❤️') { // 4º Embed - Support
                reaction.users.remove(user)
                msg.edit(Thanks)
            }
            if (reaction.emoji.name === '💬') { // 3º Embed - Thanks
                reaction.users.remove(user)
                msg.edit(support)
            }
            if (reaction.emoji.name === '❌') { // Delete
                msg.delete().catch(err => { return })
            }
        })
    })
}