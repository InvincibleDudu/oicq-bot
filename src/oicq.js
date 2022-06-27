/**
 * Created by InvincibleDudu on 6/25/2022 at 15:41
 */

const { createClient } = require('oicq')
const account = 1015850524
const client = createClient(account)
const group = client.pickGroup(208557053)

const noAt = {
   type: 'image',
   file: '7387a0cf7ac175ad1b60fc1fe0200cdd131848-1600-1600.jpg',
   url: 'https://c2cpicdw.qpic.cn/offpic_new/409174690//409174690-2194736641-7387A0CF7AC175AD1B60FC1FE0200CDD/0?term=2',
   asface: false
}

Array.prototype.random = function () {
   return this[Math.floor((Math.random() * this.length))]
}

client.on('system.online', () => {
   console.log('Logged in!')
})

client.on('message', e => {
   console.log(e)
   const msg = e.raw_message
   if (e.group_id === 208557053) {
      // group.sendMsg(e.user_id + ' said: ' + e.raw_message)
      if (msg === '抽奖' || msg === '抽大奖') {
         const big = msg === '抽大奖'
         const duration = big ? Math.random() * 2000 : Math.random() * 100 / 2
         group.muteMember(e.user_id, duration)
         group.sendMsg('恭喜您抽中' + duration.toFixed(0) + '秒')
      }
   }
   if (msg.includes('来点团语')) {
      const list = ['伐桑班？', '切饱了', '伐困高？', '来侬则文', '钢铝？', '组忙', '老早晓得了', '你不看小分队的吗', '这个话题不要再聊了', 'oh?', 1, '再发禁言到明年额', '草票特度？']
      let msgToSend = list.random()
      if (msgToSend === 1) {
         msgToSend = {
            type: 'image',
            file: '6156876f02c490b7c67f4c20505dc89381736-720-720.jpg',
            url: 'https://c2cpicdw.qpic.cn/offpic_new/409174690//409174690-1835409172-6156876F02C490B7C67F4C20505DC893/0?term=2',
            asface: false
         }
      }
      client.pickGroup(e.group_id).sendMsg(msgToSend)
      // return
   } else if (e.atme) {
      let m = msg.replace('@UnrealDudu', '').replace('@PS UnrealDudu', '').replace('吗？', '！').replace('吗', '').replace('？', '').replace('?', '')
      if (m.trim() === '') {
         m = noAt
         client.pickGroup(e.group_id).sendMsg(m)
         return
      }
      m+= '！'
      client.pickGroup(e.group_id).sendMsg(m)
   } else if (msg.includes('@InvincibleDudu') || msg.includes('@PS InvincibleDudu')) {
      client.pickGroup(e.group_id).sendMsg(noAt)
   }

//    e.reply("hello world", true) //true表示引用对方的消息
})

client.on('system.login.qrcode', function () {
   //扫码后按回车登录
   process.stdin.once('data', () => {
      this.login()
   })
}).login()
// group.sendMsg('hello world')
