/**
 * Created by InvincibleDudu on 6/25/2022 at 15:41
 */

const { createClient } = require("oicq")
const account = 1015850524
const client = createClient(account)
const group = client.pickGroup(208557053)

Array.prototype.random = function () {
   return this[Math.floor((Math.random()*this.length))];
}

client.on("system.online", () => {
   console.log('Logged in!')
})

client.on("message", e => {
   console.log(e)
   const msg = e.raw_message
   if (e.group_id === 208557053) {
      // group.sendMsg(e.user_id + ' said: ' + e.raw_message)
      if (msg === '抽奖') {
         const duration = Math.random() * 100 / 2
         group.muteMember(e.user_id, duration)
         group.sendMsg('恭喜您抽中' + duration.toFixed(0) + '秒')
      }
   }
   if (e.atme) {
      if (msg.includes('来点团语')) {
         const list = ['伐桑班？', '切饱了', '伐困高？', '来侬则文', '钢铝？', '组忙', '老早晓得了']
         client.pickGroup(e.group_id).sendMsg(list.random())
         return
      }
      const m = msg.replace('@UnrealDudu', '').replace('@PS UnrealDudu', '').replace('吗？', '！').replace('吗', '').replace('？', '！').replace('?', '!')
      client.pickGroup(e.group_id).sendMsg(m)
   }

//    e.reply("hello world", true) //true表示引用对方的消息
})

client.on("system.login.qrcode", function () {
   //扫码后按回车登录
   process.stdin.once("data", () => {
      this.login()
   })
}).login()
// group.sendMsg('hello world')
