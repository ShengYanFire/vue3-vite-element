/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:17:50
 * @LastEditors: lsy
 * @LastEditTime: 2021-10-09 11:02:13
 */
import { createRouter, createWebHistory } from "vue-router"
import globalRoutes from "./globalRoutes.js"
import mainRoutes from "./mainRoutes.js"

const Router = createRouter({
  history: createWebHistory(),
  isAddDynamicMenuRoutes: false,  // 是否已经添加动态(菜单)路由
  routes: [
    ...mainRoutes,
    ...globalRoutes
  ]
})

export default Router