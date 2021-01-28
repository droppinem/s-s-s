const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("quick.db")

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has('BAN_MEMBERS')) {
    const embed = new Discord.MessageEmbed()
    .setTitle("Hata!")
      .setDescription(`<a:carpi:781345535810076694> **Bu Komutu Kullanabilmek İçin __Üyeleri Yasakla__ Yetkisine Sahip Olmalısın. **` )
.setColor("RANDOM")
    message.channel.send(embed)
    return;
  }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first() || client.users.cache.get(args[0])
  if (!user) return message.reply('<a:carpi:781345535810076694> **Banlıyacağın Kullanıcıyı Etiketlemelisin.**').catch(console.error);
  if (reason.length < 1) return message.reply('Ban sebebini yazmalısın.');
  guild.members.ban(user, { reason: reason });
  message.channel.send("<:tik32:799202944288686094> **Kullanıcıyı Başarıyla Banladım**")

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .addField('Eylem:', 'Ban')
    .addField('Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Sebep', reason);
message.channel.send(embed)
  user.ban()
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  kategori: "mod"
};
exports.help = { 
	name: 'ban', 
	description: 'Belirttiğiniz kişiyi sunucudan banlarsınız.', 
	usage: 'ban' 
}