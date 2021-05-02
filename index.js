// Sharding Soon
const Discord = require("discord.js")
require("./inlineReply") // Remove in Discord.js V13
const client = new Discord.Client({})
const { token } = require("./config.json")
const db = require("quick.db")
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

function is_url(str) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
        return true
    } else { return false }
}

client.on("message", async (message) => {

    if (message.author.bot) return // no bots
    if (message.channel.type == "dm") {

        const dmEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('💬 Nova mensagem no privado')
            .setDescription(`**Usuário:** ${message.author.tag}\n:id: ${message.author.id}\n \n` + '**Conteúdo** ```' + `${message.content}` + '```')
            .setTimestamp()

        const canal = client.channels.cache.get('831154821204803634')
        if (!canal) { return } else { return canal.send(dmEmbed) }
    }
    xp(message)

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    if (message.content.startsWith('<')) {
        if (message.content.endsWith('>'))
            if (message.mentions.has(client.user.id)) { return message.inlineReply('Prefixo atual: `' + prefix + '` | `' + prefix + 'help`').then(msg => msg.delete({ timeout: 5000 })).catch(err => { return }) }
    }

    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (db.get(`nolink_${message.guild.id}`)) {
            if (is_url(message.content) === true) {
                message.delete().catch(err => { return })
                message.channel.send(`${message.author}, você não pode enviar links nesse servidor.`).then(msg => msg.delete({ timeout: 3000 })).catch(err => { return })
            }
        }
    }

    if (db.get(`afk_${message.author.id}+${message.guild.id}`)) {
        db.delete(`afk_${message.author.id}+${message.guild.id}`)
        message.inlineReply(`<a:Check:836347816036663309> O modo AFK foi desativado.`).then(msg => msg.delete({ timeout: 3000 })).catch(err => { return })
    }

    if (db.get(`afk_${message.author.id}+${message.author.id}`)) {
        db.delete(`afk_${message.author.id}+${message.author.id}`)
        message.inlineReply(`<a:Check:836347816036663309> O modo AFK Global foi desativado.`).then(msg => msg.delete({ timeout: 3000 })).catch(err => { return })
    }

    if (message.mentions.members.first()) {
        if (db.get(`afk_${message.mentions.members.first().id}+${message.mentions.members.first().id}`)) { // AFK Sistema Global
            const off = new Discord.MessageEmbed()
                .setColor('#B98823')
                .setDescription('```fix\n' + `${db.get(`afk_${message.mentions.members.first().id}+${message.mentions.members.first().id}`)}` + '```')
            message.inlineReply(`🔇 ${message.mentions.members.first().user.username} está offline.`, off).then(msg => msg.delete({ timeout: 8000 })).catch(err => { return })
        } else if (db.get(`afk_${message.mentions.members.first().id}+${message.guild.id}`)) { // AFK Sistema Servidor
            const off = new Discord.MessageEmbed()
                .setColor('#B98823')
                .setDescription('```fix\n' + `${db.get(`afk_${message.mentions.members.first().id}+${message.guild.id}`)}` + '```')
            message.inlineReply(`🔇 ${message.mentions.members.first().user.username} está offline.`, off).then(msg => msg.delete({ timeout: 8000 })).catch(err => { return })
        }
    }

    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    if (message) {
        db.add('CommandCountGeneral', 1)
        db.add('CommandCountDaily', 1)
    }

    if (db.get(`blacklist_${message.author.id}`)) {
        message.delete().catch(err => { return })
        return message.channel.send(`${message.author}, você está na blacklist e não tem acesso a nenhum dos meus comandos.`).then(msg => msg.delete({ timeout: 6000 })).catch(err => { return })
    }

    function xp(message) {
        if (message) {
            let xp = db.add(`xp_${message.author.id}`, 2)
            let level = Math.floor(0.5 * Math.sqrt(xp))
            let lvl = db.get(`level_${message.author.id}`) || db.set(`level_${message.author.id}`, 1)
            if (level > lvl) {
                let newLevel = db.set(`level_${message.author.id}`, level)
                db.add(`mpoints_${message.author.id}`, 500)
                let xpchannel = db.get(`xpchannel_${message.guild.id}`)
                if (xpchannel === null) { return }
                if (xpchannel) {
                    const newlevel = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setDescription(`:tada: ${message.author}, você subiu para o level ${newLevel}!\nBônus: 500 <:NPoints:837666759389347910>NPoints`)
                    client.channels.cache.get(xpchannel).send(newlevel)
                }
            }
        }
    }

    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (db.get(`blockchannel_${message.channel.id}`)) {
            message.delete().catch(err => { return })
            return message.channel.send('<:xis:835943511932665926> **COMANDOS BLOQUEADOS** | Apenas administradores podem usar meus comandos neste canal.').then(msg => msg.delete({ timeout: 4000 })).catch(err => { return })
        }
    }

    if (message.content.startsWith(`${prefix}check`)) { message.react("✅") }
    if (message.content.startsWith(`${prefix}inline`)) { return message.inlineReply("<a:Check:836347816036663309> Inline Reply funcionando corretamente") }

    try {
        const commandFile = require(`./afksystem/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./vip/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./globalchat/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./registro/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./personagens/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./commands/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./levelsystem/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./games/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./owner/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./economy/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./quiz/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./animes/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./help/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./interacao/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./discordjs/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./random/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./naya/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./perfil/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./reacoes/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    try {
        const commandFile = require(`./moderation/${command}.js`)
        return commandFile.run(client, message, args)
    } catch (err) { }

    const cmd = client.commands.get(command) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command))
    if (cmd) cmd.run(client, message, args)
    let customCommands = db.get(`guildConfigurations_${message.guild.id}.commands`)
    if (customCommands) {
        let customCommandsName = customCommands.find(x => x.name === command)
        if (customCommandsName) return message.inlineReply(customCommandsName.response)
    }

    return message.inlineReply(`Comando desconhecido.`).then(msg => msg.delete({ timeout: 6000 })).catch(err => { return })
}) // Fim do Client.on('Message')

client.on("guildMemberRemove", (member) => {
    let canal = db.get(`leavechannel_${member.guild.id}`)
    if (canal === null) { return }

    if (!client.channels.cache.get(canal)) { return }

    let msgleave = db.get(`msgleave_${member.guild.id}`)
    if (msgleave === null) { msgleave = 'saiu do servidor.' }

    if (canal) { client.channels.cache.get(canal).send(`📢 ${member.user.tag} ${msgleave}`) }
})

client.on("guildMemberAdd", (member) => {
    let canal = db.get(`welcomechannel_${member.guild.id}`)
    if (canal === null) { return }

    if (!client.channels.cache.get(canal)) { return }

    let msgwelcome = db.get(`msgwelcome_${member.guild.id}`)
    if (msgwelcome === null) { msgwelcome = 'entrou no servidor.' }

    if (canal) { return client.channels.cache.get(canal).send(`📢 ${member} ${msgwelcome}`) }

    let role = db.get(`autorole_${member.guild.id}`)
    if (role === null) { return }
    return member.roles.add(role)
})

client.on("guildMemberAdd", (member) => {
    let role = db.get(`autorole_${member.guild.id}`)
    if (role === null) { return }
    return member.roles.add(role)
})

client.on("ready", () => {
    let activities = ['Me marca que eu falo o prefixo', '@naya', '+300 Comandos Onlines', '#FiqueEmCasa']
    i = 0
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "WATCHING" }), 7000)
})

client.on('guildCreate', guild => {
    let channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    let helpgit = 'https://github.com/rodycouto/NayaCommands/blob/main/README.md'

    const newguild = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Meu prefixo padrão é `-`')
        .setDescription(`:tools: [Lista de comandos](${helpgit}) | Comece com -config`)
    channel.send('**Oooopa, chegueeei!**', newguild)

    const NewGuildEmbed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('💬 Novo servidor')
        .setDescription(`**Servidor:** ${guild.name}\n:id: ${guild.id}\n**Membros:** ${guild.memberCount}\n🌐 **Shard** ${client.guilds.cache.size}`)
        .setTimestamp()

    let canal = client.channels.cache.get('831663336776400957')
    if (!canal) { return } else { return canal.send(NewGuildEmbed) }
})

client.on('guildDelete', guild => {
    const NewGuildEmbed = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setTitle('💬 Um servidor me removeu')
        .setDescription(`**Servidor:** ${guild.name}\n:id: ${guild.id}\n🌐 **Shard** ${client.guilds.cache.size}`)
        .setTimestamp()

    let canal = client.channels.cache.get('831663336776400957')
    if (!canal) { return } else { return canal.send(NewGuildEmbed) }
})

client.once("ready", () => {
    let envi = client.channels.cache.get('837408099781836849')
    console.log('OK!')

    client.guilds.cache.forEach(Canal => {
        try {
            client.channels.cache.get(db.fetch(`globalchat_${Canal.id}`)).send('Estou online 💞')
        } catch (e) { return }
    })

    if (!envi) { return } else if (envi) { return envi.send(`Cheguei ( ͡° ͜ʖ ͡°)`) }
})

client.login(token)