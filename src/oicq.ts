import { Client, Group, GroupMessage, ImageElem, PrivateMessage, Sendable, User } from 'oicq'
import { bugCat, images } from './resource'
import { chatBot } from './nlp'

export function handlePrivateMessage(msg: PrivateMessage, client: Client) {
   if (msg.sender.user_id !== 409174690 && !msg.raw_message.includes('@bot -')) return
   // @bot -g 748520034 -m foo bar
   let msgToSend = ''
   let target: Group | User | undefined = undefined
   const commands = msg.raw_message.replace('@bot -', '').split('-')
   for (const command of commands) {
      const content = command.slice(2)
      switch (command[0]) {
         case 'm':
            msgToSend = content
            break
         case 'g':
            target = client.pickGroup(Number(content))
            break
         case 'p':
            target = client.pickUser(Number(content))
      }
   }
   client.pickUser(409174690).sendMsg('' + msgToSend + ' ' + JSON.stringify(target))
   if (target && msgToSend) {
      target.sendMsg(msgToSend)
   }
}

export function handleAtMe (e: GroupMessage, client: Client) {
   const msg = e.raw_message
   // let m: ImageElem | string = msg.replace('@UnrealDudu', '').replace('@PS UnrealDudu', '').replace('吗？', '').replace('吗', '').replace('？', '').replace('?', '').replace('你', '我').replace('@InvincibleDudu', '').replace('@PS InvincibleDudu🍭', '')
   let m: ImageElem | string = msg.replace(/@\S+/, '').replace('吗？', '').replace('吗', '').replace('？', '').replace('?', '').replace('你', '我')
   if (m.trim() === '') {
      if (e.sender.user_id === 409174690) {
         client.pickGroup(e.group_id).sendMsg(bugCat.love)
         return
      }
      // if (Math.random() > 0.5) client.pickGroup(e.group_id).sendMsg(images.catThreaten)
      // else client.pickGroup(e.group_id).sendMsg(images.fightMe)
      client.pickGroup(e.group_id).sendMsg([{ type: 'at', qq: e.sender.user_id }, images.fightMe])
      return
   }
   chatBot(msg.replace(/@\S+/, '')).then((res) => {
      m = res || m + '！'
      client.pickGroup(e.group_id).sendMsg(m)
   }).catch((e) => console.log('chatBot error 1', e))
}

export function handleAtInvdu (e: GroupMessage, client: Client) {
   const msg: Sendable = [{type: 'at', qq: e.sender.user_id}, images.noAtInvdu]
   if (Math.random() < 0.05) {
      for (let i = 0; i < 30; i++) msg.push({type: 'at', qq: e.sender.user_id})
   }
   client.pickGroup(e.group_id).sendMsg(msg)
}
