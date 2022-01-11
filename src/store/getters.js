/*
 * @Author: your name
 * @Date: 2021-01-07 17:46:31
 * @LastEditTime: 2021-09-30 10:48:09
 * @LastEditors: lsy
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\store\getters.js
 */
export default {
    token: state => state.app.token,
    userMenuList: state => state.app.userMenuList,
    opened: state => state.app.opened
};
