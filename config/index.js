const Config = {
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://smile.avosapps.us' : 'http://127.0.0.1:3000',
  // 如果使用七牛云存储可通过后缀支持先展示缩略图,实现懒加载
  // staticPath: 'charbo.me'
  imageLazyLoad: false
}
// 服务端暂时都设为本地
// const Config = {
//   baseUrl: 'http://127.0.0.1:3000',
//   // staticPath: 'resource.shirmy.me'
// }
export default Config
