import { chatBot } from './nlp'
import { Response } from 'express'
const express = require('express')
const cors = require('cors')

export default function api() {
   const app = express()
   app.use(cors())
   const port = 3005

   app.get('/:msg', cors(), async (req: { params: { msg: string } }, res: Response) => {
      const msg = req.params.msg
      if (!msg.includes('inv')) {
         res.send('404')
         return
      }
      res.send(await chatBot(msg.replace('inv', '')))
   })

   app.listen(port, () => {
      console.log(`App listening on port ${port}`)
   })
}

// api()
