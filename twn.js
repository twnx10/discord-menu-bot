const Discord = require('discord.js');
const client = new Discord.Client();
require('discord-buttons')(client)
const fs = require('fs');
const db = require('quick.db');
const kdb = new db.table('kullanici');
const moment = require('moment');
const config = require('./Settings/config.json')
require('moment-duration-format')
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();

fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})


client.on('message', message => {
    const prefix = config.Prefix; // prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})


client.on('ready', () => {
    client.user.setPresence({ activity: { name:  config.Activity }, status: 'idle' })
    client.channels.cache.get(config.BotVoiceChannel).join()})

client.on('clickMenu', async menu => {

  const Member = menu.clicker.member

  if(menu.values[0] == 'hamburger') {
    if(!Member.roles.cache.has('865589483130454026')) {
      await Member.roles.add('865589483130454026')
      return menu.reply.send('Hamburger Rolü Verildi', true)
    } else if(Member.roles.cache.has('865589483130454026')) {
      await Member.roles.remove('865589483130454026')
      return menu.reply.send("Hamburger Rolü Alındı", true)
    }
  }

  if(menu.values[0] == 'bos') {
return menu.reply.defer()
  }



})


client.login(config.token).then(console.log("[Twn]")).catch(e => console.error(e));
