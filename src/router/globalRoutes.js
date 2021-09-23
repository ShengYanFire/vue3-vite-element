/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-09-22 16:49:10
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-23 10:09:04
 */
// 全局路由，不需要权限即可访问
export default [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login.vue")
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404.vue")
    }
]