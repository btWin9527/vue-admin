'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

/* join the project path */
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'default page title' // page title

// 配置端口
const port = process.env.port || process.env.npm_config_port || 1024 // dev port

module.exports = {
  /* config the project publicPath
     If you plan to deploy your site to https://www.baidu.com/bar/,
     then publicPath should be set to "/bar/".
     In most cases please use '/'  【！！！】
  */
  publicPath: '/',
  outputDir: 'dist', //the directory when you use npm run build
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  // 该配置项用于设置是否为生产环境构建生成 source map，一般在生产环境下为了快速定位错误信息，我们都会开启 source map
  productionSourceMap: false,
  // devServer 项用于配置 webpack-dev-server 的行为，使得我们可以对本地服务器进行相应配置
  devServer: {
    // https: true, // 配置https环境
    port: port, // 端口地址
    open: true,// 是否自动打开浏览器页面
    overlay: {
      warnings: false,
      errors: false
    },
    // string | Object 代理设置
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      '/ws': {
        target: `https://apis.map.qq.com`,
        changeOrigin: true,

      }
    },
    after: require('./mock/mock-server.js')
  },
// configureWebpack 来进行修改，两者的不同点在于 chainWebpack 是链式修改，而 configureWebpack 更倾向于整体替换和修改
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '_ele': resolve('src/eleComponents'),
      }
    },
    externals: {
      vue: "Vue", // 右侧字符串为vue生成实例后的名称 Vue
    },
  },
  // chainWebpack 配置项允许我们更细粒度的控制 webpack 的内部配置
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // 配置svg的loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent
              },
              elementUI: {
                name: 'chunk-elementUI', // split elementUI into a single package
                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // can customize your rules
                minChunks: 3, //  minimum common number
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
          config.optimization.runtimeChunk('single')
        }
      )
    // 配置webpack-analyzer
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }


}
