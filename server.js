const express = require('express');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const app = express();

app.get('/', (req,res)=>{
res.send(`
<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>MADO-BOT PAIR</title></head>
<body style="font-family:sans-serif;background:#0a0a0a;color:#fff;text-align:center;padding:30px">
<h1 style="color:#25D366">MADO-BOT</h1><p>Générateur de code pair</p>
<input id="num" placeholder="2250153448840" style="padding:15px;width:80%;max-width:300px;border-radius:10px;border:none;font-size:18px"><br><br>
<button onclick="getCode()" style="padding:15px 30px;background:#25D366;color:#fff;border:none;border-radius:10px;font-size:18px;font-weight:bold">OBTENIR CODE</button>
<h2 id="code" style="margin-top:40px;font-size:32px;letter-spacing:4px;color:#25D366"></h2><p id="msg"></p>
<script>
async function getCode(){
  let n=document.getElementById('num').value;
  if(!n) return alert('Mets ton numéro');
  document.getElementById('code').innerText='⏳ Génération...';
  let r=await fetch('/pair?number='+n);
  let d=await r.json();
  if(d.code){ document.getElementById('code').innerText=d.code; document.getElementById('msg').innerText='WhatsApp > Appareils liés > Lier avec numéro'; }
  else document.getElementById('code').innerText=d.error;
}
</script></body></html>`);
});

app.get('/pair', async (req,res)=>{
  let number=(req.query.number||'').replace(/[^0-9]/g,'');
  if(!number) return res.json({error:'Numéro manquant'});
  const dir='/tmp/'+number;
  if(fs.existsSync(dir)) fs.rmSync(dir,{recursive:true,force:true});
  fs.mkdirSync(dir,{recursive:true});
  const {state,saveCreds}=await useMultiFileAuthState(dir);
  const sock=makeWASocket({auth:state,logger:pino({level:'silent'}),printQRInTerminal:false,browser:['MADO-BOT','Chrome','1.0.0']});
  sock.ev.on('creds.update',saveCreds);
  await new Promise(r=>setTimeout(r,2500));
  try{
    if(!sock.authState.creds.registered){
      let code=await sock.requestPairingCode(number);
      res.json({code});
    } else res.json({error:'Déjà enregistré'});
  }catch(e){ res.json({error:e.message}); }
});

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log('Serveur '+PORT));
