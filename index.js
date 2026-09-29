require("dotenv").config();
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const pino = require("pino");
const config = require("./config");
const fs = require("fs");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(config.SESSION_DIR);
  
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    browser: [config.BOT_NAME, "Chrome", "1.0.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    
    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        console.log("Reconnexion...");
        startBot();
      }
    } else if (connection === "open") {
      console.log("✅ MADO-BOT connecté !");
    }
  });

  // Demande code pair après 3 secondes
  if (!sock.authState.creds.registered) {
    await new Promise(r => setTimeout(r, 3000));
    const num = process.env.OWNER_NUMBER || config.OWNER_NUMBER;
    const phoneNumber = (num || "").replace(/[^0-9]/g, "");
    if (!phoneNumber) {
      console.log("❌ Mets OWNER_NUMBER dans .env");
      return;
    }
    console.log(`\n📱 Demande du code pair pour: ${phoneNumber}...`);
    try {
      const code = await sock.requestPairingCode(phoneNumber);
      console.log(`\n\n========================`);
      console.log(`✅ CODE: ${code}`);
      console.log(`========================\n`);
      console.log(`WhatsApp > Appareils liés > Lier avec numéro\n`);
    } catch (e) {
      console.log("Erreur:", e.message);
      console.log("Relance: node index.js");
    }
  }

  // Essaie de charger les commandes si elles existent
  try {
    const files = fs.readdirSync("./lib");
    console.log("Fichiers lib trouvés:", files);
  } catch {}
}

startBot();
