const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    const args0 = new Discord.MessageEmbed()
        .setColor('#3B692D') //verde
        .setDescription('🌲 A Floresta Cammun é um lugar perigoso. Tome cuidado!')
        .addField('Comandos da Floresta', '`' + prefix + 'floresta Cammum` História onde tudo começou\n`' + prefix + 'buscar` Procure o Brown *(Leia a história para entender)*\n`' + prefix + 'floresta continue` Só depois de pegar o Brown\n`' + prefix + 'floresta final` Parte final da história')

    if (!args[0]) { return message.inlineReply(args0) }

    let dog = db.get(`cachorro_${message.author.id}`)
    let bola = db.get(`bola_${message.author.id}`)
    let remedio = db.get(`remedio_${message.author.id}`)

    const Cammum1 = new Discord.MessageEmbed()
        .setColor('#3B692D')
        .setTitle('🌲 Floresta Cammun #1')
        .setDescription('A Floresta Cammum é famosa no Reino Heslow, como um ponto turisco famoso, muitas pessoas viajam de muito longe, apenas para visita-la e isto trás grandes riquezas para o Reino.\n \n     Em um certo dia após uma grande chuva, a Princesa Kaya estava brincando com seu cachorro Brown *(Ele recebeu este nome por causa da sua cor marrom.)* próximo a Floresta, quando ouviu um grito. Alguém gritou;\n \n- *Soccoro, alguém me ajude!!*\n \n     A Princesa para de correr imediatamente e olha para dentro da Floresta Cammun. A princípio, Kaya pensou ter escutado alguém gritando aleatóriamente, pois isso era comúm no Reino após um dia de grande chuva. Ela dá de ombros e volta a correr atrás de Brown tentando pegar uma bolinha de sua boca. Novamente, ela ouve o mesmo grito;\n \n- *Soccoro, alguém me ajude!!*\n \n     Ela tem certeza do grito, não é algo de sua cabeça. Pensa Kaya; \n \n- *É um homem gritando, a voz é rouca e grave, não é a voz do Papai...*\n \n     ')

    const Cammum2 = new Discord.MessageEmbed()
        .setColor('#3B692D')
        .setDescription('Kaya anda lentamente para a beira da floresta, com cuidado, pois seu pai, o Rei Vouwer Heslow havia ordenado a ela para não entrar na Floresta, porque no centro dela, rege uma criatura histórica, imortal, em sono eterno, capaz de destruir tudo o que ela ver.\n     Kaya pensava que era bobagem, coisa de pais colocando medo em seus filhos para protege-los, igual a história do bicho-papão. O homem grita novamente; \n \n - *Soccoro, alguém me ajude!!*\n \n     Kaya para, com medo. Ela estava pensando que era algum bandido tentando sequestra-la, como já havia ocorrido 3 vezes. Mas ela se assusta, Brown, o cachorro dela sai correndo adentro da Floresta e se perde de vista. Kaya grita o nome do Brown em desespero. No salão real, Kaya entra correndo esbarrando em um guarda na frente da porta principal atrapalhando os preparativos de sua festa de aniversário de 10 anos. Kaya com lagrimas nos olhos pede ao Rei para enviar alguém em busca de Brown, o Rei sem hesitar, ordena para que enviem 2 tropas adentrar a Floresta em busca de Brown. Kaya já não ouve mais o homem gritando, muito menos os latidos de Brown. Você como um soldado do exército do Rei, entra na floresta e acaba em problemas, se perdendo de sua tropa. Seu dever como soldado do Rei, é achar Brown e trazê-lo de volta para a Princesa Kaya.\n \nContinua...')
        .addField('Comando', '`' + prefix + 'buscar`')
        .setFooter(`Boa sorte Soldado ${message.author.username}!`)

    const Cammum3 = new Discord.MessageEmbed()
        .setColor('#3B692D')
        .setTitle('🌲 Floresta Cammun #2')
        .setDescription('Após andar vários dias dentro da Floresta Cammum, você finalmente encontrou o Cachorro Brown, da Princesa Kaya. A princípio, ele quase fugiu, pois estava muito assustado. Mas depois de 5 ossos, ele ficou calmo e te seguiu obedientemente. Depois de quase 2 horas andando, você encontra um homem velho, sentado no pé de uma árvore ofegante, você se aproxima calmamente e pergunta quem é ele. Ele responde cansado e ofegante;\n \n*- Todos me conhecem como o Velho Welter, mas por favor... Encontre meus remédios... Eu os perdi... Enquanto eu fugia...*\n \n Ache os remédios do Velho Welter, para continuar a história...')

    const CammumComRemediosDoVelhoWelter = new Discord.MessageEmbed()
        .setColor('#3B692D')
        .setTitle('🌲 Floresta Cammun #3')
        .setDescription('Após andar vários dias dentro da Floresta Cammum, você finalmente encontrou o Cachorro Brown, da Princesa Kaya. A princípio, ele quase fugiu, pois estava muito assustado. Mas depois de 5 ossos, ele ficou calmo e te seguiu obedientemente. Depois de quase 2 horas andando, você encontra um homem velho, sentado no pé de uma árvore ofegante, você se aproxima calmamente e pergunta quem é ele. Ele responde cansado e ofegante;\n \n*- Todos me conhecem como o Velho Welter, mas por favor... Encontre meus remédios... Eu os perdi... Enquanto eu fugia...*\n \n Após uma busca aos arredores, você encontra os remédios do Velho Welter. Mas durante a busca, uma coisa não saia da sua cabeça... *Do que ele fugia? De quem?*\n \nDe volta a árvore, onde Welter estava sentado, você entrega os remédios a ele, o Velho o toma sem pressa. Engole a seco, como se precisa-se daquilo para viver... Ele ainda cansado, se levante, coloca as mãos tremulas em seus ombros, olha nos seus olhos e diz ofegante;\n \n*- O que espera? Vamos fugir deste lugar! Não quero passar mais nenhum segundo aqui, não me resta muito tempo mes...*\n \nEle trava. O cachorro Brown está latindo descontroladamente. Welter está olhando fixamente para cima de você, imóvel.\n \nQuando você se vira, você não acredita em seus olhos... É um leão branco, não um leão branco que todos conhecem, mas um de 6 metros de altura, um humano caberia dentro de sua juba sem esforço algum.')

    const CammumFinal = new Discord.MessageEmbed()
        .setColor('#3B692D')
        .setTitle('🌲 Floresta Cammun #4 Final')
        .setDescription('Em um ataque de medo e adrenalina, você se vira para correr, mas Velho Welter te segura pelo cotovelo. Impedindo sua fuga. Ele fala baixo;\n \n*- O que pensa que estás a fazer? Fique quieto!*\n \nVocê se vira novamente para o leão e fica imóvel, com medo. O leão anda lentamente em sua direção e fixa o olhar no seu. Seu coração bate acelerado como se estive prestes a explodir. O leão ruge. Seu corpo inteiro estremece e Brown para de latir imediatamente e se encolhe atrás de uma árvore. O velho fala baixo novamente;\n \n*Irei correr em direção contrária do Reino, você pega o cachorro e parta em retirada.*\n \nAntes que você pudesse dizer algo, ele corre entre as pernas do leão, gritando para chamar sua atenção e como planejado, o leão o segue em sua caça.\n \nVocê já está calmo. Aterrorizado, mas calmo. Você faz uma continência do exército do Reino, em forma de respeito pelo seu sacrifício, apara o cachorro em uma corda para evitar sua fuga e parte em retirada ao Reino, seguindo o plano do Velho Welter.\nEm sua chegada, 2 equipes estava adentrando a floresta em sua busca, pois você passou 12 dias e 11 noites sem enviar um sinal de vida, sozinho. A Princesa Kaya vem correndo em direção de Brown, chorando de felicidade, Kaya o abraça e Brown solta um ganido de dor, sua pata traseira estava quebrada e você não tinha percebido.')

    const CammumFinal2 = new Discord.MessageEmbed()
        .setColor('#3B692D')
        .setDescription('A Rainha, Elena Heslow, ordena a 2 guardas levar Brown para o centro veterinário imediatamente. A Princesa Kaya te abraça e diz obrigada chorando em seu ouvido e parte em retirada, correndo em direção aos 2 soldados que carregara Brown seguindo as ordens da Rainha. Você cai de joelhos e se vê no chão. Você está exausto e também não tinha percebido. O pico de adrenalina e o pavor do leão branco te fez esquecer de tudo e o extinto de sobrevivência prevaleceu em seu corpo. O Rei se abaixa sobre um joelho com uma mão no seu ombro direito e diz;\n \n*Parabéns por teus feitos soldado! Você mostrou bravura, coragem e lealdade para teus colegas e para mim. Como forma de recompensa, lhe darei a Medalha Cammum, a medalha mais valiosa do Reino Heslow. Por ser um item mágico, você deve dizer os quatros números que rege teu nome e teu código que te torna único no mundo e a Medalha Cammum á de aparecer para ti.*\n \nA Princesa Kaya chega correndo com um filhote de cachorro em seus braços e diz;\n \n*Soldado, muito obrigada por salvar o Brown, a parceira dele, a Mira, deu luz a 5 lindos filhotes, por favor, fique com este, é tudo o que posso lhe dar.*\n \nVocê levanta se curvando a família real presente em sua frente. Cansado, agradece as recompensas e pega o filhote em seus braços. Três dias depois, você se lembra do Velho Welter ao ver a lua cheia no céu e pergunta a ele dando um riso, como se estivesse lembrando de algo feliz;\n \n*Por que você estava com tanta pressa Velho?*')
        .addField('Comandos Desbloqueados', '`' + prefix + 'medalha` | `' + prefix + 'dogname`')

    if (['cammum', 'história'].includes(args[0].toLowerCase())) { return message.inlineReply(Cammum1).then(msg => msg.channel.send(Cammum2)) }

    if (['continue', 'continua'].includes(args[0].toLowerCase())) {
        if (!dog) { return message.inlineReply('<:xis:835943511932665926> | Você ainda não achou o Brown! `' + prefix + 'floresta cammum`') }
        if (dog && !remedio) { return message.inlineReply(Cammum3) }
        if (dog && remedio && !bola) { return message.inlineReply('<:xis:835943511932665926> | Você ainda não achou a bolinha do Brown.', CammumComRemediosDoVelhoWelter) }
        if (dog && bola && remedio) { return message.inlineReply(CammumComRemediosDoVelhoWelter).then(msg => msg.channel.send('Você já completou está missão! Use `' + prefix + 'floresta final`')) }
    }

    if (['final'].includes(args[0].toLowerCase())) {

        let MedalhaAcess = db.get(`MedalhaAcess_${message.author.id}`)
        let FinalPart = dog && bola && remedio
        if (!MedalhaAcess) { db.set(`MedalhaAcess_${message.author.id}`, "ON") }
        if (!FinalPart) { return message.inlineReply('<:xis:835943511932665926> | Você precisa resgatar o Cachorro Brown, achar a bolinha dele e ajudar o Velho Welter! `' + prefix + 'floresta continue`') }
        if (FinalPart) { return message.inlineReply(CammumFinal).then(msg => msg.channel.send(CammumFinal2)) }

    } else { return message.inlineReply('Hey, use `' + prefix + 'floresta` pra ver os comandos da Floresta.') }
}