/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:17:50
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-22 15:19:50
 */
import { createRouter, createWebHistory } from "vue-router"
import globalRoutes from "./globalRoutes.js"

const Router = createRouter({
  history: createWebHistory(),
  routes: [
    ...globalRoutes,
    {
      path: "/",
      name: "AppMain",
      component: () => import("@/views/AppMain.vue"),
      children: [
        {
          path: "/home",
          name: "Home",
          component: () => import("@/views/home.vue")
        }
      ]
    }
  ]
})

export default Router