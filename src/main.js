/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:16:55
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-29 17:35:46
 */
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

import installElementPlus from "@/plugins/elementplus.js"
installElementPlus(app);

import 'virtual:svg-icons-register';
import svgIcon from "@/views/components/svg-icon/index.vue"
app.component("svg-icon", svgIcon)

import router from "@/router/index.js"
import store from '@/store/index.js'
import menuRoutes from "@/plugins/menuRoutes.js"
import axios from "@/plugins/axios.js"
import mock from "@/plugins/mock.js"


app.use(router)
    .use(store)
    .use(menuRoutes, { store, router })
    .use(axios, { router, store, opt: "VE_API" })
    .use(mock)
    .mount('#app')
