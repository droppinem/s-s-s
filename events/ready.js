const moment = require('moment');
module.exports = (client) => {

var oynuyorkısımları = [
"Güvenli Alışveriş",
"Hızlı Teslim",
"Uygun Fiyat",
"http://tusiatechnology.ml/"
]


setInterval(function() {

        var random = Math.floor(Math.random()*(oynuyorkısımları.length-0+1)+0);
       client.user.setActivity(oynuyorkısımları[random], { type: 'LISTENING' });
        }, 2 * 2000);

  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
}