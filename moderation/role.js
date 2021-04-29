const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) { return message.channel.send(`<:xis:835943511932665926> Permissão Requerida: Administrador`) }
  if (!message.guild.me.hasPermission("MANAGE_ROLES")) { return message.inlineReply('Eu preciso da permissão "Gerenciar Cargos" para utilizar esta função.') }

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "-"

  const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('🛠️ Gerenciamento de Cargos')
    .setDescription('Você pode gerenciar cargos rapidamente atráves de comandos simples e rapidos!')
    .addField('• Todos os comandos disponiveis', '`' + prefix + 'help role`')

  let FormatoCreate = '<:xis:835943511932665926> Siga o formato correto! `' + prefix + 'role create Nome Do Cargo`'
  let FormatoDelete = '<:xis:835943511932665926> Siga o formato correto! `' + prefix + 'role delete @cargo`'

  if (!args[0]) { return message.inlineReply(embed) }

  if (['criar', 'crie', 'create'].includes(args[0])) {

    let RoleName = args.slice(1).join(" ")
    if (!RoleName) { return message.channel.send(FormatoCreate) }

    const confirm = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Confirmação')
      .setDescription(`<a:attention:836101248183959562> Você confirma a criação do cargo: **${args.slice(1).join(" ")}** ?`)
      .setFooter('Cancelamento em 30 segundos.')

    const confirmcancel = new Discord.MessageEmbed()
      .setDescription('<:xis:835943511932665926> Confirmação cancelado.')

    return message.inlineReply(confirm).then(msg => {
      msg.react('✅').catch(err => { return }) // Check
      msg.react('❌').catch(err => { return }) // X
      setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)
      setTimeout(function () { msg.edit(confirmcancel).catch(err => { return }) }, 30000)

      msg.awaitReactions((reaction, user) => {
        if (message.author.id !== user.id) return

        if (reaction.emoji.name === '✅') { // Sim
          msg.delete().catch(err => { return })

          setTimeout(function () {
            message.guild.roles.create({ data: { name: RoleName, color: "#99AAB5" } }).catch(err => { return message.channel.send(err) })
            message.channel.send("<a:Check:836347816036663309> Cargo criado com sucesso!")
          }, 2100)
          return message.channel.send("<a:carregando:836101628083437608> Criando cargo...").then(msg => msg.delete({ timeout: 2000 }))
        }

        if (reaction.emoji.name === '❌') { // Não
          msg.delete().catch(err => { return })
          return message.inlineReply('<:xis:835943511932665926> Comando cancelado.')
        }
      })
    })
  } else if (['delete', 'excluir', 'deletar'].includes(args[0])) {

    let RoleToDelete = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name == args[1])
    if (!RoleToDelete) { return message.channel.send(formato) }

    if (RoleToDelete.comparePositionTo(message.member.roles.highest) > 0) {
      return message.inlineReply(`<:xis:835943511932665926> Você não tem permissão para gerenciar o cargo ${RoleToDelete}.`)
    }

    if (!RoleToDelete.editable) {
      const soberol = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Meu cargo não é alto o suficiente.')
        .addFields(
          {
            name: 'Suba meu cargo',
            value: '1 - Configurações do Servidor\n2 - Cargos\n3 - Procure meu cargo "Naya"\n4 - Arraste meu cargo para um dos primeiros\n5 - Salve as alterações e tente novamente.'
          }
        )

      const sobcarg = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setDescription('<a:carregando:836101628083437608> Um erro foi encontrado. Buscando solução...')

      setTimeout(function () {
        message.inlineReply(soberol)
      }, 6000)
      return message.inlineReply(sobcarg).then(msg => msg.delete({ timeout: 5700 }).catch(err => { return }))
    }

    const confirm1 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Confirmação')
      .setDescription(`<a:attention:836101248183959562> Você confirma a exclusão do cargo: **${args.slice(1).join(" ")}** ?`)
      .setFooter('Cancelamento em 30 segundos.')

    return message.inlineReply(confirm1).then(msg => {
      msg.react('✅').catch(err => { return }) // Check
      msg.react('❌').catch(err => { return }) // X
      setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)

      msg.awaitReactions((reaction, user) => {
        if (message.author.id !== user.id) return

        if (reaction.emoji.name === '✅') { // Sim
          msg.delete().catch(err => { return })

          setTimeout(function () {
            RoleToDelete.delete()
            message.channel.send("<a:Check:836347816036663309> Cargo deletado com sucesso!")
          }, 2100)
          return message.channel.send("<a:carregando:836101628083437608> Deletando cargo...").then(msg => msg.delete({ timeout: 2000 }))
        }

        if (reaction.emoji.name === '❌') { // Não
          msg.delete().catch(err => { return })
          return message.inlineReply('<:xis:835943511932665926> Comando cancelado.')
        }
      })
    })
  } else if (('edit', 'mudar', 'editar').includes(args[0])) {

    let RoleToEdit = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name == args[1])
    let FormatoName = "Siga o formato correto: `" + prefix + 'role edit name/color @role Novo Nome/Cor`'
    let FormatoColor = "Siga o formato correto: `" + prefix + 'role edit color @role #C0D1G0 (Use "default" para a cor padrão) `'
    if (!args[1]) { return message.inlineReply('Mude o nome e a cor do cargo com este comando. Use `' + prefix + 'help doar`') }

    if (RoleToEdit.comparePositionTo(message.member.roles.highest) > -1) {
      return message.inlineReply(`<:xis:835943511932665926> Você não tem permissão para gerenciar o cargo ${RoleToEdit}.`)
    }

    if (!RoleToEdit.editable) {
      const soberol = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Meu cargo não é alto o suficiente.')
        .addFields(
          {
            name: 'Suba meu cargo',
            value: '1 - Configurações do Servidor\n2 - Cargos\n3 - Procure meu cargo "Naya"\n4 - Arraste meu cargo para um dos primeiros\n5 - Salve as alterações e tente novamente.'
          }
        )

      const sobcarg = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setDescription('<a:carregando:836101628083437608> Um erro foi encontrado. Buscando solução...')

      setTimeout(function () {
        message.inlineReply(soberol)
      }, 6000)
      return message.inlineReply(sobcarg).then(msg => msg.delete({ timeout: 5700 }))
    }

    if (!RoleToEdit) return message.inlineReply(FormatoName)
    args[2] = RoleToEdit
    if (!args[2]) return message.inlineReply(FormatoName)

    if (['name', 'nome'].includes(args[1])) {

      let NovoNome = args.slice(3).join(" ")
      if (!NovoNome) { return message.inlineReply(FormatoName) }
      if (NovoNome.length > 20) { return message.inlineReply('<:xis:835943511932665926> O novo nome não pode ultrapassar mais de 20 caracteres.') }

      if (RoleToEdit.comparePositionTo(message.member.roles.highest) > -1) {
        return message.inlineReply(`<:xis:835943511932665926> Você não tem permissão para gerenciar o cargo ${RoleToEdit}.`)
      }

      if (!RoleToEdit.editable) {
        const soberol = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setTitle('Meu cargo não é alto o suficiente.')
          .addFields(
            {
              name: 'Suba meu cargo',
              value: '1 - Configurações do Servidor\n2 - Cargos\n3 - Procure meu cargo "Naya"\n4 - Arraste meu cargo para um dos primeiros\n5 - Salve as alterações e tente novamente.'
            }
          )
        const sobcarg = new Discord.MessageEmbed()
          .setColor('#8B0000')
          .setDescription('<a:carregando:836101628083437608> Um erro foi encontrado. Buscando solução...')

        setTimeout(function () {
          message.inlineReply(soberol)
        }, 6000)
        return message.inlineReply(sobcarg).then(msg => msg.delete({ timeout: 5700 }).catch(err => { return }))
      }

      const confirm1 = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Confirmação')
        .setDescription(`<a:attention:836101248183959562> Você confirma a alteração do nome do cargo ${RoleToEdit} para **${NovoNome}** ?`)
        .setFooter('Cancelamento em 30 segundos.')

      return message.inlineReply(confirm1).then(msg => {
        msg.react('✅').catch(err => { return })// Check
        msg.react('❌').catch(err => { return }) // X
        setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)

        msg.awaitReactions((reaction, user) => {
          if (message.author.id !== user.id) return

          if (reaction.emoji.name === '✅') { // Sim
            msg.delete().catch(err => { return })

            setTimeout(function () {
              RoleToEdit.edit({ name: NovoNome }).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
              message.inlineReply(`<a:Check:836347816036663309> O nome do cargo foi atualizado com sucesso!`)
            }, 2100)
            return message.channel.send("<a:carregando:836101628083437608> Editando nome do cargo...").then(msg => msg.delete({ timeout: 2000 }))
          }

          if (reaction.emoji.name === '❌') { // Não
            msg.delete().catch(err => { return })
            return message.inlineReply('<:xis:835943511932665926> Comando cancelado.')
          }
        })
      })
    } else if (['color', 'cor'].includes(args[1])) {
      let link = 'https://celke.com.br/artigo/tabela-de-cores-html-nome-hexadecimal-rgb'
      let NovaCor = args.slice(3).join(" ").toUpperCase()
      if (NovaCor === "default") { NovaCor === "#99AAB5" }
      if (!NovaCor) { return message.inlineReply(`Este comando necessita de um código HEX. É um código composto por letras e número, por exemplo: #8B0000 (Vermelho).\nVeja a [Tabela HEX](${link}) com centenas de cores.\n${FormatoColor}`) }
      if (NovaCor > 16777215) { return message.inlineReply('<:xis:835943511932665926> Esse código HEX é muito grande! O limite é de 0 a 16777215.') }
      if (NovaCor <= 0) { return message.inlineReply('<:xis:835943511932665926> Esse código HEX é muito curto! O limite é de 0 a 16777215.') }

      if (RoleToEdit.comparePositionTo(message.member.roles.highest) > -1) {
        return message.inlineReply(`<:xis:835943511932665926> Você não tem permissão para gerenciar o cargo ${RoleToEdit}.`)
      }

      if (!RoleToEdit.editable) {
        const soberol = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setTitle('Meu cargo não é alto o suficiente.')
          .addFields(
            {
              name: 'Suba meu cargo',
              value: '1 - Configurações do Servidor\n2 - Cargos\n3 - Procure meu cargo "Naya"\n4 - Arraste meu cargo para um dos primeiros\n5 - Salve as alterações e tente novamente.'
            }
          )
        const sobcarg = new Discord.MessageEmbed()
          .setColor('#8B0000')
          .setDescription('<a:carregando:836101628083437608> Um erro foi encontrado. Buscando solução...')

        setTimeout(function () {
          message.inlineReply(soberol)
        }, 6000)
        return message.inlineReply(sobcarg).then(msg => msg.delete({ timeout: 5700 }).catch(err => { return }))
      }

      const confirm1 = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Confirmação')
        .setDescription(`<a:attention:836101248183959562> Você confirma a alteração do nome do cargo ${RoleToEdit} para **${NovaCor}** ?`)
        .setFooter('Cancelamento em 30 segundos.')

      return message.inlineReply(confirm1).then(msg => {
        msg.react('✅').catch(err => { return }) // Check
        msg.react('❌').catch(err => { return }) // X
        setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)

        msg.awaitReactions((reaction, user) => {
          if (message.author.id !== user.id) return

          if (reaction.emoji.name === '✅') { // Sim
            msg.delete().catch(err => { return })
            setTimeout(function () {
              RoleToEdit.setColor(NovaCor).catch(err => { return message.channel.send(`**ERRO:** ${err}`) })
              message.inlineReply(`<a:Check:836347816036663309> A cor do cargo foi atualizada com sucesso!`)
            }, 2100)
            return message.channel.send("<a:carregando:836101628083437608> Editando cor do cargo...").then(msg => msg.delete({ timeout: 2000 }))
          }

          if (reaction.emoji.name === '❌') { // Não
            msg.delete().catch(err => { return })
            return message.inlineReply('<:xis:835943511932665926> Comando cancelado.')
          }
        })
      })
    } else {
      return message.inlineReply("<:xis:835943511932665926> Comando incorreto, por favor, use `" + prefix + 'help role`')
    }

  } else if (["count", "membros", "registrados"].includes(args[0])) {
    let role = message.mentions.roles.first()
    if (!role) { return message.inlineReply('Hey! Você não me disse qual é o cargo! `' + prefix + 'role membros @cargo`') }

    let MembrosComARole = message.guild.roles.cache.get(role.id).members
    const RoleMembrosEmbed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setDescription(`**Cargo:** ${role}\n**${MembrosComARole.size} Membros** possui este cargo.`)
    return message.channel.send(RoleMembrosEmbed)

  } else if (["id"].includes(args[0])) {
    let role = message.mentions.roles.first().id
    if (!role) { return message.inlineReply('Hey! Você não me disse qual é o cargo! `' + prefix + 'role id @cargo`') }

    const roleid = new Discord.MessageEmbed()
      .setColor('#9D24DD')
      .setDescription(`<@&${role}>\n:id: \`${role}\``)

    return message.channel.send(roleid)
  } else { return message.inlineReply(`Não achei nenhum comando com o nome **${args.join(" ")}**. Use ` + '`' + prefix + 'help role`') }
}