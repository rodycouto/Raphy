const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async (client, message, args) => {
    message.delete({ timeout: 10000 }).catch(err => { return })

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    if (db.get(`noglobalchat_${message.author.id}`)) {
        message.delete().catch(err => { return })
        return message.channel.send(`<:xis:835943511932665926> ${message.author}, você foi banido do chat global! Acha que foi um engano? \`` + prefix + 'support`').then(msg => msg.delete({ timeout: 6000 })).catch(err => { return })
    }

    let timeout1 = 10000
    let author1 = db.fetch(`globaltiming_${message.author.id}`)

    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
        let time = ms(timeout1 - (Date.now() - author1))
        return message.channel.send(`${message.author}, <:xis:835943511932665926> Espere o sistema global esfriar os motores... ${time.minutes}m e ${time.seconds}s`).then(msg => msg.delete({ timeout: 5000 }).catch(err => { return }))
    } else {

        let CanalServer = message.guild.channels.cache.find(ch => ch.name === "naya-global-chat")
        if (!CanalServer) {

            const SetGlobalChatEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('💬 Naya Global Chat System')
                .setDescription('Fale com os outros servidores em um único chat. Isso é um experiência única!')
                .addField('Crie o canal', '`' + prefix + 'createchannel naya-global-chat`')
                .addField('Valide o canal', '`' + prefix + 'setglobalchat #naya-global-chat`')
                .addField('Desative o Canal', '`' + prefix + 'setglobalchat off` ou `' + prefix + 'deletechannel #naya-global-chat`')

            return message.channel.send('<:xis:835943511932665926> O canal Global Chat não existe neste servidor!', SetGlobalChatEmbed)
        }

        let CanalDoGlobalChat = db.get(`globalchat_${message.guild.id}`)

        const SemCanalDefinido = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('📢 Naya Global Chat System')
            .setDescription('Com este comando, você consegue conversar com todos os servidores que eu estou.\nLinks não são permitidos.')
            .addField('Crie o canal', '`' + prefix + 'createchannel naya-global-chat`')
            .addField('Valide o canal', '`' + prefix + 'setglobalchat #canal`')
            .addField('Desative o Canal', '`' + prefix + 'setglobalchat off` ou `' + prefix + 'deletechannel #naya-global-chat`')

        if (CanalDoGlobalChat === null) { return message.channel.send('<:xis:835943511932665926> O canal não foi autenticado!', SemCanalDefinido) }

        let ConfirmaCanal = message.channel.id === db.get(`globalchat_${message.guild.id}`)
        if (!ConfirmaCanal) { return message.channel.send(`<:xis:835943511932665926> Este não é o Global Chat! Vem cá, é aqui: ${client.channels.cache.get(CanalDoGlobalChat)}`).then(msg => msg.delete({ timeout: 7000 }).catch(err => { return })) }

        if (!db.get(`globalchat_${message.guild.id}`)) {
            return message.channel.send('<:xis:835943511932665926> Parece que o Global Chat foi excluido... Use `' + prefix + 'setglobalchat` Para mais informações.')
        } else {

            function AchaLink(str) {
                let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
                if (regexp.test(str)) { return true } else { return false }
            }

            let avatar = message.author.displayAvatarURL({ format: 'png' })
            let Mensagem = message.content.split(" ").slice(1)
            let MensagemGlobal = Mensagem.join(" ")
            let vip = db.get(`vip_${message.author.id}`)
            let moderador = db.get(`moderadoreschatglobal_${message.author.id}`)
            let rody = message.author.id === '451619591320371213'
            let ModeradorServidor = db.get(`modserver_${message.author.id}`)

            if (!MensagemGlobal) { return message.channel.send("<:xis:835943511932665926> Você precisa dizer algo para ser enviado no Global Chat.").then(msg => msg.delete({ timeout: 5000 }).catch(err => { return })) }
            if (MensagemGlobal.length > 200) { return message.channel.send('<:xis:835943511932665926> Heeey! A mensagem não pode ter mais que **200 caracteres**.').then(msg => msg.delete({ timeout: 5000 }).catch(err => { return })) }
            if (MensagemGlobal.length < 4) { return message.channel.send('<:xis:835943511932665926> Heeey! A mensagem não pode ter menos que **4 caracteres**.').then(msg => msg.delete({ timeout: 5000 }).catch(err => { return })) }
            if (AchaLink(MensagemGlobal) === true) { return message.channel.send(`${message.author}, Por favor, não envie links no Global Chat.`).then(msg => msg.delete({ timeout: 5000 }).catch(err => { return })) }
            if (['xvideos', 'pornhub', 'redtube'].includes(MensagemGlobal)) {
                message.delete().catch(err => { return })
                message.channel.send('<:xis:835943511932665926> Eu nem preciso dizer o motivo desta mensagem ser bloqueada, não é?').then(msg => msg.delete({ timeout: 5000 }).catch(err => { return }))
            }

            client.guilds.cache.forEach(guild => {

                if (!rody) { db.set(`globaltiming_${message.author.id}`, Date.now()) }
                let CanaisValidos = guild.channels.cache.find(ch => ch.name === "naya-global-chat")

                if (!CanaisValidos) return

                let GlobalChatEmbedMensagem = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setAuthor(`${message.author.tag} | ${message.guild.name}`, avatar)
                    .setDescription(`\`\`\`txt\n${MensagemGlobal}\n\`\`\``)
                    .setFooter(`${prefix}chat sua mensagem | ${message.author.id}`)

                if (vip) {
                    GlobalChatEmbedMensagem.setColor('#FDFF00')
                    GlobalChatEmbedMensagem.setDescription(`<a:vip:837441854332338227> Membro VIP\n\`\`\`txt\n${MensagemGlobal}\n\`\`\``)
                    GlobalChatEmbedMensagem.setFooter(`${prefix}chat sua mensagem | ${prefix}vip | ${message.author.id}`)
                }

                if (moderador) {
                    GlobalChatEmbedMensagem.setColor('#FF7D00')
                    GlobalChatEmbedMensagem.setDescription(`🎖️ Moderador Global Chat Naya\n\`\`\`txt\n${MensagemGlobal}\n\`\`\``)
                }

                if (ModeradorServidor) {
                    GlobalChatEmbedMensagem.setColor('#00FF1A')
                    GlobalChatEmbedMensagem.setDescription(`✨ Staff Servidor Naya's House\n\`\`\`txt\n${MensagemGlobal}\n\`\`\``)
                }

                if (rody) {
                    GlobalChatEmbedMensagem.setColor('#FF0000')
                    GlobalChatEmbedMensagem.setDescription(`<a:engrenagem:836101651331940383> Criador da Naya\n\`\`\`txt\n${MensagemGlobal}\n\`\`\``)
                }

                return CanaisValidos.send(GlobalChatEmbedMensagem)
            })
        }
    }
}