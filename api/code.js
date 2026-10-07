const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
const P = require('pino')
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let num = (req.query.number || '').replace(/[^0-9]/g,'')
  if(!num) return res.status(400).json({error:"Numéro manquant"})
  try{
    const { version } = await fetchLatestBaileysVersion()
    const { state, saveCreds } = await useMultiFileAuthState('/tmp/session-'+num)
    const sock = makeWASocket({version, logger:P({level:'silent'}), auth:state, browser:["Windows","Chrome","Chrome 114.0.5735.198"]})
    sock.ev.on("creds.update", saveCreds)
    await new Promise(r=>setTimeout(r,3000))
    let code = await sock.requestPairingCode(num)
    return res.json({code: code.slice(0,4)+" - "+code.slice(4)})
  }catch(e){
    return res.json({error:e.message})
  }
}
