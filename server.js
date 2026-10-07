const express = require('express')
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
const P = require('pino')
const app = express()

app.get('/', (req,res)=>{
  res.send(`
<!DOCTYPE html>
<html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body{margin:0;background:#0a0a0f;color:#fff;font-family:sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;background:radial-gradient(circle at 20% 30%, #4c1d95 0%, #0a0a0f 60%)}
.card{width:90%;max-width:380px;background:#16161f;border:1px solid #7c3aed33;border-radius:24px;padding:24px;box-shadow:0 0 60px #7c3aed55}
.logo{display:flex;align-items:center;gap:10px;font-weight:900;font-size:22px}
.logo span{background:#7c3aed;padding:8px 12px;border-radius:12px}
h2{margin:24px 0 8px;font-size:24px}
p{color:#999;font-size:13px}
input{width:100%;padding:14px;border-radius:12px;border:1px solid #7c3aed66;background:#0f0f16;color:#fff;margin:16px 0;box-sizing:border-box}
button{width:100%;padding:14px;border:none;border-radius:12px;background:#22c55e;color:#fff;font-weight:700;font-size:16px;cursor:pointer}
.codebox{margin-top:20px;border:1.5px dashed #7c3aed99;border-radius:16px;padding:18px;text-align:center;background:#1e1e2f}
.code{font-size:28px;letter-spacing:3px;color:#a78bfa;font-weight:900}
.small{margin-top:12px;font-size:11px;color:#888;text-align:center}
</style></head>
<body>
<div class="card">
<div class="logo"><span>🤖</span> MADO-BOT</div>
<h2>Link Your WhatsApp</h2>
<p>Entre ton numéro pour générer ton pairing code</p>
<input id="num" placeholder="2250153448840" value="2250153448840">
<button onclick="getCode()">🔗 Obtenir le code</button>
<div class="codebox"><div id="code" class="code">---- ----</div></div>
<div id="msg" class="small">Le code expire dans 30 sec • WhatsApp > Appareils liés > Lier avec numéro</div>
</div>
<script>
async function getCode(){
 let n=document.getElementById('num').value
 document.getElementById('code').innerText="..."
 let r=await fetch('/code?number='+n)
 let d=await r.json()
 document.getElementById('code').innerText=d.code || d.error
}
</script>
</body></html>`)
})
app.get('/code', async (req,res)=>{
  let num = req.query.number?.replace(/[^0-9]/g,'')
  try{
    const { version } = await fetchLatestBaileysVersion()
    const { state, saveCreds } = await useMultiFileAuthState('./session-'+num)
    const sock = makeWASocket({version, logger:P({level:'silent'}), auth:state, browser:["Windows","Chrome","Chrome 114.0.5735.198"]})
    sock.ev.on("creds.update", saveCreds)
    await new Promise(r=>setTimeout(r,4000))
    let code = await sock.requestPairingCode(num)
    res.json({code: code.slice(0,4)+" - "+code.slice(4)})
  }catch(e){ res.json({error:e.message}) }
})
app.listen(3000, ()=>console.log("MADO JOLI LANCE SUR http://localhost:3000"))
