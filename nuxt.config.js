const path = require('path');
// const webpack = require('webpack');

module.exports = {
  mode: 'universal',

  server: {
    port: process.env.NODE_ENV === "production" ? 5001 : 5000, // default: 5000
  },
  generate: {
    dir: "public"
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '首页',
    titleTemplate: '%s | CBSmile',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: '前端，JavaScript，博客，Node，Vue' },
      { name: 'author', content: 'charbo233@foxmail.com' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/mel.png' },
      { rel: 'dns-prefetch', href: '//api.charbost.com' },
      { rel: 'dns-prefetch', href: '//cdn.charbost.com' },
    ],
    script: [
      {
        async: 'async',
        type: 'text/javascript',
        src: 'https://cdn.charbost.com/cbsmile/intersection-polyfill.js'
      },
      {
        async: 'async',
        type: 'text/javascript',
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-144334189-2'
      },
      {
        // Global site tag (gtag.js) - Google Analytics
        type: 'text/javascript',
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-144334189-2');
        `
      }
    ],
    noscript: [
      {
        innerHTML: 'This website requires JavaScript.'
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    {
      src: './assets/scss/index.scss',
      lang: 'sass'
    },
    'highlight.js/styles/github.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~/plugins/marked.js'
    },
    {
      src: '~/plugins/highlight.js'
    },
    {
      src: '~/plugins/gravatar.js'
    },
    {
      src: '~/plugins/filter.js'
    },
    {
      src: '~/plugins/global-component.js'
    },
    // {
    //   src: '~/plugins/copy.js',
    //   ssr: false
    // },
    {
      src: '~/plugins/element.js',
      ssr: true
    }
  ],
  /**
   * router config
   */
  router: {
    // 页面切换效果
    //2.9.0以后改为单独文件配置
    // scrollBehavior: function (to, from, savedPosition) {
    //   return savedPosition ? savedPosition : { x: 0, y: 0 }
    // }
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ],
  ],

  styleResources: {
    scss: ['./assets/scss/variables.scss', './assets/scss/mixin.scss']
  },
  /*
  ** Build configuration
  */
  build: {
    plugins: [
      // webpack plugin
      // new webpack.DefinePlugin({
      //   TEST: JSON.stringify('hello')
      // })
    ],
    babel: {
      plugins: [
        ["component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

      config.resolve.alias = {
        ...config.resolve.alias,
        '@config': path.resolve('config'),
      };
      config.performance = {
        'maxAssetSize': 1024 * 1024,
        'maxEntrypointSize': 1024 * 1024
      }

    }

  }
}
