const express = require('express');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
  <html><body style="font-family:sans-serif;text-align:center;padding:50px;background:#111;color:#fff">
  <h1>MADO-BOT - Pair Code</h1>
  <input id="num" placeholder="2250700000000" style="padding:15px;width:250px;font-size:18px">
  <button onclick="getCode()" style="padding:15px;background:#25D366;color:#fff;border:none;font-size:18px">Obtenir Code</button>
  <h2 id="code" style="margin-top:30px;font-size:40px;letter-spacing:5px"></h2>
  <script>
  async function getCode(){
    const number = document.getElementById('num').value;
    document.getElementById('code').innerText = "Génération...";
    const res = await fetch('/pair?number='+number);
    const data = await res.json();
    document.getElementById('code').innerText = data.code || data.error;
  }
  </script>
  </body></html>
  `)
});

app.get('/pair', async (req, res) => {
  let number = req.query.number?.replace(/[^0-9]/g,'');
  if(!number) return res.json({error: "Numéro manquant"});
  
  const sessionDir = '/tmp/' + number;
  if(fs.existsSync(sessionDir)) fs.rmSync(sessionDir, {recursive:true});
  fs.mkdirSync(sessionDir, {recursive:true});
  
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
  const sock = makeWASocket({
    auth: state,
    logger: pino({level:'silent'}),
    printQRInTerminal: false,
    browser: ["MADO-BOT", "Chrome", "1.0"]
  });
  
  sock.ev.on('creds.update', saveCreds);
  
  // Attends 3 sec que le socket se connecte
  await new Promise(r => setTimeout(r, 2000));
  
  if(!sock.authState.creds.registered){
    try{
      const code = await sock.requestPairingCode(number);
      res.json({code});
    }catch(e){
      res.json({error: e.message});
    }
  } else {
    res.json({error: "Déjà enregistré"});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log("Serveur sur port "+PORT));
