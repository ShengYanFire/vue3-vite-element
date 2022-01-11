/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-09-22 17:00:29
 * @LastEditors: lsy
 * @LastEditTime: 2021-10-09 17:52:26
 */
import globalRoutes from "@/router/globalRoutes.js"
import mainRoutes from "@/router/mainRoutes.js"
// 进度条插件
import NProgress from "nprogress";

// 判断路由是否存在
function isExistRoutes(route, routesData) {
    for (let i in routesData) {
        if (routesData[i].name == route.name) {
            return true;
        }
        if (routesData[i].children) {
            if (isExistRoutes(route, routesData[i].children)) {
                return true;
            }
        }
    }
    return false;
}

export default {
    install: (app, { store, router }) => {
        router.beforeEach(async (to, from, next) => {
            NProgress.start();
            console.log(to)
            if (isExistRoutes(to, globalRoutes)) {
                next();
            } else {
                if (!router.options.isAddDynamicMenuRoutes) {
                    let token = store.getters.token;
                    if (!token || !/\S/.test(token)) {
                        next({ path: "/login" })
                    } else {
                        await store.dispatch("app/getUserMenuList");
                        await addMainRoute(store.getters.userMenuList);
                        router.options.isAddDynamicMenuRoutes = true;
                        next({ ...to });
                    }
                }
                next();
            }
        });
        router.afterEach(() => {
            NProgress.done();
        });

        // 添加动态菜单路由
        const addMainRoute = async (menuList) => {
            let temp = [];
            for (let i = 0; i < menuList.length; i++) {
                if (menuList[i].children && menuList[i].children.length >= 1) {
                    temp = temp.concat(menuList[i].children);
                } else {
                    let route = {
                        path: menuList[i].path,
                        component: null,
                        name: menuList[i].name
                    };
                    let pages = import.meta.glob("./../views/layoutPages/**/*.vue");
                    route["component"] = pages[`./../views/layoutPages/${menuList[i].component}.vue`];
                    mainRoutes[0].children.push(route);
                }
            }
            if (temp.length >= 1) {
                addMainRoute(temp);
            } else {
                console.log(
                    "控制台打印--> ~ file: permission.js ~ line 127 ~ fnAddDynamicMenuRoutes ~ mainRoutes.children",
                    mainRoutes[0].children
                );
                await router.addRoute(...mainRoutes);
                await router.addRoute({
                    path: "/:w+",
                    redirect: { name: "404" }
                });
            }
        };
    }
}

