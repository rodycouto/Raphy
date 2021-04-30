const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_CHANNELS')) { return message.inlineReply('Permissão Necessária: Gerenciar Canais') }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    if (message.mentions.channels.first().name !== "naya-global-chat") {
        return message.inlineReply('<:xis:835943511932665926> Por favor, selecione o canal com o nome "**naya-global-chat**"')
    }

    let CanalServer = message.guild.channels.cache.find(ch => ch.name === "naya-global-chat")
    if (!CanalServer) {

        const SemCanal = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('📢 Naya Global Chat System')
            .setDescription('Com este comando, ativa o canal, para o comando global não ser usado fora deste canal.')
            .addField('Crie o canal', '`' + prefix + 'createchannel naya-global-chat`')
            .setFooter('Links não são permitidos.')

        return message.inlineReply('<:xis:835943511932665926> O canal Global Chat não existe neste servidor!', SemCanal)
    }

    const GlobalChatEmbed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('💬 Naya Global Chat System')
        .setDescription('Fale com os outros servidores em um único chat. Isso é um experiência diferenciada.')
        .addField('Comando de ativação', '`' + prefix + 'setglobalchat #canal`')

    if (!args[0]) { return message.inlineReply(GlobalChatEmbed) }

    if (args[0] === 'off') {
        let canal = db.get(`globalchat_${message.guild.id}`)
        if (canal === null) {
            let semcanal = new Discord.MessageEmbed()
                .setColor('#8B0000')
                .setTitle('O Global Chat já está desativado.')

            return message.inlineReply(semcanal)
        } else if (canal) {
            db.delete(`globalchat_${message.guild.id}`)
            let comcanal = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Global Chat desativado.')
            return message.inlineReply(comcanal)
        }
    }

    let channel = message.mentions.channels.first()
    if (!channel) {
        let nochannel = new Discord.MessageEmbed()
            .setColor('#8B0000') // red
            .setTitle('' + prefix + 'setglobalchat #Canal')

        return message.inlineReply(nochannel)
    }

    let atual = db.get(`globalchat_${message.guild.id}`)
    if (channel.id === atual) {

        let iqual = new Discord.MessageEmbed()
            .setColor('#8B0000') // Red
            .setTitle('Este canal já foi definido como Chat Global!')

        return message.inlineReply(iqual)
    } else if (args[0] !== atual) {
        db.set(`globalchat_${message.guild.id}`, channel.id)

        let sucess = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Global Chat System Ativado!')
            .setDescription(`Canal escolhido: ${channel}`)

        return message.inlineReply(sucess)
    }
}