const qrcode = require ("qrcode-terminal");
 momento const = requer ("momento");
 const cheerio = require ("cheerio");
 const get = require ('got')
 const fs = require ("fs");
 const dl = require ("./ lib / downloadImage.js");
 const fetch = require ('node-fetch');
 const urlencode = require ("urlencode");
 const axios = require ("axios");
 const imageToBase64 = require ('image-to-base64');
 const menu = require ("./ lib / menu.js");
 const donate = require ("./ lib / donate.js");
 const info = require ("./ lib / info.js");

 //
 const BotName = 'RIDHO BOT 🤖';  // Nome do Whatsapp Bot
 const instagramlu = 'https://instagram.com/ridho_setiawan02';  // O nome do Instagram é legal
 const whatsapplu = '0812-8909-6745';  // número do whatsapplu
 const Kapanbotactive = '24 horas ';  // Quando seu bot estava ativo
 const grupch1 = 'https://chat.whatsapp.com/LX1nAiZUuB5FmTCMwe0o4g';  // OFICIAL 1 DO GRUPO LU
 const grupch2 = 'https://chat.whatsapp.com/Kjv5IWzNIeCBSaH4lJKX8v';  // LU2 GRUPO OFICIAL
 //
 const
 {
    WAConnection,
    Tipo de mensagem,
    Presença,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    waChatKey,
 } = require ("@ adiwajshing / baileys");
 var hora = momento (). formato ("HH: mm");

 função foreach (arr, func)
 {
    para (var i in arr)
    {
       função (i, arr [i]);
    }
 }
 const conn = new WAConnection ()
 conn.on ('qr', qr =>
 {
    qrcode.generate (qr,
    {
       pequeno: verdadeiro
    });
    console.log (`[$ {moment (). format (" HH: mm: ss ")}] ridho Pronto para digitalizar agora!`);
 });

 conn.on ('credentials-updated', () =>
 {
    // salva as credenciais sempre que atualizadas
    console.log (`credentials updated $`)
    const authInfo = conn.base64EncodedAuthInfo () // obtenha todas as informações de autenticação de que precisamos para restaurar esta sessão
    fs.writeFileSync ('./ session.json', JSON.stringify (authInfo, null, '\ t')) // salve essas informações em um arquivo
 })
 fs.existsSync ('./ session.json') && conn.loadAuthInfo ('./ session.json')
 // descomente a seguinte linha para fazer proxy da conexão;  algum proxy aleatório que tirei de: https://proxyscrape.com/free-proxy-list
 //conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
 conn.connect ();

 conn.on ('usuário-presença-atualização', json => console.log (`[$ (moment (). format (" HH: mm: ss ")}] => bot por @ ridho_setiawan02`))
 conn.on ('mensagem-status-atualização', json =>
 {
    const participant = json.participant?  '(' + json.participant + ')': '' // o participante existe quando a mensagem é de um grupo
    console.log (`[$ (moment (). format (" HH: mm: ss ")}] => bot por @ ridho_setiawan02`)
 })

 conn.on ('mensagem-nova', assíncrona (m) =>
 {
    const messageContent = m.message
    const text = m.message.conversation
    let id = m.key.remoteJid
    const messageType = Object.keys (messageContent) [0] // a mensagem sempre conterá uma chave que significa que tipo de mensagem
    let imageMessage = m.message.imageMessage;
    console.log (`[$ {moment (). format (" HH: mm: ss ")}] => Número: [$ {id.split (" @ s.whatsapp.net ") [0]}] =  > $ {text} `);
    // Grupos

 if (text.includes (". Criar grupo"))
    {
 var name = text.split (". Creategroup") [1] .split ("- número") [0];
 var nom = text.split ("- número") [1];
 var numArray = nom.split (",");
 para (var i = 0; i <numArray.length; i ++) {
     numArray [i] = numArray [i] + "@ s.whatsapp.net";
 }
 var str = numArray.join ("");
 console.log (str)
 const group = await conn.groupCreate (nome, str)
 console.log ("grupo criado com id:" + group.gid)
 conn.sendMessage (group.gid, "hello everyone", MessageType.extendedText) // diga olá a todos no grupo

 }

 // FF A187 ID
 if (text.includes (". check")) {
 var num = text.replace (/. verificar /, "")
 var idn = num.replace ("0", "+ 62");

 console.log (id);
 const gg = idn+'@s.whatsapp.net '

 const existe = espera conn.isOnWhatsApp (gg)
 console.log (existe);
 conn.sendMessage (id, `$ {gg} $ {existe?" existe ":" não existe "} no WhatsApp`, MessageType.text)
 }

 // Chat A187 ID
 else if (text == 'assalamualaikum') {
 conn.sendMessage (id, '3aalaikumsalam, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'saudação') {
 conn.sendMessage (id, 'Waalaikumsalam, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'asalamualaikum') {
 conn.sendMessage (id, 'Waalaikumsalam, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Assalamualaikum') {
 conn.sendMessage (id, 'Waalaikumsalam, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'p') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'P') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Olá') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Asu') {
 conn.sendMessage (id, 'Lu Asw', MessageType.text);
 }
 else if (text == '.owner') {
 conn.sendMessage (id, 'Proprietário ridho wa.me/6281289096745', MessageType.text);
 }
 else if (text == 'Ngentod') {
 conn.sendMessage (id, 'Quer hospedar?', MessageType.text);
 }
 else if (text == 'Cachorro') {
 conn.sendMessage (id, 'Não seja um cachorro tóxico', MessageType.text);
 }
 else if (text == 'Bacot') {
 conn.sendMessage (id, 'lu bacot_-', MessageType.text);
 }
 else if (text == 'Teste') {
 conn.sendMessage (id, 'Teste 1,2,3 digite #help', MessageType.text);
 }
 else if (text == 'Oi') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Woi') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Eoy') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Oi') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Bro') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Sis') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Bro') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Min') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Querida') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Eu te amo') {
 conn.sendMessage (id, 'também te amo', MessageType.text);
 }
 else if (text == 'Mas') ​​{
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Mba') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Bre') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Cuy') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'Euy') {
 conn.sendMessage (id, 'Sim?, Digite # help / # info / # donation Exemplo #help', MessageType.text);
 }
 else if (text == 'obrigado') {
 conn.sendMessage (id, 'De nada, tenha um bom dia :)', MessageType.text);
 }
 else if (text == 'Obrigado') {
 conn.sendMessage (id, 'De nada, tenha um bom dia :)', MessageType.text);
 }
 else if (text == 'obrigado') {
 conn.sendMessage (id, 'De nada, tenha um bom dia :)', MessageType.text);
 }
 else if (text == 'Obrigado') {
 conn.sendMessage (id, 'De nada, tenha um bom dia :)', MessageType.text);
 }
 else if (text == 'obrigado') {
 conn.sendMessage (id, 'De nada, tenha um bom dia :)', MessageType.text);
 }
 else if (text == 'Obrigado') {
 conn.sendMessage (id, 'De nada, tenha um bom dia :)', MessageType.text);
 }
 else if (text == 'obrigado') {
 conn.sendMessage (id, 'De nada, tenha um bom dia :)', MessageType.text);
 }
 else if (text == 'Obrigado') {
 conn.sendMessage (id, 'De nada, tenha um bom dia :)', MessageType.text);
 }

 // Características

 if (text.includes ('. write')) {
   var text = text.replace (/. write /, '')
     axios.get ('https://bangandre.herokuapp.com/nulis?teks='+text)
     .então ((res) => {
       imageToBase64 (res.data.result)
         .então (
           (ress) => (
             conn.sendMessage (id, '[WAIT] Pesquisando ... ❗', MessageType.text)
             var buf = Buffer.from (ress, 'base64')
             conn.sendMessage (id, buf, MessageType.image)
         })
     })
 }


 if (text.includes (". dizer")) {
   const text = text.replace (/. diga /, "")
 conn.sendMessage (id, text, MessageType.text)
 }

 if (text.includes (". ytmp3")) {
 const text = text.replace (/. yt /, "")
 axios.get (`` http://scrap.terhambar.com/yt?link=$ {text} `) .then ((res) => {
 conn.sendMessage (id, '[WAIT] Pesquisando ... ⏳', MessageType.text)
     let results = `` A música foi baixada com sucesso, clique no link e baixe os resultados \ nClique no link abaixo \ nTítulo: $ {res.data.title} \ n \ nDuração: $ {res.data.inText} \ n \ nAudio: $  {res.data.linkAudioOnly} `;
     conn.sendMessage (id, resultado, MessageType.text);
 })
 }
 if (text.includes (". infoig")) {
   const text = text.replace (/. infoig /, "")
   axios.get (`` https://st4rz.herokuapp.com/api/stalk?username=$ {text} `) .then ((res) => {
   conn.sendMessage (id, '[WAIT] Pesquisando ... ⏳', MessageType.text)
   let results = `` INSTAGRAM BIODATA ON NAME _ $ {text} _ \ n \ n * Nome de usuário✍️ *: _ $ {res.data.Username} _ \ n * Nome✍️ *: _ $ {res.data.Name} _  \ n * Número de seguidores✍️ *: _ $ {res.data.Quantity_Followers} _ \ n * Total_Following✍️ *: _ $ {res.data.Quantity_Following} _ \ n * Total_Post✍️ *: _ $ {res.data. Number_Post  } _ `;
   conn.sendMessage (id, resultado, MessageType.text);
 })
 }
 if (text.includes (". infogempa")) {
   const text = text.replace (/. infogempa /, "")
   axios.get (`https: // st4rz.herokuapp.com / api / infogempa`) .then ((res) => {
   conn.sendMessage (id, '[WAIT] Pesquisando ... ⏳', MessageType.text)
   let result = `* EARTHQUAKE INFO * \ n \ * Location *: _ $ {res.data.location} _ \ n * Depth✍️ *: _ $ {res.data.depth} _ \ n * Coordinates✍️ *: _  $ {res.data.koordinate} _ \ n * Magnitude✍️ *: _ $ {res.data.magnitude} _ \ n * Time✍️ *: _ $ {res.data.w time} _ `;
   conn.sendMessage (id, resultado, MessageType.text);
 })
 }
 if (text.includes (". chord")) {
 const text = text.replace (/. chord /, "")
 axios.get (`` https://st4rz.herokuapp.com/api/chord?q=$ {text} `) .then ((res) => {
 conn.sendMessage (id, '[WAIT] Pesquisando ... ⏳', MessageType.text)
     let results = `* Nih Cord Lagu $ {text} kak * \ n \ nCord: _ $ {res.data.result} _`;
     conn.sendMessage (id, resultado, MessageType.text);
 })
 }


 if (text.includes (". ytmp4")) {
 const text = text.replace (/. yt /, "")
 axios.get (`` http://scrap.terhambar.com/yt?link=$ {text} `) .then ((res) => {
 conn.sendMessage (id, '[WAIT] Pesquisando ... ⏳', MessageType.text)
     let results = `` Vídeo baixado com sucesso, clique no link e baixe os resultados \ nClique no link abaixo \ nTítulo: $ {res.data.title} \ n \ nDuração: $ {res.data.inText} \ n \ nLink video:  $ {res.data.linkVideo} `;
     conn.sendMessage (id, resultado, MessageType.text);
 })
 }

 if (text.includes (". twt")) {
 const text = text.replace (/. twt /, "")
 axios.get (`https://mhankbarbar.herokuapp.com/api/twit?url=$ {text} & apiKey = zFuV88pxcIiCWuYlwg57`) .then ((res) => {
 conn.sendMessage (id, '[WAIT] Pesquisando ... ❗', MessageType.text)
     let result = `` ... Success $ clique no link abaixo para baixar o resultado $ \ nClique no link abaixoðŸ - ¡ï¸ \ n \ nTamanho: $ {res.data.filesize} \ n \ nLink: $ {res.data.  resultado} `;
     conn.sendMessage (id, resultado, MessageType.text);
 })
 }

 if (text.includes (". tts")) {
 const text = text.replace (/. tts /, "")
 const gtts = (`https://rest.farzain.com/api/tts.php?id=$ {text} & apikey = O8mUD3YrHIy9KM1fMRjamw8eg`)
     conn.sendMessage (id, gtts, MessageType.text);
 }

 if (text.includes (". tiktok")) {
 const tictoc = text.replace (/. tiktok /, "")
 axios.get (`` http://scrap.terhambar.com/tiktokfull?link=$ {tictoc} `) .then ((res) => {
 conn.sendMessage (id, '[WAIT] Pesquisando ... ❗', MessageType.text)
      let titoe = ``… Sucesso $$$ Clique no link abaixo para baixar o resultado $ \ nClique no link abaixoðŸ - ¡ï¸ \ n \ nTítulo: $ {res.data.description} \ n \ nDuração: $ {res.  data.duration} \ n \ nNome: $ {res.data.name} \ n \ nUrl: $ {res.data.urlvideo} `;
 conn.sendMessage (id, titoe, MessageType.text);
 })
 }

 if (text.includes ('. hi')) {
 valor const = text.replace (text.split ('') [0], '')
 const group = await conn.groupMetadata (id)
 membro const = grupo ['participantes']
 const ids = []
 member.map (assíncrono adm => {
     ids.push (adm.id.replace ('c.us', 's.whatsapp.net'))
 })
 opções const = {
     texto: valor,
     contextInfo: {associatedJid: ids},
     citado: m
 }
 conn.sendMessage (id, opções, MessageType.text)
 }

 if (text.includes (". fb")) {
 const text = text.replace (/. fb /, "")
 axios.get (`` http://scrap.terhambar.com/fb?link=$ {text} `) .then ((res) => {
     let result = `` Baixe você mesmo através do link abaixo, infelizmente o servidor está fora do ar xixi .. \ n \ nTítulo: $ {res.data.title} \ n \ nTamanho: $ {res.data.filesize} \ n \ nLink: $ {  res.data.result} `;
     conn.sendMessage (id, resultado, MessageType.text);
 })
 }

 if (text.includes (". ig")) {
 const text = text.replace (/. ig /, "")
 axios.get (`` https://st4rz.herokuapp.com/api/ig?url=$ {text} `) .then ((res) => {
     let result = `Baixado você mesmo, desculpe o link do erro \ n \ nLink: $ {res.data.result}`;
     conn.sendMessage (id, resultado, MessageType.text);
 })
 }

 if (text.includes (". wiki")) {
 const text = text.replace (/. wiki /, "")
 axios.get (`` https://alfians-api.herokuapp.com/api/wiki?q=$ {text} `) .then ((res) => {
 conn.sendMessage (id, '[WAIT] Pesquisando ... ❗', MessageType.text)
     deixe resultado = `` ðŸ "De acordo com a Wikipedia: \ n \ n $ {res.data.result}`;
     conn.sendMessage (id, resultado, MessageType.text);
 })
 }

 if (text.includes (". oração")) {
   const text = text.replace (/. sholat /, "")
   axios.get (`https://api.haipbis.xyz/jadwalsholat?daerah=$ {text}`) .then ((res) => {
   conn.sendMessage (id, '[WAIT] Pesquisando ... ❗', MessageType.text)
   let results = `Os momentos de oração em $ {text} hoje são \ n \ nâš¡Imsyak: $ {res.data.Imsyak} \ nâš¡Subuh: $ {res.data.Subuh} WIB \ nâš¡Dzuhur: $ {  res.data.Dzuhur} WIB \ nâš¡Ashar: $ {res.data.Ashar} WIB \ nâš¡Maghrib: $ {res.data.Maghrib} \ nâš¡Isya: $ {res.data.Isya} WIB \ nâš  ¡Meia-noite: $ {res.data.Dhuha} WIB`;
   conn.sendMessage (id, resultado, MessageType.text);
 })
 }
 else if (text == '.quran') {
 axios.get ('https://api.banghasan.com/quran/format/json/acak') .then ((res) => {
     const sr = /((.*?))/gi;
     const hs = res.data.acak.id.ayat;
     const ket = `` $ {hs} `.replace (sr, '');
     let result = `[$ {ket}] $ {res.data.acak.ar.text} \ n \ n $ {res.data.acak.id.text} (QS. $ {res.data.surat.name  }, Parágrafo $ {ket}) `;
     conn.sendMessage (id, resultado, MessageType.text);
 })
 }
 if (text.includes (". namaninja")) {
 const text = text.replace (/. nome: /, "")
 axios.get (`https://api.terhambar.com/ninja?nama=$ {text}`) .then ((res) => {
 conn.sendMessage (id, '[WAIT] Pesquisando ... ❗', MessageType.text)
     let result = `Seu nome Ninja🙂: \ n \ n $ {res.message.data.result}`;
     conn.sendMessage (id, resultado, MessageType.text);
 })
 }
 if (text == '#help') {
 const corohelp = await get.get ('https://covid19.mathdro.id/api/countries/id') .json ()
 var data = nova data ();
 var year = date.getFullYear ();
 var mês = data.getMonth ();
 var date = date.getDate ();
 var day = date.getDay ();
 var jam = date.getHours ();
 var minutos = date.getMinutes ();
 var segundos = date.getSeconds ();
 switch (dia) {
  caso 0: dias = "domingo";  pausa;
  caso 1: dia = "segunda-feira";  pausa;
  caso 2: dia = "terça";  pausa;
  caso 3: dia = "quarta-feira";  pausa;
  caso 4: dia = "quinta-feira";  pausa;
  caso 5: dias = "sexta-feira";  pausa;
  caso 6: dia = "sábado";  pausa;
 }
 mudar (mês) {
  caso 0: mês = "janeiro";  pausa;
  caso 1: mês = "fevereiro";  pausa;
  caso 2: mês = "março";  pausa;
  caso 3: mês = "abril";  pausa;
  caso 4: mês = "maio";  pausa;
  caso 5: mês = "junho";  pausa;
  caso 6: mês = "julho";  pausa;
  caso 7: mês = "agosto";  pausa;
  caso 8: mês = "setembro";  pausa;
  caso 9: mês = "outubro";  pausa;
  caso 10: mês = "novembro";  pausa;
  caso 11: mês = "dezembro";  pausa;
 }
 var pareceData = "DATA:" + dia + "," + data + "" + mês + "" + ano;
 var display Time = "HORA:" + hora + ":" + minuto + ":" + segundo;
 conn.sendMessage (id, menu.menu (id, BotName, corohelp, showDate, showTime, Instagramlu, whatsapplu, whenbotactive, grupch1, grupch2), MessageType.text);
 }
 else if (text == '#doar') {
 const corohelp = await get.get ('https://covid19.mathdro.id/api/countries/id') .json ()
 var data = nova data ();
 var year = date.getFullYear ();
 var mês = data.getMonth ();
 var date = date.getDate ();
 var day = date.getDay ();
 var jam = date.getHours ();
 var minutos = date.getMinutes ();
 var segundos = date.getSeconds ();
 switch (dia) {
  caso 0: dias = "domingo";  pausa;
  caso 1: dia = "segunda-feira";  pausa;
  caso 2: dia = "terça";  pausa;
  caso 3: dia = "quarta-feira";  pausa;
  caso 4: dia = "quinta-feira";  pausa;
  caso 5: dias = "sexta-feira";  pausa;
  caso 6: dia = "sábado";  pausa;
 }
 mudar (mês) {
  caso 0: mês = "janeiro";  pausa;
  caso 1: mês = "fevereiro";  pausa;
  caso 2: mês = "março";  pausa;
  caso 3: mês = "abril";  pausa;
  caso 4: mês = "maio";  pausa;
  caso 5: mês = "junho";  pausa;
  caso 6: mês = "julho";  pausa;
  caso 7: mês = "agosto";  pausa;
  caso 8: mês = "setembro";  pausa;
  caso 9: mês = "outubro";  pausa;
  caso 10: mês = "novembro";  pausa;
  caso 11: mês = "dezembro";  pausa;
 }
 var pareceData = "DATA:" + dia + "," + data + "" + mês + "" + ano;
 var display Time = "HORA:" + hora + ":" + minuto + ":" + segundo;
 conn.sendMessage (id, donate.donate (id, BotName, corohelp, showDate, showTime, Instagramlu, whatsapplu, whenbotactive, grupch1, grupch2, grupch3), MessageType.text);
 }
 else if (text == '# donation') {
 const corohelp = await get.get ('https://covid19.mathdro.id/api/countries/id') .json ()
 var data = nova data ();
 var year = date.getFullYear ();
 var mês = data.getMonth ();
 var date = date.getDate ();
 var day = date.getDay ();
 var jam = date.getHours ();
 var minutos = date.getMinutes ();
 var segundos = date.getSeconds ();
 switch (dia) {
  caso 0: dias = "domingo";  pausa;
  caso 1: dia = "segunda-feira";  pausa;
  caso 2: dia = "terça";  pausa;
  caso 3: dia = "quarta-feira";  pausa;
  caso 4: dia = "quinta-feira";  pausa;
  caso 5: dias = "sexta-feira";  pausa;
  caso 6: dia = "sábado";  pausa;
 }
 mudar (mês) {
  caso 0: mês = "janeiro";  pausa;
  caso 1: mês = "fevereiro";  pausa;
  caso 2: mês = "março";  pausa;
  caso 3: mês = "abril";  pausa;
  caso 4: mês = "maio";  pausa;
  caso 5: mês = "junho";  pausa;
  caso 6: mês = "julho";  pausa;
  caso 7: mês = "agosto";  pausa;
  caso 8: mês = "setembro";  pausa;
  caso 9: mês = "outubro";  pausa;
  caso 10: mês = "novembro";  pausa;
  caso 11: mês = "dezembro";  pausa;
 }
 var pareceData = "DATA:" + dia + "," + data + "" + mês + "" + ano;
 var display Time = "HORA:" + hora + ":" + minuto + ":" + segundo;
 conn.sendMessage (id, donate.donate (id, BotName, corohelp, showDate, showTime, Instagramlu, whatsapplu, whenbotactive, grupch1, grupch2, grupch3), MessageType.text);
 }
 else if (text == '#DONATE') {
 const corohelp = await get.get ('https://covid19.mathdro.id/api/countries/id') .json ()
 var data = nova data ();
 var year = date.getFullYear ();
 var mês = data.getMonth ();
 var date = date.getDate ();
 var day = date.getDay ();
 var jam = date.getHours ();
 var minutos = date.getMinutes ();
 var segundos = date.getSeconds ();
 switch (dia) {
  caso 0: dias = "domingo";  pausa;
  caso 1: dia = "segunda-feira";  pausa;
  caso 2: dia = "terça";  pausa;
  caso 3: dia = "quarta-feira";  pausa;
  caso 4: dia = "quinta-feira";  pausa;
  caso 5: dias = "sexta-feira";  pausa;
  caso 6: dia = "sábado";  pausa;
 }
 mudar (mês) {
  caso 0: mês = "janeiro";  pausa;
  caso 1: mês = "fevereiro";  pausa;
  caso 2: mês = "março";  pausa;
  caso 3: mês = "abril";  pausa;
  caso 4: mês = "maio";  pausa;
  caso 5: mês = "junho";  pausa;
  caso 6: mês = "julho";  pausa;
  caso 7: mês = "agosto";  pausa;
  caso 8: mês = "setembro";  pausa;
  caso 9: mês = "outubro";  pausa;
  caso 10: mês = "novembro";  pausa;
  caso 11: mês = "dezembro";  pausa;
 }
 var pareceData = "DATA:" + dia + "," + data + "" + mês + "" + ano;
 var display Time = "HORA:" + hora + ":" + minuto + ":" + segundo;
 conn.sendMessage (id, donate.donate (id, BotName, corohelp, showDate, showTime, Instagramlu, whatsapplu, whenbotactive, grupch1, grupch2, grupch3), MessageType.text);
 }
 else if (text == '#DONATE') {
   const corohelp = await get.get ('https://covid19.mathdro.id/api/countries/id') .json ()
 var data = nova data ();
 var year = date.getFullYear ();
 var mês = data.getMonth ();
 var date = date.getDate ();
 var day = date.getDay ();
 var jam = date.getHours ();
 var minutos = date.getMinutes ();
 var segundos = date.getSeconds ();
 switch (dia) {
  caso 0: dias = "domingo";  pausa;
  caso 1: dia = "segunda-feira";  pausa;
  caso 2: dia = "terça";  pausa;
  caso 3: dia = "quarta-feira";  pausa;
  caso 4: dia = "quinta-feira";  pausa;
  caso 5: dias = "sexta-feira";  pausa;
  caso 6: dia = "sábado";  pausa;
 }
 mudar (mês) {
  caso 0: mês = "janeiro";  pausa;
  caso 1: mês = "fevereiro";  pausa;
  caso 2: mês = "março";  pausa;
  caso 3: mês = "abril";  pausa;
  caso 4: mês = "maio";  pausa;
  caso 5: mês = "junho";  pausa;
  caso 6: mês = "julho";  pausa;
  caso 7: mês = "agosto";  pausa;
  caso 8: mês = "setembro";  pausa;
  caso 9: mês = "outubro";  pausa;
  caso 10: mês = "novembro";  pausa;
  caso 11: mês = "dezembro";  pausa;
 }
 var pareceData = "DATA:" + dia + "," + data + "" + mês + "" + ano;
 var display Time = "HORA:" + hora + ":" + minuto + ":" + segundo;
 conn.sendMessage (id, donate.donate (id, BotName, corohelp, showDate, showTime, Instagramlu, whatsapplu, whenbotactive, grupch1, grupch2, grupch3), MessageType.text);
 }
 else if (text == '#info') {
   const corohelp = await get.get ('https://covid19.mathdro.id/api/countries/id') .json ()
 var data = nova data ();
 var year = date.getFullYear ();
 var mês = data.getMonth ();
 var date = date.getDate ();
 var day = date.getDay ();
 var jam = date.getHours ();
 var minutos = date.getMinutes ();
 var segundos = date.getSeconds ();
 switch (dia) {
  caso 0: dias = "domingo";  pausa;
  caso 1: dia = "segunda-feira";  pausa;
  caso 2: dia = "terça";  pausa;
  caso 3: dia = "quarta-feira";  pausa;
  caso 4: dia = "quinta-feira";  pausa;
  caso 5: dias = "sexta-feira";  pausa;
  caso 6: dia = "sábado";  pausa;
 }
 mudar (mês) {
  caso 0: mês = "janeiro";  pausa;
  caso 1: mês = "fevereiro";  pausa;
  caso 2: mês = "março";  pausa;
  caso 3: mês = "abril";  pausa;
  caso 4: mês = "maio";  pausa;
  caso 5: mês = "junho";  pausa;
  caso 6: mês = "julho";  pausa;
  caso 7: mês = "agosto";  pausa;
  caso 8: mês = "setembro";  pausa;
  caso 9: mês = "outubro";  pausa;
  caso 10: mês = "novembro";  pausa;
  caso 11: mês = "dezembro";  pausa;
 }
 var pareceData = "DATA:" + dia + "," + data + "" + mês + "" + ano;
 var display Time = "HORA:" + hora + ":" + minuto + ":" + segundo;
 conn.sendMessage (id, info.info (id, BotName, corohelp, showDate, showTime, Instagramlu, whatsapplu, whenbotactive, grupch1, grupch2), MessageType.text);
 }
 else if (text == '.foto') {
 conn.sendMessage (id, 'enviar .foto menina / menino \ n \ nExemplo: .foto menina', MessageType.text);
 }
    if (messageType == 'imageMessage')
    {
       let caption = imageMessage.caption.toLocaleLowerCase ()
       const buffer = await conn.downloadMediaMessage (m) // para descriptografar e usar como buffer
       if (legenda == '.sticker')
       {
          const sticker = await conn.downloadAndSaveMediaMessage (m) // para descriptografar e salvar em arquivo

          const
          {
             exec
          } = requer ("child_process");
          exec ('cwebp -q 50' + adesivo + '-o temp /' + jam + '.webp', (erro, stdout, stderr) =>
          {
             deixe stick = fs.readFileSync ('temp /' + hora + '.webp')
             conn.sendMessage (id, stick, MessageType.sticker)
          });
       }
    }

    if (messageType === MessageType.text)
    {
       let is = m.message.conversation.toLocaleLowerCase ()

       if (is == '.pantun')
       {

          fetch ('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
             .então (res => res.text ())
             .então (corpo =>
             {
                let tod = body.split ("\ n");
                deixe pjr = tod [Math.floor (Math.random () * tod.length)];
                deixe pantun = pjr.replace (/ pjrx-line / g, "\ n");
                conn.sendMessage (id, pantun, MessageType.text)
             });
       }

    }
    if (text.includes (". covid"))
    {
 const get = require ('got')
     const body = await get.post ('https://api.kawalcorona.com/indonesia', {

     }). json ();
     var = (corpo [0] ['positivo'] positivo);
     var curado = (corpo [0] ['recuperado']);
     var morreu = (corpo [0] ['morreu']);
     var tratado = (corpo [0] ['tratado']);
     console.log (body [0] ['nome'])
     conn.sendMessage (id, `🔎ÚLTIMO DISTRITO DE COVID-19 NA INDONÉSIA🔍 \ n \ n📈Positive ==> $ {positive} \ n📉healed ==> $ {recover} \ n sembuhMorte ==> $ {  morreu} \ n🗒️Treated ==> $ {tratado} `, MessageType.text);
 }
    if (text.includes (". aspas"))
    {
       var url = 'https://jagokata.com/kata-bijak/acak.html'
       axios.get (url)
          .então ((resultado) =>
          {
             let $ = cheerio.load (result.data);
             var author = $ ('a [class = "auteurfbnaam"]'). contents (). first (). text ();
             var word = $ ('q [class = "fbquote"]'). contents (). first (). text ();

             conn.sendMessage (
                Eu iria,
                `
 _ $ {palavra} _
        
    
 * ~ $ {author} *
          `, MessageType.text
             );

          });
    }
   
    if (text.includes (". hentai"))
    {
     var items = ["nsfwneko", "anime hentai"];
     var anim = items [Math.floor (Math.random () * items.length)];
     var url = "https://api.computerfreaker.cf/v1/";
    
     axios.get (url)
       .então ((resultado) => {
         var b = JSON.parse (JSON.stringify (result.data));
         var anim = b [Math.floor (Math.random () * b.length)];
         imageToBase64 (anim) // Caminho para a imagem
         .então (
             (resposta) => {
 var buf = Buffer.from (resposta, 'base64');  // Ta-da
               conn.sendMessage (
             Eu iria,
               buf, MessageType.image)
       
             }
         )
         .pegar (
             (erro) => {
                 console.log (erro);  // Registra um erro, se houver
             }
         )
    
     });
     }


   
    if (text.includes (". loli"))
    {
     var items = ["anime loli", "anime loli sange", "anime loli fackgirll", "anime loli eu te amo"];
     var nime = items [Math.floor (Math.random () * items.length)];
     var url = "https://api.fdci.se/rep.php?images=" + nime;
    
     axios.get (url)
       .então ((resultado) => {
         var n = JSON.parse (JSON.stringify (result.data));
         var nimek = n [Math.floor (Math.random () * n.length)];
         imageToBase64 (nimek)
         .então (
             (resposta) => {
 var buf = Buffer.from (resposta, 'base64');
               conn.sendMessage (
             Eu iria,
               buf, MessageType.image)
       
             }
         )
         .pegar (
             (erro) => {
                 console.log (erro);
             }
         )
    
     });
     }
    
 if (text.includes (". Pokémon"))
    {
     var items = ["anime pokemon"];
     var nime = items [Math.floor (Math.random () * items.length)];
     var url = "https://api.fdci.se/rep.php?images=" + nime;
    
     axios.get (url)
       .então ((resultado) => {
         var n = JSON.parse (JSON.stringify (result.data));
         var nimek = n [Math.floor (Math.random () * n.length)];
         imageToBase64 (nimek)
         .então (
             (resposta) => {
 var buf = Buffer.from (resposta, 'base64');
               conn.sendMessage (
             Eu iria,
               buf, MessageType.image)
       
             }
         )
         .pegar (
             (erro) => {
                 console.log (erro);
             }
         )
    
     });
     }

    else if (text.includes (". name"))
   {
     const cheerio = require ('cheerio');
     solicitação const = requer ('solicitação');
     var name = text.split (". name") [1];
     var req = name.replace (/ / g, "+");
     request.get ({
         cabeçalhos: {'content-type': 'application / x-www-form-urlencoded'},
         url: 'http://www.primbon.com/arti_nama.php?nama1='+ req +' & process = + Enviar% 21 + ',
       }, função (erro, resposta, corpo) {
           deixe $ = cheerio.load (corpo);
           var y = $ .html (). split ('significando:') [1];
           var t = y.split ('method = "get">') [1];
           var f = y.replace (t, "");
           var x = f.replace (/ <br \ s * [\ /]?> / gi, "\ n");
           var h = x.replace (/ <[^>] *>? / gm, '');
       console.log ("" + h);
       conn.sendMessage (en,
             `
       O significado do seu nome é
 🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣
          Nome _ * $ {name} * _ $ {h}
         
 🐥🐥🐥🐥🐥🐥🐥🐥🐥🐥🐥🐥🐥
 ,,
  MessageType.text);
   });
   }
   else if (text.includes (". pair")) {
     solicitação const = requer ('solicitação');
     var gh = text.split (". pair") [1];
     var seu nome = gh.split ("&") [0];
     var pair = gh.split ("&") [1];
     request.get ({
         cabeçalhos: {'content-type': 'application / x-www-form-urlencoded'},
         url: 'http://www.primbon.com/kecocok_nama_pasangan.php?nama1='+ seu nome +' & nama2 = '+ parceiro +' & process = + Enviar% 21 + ',

     }, função (erro, resposta, corpo) {
         deixe $ = cheerio.load (corpo);
       var y = $ .html (). split ('<b> ADEQUAÇÃO DOS PARCEIROS POR NOME DO PARCEIRO </b> <br> <br>') [1];
         var t = y.split ('. <br> <br>') [1];
         var f = y.replace (t, "");
         var x = f.replace (/ <br \ s * [\ /]?> / gi, "\ n");
         var h = x.replace (/ <[^>] *>? / gm, '');
         var d = h.replace ("&", '&')
       console.log ("" + d);
       conn.sendMessage (id, `
 🐼🐼🐼🐼🐼🐼🐼🐼🐼
  * Correspondências por nome *
  $ {d}
 🐼🐼🐼🐼🐼🐼🐼🐼🐼
     `, MessageType.text);
   });
   }
    if (text.includes (". foto de menina"))
    {
     var items = ["garota ullzang", "garota bonita", "hijab bonito", "garota coreana", "adolescente bonita", "garota coreana", "garota japonesa"];
     var cewe = items [Math.floor (Math.random () * items.length)];
     var url = "https://api.fdci.se/rep.php?gambar=" + garota;
    
     axios.get (url)
       .então ((resultado) => {
         var b = JSON.parse (JSON.stringify (result.data));
         var chick = b [Math.floor (Math.random () * b.length)];
         imageToBase64 (menina) // Caminho para a imagem
         .então (
             (resposta) => {
     conn.sendMessage (id, '[WAIT] Pesquisando ... ❗', MessageType.text)
 var buf = Buffer.from (resposta, 'base64');  // Ta-da
               conn.sendMessage (
             Eu iria,
               buf, MessageType.image)
       
             }
         )
         .pegar (
             (erro) => {
                 console.log (erro);  // Registra um erro, se houver
             }
         )
    
     });
     }

    if (text.includes (". Foto do menino"))
    {
     var items = ["menino bonito", "cogan", "menino coreano", "menino chinês", "menino japonês", "menino indo bonito", "menino coreano"];
     var cowo = items [Math.floor (Math.random () * items.length)];
     var url = "https://api.fdci.se/rep.php?gambar=" + cara;
    
     axios.get (url)
       .então ((resultado) => {
         var z = JSON.parse (JSON.stringify (result.data));
         var guy = z [Math.floor (Math.random () * z.length)];
         imageToBase64 (cara)
         .então (
             (resposta) => {
   conn.sendMessage (id, '[WAIT] Pesquisando ... ❗', MessageType.text)
   var buf = Buffer.from (resposta, 'base64');
               conn.sendMessage (
             Eu iria,
               buf, MessageType.image)
       
             }
         )
         .pegar (
             (erro) => {
                 console.log (erro);
             }
         )
    
     });
     }

 if (text.includes (". fotoanime"))
    {
     var items = ["anime girl", "cute anime", "anime", "anime esthetic", "anime hd", "anime hd pictures"];
     var nime = items [Math.floor (Math.random () * items.length)];
     var url = "https://api.fdci.se/rep.php?images=" + nime;
    
     axios.get (url)
       .então ((resultado) => {
         var n = JSON.parse (JSON.stringify (result.data));
         var nimek = n [Math.floor (Math.random () * n.length)];
         imageToBase64 (nimek)
         .então (
             (resposta) => {
     conn.sendMessage (id, '[WAIT] Pesquisando ... ❗', MessageType.text)
 var buf = Buffer.from (resposta, 'base64');
               conn.sendMessage (
             Eu iria,
               buf, MessageType.image)
       
             }
         )
         .pegar (
             (erro) => {
                 console.log (erro);
             }
         )
    
     });
     }
 
 if (text.includes (". lyrics")) {
 const text = text.split (". lyrics") [1]
 axios.get (`` http://scrap.terhambar.com/lirik?word=$ {text} `) .then ((res) => {
 conn.sendMessage (id, '[WAIT] Pesquisando ... ❗', MessageType.text)
 let result = `` letras de músicas🎶 $ {text} \ n \ n \ n $ {res.data.result.lly} `
 conn.sendMessage (id, resultado, MessageType.text)
 })
 }
 if (text.includes (". alay")) {
 const alay = text.split (". alay") [1]
 axios.get (`` https://api.terhambar.com/bpk?kata=$ {alay} `). então ((res) =>
 {let result = `$ {res.data.text}`
 conn.sendMessage (id, resultado, MessageType.text)
 })
 }

 // Por favor mano, não mude para RIDHO SETIAWAN

 })
