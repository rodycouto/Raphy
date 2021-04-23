const Discord = require("discord.js")
const db = require("quick.db")
// REGISTRO DO SERVIDOR DOWN OF THE NIGHT

exports.run = async (client, message, args) => {
    message.delete().catch(err => { return })

    if (message.guild.id !== "753988242570739772") { return }

    if (["count", "membros", "registrados"].includes(args[0])) {
        let roleID = "755450811969962084"
        let MembrosComVerificado = message.guild.roles.cache.get(roleID).members
        return message.channel.send(`Membros com cargo <@&755450811969962084>: ${MembrosComVerificado.size}`).then(msg => msg.delete({ timeout: 7000 })).catch(err => { return })
    }

    if (message.channel.id !== "829731969348796478") { return message.channel.send("Este não é o canal de registro. <#829731969348796478>").then(m => m.delete({ timeout: 5000 })).catch(err => { return }) }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    var guri = message.guild.roles.cache.get("759901493591146549")
    var guria = message.guild.roles.cache.get("759901620875689985")

    var mais18 = message.guild.roles.cache.get("759902317750517760")
    var menos18 = message.guild.roles.cache.get("759902206085955606")

    var sudeste = message.guild.roles.cache.get("759900199736442890")
    var sul = message.guild.roles.cache.get("759900115271549007")
    var norte = message.guild.roles.cache.get("759900915929972816")
    var centrooeste = message.guild.roles.cache.get("759901046428008519")
    var nordeste = message.guild.roles.cache.get("759900384377700412")

    var solteiro = message.guild.roles.cache.get("759899479750344753")
    var namorando = message.guild.roles.cache.get("759899737650102282")

    var verificado = message.guild.roles.cache.get("755450811969962084")
    var naoverificado = message.guild.roles.cache.get("833762390482747402")

    var registro = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle(`🌙 Bem-vindo ao Registro da ${message.guild.name}`)
        .setDescription("O registro é bem fácil, é muito importante que você siga a sequência corretamente.\n \n**📜 Opções**\nHomem | Mulher\n-18 | +18\nSudeste, Sul, Norte, Centro, Nordeste\nSolteiro | Namorando\n \nEscolha apenas um de cada!")
        .addField("Exemplo", "`" + prefix + "registro homem +18 sudeste solteiro`")
        .addField("Exemplo", "`" + prefix + "registro mulher -18 nordeste namorando`")
        .setFooter("Auto delete em 50 segundos.")

    if (message.member.roles.cache.has("755450811969962084")) { return message.channel.send(`${message.author}, você já é verificado!`).then(msg => msg.delete({ timeout: 4000 })).catch(err => { return }) }
    if (!args[0] || !args[1] || !args[2] || !args[3]) { return message.channel.send(registro).then(msg => msg.delete({ timeout: 20000 })) }

    if (!["homem", "Homem", "HOMEM", "mulher", "Mulher", "MULHER"].includes(args[0])) { return message.channel.send('Por favor, siga o formato correto! `' + prefix + 'registro`').then(msg => msg.delete({ timeout: 5000 })).catch(err => { return }) }
    if (!["+18", "-18"].includes(args[1])) { return message.channel.send('Por favor, siga o formato correto! `' + prefix + 'registro`').then(msg => msg.delete({ timeout: 5000 })).catch(err => { return }) }
    if (!["sudeste", "Sudeste", "SUDESTE", "sul", "Sul", "SUL", "norte", "Norte", "NORTE", "centro", "Centro", "CENTRO", "nordeste", "Nordeste", "NORDESTE"].includes(args[2])) { return message.channel.send('Por favor, siga o formato correto! `' + prefix + 'registro`').then(msg => msg.delete({ timeout: 5000 })).catch(err => { return }) }
    if (!["solteiro", "Solteiro", "SOLTEIRO", "solteira", "Solteira", "SOLTEIRA", "namorando", "Namorando", "NAMORANDO"].includes(args[3])) { return message.channel.send('Por favor, siga o formato correto! `' + prefix + 'registro`').then(msg => msg.delete({ timeout: 5000 })).catch(err => { return }) }

    if (["homem", "Homem", "HOMEM"].includes(args[0])) {
        if (message.member.roles.cache.has("759901493591146549")) { return }
        message.member.roles.add(guri).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
    }

    if (["mulher", "Mulher", "MULHER"].includes(args[0])) {
        if (message.member.roles.cache.has("759901620875689985")) { return }
        message.member.roles.add(guria).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
    }

    if (["+18"].includes(args[1])) {
        if (message.member.roles.cache.has("759902317750517760")) { return }
        message.member.roles.add(mais18).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
    }

    if (["-18"].includes(args[1])) {
        if (message.member.roles.cache.has("759902206085955606")) { return }
        message.member.roles.add(menos18).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
    }

    if (["sudeste", "Sudeste", "SUDESTE"].includes(args[2])) {
        if (message.member.roles.cache.has("759900199736442890")) { return }
        message.member.roles.add(sudeste).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
    }

    if (["sul", "Sul", "SUL"].includes(args[2])) {
        if (message.member.roles.cache.has("759900115271549007")) { return }
        message.member.roles.add(sul).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
    }

    if (["norte", "Norte", "NORTE"].includes(args[2])) {
        if (message.member.roles.cache.has("759900915929972816")) { return }
        message.member.roles.add(norte).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
    }

    if (["centro", "Centro", "CENTRO"].includes(args[2])) {
        if (message.member.roles.cache.has("759901046428008519")) { return }
        message.member.roles.add(centrooeste).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
    }

    if (["nordeste", "Nordeste", "NORDESTE"].includes(args[2])) {
        if (message.member.roles.cache.has("759900384377700412")) { return }
        message.member.roles.add(nordeste).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
    }

    if (["solteiro", "Solteiro", "SOLTEIRO", "solteira", "Solteira", "SOLTEIRA"].includes(args[3])) {
        if (message.member.roles.cache.has("759899479750344753")) { return }
        message.member.roles.add(solteiro).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
    }

    if (["namorando", "Namorando", "NAMORANDO"].includes(args[3])) {
        if (message.member.roles.cache.has("759899737650102282")) { return }
        message.member.roles.add(namorando).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
    }

    if (args[0] && args[1] && args[2] && args[3]) {
        message.member.roles.add(verificado).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
        message.member.roles.remove(naoverificado).catch(err => { return })
        message.channel.send(`${message.author}, você recebeu o cargo <@&755450811969962084> e finalizou o registro!`).then(msg => msg.delete({ timeout: 7000 })).catch(err => { return })
    }
}