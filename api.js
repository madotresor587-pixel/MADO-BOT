const { Telegraf, Markup } = require('telegraf')
const BOT_TOKEN='8273211972:AAHVyAQJCIWzzFlM_13G9AXv2b-hAA3QsBc'
const GROUP='https://t.me/+Ehe3ZpuhBuJlMDk0'
const CHANNEL='https://t.me/madodev'
const OWNER='https://t.me/MadoPhantomAI'
const bot=new Telegraf(BOT_TOKEN)

function ia(txt,name){
 txt=(txt||'').toLowerCase()
 if(txt.includes('continent')) return `🌍 L'Asie ${name}! 44M km²!`
 const r=[`Yo ${name}! 🔥 J'ai capté "${txt.slice(0,20)}"`,`Wesh ${name} 😎 Bien vu!`,`Ah ouais ${name}? 💥 "${txt.slice(0,20)}" c'est lourd!`,`Compris ${name}! 👊`]
 return r[Math.floor(Math.random()*r.length)]
}

const startBtn=Markup.inlineKeyboard([[Markup.button.url('👥 GROUP',GROUP),Markup.button.url('📢 CHANNEL',CHANNEL)],[Markup.button.url('👑 OWNER',OWNER)],[Markup.button.callback('📜 /menu','open_menu')]])
const menuBtn=Markup.inlineKeyboard([[Markup.button.callback('💬 /ai','b_ai'),Markup.button.callback('🎨 /image','b_img')],[Markup.button.callback('📱 /pair','b_pair'),Markup.button.callback('⏰ /runtime','b_run')],[Markup.button.url('👥 GROUP',GROUP),Markup.button.url('📢 CHANNEL',CHANNEL)]])

bot.start((ctx)=>ctx.reply('🔥 MADO V5 VERCEL 24H/24\nTape /menu\nJe marche même tel éteint!',startBtn))
bot.command('menu',(ctx)=>ctx.reply('📜 MENU:\n/ai - Chat auto\n/image - Image\n/pair - WhatsApp\nJe parle sans code et avec code!',menuBtn))
bot.on('text',(ctx)=>{
 if(ctx.message.text.startsWith('/')) return
 return ctx.reply(ia(ctx.message.text,ctx.from.first_name),{reply_to_message_id:ctx.message.message_id})
})

module.exports = async (req,res)=>{
 try{ await bot.handleUpdate(req.body); res.status(200).send('OK') }
 catch(e){ console.error(e); res.status(200).send('OK') }
}
