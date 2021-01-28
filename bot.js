const Discord = require("discord.js");
const client = new Discord.Client(); //
const ayarlar = require("./ayarlar.json"); //
const chalk = require("chalk"); //
const moment = require("moment"); //
var Jimp = require("jimp"); //
const { Client, Util } = require("discord.js"); //
const fs = require("fs"); //
const db = require("quick.db");
const express = require("express"); //
require("./util/eventLoader.js")(client); //
const path = require("path"); //
const snekfetch = require("snekfetch"); //
process.on("unhandledRejection", (reason, promise) => {
});
//




var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

//-------------------------DB-------------------------------//


//-----------------------GİRENE-ROL-VERME----------------------\\     STG
client.on("guildMemberAdd", member => {
  let rol = db.fetch(`autoRole_${member.guild.id}`);
  if (!rol) return;
  let kanal = db.fetch(`autoRoleChannel_${member.guild.id}`);
  if (!kanal) return;
  member.roles.add(member.guild.roles.cache.get(rol));
  let embed = new Discord.MessageEmbed()
    .setDescription(
      "**<@!" +
        member.user.id +
        "> Sunucuya Hoşgeldin \n\n Seninle Birlikte " +
        member.guild.memberCount +
        " Kişiyiz \n\n Başarıyla <@&" +
        rol +
        "> Rolü verildi **"
    )
   .setColor(ayarlar.renk)
    .setFooter(
      member.guild.name,
      ""
    )
    .setTimestamp();
  member.guild.channels.cache.get(kanal).send(embed);
});

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

//-----------------------by by log----------------------\\     STG



client.on("guildMemberAdd", member => {

  require("moment-duration-format") 
  let kanals = db.fetch(`GELEN_${member.guild.id}`);
  if (!kanals) return;   
  let yetkiliroleID = db.fetch(`yetkili.${member.guild.id}`);
   let yetkili = member.guild.roles.cache.get(yetkiliroleID);
  var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
                '0': `<a:0_:795440137235333150>`,
          '1': `<a:1_:795440039248003072>`,
          '2': `<a:2_:795440456309669892>`,
          '3': `<a:3_:795440403045941258>`,
          '4': `<a:4_:795440192399343667>`,
          '5': `<a:5_:795440300922241064>`,
          '6': `<a:6_:795440349110861824>`,
          '7': `<a:7_:795440243822166056>`,
          '8': `<a:8_:795440571438333952>`,
          '9': `<a:9_:795440513423376384>`}[d];})}
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil.'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor.'
    moment.locale("tr");
  const embed = new Discord.MessageEmbed()
  .setAuthor(member.guild.name, member.guild.iconURL({dynamic:true}))
  .setDescription(`** <@`+member.id+`> Sunucumuza Katıldı! 
  
  Seninle Birlikte `+üyesayısı+` Kişiye Ulaştık!
  
  Sunucunun Kuralları Okumayı Unutma.

   `+ kontrol +`
   
  Hesabın \``+gecen+`\` Önce Oluşturulmuş**`)
.setColor(ayarlar.renk)
 member.guild.channels.cache.get(kanals).send(embed);
});



client.on("guildMemberRemove", member => {

  require("moment-duration-format") 
  let kanals = db.fetch(`hgbb_${member.guild.id}`);
  if (!kanals) return;   
  let yetkiliroleID = db.fetch(`yetkili.${member.guild.id}`);
   let yetkili = member.guild.roles.cache.get(yetkiliroleID);
  var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
                '0': `<a:0_:795440137235333150>`,
          '1': `<a:1_:795440039248003072>`,
          '2': `<a:2_:795440456309669892>`,
          '3': `<a:3_:795440403045941258>`,
          '4': `<a:4_:795440192399343667>`,
          '5': `<a:5_:795440300922241064>`,
          '6': `<a:6_:795440349110861824>`,
          '7': `<a:7_:795440243822166056>`,
          '8': `<a:8_:795440571438333952>`,
          '9': `<a:9_:795440513423376384>`}[d];})}
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil.'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor.'
    moment.locale("tr");
  const embed = new Discord.MessageEmbed()
    .setTitle("<a:red:794592938172612619> Sunucudan Biri Çıktı")
  .setDescription(`**
   <@`+member.id+`> \``+member.id+`\`Sunucudan Ayrıldı
   
   Sunucu Artık `+üyesayısı+` Kişi**`)
.setColor(ayarlar.renk)
 member.guild.channels.cache.get(kanals).send(embed);
});



client.on("guildMemberAdd", member => {

  require("moment-duration-format") 
      const kanal = member.guild.channels.cache.find(r => r.id === "KANAL ID");
  if (!kanal) return;   
  var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
                '0': `<a:0_:795440137235333150>`,
          '1': `<a:1_:795440039248003072>`,
          '2': `<a:2_:795440456309669892>`,
          '3': `<a:3_:795440403045941258>`,
          '4': `<a:4_:795440192399343667>`,
          '5': `<a:5_:795440300922241064>`,
          '6': `<a:6_:795440349110861824>`,
          '7': `<a:7_:795440243822166056>`,
          '8': `<a:8_:795440571438333952>`,
          '9': `<a:9_:795440513423376384>`}[d];})}
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil.'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor.'
    moment.locale("tr");
  const embed = new Discord.MessageEmbed()
  .setTitle("<a:tik:794592787453444176> Sunucuya Bir Üye Katıldı")
  .setDescription(`**
   <@`+member.id+`> \``+member.id+`\`Sunucuya Katıldı
   
   Sunucu Artık `+üyesayısı+` Kişi
   
  Hesabın \``+gecen+ `\` Önce Oluşturulmuş**`)
.setColor(ayarlar.renk)
 member.guild.channels.cache.get(kanal).send(embed);
});


const { GiveawaysManager } = require('discord-giveaways');
if(!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

    async getAllGiveaways(){
        return db.get("giveaways");
    }

    async saveGiveaway(messageID, giveawayData){
        db.push("giveaways", giveawayData);
        return true;
    }

    async editGiveaway(messageID, giveawayData){
        const giveaways = db.get("giveaways");
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        newGiveawaysArray.push(giveawayData);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }

    async deleteGiveaway(messageID){
        const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }
  
  
};
const manager = new GiveawayManagerWithOwnDatabase(client, {
  storage: false,
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#0a99ff",
    reaction: "🎉"
  }
});
client.giveawaysManager = manager;


///son///
client.login(ayarlar.token);