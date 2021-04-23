const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

  var linkgithub = 'https://github.com/rodycouto/MayaCommands/blob/main/README.md'
  var linksupport = 'https://forms.gle/vtJ5qBqFDd9rL5JU8'
  var linkservidor = 'https://discord.gg/YpFWgJuuUV'
  var mercadopago = 'https://mpago.la/2jYiNDg'
  var invitebot = 'https://discord.com/api/oauth2/authorize?client_id=821471191578574888&permissions=8&scope=bot'
  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) { prefix = "-" }

  if (!args[0]) {
    var newhelp = new Discord.MessageEmbed()
      .setColor('#CD853F')
      .setTitle('⭐ Centralzinha de Ajuda da Maya ⭐')
      .setDescription('Use `' + `${prefix}help categoria` + '` para as pastas de comandos')
      .addField('Acesso rápido', `:tools: [Lista de Comandos](${linkgithub})\n☎️ [Suporte](${linksupport})\n🧩 [Meu servidor](${linkservidor})\n:heart: [Me adicione](${invitebot})`)
      .addField('Me ajude a ficar online', `<a:MoneyWings:834899137991540797> [Doar R$1,00](${mercadopago})`)
      .setFooter(`${prefix}gif | ${prefix}ideiamaya`)
    return message.inlineReply(`Heey! Tudo bem ${message.author}?`, newhelp)
  }

  if (['categoria', 'categorias'].includes(args[0])) {
    var catego = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('📑 Todos os comandos sob categorias')
      .setDescription('❓ **O que são categorias?**\nCategorias são como caixas, dentro de cada caixa tem os comandos que a ela pertence.\n \nDentro de cada categoria, tem comandos disponiveis. Começe a explorar!')
      .addField('• Categorias Disponiveis (17)', '`' + prefix + 'help afksystem`\n' + '`' + prefix + 'help animes`\n' + '`' + prefix + 'help commands`\n' + '`' + prefix + 'help discordjs`\n' + '`' + prefix + 'help economy`\n' + '`' + prefix + 'help games`\n' + '`' + prefix + 'help interação`\n' + '`' + prefix + 'help levelsystem`\n' + '`' + prefix + 'help maya`\n' + '`' + prefix + 'help moderation`\n' + '`' + prefix + 'help owner`\n' + '`' + prefix + 'help perfil`\n' + '`' + prefix + 'help personagens`\n' + '`' + prefix + 'help quiz`\n' + '`' + prefix + 'help random`\n' + '`' + prefix + 'help reações`')
      .addField('• Categorias Privadas (2)', `:tools: [Lista de Comandos](${linkgithub})`)
    return message.inlineReply(catego)
  }

  if (['afksystem', 'afk'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('📢 Maya - AFK Global System')
      .setDescription('Com o AFK System, eu avisarei as pessoas que te marcarem que você está offline.\nVocê pode deixar uma mensagem pra elas se quiser.')
      .addFields(
        {
          name: '📴 Ative no Servidor',
          value: '`' + prefix + 'afk Almoçando`\nAvisarei a todos que você está almoçando.'
        },
        {
          name: '🌎 Ative no Global',
          value: '`' + prefix + 'afk all` ou ' + '`' + prefix + 'afk global`\n' + 'Avisarei em todos os servidores que você está offline.\n \nExemplo: ' + '`' + prefix + 'afk global Estou almoçando, já volto.`'
        }
      )
      .setFooter('O AFK System será desativado quando você mandar uma mensagem.')
    return message.inlineReply(`Se houver algúm bug, use **${prefix}support**`, embed)
  }

  if (['anime', 'animes'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('📺 Anime Place')
      .setDescription('Os comandos de animes da Maya ainda está sendo produzidos.')
      .addField('• Comandos Online: (3)', '`' + prefix + 'ind` Indicações de Animes\n' + '`' + prefix + 'sao` Meu anime favorito\n' + '`' + prefix + 'kimetsu` no yaibaaaaa\n' + '`' + prefix + 'senpai` Meu senpai', true)
      .addField('• Comandos Offline: (1)', `\n:tools: [Lista de Comandos](${linkgithub})`, true)
      .addField('• Mande Gifs para os comandos', '`' + prefix + 'gif`', true)
      .setFooter('Comandos em construção: (62)')
    return message.inlineReply(embed)
  }

  if (['comandos', 'commands'].includes(args[0])) {
    var embed1 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('✅ Comandos livres para todos usarem')
      .setDescription('Comandos presentes nesta lista, é disponivel para qualquer um usa-los')
      .addField('• Comando Online: (21)', '<opicional> [obrigatório]\n \n' + '`' + prefix + 'avatar <@user>` Veja o avatar de alguém\n' + '`' + prefix + 'cal` Calculadora - BETA\n' + '`' + prefix + 'clima [Sua Cidade]` Veja o clima\n' + '`' + prefix + 'covid <Sua Cidade>` Status da Covid-19\n' + '`' + prefix + 'dono/owner` Dono do servidor\n' + '`' + prefix + 'id <@user>` Mostra o ID\n' + '`' + prefix + 'ideia/sugestao [sua ideia em diante]` Coloque suas ideias para votação\n' + '`' + prefix + 'imc [peso] [altura]` Indice de Massa Corporal - BETA\n' + '`' + prefix + 'invites` Convites do Servidor\n' + '`' + prefix + 'j/jokenpo <pedra> <papel> <tesoura>` Jokenpo\n' + '`' + prefix + 'report <@user> [Motivo e blá blá]` Denúncie os meliantes para os adms\n' + '`' + prefix + 'serverinfo` Informações do Servidor\n' + '`' + prefix + 'spotify <@user>` Veja que música alguém está escutando\n' + '`' + prefix + 't/translate <pt/en/fr> [Palavra/Texto]`\n' + '`' + prefix + 'user <@user>` Nome de usuário\n' + '`' + prefix + 'userinfo <@user>` Informações sobre alguém')
      .addField('• Comandos Offline: (1)', `:tools: [Lista de Comandos](${linkgithub})`)
      .setFooter('Comandos em construção: (19)')
    return message.inlineReply(embed1)
  }

  if (['github', 'discordjs'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('👨‍💻 Maya GitHub - BETA COMMAND')
      .setDescription('Aqui você pode pegar os código que eu uso, siiim, eu sou open source e todos podem ajudar e copiar se quiser')
      .addField('• Comandos Online: (4)', '`' + prefix + 'github` GitHub\n' + '`' + prefix + 'commandfile` Pegar comandos em pastas pela Index\n' + '`' + prefix + 'levelsystem` Sistema de Level\n' + '`' + prefix + 'random` resultado aleatório')
      .addField('• Comandos Offline: (0)', `:tools: [Lista de Comandos](${linkgithub})`)
      .setFooter('• Comandos em construção: (421)')
    return message.inlineReply(embed)
  }

  if (['games', 'jogos', 'game', 'jogo'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('🎮 Link para acesso rápido a jogos')
      .setDescription('Aqui você pode pegar os links de jogos e ir direto pra eles sem ter que ficar pesquisando no Google')
      .addField('• Comandos Online: (31)', '`' + prefix + 'amongus`\n' + '`' + prefix + 'brawl`\n' + '`' + prefix + 'brawlhalla`\n' + '`' + prefix + 'brawlstars`\n' + '`' + prefix + 'clash/clashroyale`\n' + '`' + prefix + 'counterstrike/cs`\n' + '`' + prefix + 'ddtank`\n' + '`' + prefix + 'freefire/ff`\n' + '`' + prefix + 'gartic`\n' + '`' + prefix + 'genshinimpact/genshin`\n' + '`' + prefix + 'gta`\n' + '`' + prefix + 'habbo`\n' + '`' + prefix + 'leagueoflegends/lol`\n' + '`' + prefix + 'mario`\n' + '`' + prefix + 'mobilelegends/mbl`\n' + '`' + prefix + 'minecraft/mine`\n' + '`' + prefix + 'paladins`\n' + '`' + prefix + 'rocketleague`\n' + '`' + prefix + 'summoners`\n' + '`' + prefix + 'sumwar`\n' + '`' + prefix + 'transformice/tfm`\n' + '`' + prefix + 'uno`\n' + '`' + prefix + 'valorant`')
      .addField('• Comandos Offline: (0)', `:tools: [Lista de Comandos](${linkgithub})`)
      .setFooter('• Comandos em construção: (15)')
    return message.inlineReply(embed)
  }

  if (['help', 'h', 'ajuda'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('❓ Ué? Help no Help?')
      .setDescription('Bom, vou deixar comandos do help aqui')
      .addField('• Comandos Online: (9)', '`' + prefix + 'help`\n' + '`' + prefix + 'ajuda`\n' + '`' + prefix + 'h`\n' + '`' + prefix + 'thanks`\n' + '`' + prefix + 'afkhelp`\n' + '`' + prefix + 'bjhelp/blackjackhelp`')
      .addField('• Comandos Offline: (0)',)
      .setFooter('• Comandos em construção: (361)')
    return message.inlineReply(embed)
  }

  if (['interacao', 'interação', 'interation'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('💞 Comandos Interativos')
      .setDescription('Interaja com a galera com os melhores comandos e gifs incriveis')
      .addField('• Comandos Online: (48)', 'Não cabe todos os comandos aqui, então você precisa acessar a lista de comandos.')
      .addField('• Comandos Offline: (0)', `:tools: [Lista de Comandos](${linkgithub})`)
      .addField('• Comandos em construção: (25)', 'Teve alguma ideia? `' + prefix + 'ideiamaya`')
      .setFooter('Quase todos os comandos também estão disponiveis em inglês')
    return message.inlineReply(embed)
  }

  if (['level', 'nivel', 'xp', 'levelsystem'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('🌐 Level Global System')
      .setDescription(`O meu sistema de level é global. Se você não sabe o que quer dizer, você pode [ver aqui](${linkgithub}) sobre do que eu estou falando`)
      .addField('• Comandos Online: (3)', '`' + prefix + 'level`\n' + '`' + prefix + 'dailyxp`\n' + '`' + prefix + 'rank xp`')
      .addField('• Comandos Offline: (0)', `:tools: [Lista de Comandos](${linkgithub})`)
      .setFooter('• Comandos em construção: (4)')
    return message.inlineReply(embed)
  }

  if (['maya'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('<:starM:832974891635572787> Meus comandos lindinhos')
      .setDescription(`Aqui tem alguns comandos ligados a mim`)
      .addField('• Comandos Online', '`' + prefix + 'botinfo` Informações sobre mim\n' + '`' + prefix + 'carta <@user> [mensagem de amor]` Mande cartas romanticas\n' + '`' + prefix + 'inv/invite/convidar` Me convida pro servidor\n' + '`' + prefix + 'criarcomando [nome] [resposta]` Crie comando\n' + '`' + prefix + 'deletarcomando [nome]` Delete comandos criados\n' + '`' + prefix + 'dm/pv` Blocked\n' + '`' + prefix + 'gif` Mande gifs para seus gifs entrar nos meus comandos\n' + '`' + prefix + 'ideiamaya` Mande ideais diretamente pro servidor da Maya pra votação\n' + '`' + prefix + 'lockcommands` Trave meus comandos em canais especificos\n' + '`' + prefix + 'unlockcommands` Destrave meus comandos em canais bloqueados\n' + '`' + prefix + 'ping` Pong\n' + '`' + prefix + 'prefix` Informações sobre meu prefixo\n' + '`' + prefix + 'setprefix` Mude meu prefixo\n' + '`' + prefix + 'resetprefix` Reste meu prefixo pra (-)\n' + '`' + prefix + 'sup/support/suporte` Meu suporte\n' + '`' + prefix + 'uptime` Tempo que estou acordada\n')
      .addField('• Comandos Offline', `:tools: [Lista de Comandos](${linkgithub})`)
      .setFooter('• Comandos em construção: (34)')
    return message.inlineReply(embed)
  }

  if (['moderation', 'moderação', 'mod', 'administração', 'adm', 'administration'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('⚙️Espaço para os Adms/Mods')
      .setDescription('Aqui você pode ver alguns dos meus comandos administrativos')
      .addField('• Comandos Online: (63)', 'Não cabe todos os comandos aqui, então você precisa acessar a lista de comandos.')
      .addField('• Comandos Offline: (0)', `:tools: [Lista de Comandos](${linkgithub})`)
      .addField('• Comandos em construção: (11)', 'Teve alguma ideia? `' + prefix + 'ideiamaya`')
    return message.inlineReply(embed)
  }

  if (['economy', 'economia', 'mpoints', 'money', 'shop', 'loja', 'dinheiro'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle(':coin: Economia Global System')
      .setDescription('Ganhe e perca dinheiro, tem coisa melhor?')
      .addField('• Comandos Online: (54)', 'Não cabe todos os comandos aqui, então você precisa acessar a lista de comandos.')
      .addField('• Comandos Offline: (0)', `:tools: [Lista de Comandos](${linkgithub})`)
      .addField('• Comandos em construção: (51)', 'Teve alguma ideia? `' + prefix + 'ideiamaya`')
    return message.inlineReply(embed)
  }

  if (['doar', 'donate'].includes(args[0])) {
    var ajuda = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('💸 Comando Doar')
      .setDescription('Doe MPoints pra galera, é simples e rápido!\n \n*MPoints perdidos não serão recuperados. Cuidado para não ser enganado*')
      .addField('Comando', '`' + prefix + 'doar @user quantia`\n' + '`' + prefix + 'doar @user all/tudo`')
      .setFooter('Apenas o dinheiro na carteira será válido para doações.')
    return message.inlineReply(ajuda)
  }

  if (['perfil', 'profile'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('👩‍💻 Monte o seu Perfil')
      .setDescription('Crie seu perfil aqui comigo :hearts:\nLembrando que alguns comandos, tipo estrela e título, são adquiridos na loja')
      .addField('• Comandos Online: (17)', '`' + prefix + 'marry @user` Se case com alguém\n' + '`' + prefix + 'divorce @user` Se divorcie\n' + '`' + prefix + 'family1/2/3` Chame pessoas pra sua familia\n' + '`' + prefix + 'nofamily1/2/3` Remova pessoas da sua familia\n' + '`' + prefix + 'setstatus` Coloque um status maneiro\n' + '`' + prefix + 'rp` Dê reputação\n' + '`' + prefix + 'setsigno` Escolha seu signo\n' + '`' + prefix + 'settitulo` Escolha seu título\n' + '`' + prefix + 'setniver` Coloque seu aniversário')
      .addField('• Comandos Offline: (0)', `:tools: [Lista de Comandos](${linkgithub})`)
      .setFooter('• Comandos em construção: (11)')
    return message.inlineReply(embed)
  }

  if (['owner', 'rody', 'dono'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle(':gear: Comandos exclusivos do Owner')
      .setDescription('Comandos exclusivos do meu criador')
      .addField('• Comandos Online: (8)', '`' + prefix + 'add <item> [@user]` Adiciona algo\n' + '`' + prefix + 'del <item> [@user]` Deleta algo\n' + '`' + prefix + 'give <item> [@user]` Dá algo\n' + '`' + prefix + 'remove <item> [@user]` Retira algo\n' + '`' + prefix + 'reboot` Me reinicia\n' + '`' + prefix + 'servers 1/2/3...` Lista de servidores\n' + '`' + prefix + 'status [argumento]` Muda meu status')
      .addField('• Comandos Offline: (0)', `:tools: [Lista de Comandos](${linkgithub})`)
      .setFooter('• Comandos em construção: (4)')
    return message.inlineReply(embed)
  }

  if (['quiz', 'trivia'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('✍️ Você é inteligente?')
      .setDescription('Aqui você pode responder perguntas ou não responder né?')
      .addField('• Comandos Online', '`' + prefix + 'quiz`\n' + '`' + prefix + 'quiznaruto`')
      .addField('• Comandos Offline: (0)', `:tools: [Lista de Comandos](${linkgithub})`)
      .setFooter('• Comandos em construção: (54)')
    return message.inlineReply(embed)
  }

  if (['report', 'reporte', 'setreportchannel'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE') // red
      .setTitle(':loudspeaker: Sistema de Report')
      .setDescription('Com este comando, você ativará o meu sistema de report. Isso é bastante útil.')
      .addField('❓ O que é o sistema de report?', 'Com o meu sistema de report, os membros poderão reportar coisas ou outros membros de qualquer canal do servidor, não precisa está indo chamar mod/adm no privado para reportar.')
      .addField('❓ Como funciona?', 'Simples! o membro só precisa escrever `' + prefix + 'report blá blá blá` e o report será encaminhado para o canal definido. As mensagens serão deletadas na hora do envio, tornando o report anônimo e seguro, os únicos que verão o report, serão as pessoas que tem permissão para ver o canal definido.')
      .addField('Comando de Ativação', '`' + prefix + 'setreportchannel #Canal`')
      .addField('Comando de Desativação', '`' + prefix + 'setreportchannel off`')
      .setFooter('A Maya não se responsabiliza pelo conteúdo enviado atráves deste sistema.')
    return message.inlineReply(embed)
  }

  if (['random', 'aleatório', 'aleatorio'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('📜 Comandos Aleatório')
      .setDescription('Comandos aleatório e divertidos, garanto')
      .addField('• Comandos Online: (25)', '`' + prefix + 'advice/conselho` Conselhos\n' + '`' + prefix + 'ascci` Daora\n' + '`' + prefix + 'boom` Booom\n' + '`' + prefix + 'coinflip <cara/coroa>` Cara ou coroa?\n' + '`' + prefix + 'cu` Tem coragem?\n' + '`' + prefix + 'ecchi` Eu não usaria esse comando\n' + '`' + prefix + 'frase` Filosofia\n' + '`' + prefix + 'explosion` Megumiiin\n' + '`' + prefix + 'history` História do pessoal do Discord\n' + '`' + prefix + 'invisivel/invisible` Invisivel\n' + '`' + prefix + 'livia` Gay\n' + '`' + prefix + 'loli` ?\n' + '`' + prefix + 'piada` kkkkkk só piada boa\n' + '`' + prefix + 'servidores` Servidores tops\n' + '`' + prefix + 'trig` aaaaaaaaaaa\n' + '`' + prefix + 'cat` Miaaaw\n' + '`' + prefix + 'puppy` Filhotinhooo\n' + '`' + prefix + 'dado/roll <1...4>` Role dados\n' + '`' + prefix + 'feet` Vai um pézinho?\n' + '`' + prefix + 'nota` Hum.. que nota?\n' + '`' + prefix + 'stonks/notstonks` Stonks')
      .addField('• Comandos Offline: (0)', `:tools: [Lista de Comandos](${linkgithub})`)
      .addField('• Mande a sua ideia de comando aleatório', '`' + prefix + 'ideiamaya`')
      .setFooter('• Comandos em construção: (154)')
    return message.inlineReply(embed)
  }

  if (['personagens'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('<:zeroheart:833378638475821088> Personagens de animes')
      .setDescription('Gifs dos melhores personagens dos melhores animes, mande seus gifs também, vai ajudar muito! `' + prefix + 'gif`')
      .addField('• Comandos Online: (1)', '`' + prefix + 'asuna`\n' + '`' + prefix + 'chika`\n' + '`' + prefix + 'gojo`\n' + '`' + prefix + 'itachi`\n' + '`' + prefix + 'naruto`\n' + '`' + prefix + 'nezuko`\n' + '`' + prefix + 'zenitsu`\n' + '`' + prefix + 'zerotwo/zt`\n')
      .addField('• Comandos Offline: (0)', `:tools: [Lista de Comandos](${linkgithub})`)
      .setFooter('• Comandos em construção: (154)')
    return message.inlineReply(embed)
  }

  if (['react', 'reações'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('💕 É bom mostrar como você se sente')
      .setDescription('Mostre a todos em formato de gif como você se sente, é incrivel')
      .addField('• Comandos Online: (124)', 'Não cabe todos os comandos aqui, então você precisa acessar a lista de comandos.')
      .addField('• Comandos Offline: (0)', `:tools: [Lista de Comandos](${linkgithub})`)
      .addField('• Comandos em construção: (21)', 'Teve alguma ideia? `' + prefix + 'ideiamaya`')
      .addField('• Mande Gifs para os comandos de reações', '`' + prefix + 'gif`')
    return message.inlineReply(embed)
  }

  if (['autorole', 'setautorole'].includes(args[0])) {
    var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('🛠️ Autorole System')
      .setDescription('Antes de começarmos, você sabe o que é Autorole?\n \n❓ **O que é Autorole?**\nAutorole é um sistema automático em que todo membro que entrar no servidor, receberá um cargo de um bot pré definido pela staff do servidor.\n \n❗ **ATENÇÃO**\nPara perfeito funcionamento, o meu cargo DEVE estar ACIMA do cargo definido.')
      .addField('• Comando de ativação', '`' + prefix + 'setautorole @cargo`', true)
      .addField('• Comando de desativação', '`' + prefix + 'setautorole off`', true)
      .addField('• Veja o status', '`' + prefix + 'autorole`')
    return message.inlineReply(embed)
  } else {
    return message.inlineReply('Esta categoria não foi encontrada. use `' + prefix + 'help categoria` e veja as categorias disponiveis.')
  }
}