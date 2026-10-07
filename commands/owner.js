module.exports = {
 name: "owner",
 async exec(sock, m) {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:MADO-BOT OWNER 👑
TEL;type=CELL;type=VOICE;waid=2250153448840:+2250153448840
END:VCARD`;
  await sock.sendMessage(m.chat, { contacts: { displayName: "MADO-BOT OWNER", contacts: [{ vcard }] } });
  await sock.sendMessage(m.chat, { text: `*👑 MADO-BOT 👑*\n\n*OWNER:* wa.me/2250153448840\n*GROUPE:* https://chat.whatsapp.com/GbvoGtEMTfxEyay5NaWBN5\n*CHAINE:* https://whatsapp.com/channel/0029VbDkkjpEKyZGyXXIUK45` });
 }
}
