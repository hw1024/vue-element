// vue.config.js 配置说明
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    // process.env.NODE_ENV==='production'  (打包环境)
    // process.env.NODE_ENV==='development' (开发环境)
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    // 项目部署的基础路径publicPath
    // 我们默认假设你的应用将会部署在域名的根部,
    // 例如 https://www.my-app.com/
    // 如果你的应用部署在一个子路径下，那么你需要在这里
    // 指定子路径。比如将你的应用部署在
    // https://www.foobar.com/my-app/
    // 那么将这个值改为 '/my-app/'
    outputDir: process.env.outputDir, // 构建输出目录
    assetsDir: 'static', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: process.env.NODE_ENV === 'development', // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: false, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度

    parallel: require("os").cpus().length > 1, // 构建时开启多进程处理babel编译

    pwa: {}, // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

    devServer: {
        open: false,
        disableHostCheck: false,
        host: "0.0.0.0",
        port: 8089,
        https: false,
        hotOnly: false,
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_CURRENTMODE === 'serve' ? 'http://10.173.48.121:8002' : 'http://127.0.0.1:9999', // 域名
                ws: true, // 是否启用websockets
                changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRequiresRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            },
        }
    },
    chainWebpack(config) {
      // set svg-sprite-loader
      config.module
        .rule('svg')
        .exclude.add(resolve('src/assets/icons'))
        .end()
      config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/assets/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
    }
};
