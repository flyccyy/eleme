
const path = require("path");
const resolve = function(dir) {
  return path.join(__dirname, dir);
};

var appData = require('./data.json')
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@v", resolve("src/views"))
      .set("@c", resolve("src/components"))
      .set("@u", resolve("src/utils"))
      .set("@s", resolve("src/service")); /* 别名配置 */
    config.optimization.runtimeChunk("single");
  },
  devServer: {
    before(app) {
      app.get('/api/seller',function (req,res) { 
        res.json({
          error:0,
          data:seller
        })
       })
       app.get('/api/goods',function (req,res) { 
        res.json({
          error:0,
          data:goods
        })
       })
       app.get('/api/ratings',function (req,res) { 
        res.json({
          error:0,
          data:ratings
        })
       })
    },
    // host: "localhost",
    /* 本地ip地址 */
    //host: "192.168.1.107",
    host: "localhost", //局域网和本地访问
    // host: "0.0.0.0", //局域网和本地访问
    port: "8080",
    hot: true,
    /* 自动打开浏览器 */
    open: false,
    overlay: {
      warning: false,
      error: true
    },
    /* 跨域代理 */
    proxy: {
      "/api": {
        /* 目标代理服务器地址 */
        target: "http://m260048y71.zicp.vip", //
        // target: "http://192.168.1.102:8888", //
        /* 允许跨域 */
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};