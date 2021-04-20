const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let user = message.mentions.members.first() || message.member

    let title = await db.get(`title_${user.id}`)
    if (title) (title = "🔰 Título")
    if (title === null) { title = "" }
    if (!db.get(`title_${user.id}`)) { title = "" }

    let peixes = await db.get(`peixes_${user.id}`)
    if (peixes === null) { peixes = "0" }
    if (!db.get(`peixes_${user.id}`)) { peixes = "0" }

    let iscas = await db.get(`iscas_${user.id}`)
    if (iscas === null) { iscas = "0" }
    if (!db.get(`iscas_${user.id}`)) { iscas = "0" }

    let cartas = await db.get(`cartas_${user.id}`)
    if (cartas) { cartas = `\n💌 Cartas: ${db.get(`cartas_${user.id}`)}` }
    if (cartas === null) { cartas = "" }
    if (!db.get(`cartas_${user.id}`)) { cartas = "" }

    let agua = await db.get(`agua_${user.id}`)
    if (agua === null) { agua = "0" }
    if (!db.get(`agua_${user.id}`)) { agua = "0" }

    let camarao = await db.get(`camarao_${user.id}`)
    if (camarao === null) { camarao = "0" }
    if (!db.get(`camarao_${user.id}`)) { camarao = "0" }

    let diamond = await db.get(`diamond_${user.id}`)
    if (diamond === null) { diamond = "0" }
    if (!db.get(`diamond_${user.id}`)) { diamond = "0" }

    let minerio = await db.get(`minerio_${user.id}`)
    if (minerio === null) { minerio = "0" }
    if (!db.get(`minerio_${user.id}`)) { minerio = "0" }

    let ossos = await db.get(`ossos_${user.id}`)
    if (ossos === null) { ossos = "0" }
    if (!db.get(`ossos_${user.id}`)) { ossos = "0" }

    let apple = await db.get(`apple_${user.id}`)
    if (apple === null) { apple = "0" }
    if (!db.get(`apple_${user.id}`)) { apple = "0" }

    let madeira = await db.get(`madeira_${user.id}`)
    if (madeira === null) { madeira = "0" }
    if (!db.get(`madeira_${user.id}`)) { madeira = "0" }

    let arma = await db.get(`arma_${user.id}`)
    if (arma) { arma = "\n🔫 Arma" }
    if (arma === null) { arma = "" }
    if (!db.get(`arma_${user.id}`)) { arma = "" }

    var xusos = (db.get(`offpicareta_${user.id}`) + 1)
    let picareta = await db.get(`picareta_${user.id}`)
    if (picareta) { picareta = `\n⛏️ Picareta | Uso restante: ${xusos}` }
    if (picareta === null) { picareta = "" }
    if (!db.get(`picareta_${user.id}`)) { picareta = "" }

    let machado = db.get(`machado_${user.id}`)
    if (machado) { machado = "\n🪓 Machado" }
    if (machado === null) { machado = "" }
    if (!db.get(`machado_${user.id}`)) { machado = "" }

    let vara = db.get(`vara_${user.id}`)
    if (vara) { vara = "\n🎣 Vara de pesca" }
    if (vara === null) { vara = "" }
    if (!db.get(`vara_${user.id}`)) { vara = "" }

    let faca = db.get(`faca_${user.id}`)
    if (faca) { faca = "\n🔪 Faca" }
    if (faca === null) { faca = "" }
    if (!db.get(`faca_${user.id}`)) { faca = "" }

    let loli = db.get(`loli_${user.id}`)
    if (loli) { loli = "\n<:Loli:831571527744356422> Loli" }
    if (loli === null) { loli = "" }
    if (!db.get(`loli_${user.id}`)) { loli = "" }

    let fossil = db.get(`fossil_${user.id}`)
    if (fossil) { fossil = "\n<:fossil:831859111578173450> Fossil" }
    if (fossil === null) { fossil = "" }
    if (!db.get(`fossil_${user.id}`)) { fossil = "" }

    let mamute = db.get(`mamute_${user.id}`)
    if (mamute) { mamute = "\n🦣 Mamute" }
    if (mamute === null) { mamute = "" }
    if (!db.get(`mamute_${user.id}`)) { mamute = "" }

    var nada = !arma && !picareta && !vara && !machado
    if (nada) { nada = 'Não há nada aqui' }
    if (!nada) { nada = '' }

    var nada2 = !title && !faca && !loli && !fossil && !mamute
    if (nada2) { nada2 = 'Não há nada aqui' }
    if (!nada2) { nada2 = '' }

    var Embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`📖 **Inventário de ${user.user.username}**`)
        .setDescription('📊 Bolsa de Valores | Em Breve')
        .addField('Itens Comprados', `${nada}${arma}${picareta}${vara}${machado}${cartas}`)
        .addField('Itens Obtidos', `${nada2}${title}${faca}${loli}${fossil}${mamute}`)
        .addField('Mantimentos', `🐟 ${peixes} Peixes\n🪱 ${iscas} Iscas\n🥤 ${agua} Água\n🍤 ${camarao} Camarões\n🦴 ${ossos} Ossos\n🪵 ${madeira} Madeiras\n🍎 ${apple} Maça\n🪨 ${minerio} Minérios\n💎 ${diamond} Diamantes`)

    await message.inlineReply(Embed)
}