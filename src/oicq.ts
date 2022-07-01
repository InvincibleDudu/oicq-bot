/**
 * Created by InvincibleDudu on 6/25/2022 at 15:41
 */
import { GroupMessage, ImageElem, PrivateMessage, Sendable } from "oicq";

const { createClient } = require('oicq')
const account = 1015850524
const client = createClient(account)
const group = client.pickGroup(208557053)
const fpsquad = client.pickGroup(700673635)

const noAt: ImageElem = {
   type: 'image',
   file: '7387a0cf7ac175ad1b60fc1fe0200cdd131848-1600-1600.jpg',
   url: 'https://c2cpicdw.qpic.cn/offpic_new/409174690//409174690-2194736641-7387A0CF7AC175AD1B60FC1FE0200CDD/0?term=2',
   asface: false
}

const noAtInvdu: ImageElem = {
   type: 'image',
   file: '473a6586f4cf97d1433688004f89f1f762280-800-800.png',
   url: 'https://c2cpicdw.qpic.cn/offpic_new/409174690//409174690-38497509-473A6586F4CF97D1433688004F89F1F7/0?term=2',
   asface: false
}

const noAtSheep: ImageElem = {
   type: 'image',
   file: '2ef031a67b5aa7b5c6fc06c452e40f2f38293-600-600.png',
   url: 'https://c2cpicdw.qpic.cn/offpic_new/409174690//409174690-2100346420-2EF031A67B5AA7B5C6FC06C452E40F2F/0?term=2',
   asface: false
}

const duck: ImageElem = {
   type: 'image',
   file: 'd639d87ddb894defda8b03e82c16a2f82614119-230-230.gif',
   url: 'https://c2cpicdw.qpic.cn/offpic_new/409174690//409174690-640228012-D639D87DDB894DEFDA8B03E82C16A2F8/0?term=2',
   asface: false
}

let duckSent = false

// Array.prototype.random = function () {
//    return this[Math.floor((Math.random() * this.length))]
// }

let time = 0

client.on('system.online', () => {
   setInterval(() => {
      time += 1
      process.stdout.write(time + 's\r')
      if (time >= 2000 && !duckSent) {
         fpsquad.sendMsg(duck)
         duckSent = true
         time = 0
      }
   }, 1000)
   console.log('Logged in!')
})

client.on('message', (e: GroupMessage | PrivateMessage) => {
   if (e instanceof PrivateMessage) return
   console.log(e.sender.card + ' said: ' + e.raw_message + 'after ' + time + 's')
   time = 0
   duckSent = false
   const msg: string = e.raw_message
   const atQQList: number[] = e.message.filter((item: any) => item.type === 'at').map((item: any) => item.qq)
   if (e.group_id === 208557053) {
      // group.sendMsg(e.user_id + ' said: ' + e.raw_message)
      if (msg === '抽奖' || msg === '抽大奖') {
         const big = msg === '抽大奖'
         const duration = big ? Math.random() * 2000 : Math.random() * 100 / 2
         group.muteMember(e.sender.user_id, duration)
         group.sendMsg('恭喜您抽中' + duration.toFixed(0) + '秒')
      }
   }
   if (msg.includes('来点团语')) {
      const list = ['伐桑班？', '切饱了', '伐困高？', '来侬则文', '钢铝？', '组忙', '老早晓得了', '你不看小分队的吗', '这个话题不要再聊了', 'oh?', '警告', '再发禁言到明年额', '草票特度？']
      let msgToSend: Sendable = list[Math.floor((Math.random() * list.length))]
      if (msgToSend === '警告') {
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
      let m: ImageElem | string = msg.replace('@UnrealDudu', '').replace('@PS UnrealDudu', '').replace('吗？', '').replace('吗', '').replace('？', '').replace('?', '').replace('你', '我')
      if (m.trim() === '') {
         m = noAt
         // const sender = e.sender
         // const info = sender.age + '岁的' + sender.area + sender.sex + '人' + sender.nickname
         client.pickGroup(e.group_id).sendMsg(m)
         return
      }
      m += '！'
      client.pickGroup(e.group_id).sendMsg(m)
   } else if (atQQList.includes(409174690)) {
      client.pickGroup(e.group_id).sendMsg(noAtInvdu)
   } else if (atQQList.includes(791876772)) {
      client.pickGroup(e.group_id).sendMsg(noAtSheep)
   }

//    e.reply("hello world", true) //true表示引用对方的消息
})

client.on('system.login.qrcode', function () {
   //扫码后按回车登录
   process.stdin.once('data', () => {
      // @ts-ignore
      this.login()
   })
}).login()
// group.sendMsg('hello world')
