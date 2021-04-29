const axios = require('axios')
const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "-"

    const baseUrl = "https://corona.lmao.ninja/v2"
    let url, response, corona

    try {
        url = args[0] ? `${baseUrl}/countries/${args[0]}` : `${baseUrl}/all`
        response = await axios.get(url)
        corona = response.data
    } catch (error) {

        const noerl = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setDescription(`O argumento ***${args[0]}*** não existe ou os dados não foram publicados pela OMS (Organização Mundial da Saúde)`)
            .addFields(
                {
                    name: 'Comando',
                    value: '`' + prefix + 'covid BR/AR/USA/FR...`'
                }
            )
        return message.inlineReply('<a:carregando:836101628083437608> Loading...').then(msg => msg.delete({ timeout: 4000 })).then(msg => message.inlineReply(noerl))
    }

    const embed = new Discord.MessageEmbed()
        .setTitle(args[0] ? `${args[0].toUpperCase()} Status` : 'Dados Mundiais da COVID-19')
        .setColor('BLUE')
        .setThumbnail(args[0] ? corona.countryInfo.flag : 'https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif')
        .addFields(
            {
                name: '⛑️ Casos',
                value: corona.cases.toLocaleString()
            },
            {
                name: '😥 Mortes',
                value: corona.deaths.toLocaleString()
            },
            {
                name: '🥳 Recuperados',
                value: corona.recovered.toLocaleString()
            },
            {
                name: '✅ Ativos',
                value: corona.active.toLocaleString()
            },
            {
                name: '🚨 Casos Críticos',
                value: corona.critical.toLocaleString()
            },
            {
                name: ':heart: Recuperados Hoje',
                value: corona.todayRecovered.toLocaleString().replace("-", "")
            },
            {
                name: ':broken_heart: Mortes Hoje',
                value: corona.todayDeaths.toLocaleString()
            })
        .setFooter(`${prefix}covid br`)

    await message.inlineReply(embed)
}