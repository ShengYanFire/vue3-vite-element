/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:16:55
 * @LastEditors: lsy
 * @LastEditTime: 2021-08-30 18:00:25
 */
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

import installElementPlus from "@/plugins/elementplus.js"
installElementPlus(app);

import router from "@/router/index.js"

app.use(router).mount('#app')
