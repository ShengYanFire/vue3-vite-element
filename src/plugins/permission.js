/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-09-22 17:00:29
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-24 09:19:14
 */
import globalRoutes from "@/router/globalRoutes.js"
import mainRoutes from "@/router/mainRoutes.js"
function isGlobalRoutes(to) {
    let gd = globalRoutes.filter(gitem => {
        return gitem.path == to.path
    })
    if (gd.length != 0) {
        return true;
    }
    return false;
}
function isMainRoutes(to, routes) {
    for (let i in routes) {
        if (routes[i].path == to.path) {
            return true;
        }
        if (routes[i].children) {
            isMainRoutes(to, routes[i].children);
        }
        return false;
    }
}
export default {
    install: (app, { router }) => {
        router.beforeEach(async (to, from, next) => {
            if (isGlobalRoutes(to)) {
                next();
            }
            if (isMainRoutes(to, mainRoutes)) {
                next();
            }
            next({ name: "404" });
        })
    }
}