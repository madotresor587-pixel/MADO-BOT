const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
const P = require('pino')

async function startBot(){
  const { version } = await fetchLatestBaileysVersion()
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const sock = makeWASocket({
    version,
    logger: P({level:'silent'}),
    auth: state,
    printQRInTerminal: false,
    browser: ["Windows","Chrome","Chrome 114.0.5735.198"],
  })
  sock.ev.on("creds.update", saveCreds)

  if(!state.creds.registered){
    console.log("Connexion à WhatsApp en cours... patiente 8 secondes")
    // ATTEND QUE LE SOCKET SOIT VRAIMENT OUVERT
    await new Promise(r=>setTimeout(r,8000))
    
    let retries = 3
    while(retries > 0){
      try{
        let code = await sock.requestPairingCode("2250153448840")
        console.log("\n================ MADO CODE ================")
        console.log(" NUMERO: 2250153448840")
        console.log(" CODE  : " + code.slice(0,4)+"-"+code.slice(4))
        console.log("===========================================")
        console.log(" Va vite sur WhatsApp > Appareils liés > Lier avec numéro\n")
        break
      }catch(e){
        console.log("WhatsApp pas prêt, je réessaye... ("+e.message+")")
        retries--
        await new Promise(r=>setTimeout(r,5000))
      }
    }
  }

  sock.ev.on("connection.update", ({connection})=>{
    if(connection==="open"){
      console.log("\n✅✅✅ MADO CONNECTÉ 2250153448840 ! ✅✅✅\n")
    }
  })
}
startBot()
