/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:16:55
 * @LastEditors: lsy
 * @LastEditTime: 2021-12-16 14:11:30
 */
import { defineConfig } from 'vite'
import path from "path"
import vue from '@vitejs/plugin-vue'
import viteSvgIcons from 'vite-plugin-svg-icons';
import { NODE_ENV } from "./src/setting.js"

let url = "";
if (NODE_ENV == "dev") {
  url = "http://192.168.1.223/prod-api"
} else {
  url = "......"
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
    })
  ],
  resolve: {
    alias: {
      //配置项目中引用别名
      '@': path.join(__dirname, 'src')
    }
  },

  base: "/viteDemo/",  // build打包路径设置

  // 代理配置
  server: {
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: url,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
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
