/**
 * Created by InvincibleDudu on 6/25/2022 at 15:41
 */
import { AtElem, GroupMessage, ImageElem, MessageElem, PrivateMessage, Sendable } from 'oicq'
import { bugCat, images } from './resource'
import { countDays, getReadableTime, wait } from './util'
import { RecurrenceRule } from 'node-schedule'

const { createClient } = require('oicq')
const schedule = require('node-schedule')
const account = 1015850524
const client = createClient(account)
const group = client.pickGroup(208557053)
const testGroup = client.pickGroup(748520034)
const fpsquad = client.pickGroup(700673635)

const fs = require('fs')
const util = require('util')

const log_file = fs.createWriteStream(__dirname + '/' + getReadableTime() + '.log', { flags : 'w' })
const log_stdout = process.stdout

console.log = function(...args) {
   const output = args.join(' ')
   log_file.write(util.format(output) + '\r\n')
   log_stdout.write(util.format(output) + '\r\n')
   console.info(...args)
}

let duckSent = false
let lastRepeated: MessageElem[] = []

let time = 0
let cd = 0

let pendingRps = false
let rpsSender = 0

client.on('system.online', () => {
   setInterval(() => {
      time += 1
      cd += 1
      process.stdout.write(time + 's\r')
      if (time > 60 && pendingRps) pendingRps = false
      if (time >= 2000 && !duckSent) {
         fpsquad.sendMsg(images.duck)
         duckSent = true
         time = 0
      }
   }, 1000)
   schedule.scheduleJob({ hour: 3, minute: 30, second: 5 }, function() {
      fpsquad.sendMsg('今天距fps小分队停更已过去' + countDays(new Date('02/28/2021')) + '天')
   })
   schedule.scheduleJob({ minute: 5, second: 5 }, async function() {
      if (duckSent) return
      const probability = Math.random()
      await wait(probability * 300)
      if (probability < 0.2) await fpsquad.sendMsg(images.dumb)
      else if (probability > 0.7) await fpsquad.sendMsg(bugCat.appear)
   })
   const rule: RecurrenceRule = new schedule.RecurrenceRule()
   rule.hour = [11, 17, 23]
   rule.minute = 1
   schedule.scheduleJob(rule, async function() {
      if (duckSent) return
      await wait(Math.random() * 2000)
      await fpsquad.sendMsg(images.hungry)
   })
   console.log('Logged in!')
})
let lastMessage: MessageElem[] = []

client.on('message', (e: GroupMessage | PrivateMessage) => {
   console.log(e)
   if (e instanceof PrivateMessage) return
   // console.log(e.sender.card + ' said: ' + e.raw_message + 'after ' + time + 's')
   time = 0
   duckSent = false
   const msg = e.raw_message
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
      const list = ['伐桑班？', '切饱了', '伐困高？', '来侬则文', '钢铝？', '组忙', '老早晓得了', '你不看小分队的吗', '这个话题不要再聊了', 'oh?', 'warning', '再发禁言到明年额', '草票特度？', 'noLook']
      let msgToSend: Sendable = list[Math.floor((Math.random() * list.length))]
      if (msgToSend === 'warning' || msgToSend === 'noLook') msgToSend = images[msgToSend]
      client.pickGroup(e.group_id).sendMsg(msgToSend)
      // return
   } else if (e.atme) {
      // let m: ImageElem | string = msg.replace('@UnrealDudu', '').replace('@PS UnrealDudu', '').replace('吗？', '').replace('吗', '').replace('？', '').replace('?', '').replace('你', '我').replace('@InvincibleDudu', '').replace('@PS InvincibleDudu🍭', '')
      let m: ImageElem | string = msg.replace(/@\S+/, '').replace('吗？', '').replace('吗', '').replace('？', '').replace('?', '').replace('你', '我')
      if (m.trim() === '') {
         // const info = sender.age + '岁的' + sender.area + sender.sex + '人' + sender.nickname
         client.pickGroup(e.group_id).sendMsg(images.catThreaten)
         if (cd < 15) return
         const reAtMsg: AtElem = { type: 'at', qq: e.sender.user_id }
         client.pickGroup(e.group_id).sendMsg(reAtMsg)
         cd = 0
         return
      }
      m += '！'
      client.pickGroup(e.group_id).sendMsg(m)
   } else if (atQQList.includes(409174690) && !hasMsgOtherThanAt(e.message)) {
      // client.pickGroup(e.group_id).sendMsg(images.noAtInvdu)
      if (e.sender.user_id === 409174690) {
         client.pickGroup(e.group_id).sendMsg(bugCat.love)
         return
      }
      if (Math.random() > 0.5) client.pickGroup(e.group_id).sendMsg(images.catThreaten)
      else client.pickGroup(e.group_id).sendMsg(images.fightMe)
      if (cd < 15) return
      const reAtMsg: AtElem = { type: 'at', qq: e.sender.user_id }
      client.pickGroup(e.group_id).sendMsg(reAtMsg)
      // client.pickGroup(e.group_id).sendMsg(reAtMsg)
      // client.pickGroup(e.group_id).sendMsg(reAtMsg)
      cd = 0
   } else if (atQQList.includes(791876772) && !hasMsgOtherThanAt(e.message)) {
      client.pickGroup(e.group_id).sendMsg(images.noAtSheep)
   } else if (JSON.stringify(e.message) === JSON.stringify(lastMessage) || compareImage(e.message[0], lastMessage[0])) {
      if (lastRepeated === e.message) return
      client.pickGroup(e.group_id).sendMsg(e.message)
      lastRepeated = e.message
      lastMessage = []
   } else if (msg === '猜拳' || msg === '来猜拳') {
      client.pickGroup(e.group_id).sendMsg('你先出')
      pendingRps = true
      rpsSender = e.sender.user_id
   } else if (pendingRps && e.message[0].type === 'rps') {
      const id = e.message[0].id
      let counter = 3
      if (id === 3 || id === 2) counter = id - 1
      if (rpsSender === 409174690) {
         if (id === 2 || id === 1) counter = id + 1
         else counter = 1
      }
      client.pickGroup(e.group_id).sendMsg({ type: 'rps', id: counter })
      setTimeout(() => {
         if (rpsSender === 409174690) client.pickGroup(e.group_id).sendMsg(images.clap)
         else client.pickGroup(e.group_id).sendMsg('🖍')
         pendingRps = false
         rpsSender = 0
      }, 1500)
   // } else if (Math.random() < 0.05) {
   //    e.reply // todo
   } else {
      lastMessage = e.message
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

function hasMsgOtherThanAt(msg: MessageElem[]) {
   for (const item of msg) {
      if (item.type !== 'at') {
         if (item.type === 'text' && !item.text.trim()) continue
         return true
      }
   }
   return false
}

function compareImage(img1: MessageElem, img2: MessageElem) {
   if (img1.type !== 'image' || img2.type !== 'image') return false
   return img1.file === img2.file
}
