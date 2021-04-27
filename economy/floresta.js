const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    const args0 = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription('A Floresta Cammun é um lugar perigoso. Tome cuidado!')
        .addField('Comandos da Floresta', '`' + prefix + 'floresta Cammum` História onde tudo começou\n`' + prefix + 'buscar` Procure o Brown *(Leia a história para entender)*\n`' + prefix + 'floresta continue` Só depois de pegar o Brown')

    if (!args[0]) { return message.inlineReply(args0) }

    let dog = db.get(`cachorro_${message.author.id}`)
    let bola = db.get(`bola_${message.author.id}`)
    let floresta2 = db.get(`floresta2_${message.author.id}`)
    let remedio = db.get(`remedio_${message.author.id}`)

    const Cammum1 = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('🌲 Floresta Cammun')
        .setDescription('A Floresta Cammum é famosa no Reino Heslow, como um ponto turisco famoso, muitas pessoas viajam de muito longe, apenas para visita-la e isto trás grandes riquezas para o Reino.\n \n     Em um certo dia após uma grande chuva, a Princesa Kaya estava brincando com seu cachorro Brown *(Ele recebeu este nome por causa da sua cor marrom.)* próximo a Floresta, quando ouviu um grito. Alguém gritou;\n \n- *Soccoro, alguém me ajude!!*\n \n     A Princesa para de correr imediatamente e olha para dentro da Floresta Cammun. A princípio, Kaya pensou ter escutado alguém gritando aleatóriamente, pois isso era comúm no Reino após um dia de grande chuva. Ela dá de ombros e volta a correr atrás de Brown tentando pegar uma bolinha de sua boca. Novamente, ela ouve o mesmo grito;\n \n- *Soccoro, alguém me ajude!!*\n \n     Ela tem certeza do grito, não é algo de sua cabeça. Pensa Kaya; \n \n- *É um homem gritando, a voz é rouca e grave, não é a voz do Papai...*\n \n     ')

    const Cammum2 = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription('Kaya anda lentamente para a beira da floresta, com cuidado, pois seu pai, o Rei Vouwer Heslow havia ordenado a ela para não entrar na Floresta, porque no centro dela, rege uma criatura histórica, imortal, em sono eterno, capaz de destruir tudo o que ela ver.\n     Kaya pensava que era bobagem, coisa de pais colocando medo em seus filhos para protege-los, igual a história do bicho-papão. O homem grita novamente; \n \n - *Soccoro, alguém me ajude!!*\n \n     Kaya para, com medo. Ela estava pensando que era algum bandido tentando sequestra-la, como já havia ocorrido 3 vezes. Mas ela se assusta, Brown, o cachorro dela sai correndo adentro da Floresta e se perde de vista. Kaya grita o nome do Brown em desespero. No salão real, Kaya entra correndo esbarrando em um guarda na frente da porta principal atrapalhando os preparativos de sua festa de aniversário de 10 anos. Kaya com lagrimas nos olhos pede ao Rei para enviar alguém em busca de Brown, o Rei sem hesitar, ordena para que enviem 2 tropas adentrar a Floresta em busca de Brown. Kaya já não ouve mais o homem gritando, muito menos os latidos de Brown. Você como um soldado do exército do Rei, entra na floresta e acaba em problemas, se perdendo de sua tropa. Seu dever como soldado do Rei, é achar Brown e trazê-lo de volta para a Princesa Kaya.\n \nContinua...')
        .addField('Comando', '`' + prefix + 'buscar`')
        .setFooter(`Boa sorte Soldado ${message.author.username}!`)

    const CammumContinue1 = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('🌲 Floresta Cammun #2')
        .setDescription('Após andar vários dias dentro da Floresta Cammum, você finalmente encontrou o Cachorro Brown, da Princesa Kaya. A princípio, ele quase fugiu, pois estava muito assustado. Mas depois de 5 ossos, ele ficou calmo e te seguiu obedientemente. Depois de quase 2 horas andando, você encontra um homem velho, sentado no pé de uma árvore ofegante, você se aproxima calmamente e pergunta quem é ele. Ele responde cansado e ofegante;\n \n*- Todos me conhecem como o Velho Welter, mas por favor... Encontre meus remédios... Eu os perdi... Enquanto eu fugia...*\n \n Ache os remédios do Velho Welter, para continuar a história...')

    if (['cammum', 'história'].includes(args[0].toLowerCase())) { return message.inlineReply(Cammum1).then(msg => msg.channel.send(Cammum2)) }

    if (['continue', 'continua'].includes(args[0].toLowerCase())) {
        if (!dog) { return message.inlineReply('<:xis:835943511932665926> Você ainda não achou o Brown!') }
        if (dog === null) { return message.inlineReply('<:xis:835943511932665926> Você ainda não achou o Brown!') }

        message.inlineReply('<a:Check:836347816036663309> Eu mandei a história no seu privado, se você não recebeu, ative as mensagens diretas poxa...').then(m => message.author.send(CammumContinue1).catch(err => { return }))

        if (!remedio) { return message.author.send('Encontre os remédios do Velho Welter para continuar a história...').catch(err => { return }) }
        if (remedio === null) { return message.author.send('Encontre os remédios do Velho Welter para continuar a história...').catch(err => { return }) }
        if (!bola) { return message.author.send('<:xis:835943511932665926> Encontre a bolinha do Brown para continuar a história...!').catch(err => { return }) }
        if (bola === null) { return message.author.send('<:xis:835943511932665926> Encontre a bolinha do Brown para continuar a história...!').catch(err => { return }) }
        if (remedio) { return message.author.send('Escrevendo a história...') }
    } else {
        return message.inlineReply('Hey, usa `' + prefix + 'floresta` pra ver os comandos da Floresta.')
    }
}