const tencentCloud = require('tencentcloud-sdk-nodejs')
const NlpClient = tencentCloud.nlp.v20190408.Client
const clientConfig = {
   credential: {
      secretId: '',
      secretKey: ''
   },
   region: 'ap-guangzhou',
   profile: {
      httpProfile: {
         endpoint: 'nlp.tencentcloudapi.com'
      }
   }
}

// 实例化要请求产品的client对象,clientProfile是可选的
const client = new NlpClient(clientConfig)

export async function chatBot(msg: string) {
   const params = { Query: msg }
   try {
      const res = await client.ChatBot(params)
      return res.Reply || ''
   } catch (e) {
      if (e instanceof Error) return e.message || ''
      console.error(e)
   }
}

