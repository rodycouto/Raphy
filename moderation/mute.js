const Discord = require("discord.js")
const ms = require("ms")
const db = require('quick.db')

exports.run = async (client, message, args) => {

   let prefix = db.get(`prefix_${message.guild.id}`)
   if (prefix === null) prefix = "-"

   if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      var adm = new Discord.MessageEmbed()
         .setColor('#FF0000')
         .setTitle('Eu preciso da permissão "Manusear Cargos" para utilizar esta função.')
      return message.inlineReply(adm)
   }

   if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      var adm = new Discord.MessageEmbed()
         .setColor('#FF0000')
         .setTitle('Eu preciso da permissão "Manusear Cargos" para utilizar esta função.')
      return message.inlineReply(adm)
   }

   let perms = message.member.hasPermission("MANAGE_ROLES")
   if (!perms) {
      var permss = new Discord.MessageEmbed()
         .setColor('#FF0000')
         .setTitle('Permissão Necessária: Manusear Roles (cargos)')
      return message.inlineReply(permss)
   }

   var logchannel = db.get(`logchannel_${message.guild.id}`)
   if (logchannel === null) {
      let prefix = db.get(`prefix_${message.guild.id}`)
      if (prefix === null) prefix = "-"

      var nolog = new Discord.MessageEmbed()
         .setColor('#FF0000')
         .setTitle('Não há Canal Log registrado.')
         .setDescription('`' + prefix + 'setlogchannel #CanalLog`')
      return message.inlineReply(nolog)
   }

   if (!client.channels.cache.get(logchannel)) {
      let prefix = db.get(`prefix_${message.guild.id}`)
      if (prefix === null) prefix = "-"

      var nolog = new Discord.MessageEmbed()
         .setColor('#FF0000')
         .setTitle('Parece que o canal log foi excluido.')
         .setDescription('`' + prefix + 'setlogchannel #CanalLog`')
      return message.inlineReply(nolog)
   }

   var role = message.guild.roles.cache.find(role => role.name === 'Muted')
   if (!role) {
      try {

         let muterole = await message.guild.roles.create({
            data: {
               name: 'Muted',
               permissions: []
            }
         })
         message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
               SEND_MESSAGES: false,
               ADD_REACTIONS: false,
               SPEAK: false,
               SEND_TTS_MESSAGES: false,
               MANAGE_MESSAGES: false,
               CONNECT: false,
               MANAGE_ROLES: false
            })
         })
      } catch (error) {
         console.log(error)
      }
      try {

         var criando = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription('<a:loading:834782920287846430> Criando e configurando cargo, espere...')

         var roleembedcreate = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(`<a:loading:834782920287846430> Buscando erros...`)

         var criado = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Cargo criado e configurado com sucesso!')

         message.inlineReply(criando).then(msg => msg.delete({ timeout: 8000 })).catch(err => { return }).then(msg => message.inlineReply(roleembedcreate)).then(msg => msg.delete({ timeout: 4000 })).catch(err => { return }).then(msg => message.inlineReply(criado))
      } catch (error) {
         console.log(error)
      }
   }
   if (!role) return

   var member = message.mentions.members.first()
   args[0] = member
   if (!args[0]) {
      var nomember = new Discord.MessageEmbed()
         .setColor('#FF0000')
         .setTitle('Por favor, mencione o usuário.')
         .setDescription('`' + prefix + 'mute @user 10s/m/h Razão`')
      return message.inlineReply(nomember)
   }

   if (db.get(`whitelist_${member.id}`)) {// Rodrigo Couto
      var banrody = new Discord.MessageEmbed()
         .setColor('GREEN')
         .setTitle(member.user.username + ' está na whitelist.')
      return message.inlineReply(banrody)
   }

   if (!role.editable) {
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
         .setDescription('<a:loading:834782920287846430> Um erro foi encontrado. Buscando solução...')

      setTimeout(function () {
         message.inlineReply(soberol)
      }, 6000)
      return message.inlineReply(sobcarg).then(msg => msg.delete({ timeout: 5700 }))
   }

   if (member.id === message.author.id) {
      var muteproprio = new Discord.MessageEmbed()
         .setColor('BLUE')
         .setTitle('Tem certeza que deseja mutar você mesmo?')

      return message.inlineReply(muteproprio).then(msg => {
         msg.react('✅') // Check
         msg.react('❌') // X

         msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            var troll = new Discord.MessageEmbed()
               .setColor('GREEN')
               .setTitle('Se você tem cargo para usar este comando, você não pode mutar você mesmo. 😗')

            if (reaction.emoji.name === '✅') { // home
               msg.delete().catch(err => { return })
               return message.inlineReply(troll)
            }
            if (reaction.emoji.name === '❌') { // MPEmbed
               msg.delete().catch(err => { return })
            }
         })
      })
   }

   if (member.id === message.guild.owner.id) {
      var dono = new Discord.MessageEmbed()
         .setColor('#FF0000')
         .setTitle('Mutar o dono do servidor não é uma opção.')
      return message.inlineReply(dono)
   }

   if (member.hasPermission('ADMINISTRATOR')) {
      var unbannable = new Discord.MessageEmbed()
         .setColor('#FF0000')
         .setTitle('Esta pessoa tem permissões importantes ou tem um cargo maior que o meu.')
      return message.inlineReply(unbannable)
   }

   var time = args[1]
   if (!time) {
      var notime = new Discord.MessageEmbed()
         .setColor('#FF0000')
         .setTitle('Siga o padrão do comando!')
         .setDescription('Você não disse o tempo do mute. Deseja o `' + prefix + 'muteinfo' + '`?')

      var embeddetail = new Discord.MessageEmbed()
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
               value: 'O Discord ainda não permite a auto atualização de roles.\nSempre que você criar um canal de texto/voz, atualize o mute da Maya para perfeito funcionamento.'
            },
            {
               name: '📑 Canal Log',
               value: 'Neste canal, mandarei todos os detalhes do mute. Você pode deixar este canal público ou privado alterando as permissões dele.\nClaro, não vá me privar dele, né?.'
            },
            {
               name: '⬆️ Maya Role',
               value: 'É extremamente importe que o meu cargo, "Maya" esteja acima de todas as outras roles, para que eu possa efetuar meus comandos com maestria.'
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
            }
         })
      })
   } else if (time.length > 4) {
      var limitover = new Discord.MessageEmbed()
         .setColor('#FF0000')
         .setTitle('O tempo não pode passar de 4 digitos.')
      return message.inlineReply(limitover)
   }

   let reason = args.slice(2).join(" ")
   if (!reason)
      reason = `Razão não especificada por ${message.author.username}.`

   var muteembed = new Discord.MessageEmbed()
      .setAuthor(`Sistema de Mute - ${member.guild.name}`)
      .setColor('#8B0000')
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

   var unmuteembed = new Discord.MessageEmbed()
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
      var unbannable = new Discord.MessageEmbed()
         .setColor('BLUE')
         .setTitle(`Esta pessoa já está mutada. Deseja mutar ${member.user.username} novamente?`)

      message.inlineReply(unbannable).then(msg => {
         msg.react('✅') // Check
         msg.react('❌') // X

         msg.awaitReactions((reaction, user) => {
            var logchannel = db.get(`logchannel_${member.guild.id}`)
            if (message.author.id !== user.id) return
            if (reaction.emoji.name === '✅') { // home
               msg.delete().catch(err => { return })

               member.roles.remove(role).then(x => x.roles.add(role))

               setTimeout(function () {
                  member.roles.remove(role) //Ação Desmute
                  client.channels.cache.get(logchannel).send(unmuteembed)
               }, ms(time))

               var rela = new Discord.MessageEmbed()
                  .setColor('GREEN')
                  .setTitle(`${member.user.username} foi remutado com sucesso.`)
                  .setDescription(`Mais informações em ${client.channels.cache.get(logchannel).name}`)

               setTimeout(function () {
                  client.channels.cache.get(logchannel).send(muteembed).catch(err => {
                     message.inlineReply(err)
                  })
               }, 3500)
               return message.inlineReply(rela)
            }
            if (reaction.emoji.name === '❌') { // MPEmbed
               msg.delete().catch(err => { return })
            }
         })
      })
   }

   var muteq = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setDescription(`Mutar ${member.user} por ${time}?`)

   if (!member.roles.cache.has(role.id)) {
      var logchannel = db.get(`logchannel_${member.guild.id}`)
      await message.inlineReply(muteq).then(msg => {
         msg.react('✅') // Check
         msg.react('❌') // X

         msg.awaitReactions((reaction, user) => {
            if (message.author.id !== user.id) return

            if (reaction.emoji.name === '✅') { // Sim
               msg.delete().catch(err => { return })

               member.roles.add(role) // Ação Mute
               setTimeout(function () {
                  member.roles.remove(role) //Ação Desmute
                  client.channels.cache.get(logchannel).send(unmuteembed)
               }, ms(time))

               var rela = new Discord.MessageEmbed()
                  .setColor('GREEN')
                  .setTitle(`${member.user.username} foi mutado com sucesso.`)
                  .setDescription(`Mais informações em ${client.channels.cache.get(logchannel)}`)

               message.inlineReply(rela)
               client.channels.cache.get(logchannel).send(muteembed)
            }
            if (reaction.emoji.name === '❌') { // MPEmbed
               msg.delete().catch(err => { return })
            }
         })
      })
   }
}