const env = process.env;
const path = require('path');
module.exports = Object.assign({
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:6666',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    },
    hot: true, // 热跟新
    open: true, //自动打开
    inline: true
  },
  publicPath: '/'
});
