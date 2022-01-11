/*
 * @Author: your name
 * @Date: 2021-01-07 17:30:30
 * @LastEditTime: 2021-10-25 17:47:16
 * @LastEditors: lsy
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\store\modules\app1.js
 */
export default {
    namespaced: true,
    state: {
        token: sessionStorage.getItem("token") || "",
        userMenuList: [],
        opened: false
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            sessionStorage.setItem("token", state.token);
        },
        SET_USERMENULIST(state, userMenuList) {
            state.userMenuList = userMenuList;
        },
        SET_OPENED(state) {
            state.opened = !state.opened;
        },
    },
    actions: {

        // 登录
        login({ commit }, loginForm) {
            return new Promise((resolve, reject) => {
                VE_API.system.login(loginForm).then(res => {
                    commit("SET_TOKEN", res.data.token);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出登录
        exit({ commit }) {
            commit("SET_TOKEN", "");
        },

        // 获取用户菜单
        getUserMenuList({ commit }) {
            return new Promise((resolve, reject) => {
                VE_API.system.userMenuList().then(res => {
                    commit("SET_USERMENULIST", res.data.data);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })

        },

        // 收起左侧菜单
        closeMenu({ commit }) {
            commit("SET_OPENED");
        },

    }
};
