const db = require("quick.db")

exports.run = async (client, message, args) => {

    if (!db.get(`marry_${message.author.id}`)) { return message.inlineReply("Você não esta em um relacionamento.") }
    if (db.get(`marry_${message.author.id}`) === null) { return message.inlineReply("Você não esta em um relacionamento.") }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }
    
    message.inlineReply(`Você se divorciou! Você não está mais se relacionando com <@${db.get(`marry_${message.author.id}`)}>.`)
    db.delete(`marry_${db.get(`marry_${message.author.id}`)}`)
    db.delete(`marry_${message.author.id}`)
}