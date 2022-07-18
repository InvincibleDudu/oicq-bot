/**
 * Created by InvincibleDudu on 2022/7/1 at 09:49
 */

export function countDays(date_1: Date, date_2 = new Date()) {
   let difference = date_1.getTime() - date_2.getTime()
   return Math.abs(Math.ceil(difference / (1000 * 3600 * 24)))
}

