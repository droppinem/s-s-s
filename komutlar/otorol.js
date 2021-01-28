const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(
      "**Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin** `Rolleri Yönet`"
    );

  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
     .setColor(ayarlar.renk)
      .setThumbnail(ayarlar.t)
        .setDescription(
          " **Otorol Sistemini Ne Yapmak İstediğini Belirtmedin** \n `-otorol ayarla @rol #kanal` **Otorol Sistemini Ayarlar.** \n `-otorol sıfırla` **Otorol Sistemini Sıfırlar.**"
        )
    );

  if (args[0] === "ayarla") {
    var rol = message.mentions.roles.first();
    var rolkanal = message.mentions.channels.first();
    if (!rol)
      return message.channel.send(
        new Discord.MessageEmbed()
     .setColor(ayarlar.renk)
        .setThumbnail(ayarlar.t)
          .setDescription(
            "**Bir Rol Etiketlemelisin** `-otorol ayarla @Rol #Kanal` **(Eğer Rolü Bulamıyorsan Etiketleme İzninin Açık Olduğundan Veya Komutun Kullanıldığı Kanalı Görebildiğinden Emin Ol)**"
          )
      );
    if (!rolkanal)
      return message.channel.send(
        new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
        .setThumbnail(ayarlar.t)
          .setDescription(
            "Bir kanal etiketlemelisin eğer kanalı etiketleyemiyorsan botun o kanalı gördüğünden emin ol."
          )
      );

    db.set(`autoRoleChannel_${message.guild.id}`, rolkanal.id);
    db.set(`autoRole_${message.guild.id}`, rol.id);

    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
      .setThumbnail(ayarlar.t)
        .setDescription(
          " **Otorol Sistemi Aktif edildi**\n\n **Sunucuya giren kişilere verilecek rol** <@&" +
            rol +
            "> \n\n  **Otorol mesajının gideceği kanal** <#" +
            rolkanal.id +
            "> **Olarak ayarlandı.**"
        )
    );
  }

  if (args[0] === "sıfırla") {
    let user = message.author;
    message.channel
      .send(
        "**Otorol Sistemini Sıfırlamak İstediğinden Eminmisin Eğer Eminsen** :white_check_mark: **Değilsen** :x: **Tepkisine bas.**"
      )
      .then(async m => {
        await m.react("✅").then(r => {
          let onay = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id == message.author.id;
          let onay2 = m.createReactionCollector(onay);
          onay2.on("collect", async r => {
            db.delete(`autoRoleChannel_${message.guild.id}`);
            db.delete(`autoRole_${message.guild.id}`);
            m.reactions.removeAll();
            m.edit("Otorol sistemi kapatıldı.");
          });
        });
        await m.react("❌").then(r => {
          let onay = (reaction, user) =>
            reaction.emoji.name == "❌" && user.id == message.author.id;
          let onay2 = m.createReactionCollector(onay);
          onay2.on("collect", async r => {
            m.reactions.removeAll();
            m.edit("Otorol kapatma işlemi iptal edildi");
          });
        });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 0
};

exports.help = {
  name: "otorol"
};
