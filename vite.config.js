/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:16:55
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-18 17:21:47
 */
import { defineConfig } from 'vite'
import path from "path"
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      //配置项目中引用别名
      '@': path.join(__dirname, 'src')
    }
  },

  base: "./",  // build打包路径设置

  // 代理配置
  server: {
    hot: true,    // 服务器启动后自动打开页面
    // proxy: {
    //   '/api': {
    //     target: 'www.mockUrl.com',
    //     changeOrigin: true
    //   }
    // }
  },

  build: {
    //vite 在 build 的时候默认会进行压缩计算，但 vite 实际上不提供 gzip 压缩功能，所以不需要让他花时间算压缩后大小，关掉这个设置可以提升打包速度。
    brotliSize: false //默认为true
  },

  // scss
  cssPreprocessOptions: {
    scss: {
      additionalData: '@import "./src/assets/scss/style.scss";' // 添加公共样式
    }
  }
})
