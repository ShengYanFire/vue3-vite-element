/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:17:50
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-23 16:42:10
 */
import { createRouter, createWebHistory } from "vue-router"
import globalRoutes from "./globalRoutes.js"
import mainRoutes from "./mainRoutes.js"

const Router = createRouter({
  history: createWebHistory(),
  routes: [
    ...mainRoutes,
    ...globalRoutes
  ]
})

export default Router