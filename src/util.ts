/**
 * Created by InvincibleDudu on 2022/7/1 at 09:49
 */

export function countDays(date_1: Date, date_2 = new Date()) {
   let difference = date_1.getTime() - date_2.getTime()
   return Math.abs(Math.ceil(difference / (1000 * 3600 * 24)))
}

export function getReadableTime(time?: Date) {
   let m
   if (!time) m = new Date()
   else m = new Date(time)
   return (
      // m.getFullYear() + "/" +
      ("0" + (m.getMonth() + 1)).slice(-2) + "-" +
      ("0" + m.getDate()).slice(-2) + "_" +
      ("0" + m.getHours()).slice(-2) + "-" +
      ("0" + m.getMinutes()).slice(-2) + "-" +
      ("0" + m.getSeconds()).slice(-2) + "-" +
      ("0" + m.getMilliseconds()).slice(-3))
}

export function wait(timeSec: number) {
   return new Promise(resolve => setTimeout(resolve, timeSec * 1000))
}
