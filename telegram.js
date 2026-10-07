const { Telegraf, Markup } = require('telegraf')
const BOT_TOKEN='8273211972:AAHVyAQJCIWzzFlM_13G9AXv2b-hAA3QsBc'
const GROUP='https://t.me/+Ehe3ZpuhBuJlMDk0'
const CHANNEL='https://t.me/madodev'
const OWNER='https://t.me/MadoPhantomAI'
const bot=new Telegraf(BOT_TOKEN)
console.log('🔥 MADO AUTONOME V5 🔥')

// IA AUTONOME - 20 REPONSES DIFFERENTES
function madoIA(txt,name){
 txt=txt.toLowerCase()
 if(txt.includes('continent')) return `🌍 Yo ${name} c'est l'Asie le plus grand! 44 millions km²! T'as fait géo aujourd'hui? 😎`
 if(txt.includes('bot télégramme')||txt.includes('créé un bot')){
  const r=[
   `Yo ${name}! 🔥 Créer un bot c'est facile! 1. Va sur @BotFather 2. /newbot 3. Donne un nom 4. Il te donne un TOKEN! Tu veux que je te guide étape par étape?`,
   `Ah tu veux créer un bot ${name}? 😎 Vas sur @BotFather, tape /newbot, choisis nom + username qui finit par bot! Je peux t'aider pour le code après!`,
   `Créer un bot ${name}? Facile bro! @BotFather > /newbot > nom > username_bot > il te donne token > tu le mets dans ton code! Besoin du code complet?`
  ]
  return r[Math.floor(Math.random()*r.length)]
 }
 if(txt.includes('fais quoi')||txt.includes('tu fais')) return `Je charbonne ${name}! 🔥 Je gère le groupe, je donne les codes WhatsApp /pair, je fais images /image, je cause! Et toi tu fais quoi?`
 if(txt.includes('salut')||txt.includes('yo')||txt.includes('bonjour')||txt.includes('cc')){
  const a=[`Yo ${name}! 🔥 Ça dit quoi?`,`Wesh ${name}! On est là! 😎`,`Salut ${name}! Tranquille?`,`Hey ${name}! MADO-BOT en place! 🔥`]
  return a[Math.floor(Math.random()*a.length)]
 }
 if(txt.includes('ça va')) return `${name} tranquille et toi? On gère! 🔥`
 
 const rep=[
 `Ah ouais ${name}? 😅 "${txt.slice(0,30)}" - Je vois ton délire!`,
 `Bien vu ${name}! 🔥 "${txt.slice(0,30)}" c'est pas faux! T'en penses quoi toi?`,
 `Hmm ${name}... 🧠 "${txt.slice(0,30)}" c'est profond ça! Explique plus!`,
 `Wesh ${name} 😎 Tu m'apprends un truc là! "${txt.slice(0,30)}" j'avais pas vu comme ça!`,
 `Ok ${name}! 👊 J'ai capté! Tu veux qu'on développe sur "${txt.slice(0,25)}"?`,
 `Yo ${name}! 💥 Bonne question sur "${txt.slice(0,25)}"! Moi je dis: faut tester pour savoir!`,
 `Ah ${name}! 👀 "${txt.slice(0,30)}" - Là tu touches un point!`,
 `mdr ${name}! 😂 "${txt.slice(0,30)}" c'est ton avis? Je respecte!`,
 `Compris ${name}! 🔥 On reste focus sur "${txt.slice(0,25)}"!`,
 `Noté ${name}! 📝 "${txt.slice(0,30)}" - On en parle?`
 ]
 return rep[Math.floor(Math.random()*rep.length)]
}

// BOUTON GROUP/CHANNEL/OWNER SEULEMENT POUR /start et /menu
const startBtn = Markup.inlineKeyboard([
 [Markup.button.url('👥 GROUP OFFICIEL',GROUP), Markup.button.url('📢 CHANNEL',CHANNEL)],
 [Markup.button.url('👑 OWNER @MadoPhantomAI',OWNER)],
 [Markup.button.callback('📜 /menu - Voir toutes commandes','open_menu')]
])

const menuBtn = Markup.inlineKeyboard([
 [Markup.button.callback('💬 Chat IA /ai','b_ai'), Markup.button.callback('🎨 Image /image','b_img')],
 [Markup.button.callback('💻 Code /code','b_code'), Markup.button.callback('🌐 Trad /translate','b_tr')],
 [Markup.button.callback('📝 Resume /summ','b_sum'), Markup.button.callback('☁️ Météo /weather','b_we')],
 [Markup.button.callback('🎮 Jeux /play','b_play'), Markup.button.callback('👤 Profil /profile','b_prof')],
 [Markup.button.callback('💰 Balance /balance','b_bal'), Markup.button.callback('🎁 Daily /daily','b_daily')],
 [Markup.button.callback('📱 Pair WhatsApp /pair','b_pair'), Markup.button.callback('⏰ Runtime /runtime','b_run')],
 [Markup.button.url('👥 GROUP',GROUP), Markup.button.url('📢 CHANNEL',CHANNEL)],
 [Markup.button.url('👑 OWNER',OWNER)]
])

bot.start((ctx)=>ctx.reply(
`🔥 MADO-BOT ULTIMATE V5 🔥

Je suis AUTONOME maintenant!
Je parle sans /ai et avec /ai!
20 réponses différentes!

Tape /menu pour voir mes commandes 👇`, startBtn))

bot.command('menu',(ctx)=>ctx.reply(
`📜 MADO MENU - TOUTES COMMANDES

Tape ce que tu veux, je réponds auto!

🤖 /ai [question] - Chat IA
🎨 /image [prompt] - Image FREE
💻 /code [demande] - Code
🌐 /translate [texte] - Trad
📝 /summarize [texte] - Résumé
☁️ /weather [ville] - Météo
🎮 /play - Jeux
👤 /profile - Profil
💰 /balance - Balance
🎁 /daily - Daily
📱 /pair [num] - Code WhatsApp
⏰ /runtime - Uptime
👑 /owner - Boss

Je suis autonome! Plus besoin de code!
`, menuBtn))

bot.command('ai',(ctx)=>{
 const q=ctx.message.text.replace('/ai','').trim()
 if(!q) return ctx.reply('Dis moi quelque chose! Ex: /ai salut')
 // PAS DE BOUTON ICI - JUSTE TEXTE
 ctx.reply(madoIA(q,ctx.from.first_name))
})

bot.command('owner',(ctx)=>ctx.reply(`👑 Boss: @MadoPhantomAI`,Markup.inlineKeyboard([[Markup.button.url('ECRIRE',OWNER)]])))
bot.command('pair',(ctx)=>ctx.reply('Tape: /pair 2250153485727 - Bientôt le code WhatsApp!'))
bot.command('runtime',(ctx)=>ctx.reply(`⏰ Online depuis ${Math.floor(process.uptime()/60)} min 🔥`))

bot.action('open_menu',(ctx)=>{ ctx.answerCbQuery(); ctx.reply('📜 MENU:',menuBtn) })
bot.action(/b_(.+)/,(ctx)=>{ ctx.answerCbQuery(); const m={ai:'/ai salut',img:'/image lion Abidjan',code:'/code fais un bot',tr:'/translate salut',sum:'/summarize texte',we:'/weather Korhogo',play:'/play',prof:'/profile',bal:'/balance',daily:'/daily',pair:'/pair 225...',run:'/runtime'}; ctx.reply(`Tape: ${m[ctx.match[1]]}`) })

// ===== AUTO-TALK AUTONOME SANS BOUTON GROUP/CHANNEL =====
bot.on('text',async(ctx)=>{
 const txt=ctx.message.text
 if(txt.startsWith('/')) return

 // ANTI-LIEN (groupe seulement)
 if(/(https?:\/\/|t\.me|wa\.me|www\.)/i.test(txt) && ctx.chat.type!=='private'){
  try{
   const m=await ctx.telegram.getChatMember(ctx.chat.id,ctx.from.id)
   if(!['creator','administrator'].includes(m.status)){
    await ctx.deleteMessage()
    return ctx.reply('🚫 LIEN INTERDIT! Pas de pub!')
   }
  }catch(e){}
 }

 // REPONSE AUTONOME DIFFERENTE A CHAQUE FOIS - SANS BOUTON GROUP/CHANNEL
 await ctx.sendChatAction('typing')
 await new Promise(r=>setTimeout(r,600))
 const rep=madoIA(txt,ctx.from.first_name)
 // ICI PAS DE BOUTON - JUSTE LE TEXTE POUR EVITER LE SPAM
 return ctx.reply(rep, {reply_to_message_id: ctx.message.message_id})
})

bot.launch().then(()=>console.log('✅ MADO V5 AUTONOME ONLINE - GROUP SEULEMENT SUR /start'))
