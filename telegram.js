const { Telegraf, Markup } = require('telegraf')
const http = require('http')
const BOT_TOKEN='8273211972:AAHVyAQJCIWzzFlM_13G9AXv2b-hAA3QsBc'
const GROUP='https://t.me/+Ehe3ZpuhBuJlMDk0'
const CHANNEL='https://t.me/madodev'
const OWNER='https://t.me/MadoPhantomAI'
const bot=new Telegraf(BOT_TOKEN)

// SERVEUR WEB POUR RESTER ONLINE MEME TEL ETEINT SUR RENDER/KOYEB
http.createServer((req,res)=>res.end('MADO-BOT V5 ONLINE 🔥')).listen(process.env.PORT||3000,()=>console.log('WEB OK'))

function ia(txt,name){
 txt=txt.toLowerCase()
 const r=[
  `Yo ${name}! 🔥 J'ai capté "${txt.slice(0,20)}"`,
  `Wesh ${name} 😎 Bien vu!`,
  `Ah ouais ${name}? 💥 "${txt.slice(0,20)}" c'est lourd!`,
  `Compris ${name}! 👊 On gère!`
 ]
 if(txt.includes('continent')) return `🌍 L'Asie ${name}!`
 return r[Math.floor(Math.random()*r.length)]
}

const startBtn=Markup.inlineKeyboard([[Markup.button.url('👥 GROUP',GROUP),Markup.button.url('📢 CHANNEL',CHANNEL)],[Markup.button.url('👑 OWNER',OWNER)],[Markup.button.callback('📜 /menu','open_menu')]])
const menuBtn=Markup.inlineKeyboard([[Markup.button.callback('💬 /ai','b_ai'),Markup.button.callback('🎨 /image','b_img')],[Markup.button.callback('💻 /code','b_code'),Markup.button.callback('🌐 /translate','b_tr')],[Markup.button.callback('📱 /pair','b_pair'),Markup.button.callback('⏰ /runtime','b_run')],[Markup.button.url('👥 GROUP',GROUP),Markup.button.url('📢 CHANNEL',CHANNEL)]])

bot.start((ctx)=>ctx.reply('🔥 MADO V5 AUTONOME 24H/24\nTape /menu',startBtn))
bot.command('menu',(ctx)=>ctx.reply('📜 MENU:\n/ai - Chat\n/image - Image\n/pair - WhatsApp\nTape ce que tu veux je réponds auto!',menuBtn))
bot.command('ai',(ctx)=>ctx.reply(ia(ctx.message.text.replace('/ai',''),ctx.from.first_name)))
bot.command('pair',(ctx)=>ctx.reply('Tape /pair 225...'))
bot.action('open_menu',(ctx)=>{ctx.answerCbQuery();ctx.reply('📜 MENU',menuBtn)})
bot.on('text',async(ctx)=>{
 if(ctx.message.text.startsWith('/')) return
 await ctx.sendChatAction('typing')
 return ctx.reply(ia(ctx.message.text,ctx.from.first_name),{reply_to_message_id:ctx.message.message_id})
})
bot.launch().then(()=>console.log('✅ MADO 24H ONLINE READY FOR CLOUD'))
