/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-09-23 09:44:23
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-23 10:16:03
 */
// 需要在登录后获取权限的路由
export default [
    {
        path: "/",
        name: "AppMain",
        component: () => import("@/views/AppMain.vue"),
        children: [
            {
                path: "/",
                name: "Home",
                component: () => import("@/views/home.vue")
            }
        ]
    }
]
