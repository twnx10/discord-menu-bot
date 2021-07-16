const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../Settings/config.json')
const { MessageMenuOption,  MessageMenu, MessageActionRow } = require('discord-buttons');


module.exports = {
    name: 'menu',
    aliases: ['rr-menuu'],
    run: async(client, message, args) => {

      const option = new MessageMenuOption()
      .setLabel('Hamburger')
      .setEmoji('🍔')
      .setValue('hamburger')
      .setDescription('Hamburger güzel bir tercih olurdu!')

      const option1 = new MessageMenuOption()
      .setLabel('Boşluk')
      .setEmoji('💯')
      .setValue('bos')
      .setDescription('Rolü Geri Kaldırıp Almak İçin')
      
  const select = new MessageMenu()
      .setID('select1')
      .setPlaceholder('Favori Yemeğini Seç')
      .addOption(option)
      .addOption(option1)


   const Row1 = new MessageActionRow()
   .addComponent(select)   
  
  await message.channel.send('Favori Yemeğini Seç Ve O Yemeğin Rolünü Kap!', { components: [Row1] });
  



  

}}