const Config = {
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://smile.avosapps.us' : 'http://127.0.0.1:3000',
  // 在正文中包含图片时可点击加载大图,如果使用七牛云存储可通过后缀支持先展示缩略图
  staticPath: 'charbo.me'
}
// 服务端暂时都设为本地
// const Config = {
//   baseUrl: 'http://127.0.0.1:3000',
//   // staticPath: 'resource.shirmy.me'
// }
export default Config
