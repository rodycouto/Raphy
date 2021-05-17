const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    const LinkDoServidor = 'https://discord.gg/YpFWgJuuUV'
    const LinkMercadoPago = 'https://mpago.la/2jYiNDg'
    const ImagePix = 'https://imgur.com/0Xsb1n8'

    const EmbedPix = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('<:pix:837500432095248436> PIX Raphy')
        .setDescription(`Aqui você pode fazer PIX pra mim facilmente.\nSe precisar de qualquer coisa, entre no [meu servidor.](${LinkDoServidor})`)
        .addField('<:ok:832667759796158504> Meios de PIX', `📨 Email: raphydiscordbot@outlook.com\n<a:MoneyWings:834899137991540797> Pagamento Direto: [R$1,00 Mercado Pago](${LinkMercadoPago})\n📱 Via [QR Code](${ImagePix})`)
        .setFooter('QUALQUER problema, entre em contato no servidor.')

    return message.channel.send(EmbedPix)
}