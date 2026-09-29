require("dotenv").config();
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const pino = require("pino");
const config = require("./config");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(config.SESSION_DIR);
  
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    browser: [config.BOT_NAME, "Chrome", "1.0.0"]
  });

  // Si pas encore connecté, demande le code pair
  if (!sock.authState.creds.registered) {
    const num = process.env.OWNER_NUMBER || config.OWNER_NUMBER;
    if (!num) {
      console.log("❌ Mets ton numéro dans .env : OWNER_NUMBER=2250700000000");
      return;
    }
    const phoneNumber = num.replace(/[^0-9]/g, "");
    console.log(`\n📱 Demande du code pair pour: ${phoneNumber}...`);
    try {
      const code = await sock.requestPairingCode(phoneNumber);
      console.log(`\n✅ TON CODE PAIR MADO-BOT: ${code}`);
      console.log(`Va sur WhatsApp > Appareils liés > Lier un appareil > Lier avec numéro de téléphone\n`);
    } catch (e) {
      console.log("Erreur code pair:", e.message);
    }
  }

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) startBot();
    } else if (connection === "open") {
      console.log("✅ MADO-BOT connecté !");
    }
  });

  // Charge les commandes
  try {
    const handler = require("./lib/handler");
    sock.ev.on("messages.upsert", async (m) => handler(sock, m));
  } catch (e) {
    console.log("Handler non trouvé dans lib, le bot est connecté mais sans commandes. Mets le dossier lib correct.");
    console.log(e.message);
  }
}

startBot();
