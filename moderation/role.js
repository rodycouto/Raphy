const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) { return message.channel.send(`<:xis:835943511932665926> Permissão Requerida: Administrador`) }
  if (!message.guild.me.hasPermission("MANAGE_ROLES")) { return message.inlineReply('Eu preciso da permissão "Gerenciar Cargos" para utilizar esta função.') }

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  var embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('🛠️ Gerenciamento de Cargos')
    .setDescription('Crie e delete cargos no servidor de maneira rápida e prática.')
    .addField('Crie um cargo', '`' + prefix + 'role create Nome do Cargo`')
    .addField('Delete um cargo', '`' + prefix + 'role delete Nome do Cargo`')
    .addField('Veja informações', '`' + prefix + 'role info @cargo`')

  var formato = '<:xis:835943511932665926> Siga o formato correto! `' + prefix + 'role create/delete Nome Do Cargo`'

  if (!args[0]) { return message.inlineReply(embed) }

  let role = message.mentions.roles.first()

  if (['info', 'informações'].includes(args[0])) {

    return message.inlineReply('Sessão em reforma.')
    
    const roleName = message.guild.roles.cache.find(r => (r.name === args.toString()) || (r.id === args.toString())) || `<@&${role.id}>`
    const perms = new Discord.Permissions(roleName.permissions.bitfield).toArray()
    let NumMembersRole = message.guild.roles.cache.get(role.id).members

    if (!roleName) {return message.inlineReply('`' + prefix + 'role info @role`')}

    const embed = new Discord.MessageEmbed()
      .setColor(roleName.color)
      .setTitle(roleName.name)
      .addFields(
        {
          name: '🆔 Role ID',
          value: roleName.id,
          inline: true
        },
        {
          name: '📝 Nome da Role',
          value: roleName.name,
          inline: true
        },
        {
          name: '❓ Mencionavel?',
          value: roleName.mentionable ? 'Sim' : 'Não',
          inline: true
        },
        {
          name: 'Permissões do cargos',
          value: perms.join(', ')
        }
      )
    if (NumMembersRole) { embed.addField('ℹ️ Membros com o Cargo', `${NumMembersRole.size} Membros`) }

    return message.channel.send(embed)
  } else if (['criar', 'crie', 'create'].includes(args[0])) {

    let RoleName = args.slice(1).join(" ")
    if (!RoleName) { return message.channel.send(formato) }

    var confirm = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Confirmação')
      .setDescription(`Você confirma a criação do cargo: **${args.slice(1).join(" ")}** ?`)

    return message.inlineReply(confirm).then(msg => {
      msg.react('✅') // Check
      msg.react('❌') // X

      msg.awaitReactions((reaction, user) => {
        if (message.author.id !== user.id) return

        if (reaction.emoji.name === '✅') { // Sim
          msg.delete().catch(err => { return })

          message.guild.roles.create({ data: { name: RoleName, color: "#B1B1B1" } })

          return message.channel.send("<a:carregando:835294939096940575> Criando cargo...").then(msg => msg.delete({ timeout: 2000 })).then(msg => msg.channel.send("✅ Cargo criado com sucesso!"))
        }

        if (reaction.emoji.name === '❌') { // Não
          msg.delete().catch(err => { return })
          return message.inlineReply('<:xis:835943511932665926> Comando cancelado.')
        }
      })
    })
  } else if (['delete', 'excluir', 'deletar'].includes(args[0])) {

    let RoleToDelete = message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name == args[1])
    if (!RoleToDelete) { return message.channel.send(formato) }

    if (!RoleToDelete.editable) {
      var soberol = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Meu cargo não é alto o suficiente.')
        .addFields(
          {
            name: 'Suba meu cargo',
            value: '1 - Configurações do Servidor\n2 - Cargos\n3 - Procure meu cargo "Maya"\n4 - Arraste meu cargo para um dos primeiros\n5 - Salve as alterações e tente novamente.'
          }
        )

      var sobcarg = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setDescription('<a:carregando:835294939096940575> Um erro foi encontrado. Buscando solução...')

      setTimeout(function () {
        message.inlineReply(soberol)
      }, 6000)
      return message.inlineReply(sobcarg).then(msg => msg.delete({ timeout: 5700 }))
    }

    var confirm1 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Confirmação')
      .setDescription(`Você confirma a exclusão do cargo: **${args.slice(1).join(" ")}** ?`)

    return message.inlineReply(confirm1).then(msg => {
      msg.react('✅') // Check
      msg.react('❌') // X

      msg.awaitReactions((reaction, user) => {
        if (message.author.id !== user.id) return

        if (reaction.emoji.name === '✅') { // Sim
          msg.delete().catch(err => { return })

          RoleToDelete.delete()

          return message.channel.send("<a:carregando:835294939096940575> Deletando cargo...").then(msg => msg.delete({ timeout: 2000 })).then(msg => msg.channel.send("✅ Cargo deletado com sucesso!"))
        }

        if (reaction.emoji.name === '❌') { // Não
          msg.delete().catch(err => { return })
          return message.inlineReply('<:xis:835943511932665926> Comando cancelado.')
        }
      })
    })
  } else {
    return message.inlineReply(`Não achei nenhum comando com o nome ${args.join(" ")}. Use ` + '`' + prefix + 'help role`')
  }
}