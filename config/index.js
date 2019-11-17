const Config = {
  ICPDomains: [{ domain: 'charbost.com', 'ICPNumber': '浙ICP备19044708号-1' }],
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://api.charbost.com' : 'http://127.0.0.1:3000',
  assetsUrl: 'https://cdn.charbost.com/cbsmile',
  // 如果使用七牛云存储可通过后缀支持先展示缩略图,实现懒加载
  staticPath: 'cdn.charbost.com',
  imageLazyLoad: false
}
export default Config
