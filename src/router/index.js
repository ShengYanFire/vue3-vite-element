/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:17:50
 * @LastEditors: lsy
 * @LastEditTime: 2021-08-31 11:09:44
 */
import { createRouter, createWebHashHistory } from "vue-router"
import home from "@/views/home.vue"

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: "/",
    name: "home",
    component: home
  }]
})

export default Router