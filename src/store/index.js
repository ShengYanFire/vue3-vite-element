/*
 * @Author: your name
 * @Date: 2021-01-07 11:41:32
 * @LastEditTime: 2021-09-27 16:01:35
 * @LastEditors: lsy
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\store\index.js
 */
let modules = {};
const files = import.meta.globEager("./modules/*.js")
Object.keys(files).forEach(key => {
    let d = key.split("/");
    const fileName = d[d.length - 1].replace(/(\.\/|\.js)/g, "");
    modules[fileName] = files[key].default;
});

import { createStore } from "vuex";
import getters from "./getters";
export default createStore({
    getters,
    modules
});
