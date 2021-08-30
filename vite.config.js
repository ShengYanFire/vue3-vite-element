/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:16:55
 * @LastEditors: lsy
 * @LastEditTime: 2021-08-30 17:44:12
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
  }
})
