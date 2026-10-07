module.exports = {
 name: "mado",
 alias: ["owner", "support", "groupe", "chaine", "channel", "contact"],
 desc: "Contact owner + liens officiels MADO-BOT",
 async exec(sock, m, args) {
  const ownerNumber = "2250153448840";
  const ownerJid = "2250153448840@s.whatsapp.net";
  
  const groupLink = "https://chat.whatsapp.com/GbvoGtEMTfxEyay5NaWBN5";
  const channelLink = "https://whatsapp.com/channel/0029VbDkkjpEKyZGyXXIUK45";
  const pairingSite = "https://mado-bot.vercel.app";

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:MADO-BOT OWNER 👑
ORG:MADO-BOT;
TEL;type=CELL;type=VOICE;waid=${ownerNumber}:+${ownerNumber}
END:VCARD`;

  // Envoie le contact cliquable
  await sock.sendMessage(m.chat, { 
    contacts: { 
      displayName: "MADO-BOT OWNER", 
      contacts: [{ vcard }] 
    } 
  });

  const text = `*👑 MADO-BOT OFFICIEL 👑*

*📞 OWNER DIRECT :*
wa.me/${ownerNumber} - *Clique pour me contacter*

*👥 GROUPE OFFICIEL :*
${groupLink}

*📢 CHAÎNE OFFICIELLE :*
${channelLink}

*🌐 SITE PAIRING :*
${pairingSite}

_Tape .menu pour voir toutes les commandes_`;

  await sock.sendMessage(m.chat, { 
    text: text,
    contextInfo: {
      externalAdReply: {
        title: "MADO-BOT SUPPORT",
        body: "Contacte le propriétaire",
        thumbnailUrl: "https://i.imgur.com/8Km9tLL.png",
        sourceUrl: channelLink,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
 }
}
