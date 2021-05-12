const Discord = require("discord.js")
const weather = require("weather-js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) { prefix = "-" }

  const noargs = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('⛅ Estação de Tempo da Raphy')
    .setDescription('• Aqui você pode ver o clima de qualquer lugar do mundo, explore o clima dos paises e cidades.')
    .addField("Comando", '`' + prefix + 'clima SP/RJ/MG ou o nome da Cidade/Estado`')
    .addField("Exemplo", '`' + prefix + 'clima SP ou São Paulo`')

  if (!args[0]) { return message.inlineReply(noargs) }

  let city = args.join(" ")
  let degreetype = "C" // Mude para Fahrenheit F

  await weather.find({ search: city, degreeType: degreetype }, function (err, result) {

    const noresult = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('Parece que ocorreu um erro no meu sistema de busca')
      .setDescription('`Nenhuma cidade/estado foi encontrado`')

    if (!city) { return message.inlineReply('<:xis:835943511932665926> Formato incorreto! | `' + prefix + 'clima SP/RJ/MG ou o nome da Cidade/Estado`') }
    if (err || result === undefined || result.length === 0) { return message.inlineReply('<:xis:835943511932665926> Nenhuma cidade/estado foi encontrado, verifique a ortografia.') }

    let current = result[0].current
    let location = result[0].location

    const embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setAuthor(current.observationpoint)
      .setDescription(`> ${current.skytext}`)
      .setThumbnail(current.imageUrl)
      .setTimestamp()

    embed.addField("Latitude", location.lat, true)
      .addField("Longitude", location.long, true)
      .addField("Temperatura Térmica", `${current.feelslike}° Graus`, true)
      .addField("Escala de Medição", location.degreetype, true)
      .addField("Vento", current.winddisplay, true)
      .addField("Humidade", `${current.humidity}%`, true)
      .addField("Fuzo", `GMT ${location.timezone}`, true)
      .addField("Temperatura", `${current.temperature}° Graus`, true)
      .addField("Observação TimeTemp", current.observationtime, true)
      .setFooter('Este comando não é uma previsão do tempo.')

    return message.inlineReply(embed)
  })
}
