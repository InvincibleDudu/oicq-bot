import key from '../key'
const tencentCloud = require('tencentcloud-sdk-nodejs')
const NlpClient = tencentCloud.nlp.v20190408.Client
const clientConfig = {
   credential: key,
   region: 'ap-guangzhou',
   profile: {
      httpProfile: {
         endpoint: 'nlp.tencentcloudapi.com'
      }
   }
}

// 实例化要请求产品的client对象,clientProfile是可选的
const client = new NlpClient(clientConfig)

export async function chatBot (msg: string, threshold = 0) {
   const params = { Query: msg }
   try {
      const res = await client.ChatBot(params)
      console.log(res.Reply, res.Confidence)
      return (res.Confidence >= threshold) ? (res.Reply ?? '') : ''
   } catch (e) {
      console.error('NLP Error: ', e)
      if (e instanceof Error) return e.message ?? ''
      return 'Error'
   }
}
