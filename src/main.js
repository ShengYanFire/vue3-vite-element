/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:16:55
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-23 14:17:15
 */
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

import installElementPlus from "@/plugins/elementplus.js"
installElementPlus(app);

import router from "@/router/index.js"

import permission from "@/plugins/permission.js"

app.use(router)
    .use(permission, { router })
    .mount('#app')
