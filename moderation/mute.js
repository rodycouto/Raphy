const Discord = require("discord.js")
const ms = require("ms")
const db = require('quick.db')

exports.run = async (client, message, args) => {

   let prefix = db.get(`prefix_${message.guild.id}`)
   if (prefix === null) prefix = "-"

   if (!message.member.hasPermission("MANAGE_ROLES")) { return message.inlineReply('<:xis:835943511932665926> Permissão Necessária: Gerenciar Roles (cargos)') }
   if (!message.guild.me.hasPermission("MANAGE_ROLES")) { return message.inlineReply('<:xis:835943511932665926> Eu preciso da permissão "Gerenciar Cargos" para executar este comando.') }

   const nolog = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('<:xis:835943511932665926> Não há Canal Log registrado.')
      .setDescription('`' + prefix + 'setlogchannel #CanalLog`')

   const LogExcluido = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('<:xis:835943511932665926> Parece que o canal log foi excluido.')
      .setDescription('`' + prefix + 'setlogchannel #CanalLog`')

   let logchannel = db.get(`logchannel_${message.guild.id}`)
   if (logchannel === null) { return message.inlineReply(nolog) }
   if (!client.channels.cache.get(logchannel)) { return message.inlineReply(LogExcluido) }

   let role = message.guild.roles.cache.find(role => role.name === 'Muted')
   if (!role) {
      try {
         let muterole = await message.guild.roles.create({ data: { name: 'Muted', permissions: [] } })
         message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
               SEND_MESSAGES: false,
               ADD_REACTIONS: false,
               SEND_TTS_MESSAGES: false,
               MANAGE_MESSAGES: false,
               MANAGE_ROLES: false
            })
         })

         message.guild.channels.cache.filter(c => c.type === 'voice').forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
               SPEAK: false,
               CONNECT: false,
               MANAGE_ROLES: false
            })
         })
      } catch (error) { message.channel.send(error) }
      try {
         message.inlineReply('<a:carregando:836101628083437608> Criando e configurando cargo, espere...').then(msg => msg.delete({ timeout: 8000 })).catch(err => { return }).then(msg => message.inlineReply(`<a:carregando:836101628083437608> Buscando erros...`)).then(msg => msg.delete({ timeout: 4000 })).catch(err => { return }).then(msg => message.inlineReply('<a:Check:836347816036663309> Cargo criado e configurado com sucesso!'))
      } catch (error) { message.channel.send(error) }
   }
   if (!role) return

   if (['info', 'help', 'ajuda'].includes(args[0])) {
      let embeddetail = new Discord.MessageEmbed()
         .setColor("BLUE")
         .setTitle('Comando Mute - Detalhes')
         .addFields(
            {
               name: '🔄 Atualize o Mute System',
               value: '1 - `-role delete @Muted` Delete o cargo.\n2 - `-mute` Ativa a configuração do cargo Mute.'
            },
            {
               name: '🆕 Novos canais de texto/voz',
               value: 'O Discord ainda não permite a auto atualização de roles.\nSempre que você criar um canal de texto/voz, atualize o mute da Naya para perfeito funcionamento.'
            },
            {
               name: '📑 Canal Log',
               value: 'Neste canal, mandarei todos os detalhes do mute. Você pode deixar este canal público ou privado alterando as permissões dele.\nClaro, não vá me privar dele, né?.'
            },
            {
               name: '⬆️ Naya Role',
               value: 'É extremamente importe que o meu cargo, "Naya" esteja acima de todas as outras roles, para que eu possa efetuar meus comandos com maestria.'
            }
         )
         .setTimestamp()

      return message.inlineReply(embeddetail)
   }

   let member = message.mentions.members.first()
   args[0] = member
   if (!args[0]) {
      let nomember = new Discord.MessageEmbed()
         .setColor('#8B0000')
         .setTitle('<:xis:835943511932665926> Por favor, mencione o usuário.')
         .setDescription('`' + prefix + 'mute @user 10s/m/h Razão`')
      return message.inlineReply(nomember)
   }

   if (db.get(`whitelist_${member.id}`)) {// Rodrigo Couto
      let banrody = new Discord.MessageEmbed()
         .setColor('GREEN')
         .setTitle(member.user.username + ' está na whitelist.')
      return message.inlineReply(banrody)
   }

   if (!role.editable) {
      let soberol = new Discord.MessageEmbed()
         .setColor('BLUE')
         .setTitle('Meu cargo não é alto o suficiente.')
         .addFields(
            {
               name: 'Suba meu cargo',
               value: '1 - Configurações do Servidor\n2 - Cargos\n3 - Procure meu cargo "Naya"\n4 - Arraste meu cargo para um dos primeiros\n5 - Salve as alterações e tente novamente.'
            }
         )

      let sobcarg = new Discord.MessageEmbed()
         .setColor('#8B0000')
         .setDescription('<a:carregando:836101628083437608> Um erro foi encontrado. Buscando solução...')

      setTimeout(function () {
         message.inlineReply(soberol)
      }, 6000)
      return message.inlineReply(sobcarg).then(msg => msg.delete({ timeout: 5700 }))
   }

   if (member.id === message.author.id) {
      let muteproprio = new Discord.MessageEmbed()
         .setColor('BLUE')
         .setTitle('Tem certeza que deseja mutar você mesmo?')
         .setFooter('Cancelamento em 30 segundos.')

      return message.inlineReply(muteproprio).then(msg => {
         msg.react('✅').catch(err => { return }) // Check
         msg.react('❌').catch(err => { return }) // X
         setTimeout(function () { msg.delete().catch(err => { return }) }, 30000)

         msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            let troll = new Discord.MessageEmbed()
               .setColor('GREEN')
               .setTitle('Se você tem cargo para usar este comando, você não pode mutar você mesmo 😗')

            if (reaction.emoji.name === '✅') { // home
               msg.delete().catch(err => { return })
               return message.inlineReply(troll)
            }
            if (reaction.emoji.name === '❌') {
               msg.delete().catch(err => { return })
            }
         })
      })
   }

   if (member.id === message.guild.owner.id) { return message.inlineReply('<:xis:835943511932665926> Mutar o dono do servidor não é uma opção.') }
   if (member.id === '837147659898191902') { return message.inlineReply('<:zeroT:832643202439708682> iiiii quer mutar, vê se pode.') }
   if (member.hasPermission('ADMINISTRATOR')) { return message.inlineReply('<:xis:835943511932665926> Este pessoa é um administrador. Eu não posso continuar o mute.') }
   if (member.roles.highest.comparePositionTo(message.member.roles.highest) > -1) { return message.inlineReply(`<:xis:835943511932665926> Você não pode mutar alguém com o mesmo cargo ou um cargo maior que o seu.`) }

   let time = args[1]
   if (!time) {
      let notime = new Discord.MessageEmbed()
         .setColor('#8B0000')
         .setTitle('Siga o padrão do comando!')
         .setDescription('Você não disse o tempo do mute. Deseja o `' + prefix + 'mute info' + '`?')

      let embeddetail = new Discord.MessageEmbed()
         .setColor("BLUE")
         .setTitle('Comando Mute - Detalhes')
         .addFields(
            {
               name: '⌨️ Formato',
               value: '`' + prefix + 'mute @user 5s/m/h Razão`'
            },
            {
               name: '🔄 Atualize o Mute System',
               value: '1 - `' + prefix + 'delrole @Muted` Delete o cargo.\n2 - `' + prefix + 'mute` Ativa a configuração do cargo Mute.'
            },
            {
               name: '🆕 Novos canais de texto/voz',
               value: 'O Discord ainda não permite a auto atualização de roles.\nSempre que você criar um canal de texto/voz, atualize o mute da Naya para perfeito funcionamento.'
            },
            {
               name: '📑 Canal Log',
               value: 'Neste canal, mandarei todos os detalhes do mute. Você pode deixar este canal público ou privado alterando as permissões dele.\nClaro, não vá me privar dele, né?.'
            },
            {
               name: '⬆️ Naya Role',
               value: 'É extremamente importe que o meu cargo, "Naya" esteja acima de todas as outras roles, para que eu possa efetuar meus comandos com maestria.'
            }
         )
         .setTimestamp()

      return message.inlineReply(notime).then(msg => {
         msg.react('✅') // Check
         msg.react('❌') // X

         msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            if (reaction.emoji.name === '✅') { // Sim
               msg.delete().catch(err => { return })
               message.inlineReply(embeddetail)
            }
            if (reaction.emoji.name === '❌') { // Não
               msg.delete().catch(err => { return })
               return message.inlineReply(`Mute cancelado.`)
            }
         })
      })
   } else if (time.length > 3) {
      let limitover = new Discord.MessageEmbed()
         .setColor('#8B0000')
         .setTitle('O tempo não pode passar de 3 digitos.')
      return message.inlineReply(limitover)
   }

   let reason = args.slice(2).join(" ")
   if (!reason) reason = `Razão não especificada por ${message.author.username}.`

   let muteembed = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setAuthor(`Sistema de Mute - ${member.guild.name}`)
      .addFields(
         {
            name: 'Usuário',
            value: member.user,
            inline: true
         },
         {
            name: 'Nome Original',
            value: member.user.tag
         },
         {
            name: 'ID do usuário',
            value: member.user.id
         },
         {
            name: 'Moderador',
            value: message.author,
            inline: true
         },
         {
            name: 'Tempo do Mute',
            value: time,
            inline: true
         },
         {
            name: 'Motivo do Mute',
            value: reason
         },
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

   let unmuteembed = new Discord.MessageEmbed()
      .setAuthor(`Sistema de Mute - ${member.guild.name}`)
      .setColor('#8B0000')
      .addFields(
         {
            name: 'Usuário destumado com sucesso!',
            value: member.user.tag,
            inline: true
         },
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

   if (member.roles.cache.has(role.id)) {
      let unbannable = new Discord.MessageEmbed()
         .setColor('BLUE')
         .setTitle(`Esta pessoa já está mutada. Deseja mutar ${member.user.username} novamente?`)
         .setFooter('Cancelamento em 30 segundos.')

      message.inlineReply(unbannable).then(msg => {
         msg.react('✅').catch(err => { return }) // Check
         msg.react('❌').catch(err => { return }) // X
         setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)

         msg.awaitReactions((reaction, user) => {
            let logchannel = db.get(`logchannel_${member.guild.id}`)
            if (message.author.id !== user.id) return
            if (reaction.emoji.name === '✅') { // home
               msg.delete().catch(err => { return })

               member.roles.remove(role).then(x => x.roles.add(role))
               if (member.voice.channel) { member.voice.kick() }
               setTimeout(function () {
                  member.roles.remove(role)
                  client.channels.cache.get(logchannel).send(unmuteembed)
               }, ms(time))

               let rela = new Discord.MessageEmbed()
                  .setColor('GREEN')
                  .setTitle(`${member.user.username} foi remutado com sucesso.`)
                  .setDescription(`Mais informações em ${client.channels.cache.get(logchannel).name}`)

               client.channels.cache.get(logchannel).send(muteembed).catch(err => { message.inlineReply(err) })
               return message.inlineReply(rela)
            }
            if (reaction.emoji.name === '❌') {
               msg.delete().catch(err => { return })
               return message.inlineReply(`Mute cancelado.`)
            }
         })
      })
   }

   let muteq = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setDescription(`Mutar ${member.user} por ${time}?`)
      .setFooter('Cancelamento em 30 segundos.')

   if (!member.roles.cache.has(role.id)) {
      let logchannel = db.get(`logchannel_${member.guild.id}`)
      await message.inlineReply(muteq).then(msg => {
         msg.react('✅').catch(err => { return }) // Check
         msg.react('❌').catch(err => { return }) // X
         setTimeout(function () { msg.reactions.removeAll().catch(err => { return }) }, 30000)

         msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            if (reaction.emoji.name === '✅') { // Sim
               msg.delete().catch(err => { return })

               member.roles.add(role)
               if (member.voice.channel) { member.voice.kick() }
               setTimeout(function () {
                  member.roles.remove(role) //Ação Desmute
                  client.channels.cache.get(logchannel).send(unmuteembed)
               }, ms(time))

               let rela = new Discord.MessageEmbed()
                  .setColor('GREEN')
                  .setTitle(`${member.user.username} foi mutado com sucesso.`)
                  .setDescription(`Mais informações em ${client.channels.cache.get(logchannel)}`)

               message.inlineReply(rela)
               client.channels.cache.get(logchannel).send(muteembed)
            }
            if (reaction.emoji.name === '❌') {
               msg.delete().catch(err => { return })
               return message.inlineReply(`Mute cancelado.`)
            }
         })
      })
   }
}