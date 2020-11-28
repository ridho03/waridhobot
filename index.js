const qrcode = require("qrcode-terminal");
const moment = require("moment");
const cheerio = require("cheerio");
const get = require('got')
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const imageToBase64 = require('image-to-base64');
const menu = require("./lib/menu.js");
const donate = require("./lib/donate.js");
const info = require("./lib/info.js");
const setting = require("./settings/setting.json");

let { 
    ownerNumber, 
    groupLimit, 
    memberLimit,
} = setting

					  
//
const BotName = 'RIDHO BOT 🤖'; // Nama Bot Whatsapp
const instagramlu = 'https://instagram.com/ridho_setiawan02'; // Nama Instagramlu cok
const whatsapplu = '0812-8909-6745'; // Nomor whatsapplu cok
const kapanbotaktif = '24 Jam'; // Kapan bot lu aktif
const grupch1 = 'https://chat.whatsapp.com/LX1nAiZUuB5FmTCMwe0o4g'; // OFFICIAL GRUP LU 1
const grupch2 = 'https://chat.whatsapp.com/Kjv5IWzNIeCBSaH4lJKX8v'; // OFFICIAL GRUP LU 2
//
const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");

function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}
const conn = new WAConnection()
conn.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] Scan kode qr mu cok!`);
});

conn.on('credentials-updated', () =>
{
   // save credentials whenever updated
   console.log(`credentials updated!`)
   const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
// uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
//conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
conn.connect();

conn.on('user-presence-update', json => console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by @ridho_setiawan02`))
conn.on('message-status-update', json =>
{
   const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
   console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by @ridho_setiawan02`)
})

conn.on('message-new', async(m) =>
{
   const messageContent = m.message
   const text = m.message.conversation
   let id = m.key.remoteJid
   const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
   let imageMessage = m.message.imageMessage;
   console.log(`[ ${moment().format("HH:mm:ss")} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);


// Groups

if (text.includes("#buatgrup"))
   {
var nama = text.split("#buatgrup")[1].split("-nomor")[0];
var nom = text.split("-nomor")[1];
var numArray = nom.split(",");
for ( var i = 0; i < numArray.length; i++ ) {
    numArray[i] = numArray[i] +"@s.whatsapp.net";
}
var str = numArray.join("");
console.log(str)
const group = await conn.groupCreate (nama, str)
console.log ("created group with id: " + group.gid)
conn.sendMessage(group.gid, "hello everyone", MessageType.extendedText) // say hello to everyone on the group

}

// FF
if(text.includes("#cek")){
var num = text.replace(/#cek/ , "")
var idn = num.replace("0","+62");

console.log(id);
const gg = idn+'@s.whatsapp.net'

const exists = await conn.isOnWhatsApp (gg)
console.log(exists);
conn.sendMessage(id ,`${gg} ${exists ? " exists " : " does not exist"} on WhatsApp`, MessageType.text)
}

if (text.includes("#tts")){
const teks = text.replace(/#tts /, "")
const gtts = (`https://rest.farzain.com/api/tts.php?id=${teks}&apikey=O8mUD3YrHIy9KM1fMRjamw8eg`)
    conn.sendMessage(id, gtts ,MessageType.text);
}

if (text.includes("#say")){
  const teks = text.replace(/#say /, "")
conn.sendMessage(id, teks, MessageType.text)
}

if (text.includes("#nulis")){
  const teks = text.replace(/#nulis /, "")
axios.get(`https://st4rz.herokuapp.com/api/nulis?text=${teks}`).then((res) => {
    let hasil = `Download sendiri ya hasilnya dibawah, soalnya kalo dikirim langsung hasilnya blur\n\n${res.data.result.data}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("#ytmp3")){
const teks = text.replace(/#ytmp3 /, "")
axios.get(`http://scrap.terhambar.com/yt?link=${teks}`).then((res) => {
    let hasil = `Download sendiri melalui link dibawah ya, takut servernya down xixi..\n\nSize: ${res.data.filesize}\n\nLink: ${res.data.linkAudioOnly}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("#yt")){
const teks = text.replace(/#yt /, "")
axios.get(`http://scrap.terhambar.com/yt?link=${teks}`).then((res) => {
    let hasil = `Download sendiri melalui link dibawah ya, takut servernya down xixi..\n\nSize: ${res.data.filesize}\n\nLink: ${res.data.linkVideo}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("#fb")){
const teks = text.replace(/#fb /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/epbe?url=${teks}&apiKey=zFuV88pxcIiCWuYlwg57`).then((res) => {
    let hasil = `Download sendiri melalui link dibawah ya, takut servernya down xixi..\n\nJudul: ${res.data.title}\n\nSize: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("#ig")){
const teks = text.replace(/#ig /, "")
axios.get(`https://st4rz.herokuapp.com/api/ig?url=${teks}`).then((res) => {
    let hasil = `Download sendiri melalui link dibawah ya, takut servernya down xixi..\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("#twt")){
const teks = text.replace(/#twt /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/twit?url=${teks}&apiKey=zFuV88pxcIiCWuYlwg57`).then((res) => {
    let hasil = `Download sendiri melalui link dibawah ya, takut servernya down xixi..\n\nJudul: ${res.data.title}\n\nSize: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("#wiki")){
const teks = text.replace(/#wiki /, "")
axios.get(`https://st4rz.herokuapp.com/api/wiki?q=${teks}`).then((res) => {
    let hasil = `Menurut Wikipedia:\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text == '#help'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, menu.menu(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '#quran'){
axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
    const sr = /{(.*?)}/gi;
    const hs = res.data.acak.id.ayat;
    const ket = `${hs}`.replace(sr, '');
    let hasil = `[${ket}]   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}
else if (text == 'assalamualaikum'){
conn.sendMessage(id, '3aalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'salam'){
conn.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'asalamualaikum'){
conn.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'Assalamualaikum'){
conn.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'p'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'P'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'halo'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'hai'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'woi'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'woy'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'hi'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'gan'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'sis'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'bro'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'min'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'sayang'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'i love u'){
conn.sendMessage(id, 'love you too' ,MessageType.text);
}
else if (text == 'mas'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'mba'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'bre'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'cuy'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'euy'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #help ya say..' ,MessageType.text);
}
else if (text == 'makasi'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Makasi'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'makasih'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Makasih'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'thank'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Thank'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'thanks'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Thanks'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == '#donate'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '#donasi'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '#DONATE'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '#DONASI'){
  const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '#info'){
  const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, info.info(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '#ptl'){
conn.sendMessage(id, 'kirim #ptl cewek/cowok\n\nContoh: #ptl cewek' ,MessageType.text);
}
   if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '#sticker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker)
         });
      }
   }

   if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()

      if (is == '#pantun')
      {

         fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text)
            });
      }

   }
	
	case 'add':
            if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
	        if (args.length !== 1) return aruga.reply(from, `Untuk menggunakan ${prefix}add\nPenggunaan: ${prefix}add <nomor>\ncontoh: ${prefix}add 628xxx`, id)
                try {
                    await aruga.addParticipant(from,`${args[0]}@c.us`)
                } catch {
                    aruga.reply(from, 'Tidak dapat menambahkan target', id)
                }
            break
        case 'kick':
            if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
            if (mentionedJidList.length === 0) return aruga.reply(from, 'Maaf, format pesan salah.\nSilahkan tag satu atau lebih orang yang akan dikeluarkan', id)
            if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maaf, format pesan salah.\nTidak dapat mengeluarkan akun bot sendiri', id)
            await aruga.sendTextWithMentions(from, `Request diterima, mengeluarkan:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return await aruga.sendText(from, 'Gagal, kamu tidak bisa mengeluarkan admin grup.')
                await aruga.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case 'promote':
            if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
            if (mentionedJidList.length !== 1) return aruga.reply(from, 'Maaf, hanya bisa mempromote 1 user', id)
            if (groupAdmins.includes(mentionedJidList[0])) return await aruga.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maaf, format pesan salah.\nTidak dapat mempromote akun bot sendiri', id)
            await aruga.promoteParticipant(groupId, mentionedJidList[0])
            await aruga.sendTextWithMentions(from, `Request diterima, menambahkan @${mentionedJidList[0].replace('@c.us', '')} sebagai admin.`)
            break
        case 'demote':
            if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
            if (mentionedJidList.length !== 1) return aruga.reply(from, 'Maaf, hanya bisa mendemote 1 user', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return await aruga.reply(from, 'Maaf, user tersebut belum menjadi admin.', id)
            if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maaf, format pesan salah.\nTidak dapat mendemote akun bot sendiri', id)
            await aruga.demoteParticipant(groupId, mentionedJidList[0])
            await aruga.sendTextWithMentions(from, `Request diterima, menghapus jabatan @${mentionedJidList[0].replace('@c.us', '')}.`)
            break
        case 'bye':
            if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
            aruga.sendText(from, 'Good bye... ( ⇀‸↼‶ )').then(() => aruga.leaveGroup(groupId))
            break
        case 'del':
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
            if (!quotedMsg) return aruga.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`, id)
            if (!quotedMsgObj.fromMe) return aruga.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`, id)
            aruga.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case 'tagall':
        case 'everyone':
            if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
            const groupMem = await aruga.getGroupMembers(groupId)
            let hehex = '╔══✪〘 Mention All 〙✪══\n'
            for (let i = 0; i < groupMem.length; i++) {
                hehex += '╠➥'
                hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehex += '╚═〘 *R I D H O  B O T* 〙'
            await aruga.sendTextWithMentions(from, hehex)
            break
		case 'simisimi':
			if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
			aruga.reply(from, `Untuk mengaktifkan simi-simi pada Group Chat\n\nPenggunaan\n${prefix}simi on --mengaktifkan\n${prefix}simi off --nonaktifkan\n`, id)
			break
		case 'simi':
			if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
			if (args.length !== 1) return aruga.reply(from, `Untuk mengaktifkan simi-simi pada Group Chat\n\nPenggunaan\n${prefix}simi on --mengaktifkan\n${prefix}simi off --nonaktifkan\n`, id)
			if (args[0] == 'on') {
				simi.push(chatId)
				fs.writeFileSync('./settings/simi.json', JSON.stringify(simi))
                aruga.reply(from, 'Mengaktifkan bot simi-simi!', id)
			} else if (args[0] == 'off') {
				let inxx = simi.indexOf(chatId)
				simi.splice(inxx, 1)
				fs.writeFileSync('./settings/simi.json', JSON.stringify(simi))
				aruga.reply(from, 'Menonaktifkan bot simi-simi!', id)
			} else {
				aruga.reply(from, `Untuk mengaktifkan simi-simi pada Group Chat\n\nPenggunaan\n${prefix}simi on --mengaktifkan\n${prefix}simi off --nonaktifkan\n`, id)
			}
			break
		case 'katakasar':
			if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
			aruga.reply(from, `Untuk mengaktifkan Fitur Kata Kasar pada Group Chat\n\nApasih kegunaan Fitur Ini? Apabila seseorang mengucapkan kata kasar akan mendapatkan denda\n\nPenggunaan\n${prefix}kasar on --mengaktifkan\n${prefix}kasar off --nonaktifkan\n\n${prefix}reset --reset jumlah denda`, id)
			break
		case 'kasar':
			if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
			if (args.length !== 1) return aruga.reply(from, `Untuk mengaktifkan Fitur Kata Kasar pada Group Chat\n\nApasih kegunaan Fitur Ini? Apabila seseorang mengucapkan kata kasar akan mendapatkan denda\n\nPenggunaan\n${prefix}kasar on --mengaktifkan\n${prefix}kasar off --nonaktifkan\n\n${prefix}reset --reset jumlah denda`, id)
			if (args[0] == 'on') {
				ngegas.push(chatId)
				fs.writeFileSync('./settings/ngegas.json', JSON.stringify(ngegas))
				aruga.reply(from, 'Fitur Anti Kasar sudah di Aktifkan', id)
			} else if (args[0] == 'off') {
				let nixx = ngegas.indexOf(chatId)
				ngegas.splice(nixx, 1)
				fs.writeFileSync('./settings/ngegas.json', JSON.stringify(ngegas))
				aruga.reply(from, 'Fitur Anti Kasar sudah di non-Aktifkan', id)
			} else {
				aruga.reply(from, `Untuk mengaktifkan Fitur Kata Kasar pada Group Chat\n\napasih itu? fitur apabila seseorang mengucapkan kata kasar akan mendapatkan denda\n\nPenggunaan\n${prefix}kasar on --mengaktifkan\n${prefix}kasar off --nonaktifkan\n\n${prefix}reset --reset jumlah denda`, id)
			}
			break
		case 'reset':
			if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
			const reset = db.get('group').find({ id: groupId }).assign({ members: []}).write()
            if(reset){
				await aruga.sendText(from, "Klasemen telah direset.")
            }
			break
			
        //Owner Group
        case 'kickall': //mengeluarkan semua member
        if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
        let isOwner = chat.groupMetadata.owner == pengirim
        if (!isOwner) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai oleh owner grup!', id)
        if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
            const allMem = await aruga.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {

                } else {
                    await aruga.removeParticipant(groupId, allMem[i].id)
                }
            }
            aruga.reply(from, 'Success kick all member', id)
        break

        //Owner Bot
	case 'upgrade':
            if (!isOwnerBot) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
            if (args.length == 0) return aruga.reply(from, `Untuk upgrade seseorang agar bisa menggunakan semua commands\n\nCaranya ketik: \n${prefix}upgrade add 628xx --untuk mengaktifkan\n${prefix}upgrade del 628xx --untuk nonaktifkan\n\ncara cepat upgrade banyak digrup ketik:\n${prefix}upgrade @tag @tag @tag`, id)
            if (args[0] == 'add') {
		premium.push(args[1]+'@c.us')
                fs.writeFileSync('./settings/premium.json', JSON.stringify(premium))
                aruga.reply(from, 'Success upgrade target!')
            } else
            if (args[0] == 'del') {
                let xnxx = premium.indexOf(args[1]+'@c.us')
		premium.splice(xnxx,1)
                fs.writeFileSync('./settings/premium.json', JSON.stringify(premium))
                aruga.reply(from, 'Success unupgrade target!')
            } else {
             for (let i = 0; i < mentionedJidList.length; i++) {
		premium.push(mentionedJidList[i])
                fs.writeFileSync('./settings/premium.json', JSON.stringify(premium))
                aruga.reply(from, 'Success upgrade target!', id)
                }
            }
            break
        case 'ban':
            if (!isOwnerBot) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
            if (args.length == 0) return aruga.reply(from, `Untuk banned seseorang agar tidak bisa menggunakan commands\n\nCaranya ketik: \n${prefix}ban add 628xx --untuk mengaktifkan\n${prefix}ban del 628xx --untuk nonaktifkan\n\ncara cepat ban banyak digrup ketik:\n${prefix}ban @tag @tag @tag`, id)
            if (args[0] == 'add') {
                banned.push(args[1]+'@c.us')
                fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                aruga.reply(from, 'Success banned target!')
            } else
            if (args[0] == 'del') {
                let xnxx = banned.indexOf(args[1]+'@c.us')
                banned.splice(xnxx,1)
                fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                aruga.reply(from, 'Success unbanned target!')
            } else {
             for (let i = 0; i < mentionedJidList.length; i++) {
                banned.push(mentionedJidList[i])
                fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                aruga.reply(from, 'Success ban target!', id)
                }
            }
            break
        case 'bc': //untuk broadcast atau promosi
            if (!isOwnerBot) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
            if (args.length == 0) return aruga.reply(from, `Untuk broadcast ke semua chat ketik:\n${prefix}bc [isi chat]`)
            let msg = body.slice(4)
            const chatz = await aruga.getAllChatIds()
            for (let idk of chatz) {
                var cvk = await aruga.getChatById(idk)
                if (!cvk.isReadOnly) aruga.sendText(idk, `〘 *R I D H O  B C* 〙\n\n${msg}`)
                if (cvk.isReadOnly) aruga.sendText(idk, `〘 *R I D H O  B C* 〙\n\n${msg}`)
            }
            aruga.reply(from, 'Broadcast Success!', id)
            break
        case 'leaveall': //mengeluarkan bot dari semua group serta menghapus chatnya
            if (!isOwnerBot) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChatz = await aruga.getAllChatIds()
            const allGroupz = await aruga.getAllGroups()
            for (let gclist of allGroupz) {
                await aruga.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChatz.length}`)
                await aruga.leaveGroup(gclist.contact.id)
                await aruga.deleteChat(gclist.contact.id)
            }
            aruga.reply(from, 'Success leave all group!', id)
            break
        case 'clearall': //menghapus seluruh pesan diakun bot
            if (!isOwnerBot) return aruga.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChatx = await aruga.getAllChats()
            for (let dchat of allChatx) {
                await aruga.deleteChat(dchat.id)
            }
            aruga.reply(from, 'Success clear all chat!', id)
            break
        default:
            break
        }
		
		// Simi-simi function
		if ((!isCmd && isGroupMsg && isSimi) && message.type === 'chat') {
			axios.get(`https://arugaz.herokuapp.com/api/simisimi?kata=${encodeURIComponent(message.body)}&apikey=${apiSimi}`)
			.then((res) => {
				if (res.data.status == 403) return aruga.sendText(ownerNumber, `${res.data.result}\n\n${res.data.pesan}`)
				aruga.reply(from, `Simi berkata: ${res.data.result}`, id)
			})
			.catch((err) => {
				aruga.reply(from, `${err}`, id)
			})
		}
/*   if (text.includes("#yt"))
   {
      const url = text.replace(/#yt/, "");
      const exec = require('child_process').exec;

      var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

      const ytdl = require("ytdl-core")
      if (videoid != null)
      {
         console.log("video id = ", videoid[1]);
      }
      else
      {
         conn.sendMessage(id, "gavalid", MessageType.text)
      }
      ytdl.getInfo(videoid[1]).then(info =>
      {
         if (info.length_seconds > 1000)
         {
            conn.sendMessage(id, " videonya kepanjangan", MessageType.text)
         }
         else
         {

            console.log(info.length_seconds)

            function os_func()
            {
               this.execCommand = function (cmd)
               {
                  return new Promise((resolve, reject) =>
                  {
                     exec(cmd, (error, stdout, stderr) =>
                     {
                        if (error)
                        {
                           reject(error);
                           return;
                        }
                        resolve(stdout)
                     });
                  })
               }
            }
            var os = new os_func();

            os.execCommand('ytdl ' + url + ' -q highest -o mp4/' + videoid[1] + '.mp4').then(res =>
            {
		const buffer = fs.readFileSync("mp4/"+ videoid[1] +".mp4")
               conn.sendMessage(id, buffer, MessageType.video)
            }).catch(err =>
            {
               console.log("os >>>", err);
            })

         }
      });

   }*/


   /*if (text.includes("#nulis"))
   {

      const
      {
         spawn
      } = require("child_process");
      console.log("writing...")
      const teks = text.replace(/#nulis/, "")
      const split = teks.replace(/(\S+\s*){1,10}/g, "$&\n")
      const fixedHeight = split.split("\n").slice(0, 25).join("\\n")
      console.log(split)
      spawn("convert", [
            "./assets/paper.jpg",
            "-font",
            "Indie-Flower",
            "-size",
            "700x960",
            "-pointsize",
            "18",
            "-interline-spacing",
            "3",
            "-annotate",
            "+170+222",
            fixedHeight,
            "./assets/result.jpg"
         ])
         .on("error", () => console.log("error"))
         .on("exit", () =>
         {
            const buffer = fs.readFileSync("assets/result.jpg") // can send mp3, mp4, & ogg -- but for mp3 files the mimetype must be set to ogg

            conn.sendMessage(id, buffer, MessageType.image)
            console.log("done")
         })
   }


   if (text.includes("#quotes"))
   {
      var url = 'https://jagokata.com/kata-bijak/acak.html'
      axios.get(url)
         .then((result) =>
         {
            let $ = cheerio.load(result.data);
            var author = $('a[class="auteurfbnaam"]').contents().first().text();
            var kata = $('q[class="fbquote"]').contents().first().text();

            conn.sendMessage(
               id,
               `
     _${kata}_
        
    
	*~${author}*
         `, MessageType.text
            );

         });
   }*/

   if (text.includes("#ptl cewek"))
   {
    var items = ["ullzang girl", "cewe cantik", "hijab cantik", "korean girl"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

   if (text.includes("#ptl cowok"))
   {
    var items = ["cowo ganteng", "cogan", "korean boy", "chinese boy", "japan boy"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
  var buf = Buffer.from(response, 'base64'); // Ta-da 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
	
if (text.includes(".spotify")){
  const spotify = text.split(".spotify")[1]
  axios.get(`https://api.spotify.com/play?link=${spotify}`).then ((res) =>
    { let hasil = `${res.data.link}`
    conn.sendMessage(id, hasil, MessageType.text)
  })
}

if (text.includes("#randomanime"))
   {
    var items = ["anime girl", "anime cantik", "anime", "anime aesthetic"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

/*if (text.includes("#scdl")){
const fs = require("fs");
const scdl = require("./lib/scdl");
scdl.setClientID("iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX");
scdl("https://m.soundcloud.com/abdul-muttaqin-701361735/lucid-dreams-gustixa-ft-vict-molina")
    .pipe(fs.createWriteStream("mp3/song.mp3"));
}
 else if (text.includes("#tts")) {
  var teks = text.split("#ttsid ")[1];
  var path = require('path');
  var text1 = teks.slice(6);
  text1 = suara;
  var suara = text.replace(/#ttsid/g, text1);
  var filepath = 'mp3/bacot.wav';
  
  
/*
 * save audio file
 */

/*gtts.save(filepath, suara, function() {
  console.log(`${filepath} MP3 SAVED!`)
});
await new Promise(resolve => setTimeout(resolve, 500));*/

/*	if(suara.length > 200){ // check longness of text, because otherways google translate will give me a empty file
  msg.reply("Text kepanjangan bro!")
}else{
const buffer = fs.readFileSync(filepath)
	conn.sendMessage(id , buffer , MessageType.audio);
};
}*/






   // end of file


})
