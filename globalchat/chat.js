const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")
const { palavraum } = require("./filterchat.json")

exports.run = async (client, message, args) => {
    message.delete({ timeout: 3000 }).catch(err => { return })

    let lock = db.get('lockglobal')
    if (lock) { return message.inlineReply("🔒 O canal global está fechado no momento.").then(msg => msg.delete({ timeout: 5000 }).catch(err => { return })) }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    let color = await db.get(`color_${message.author.id}`)
    if (color === null) color = '#6F6C6C'

    if (db.get(`noglobalchat_${message.author.id}`)) {
        message.delete().catch(err => { return })
        return message.channel.send(`<:xis:835943511932665926> ${message.author}, você foi banido do chat global! Acha que foi um engano? \`` + prefix + 'support`').then(msg => msg.delete({ timeout: 6000 })).catch(err => { return })
    }

    let timing = db.fetch(`timemuteglobal_${message.author.id}`)
    if (timing === null) timing = 0
    if (!db.fetch(`timemuteglobal_${message.author.id}`)) timing = 0

    let timeout = timing
    let author = db.fetch(`muteglobal_${message.author.id}`)

    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author))
        return message.channel.send(`${message.author}, <:xis:835943511932665926> Você foi mutado, espere mais... ${time.minutes}m e ${time.seconds}s`).then(msg => msg.delete({ timeout: 5000 }).catch(err => { return }))
    } else {

        let globalcooldown = db.fetch(`globalcooldown`)
        if (globalcooldown === null) globalcooldown = 10000
        if (!db.fetch(`globalcooldown`)) globalcooldown = 10000

        let timeout1 = globalcooldown
        let author1 = db.fetch(`globaltiming_${message.author.id}`)

        if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
            let time = ms(timeout1 - (Date.now() - author1))
            return message.channel.send(`<:xis:835943511932665926> Espere o sistema global esfriar os motores... ${time.minutes}m e ${time.seconds}s`).then(msg => msg.delete({ timeout: 5000 }).catch(err => { return }))
        } else {

            let CanalDoGlobalChat = db.get(`globalchat_${message.guild.id}`)
            let CanalServer = message.channel.id === CanalDoGlobalChat

            const SemCanalDefinido = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('📢 Raphy Global Chat System')
                .setDescription('Com este comando, você consegue conversar com todos os servidores que eu estou.\nLinks não são permitidos.')
                .addField('Crie o canal', '`' + prefix + 'channel create text NomeDoCanal`')
                .addField('Valide o canal', '`' + prefix + 'setglobalchat #canal`')
                .addField('Desative o Canal', '`' + prefix + 'setglobalchat off` ou `' + prefix + 'deletechannel #canal`')

            if (CanalDoGlobalChat === null) { return message.channel.send('<:xis:835943511932665926> O canal não foi autenticado!', SemCanalDefinido) }
            if (!client.channels.cache.get(CanalDoGlobalChat)) { return message.channel.send('<:xis:835943511932665926> O Global Chat não existe neste servidor!', SemCanalDefinido) } if (!db.get(`globalchat_${message.guild.id}`)) { return message.channel.send(`<:xis:835943511932665926> Este não é o Global Chat! Vem cá, é aqui: ${client.channels.cache.get(CanalDoGlobalChat)}`).then(msg => msg.delete({ timeout: 7000 }).catch(err => { return })) }
            if (!CanalServer) { return message.channel.send(`<:xis:835943511932665926> Este não é o Global Chat! Vem cá, é aqui: ${client.channels.cache.get(CanalDoGlobalChat)}`).then(msg => msg.delete({ timeout: 7000 }).catch(err => { return })) }

            if (!CanalDoGlobalChat) {
                return message.channel.send('<:xis:835943511932665926> Parece que o Global Chat foi excluido... Use `' + prefix + 'setglobalchat` Para mais informações.')
            } else {

                function AchaLink(str) {
                    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
                    if (regexp.test(str)) { return true } else { return false }
                }

                let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
                let Mensagem = message.content.split(" ").slice(1)
                let MensagemGlobal = Mensagem.join(" ")
                let vip = db.get(`vip_${message.author.id}`)
                let moderador = db.get(`moderadoreschatglobal_${message.author.id}`)
                let rody = message.author.id === '451619591320371213'
                let ModeradorServidor = db.get(`modserver_${message.author.id}`)

                if (!MensagemGlobal) { return message.channel.send("<:xis:835943511932665926> Você precisa dizer algo para ser enviado no Global Chat.\n`" + prefix + 'chat sua mensagem`').then(msg => msg.delete({ timeout: 5000 }).catch(err => { return })) }
                if (MensagemGlobal.length > 300) { return message.channel.send('<:xis:835943511932665926> Heeey! A mensagem não pode ter mais que **300 caracteres**.').then(msg => msg.delete({ timeout: 5000 }).catch(err => { return })) }
                if (MensagemGlobal.length < 3) { return message.channel.send('<:xis:835943511932665926> Heeey! A mensagem não pode ter menos que **3 caracteres**.').then(msg => msg.delete({ timeout: 5000 }).catch(err => { return })) }
                if (AchaLink(MensagemGlobal) === true) { return message.channel.send(`${message.author}, Por favor, não envie links no Global Chat.`).then(msg => msg.delete({ timeout: 5000 }).catch(err => { return })) }

                let filtro = db.get('noglobalbadwords')

                if (filtro) {
                    let confirm = false
                    var i
                    for (i = 0; i < palavraum.length; i++) {
                        if (message.content.toLowerCase().includes(palavraum[i].toLowerCase()))
                            confirm = true
                    }

                    if (confirm) {
                        message.delete().catch(err => { return })
                        message.channel.send('<:xis:835943511932665926> Essa mensagem contém palavras feias...').then(msg => msg.delete({ timeout: 5000 }).catch(err => { return }))
                    } else {

                        let ServidoresAtivados = db.fetch(`globalchat_${message.guild.id}`)
                        if (message.channel.id === ServidoresAtivados) {

                            const GlobalChatEmbedMensagem = new Discord.MessageEmbed()
                                .setColor(color)
                                .setAuthor(`${message.author.tag} | ${message.guild.name}`, avatar)
                                .setDescription(`\`\`\`txt\n${MensagemGlobal}\n\`\`\``)
                                .setFooter(`${prefix}chat | ${message.author.id}`)
                                .setTimestamp()

                            if (vip) { GlobalChatEmbedMensagem.setDescription(`<a:vip:837441854332338227> Membro VIP\n\`\`\`txt\n${MensagemGlobal}\n\`\`\``) }
                            if (moderador) { GlobalChatEmbedMensagem.setDescription(`🎖️ Moderador Chat Global Raphy\n\`\`\`txt\n${MensagemGlobal}\n\`\`\``) }
                            if (ModeradorServidor) { GlobalChatEmbedMensagem.setDescription(`✨ Staff Servidor Raphy's House\n\`\`\`txt\n${MensagemGlobal}\n\`\`\``) }
                            if (rody) { GlobalChatEmbedMensagem.setDescription(`<a:engrenagem:836101651331940383> Desenvolvedor\n\`\`\`txt\n${MensagemGlobal}\n\`\`\``) }

                            client.guilds.cache.forEach(Canal => {
                                if (!rody) { db.set(`globaltiming_${message.author.id}`, Date.now()) }
                                try {
                                    client.channels.cache.get(db.fetch(`globalchat_${Canal.id}`)).send(GlobalChatEmbedMensagem)
                                } catch (e) { return }
                            })
                        }
                    }
                }

                if (!filtro) {

                    let ServidoresAtivados = db.fetch(`globalchat_${message.guild.id}`)
                    if (message.channel.id === ServidoresAtivados) {

                        const GlobalChatEmbedMensagem = new Discord.MessageEmbed()
                            .setColor(color)
                            .setAuthor(`${message.author.tag} | ${message.guild.name}`, avatar)
                            .setDescription(`\`\`\`txt\n${MensagemGlobal}\n\`\`\``)
                            .setFooter(`${prefix}chat | ${message.author.id}`)
                            .setTimestamp()

                        if (vip) { GlobalChatEmbedMensagem.setDescription(`<a:vip:837441854332338227> Membro VIP\n\`\`\`txt\n${MensagemGlobal}\n\`\`\``) }
                        if (moderador) { GlobalChatEmbedMensagem.setDescription(`🎖️ Moderador Chat Global Raphy\n\`\`\`txt\n${MensagemGlobal}\n\`\`\``) }
                        if (ModeradorServidor) { GlobalChatEmbedMensagem.setDescription(`✨ Staff Servidor Raphy's House\n\`\`\`txt\n${MensagemGlobal}\n\`\`\``) }
                        if (rody) { GlobalChatEmbedMensagem.setDescription(`<a:engrenagem:836101651331940383> Desenvolvedor\n\`\`\`txt\n${MensagemGlobal}\n\`\`\``) }

                        client.guilds.cache.forEach(Canal => {
                            if (!rody) { db.set(`globaltiming_${message.author.id}`, Date.now()) }
                            try {
                                client.channels.cache.get(db.fetch(`globalchat_${Canal.id}`)).send(GlobalChatEmbedMensagem)
                            } catch (e) { return }
                        })
                    }
                }
            }
        }
    }
}