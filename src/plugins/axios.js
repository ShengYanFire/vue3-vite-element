/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-09-27 10:16:04
 * @LastEditors: lsy
 * @LastEditTime: 2021-11-12 17:21:09
 */

import axios from "axios";
import NProgress from "nprogress";

export default {
    install: (app, { router, store, opt }) => {

        axios.defaults.timeout = 10000;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

        // 请求拦截器
        axios.interceptors.request.use(
            config => {
                NProgress.start()
                // 每次发送请求之前判断vuex中是否存在token        
                // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
                // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
                if (config.notToken) {
                    return config;
                }
                const token = store.getters.token;
                token && (config.headers.Authorization = token);
                return config;
            },
            error => {
                return Promise.error(error);
            }
        )

        // HTTPresponse拦截
        axios.interceptors.response.use(
            res => {
                NProgress.done();
                if (res.data.code !== 200) {
                    app.config.globalProperties.$message({
                        message: res.data.msg,
                        type: 'error'
                    })
                    if (res.data.code === 401) {
                        router.push({ path: '/login' })
                    }
                    return Promise.reject(new Error(res.data.msg))
                }
                return res
            }, error => {
                NProgress.done()
                let status = error.response.status
                let message = "";
                switch (status) {
                    case 400:
                        message = "请求错误";
                        break;
                    case 401: {
                        message = "未授权，请登录";
                        router.replace({
                            name: "Login"
                        });
                        break;
                    }
                    case 403:
                        message = "没有权限，拒绝访问";
                        break;
                    case 404:
                        message = `请求地址出错`;
                        break;
                    case 408:
                        message = "请求超时";
                        break;
                    case 500:
                        message = "服务器内部错误";
                        break;
                    case 501:
                        message = "服务未实现";
                        break;
                    case 502:
                        message = "网关错误";
                        break;
                    case 503:
                        message = "服务不可用";
                        break;
                    case 504:
                        message = "网关超时";
                        break;
                    case 505:
                        message = "HTTP版本不受支持";
                        break;
                    default:
                        break;
                }
                app.config.globalProperties.$message({
                    message: message,
                    type: 'error'
                })
                return Promise.reject(new Error(error))
            }
        )

        const method = {
            post: (url, p, config) => axios.post(url, p, config),
            get: (url, p, config) => axios.get(url, Object.assign(config, { params: p })),
            // put与patch区别：
            // put修改一个对象，必须传回去一个完整的对象，没有传的字段默认为空；
            // patch则只需传回被修改了的字段，后端只更新接收到的字段
            put: (url, p, config) => axios.put(url, p, config),
            patch: (url, p, config) => axios.put(url, p, config),
            delete: (url, p, config) => axios.delete(url, Object.assign(config, { params: p })),
        };

        let api = {};
        const files = import.meta.globEager("./../api/**/*.js");
        Object.keys(files).forEach(key => {
            let d = key.split("/");
            const fileName = d[d.length - 1].replace(/(\.\/|\.js)/g, "");
            api[fileName] = {};
            let obj = files[key].default;
            Object.keys(obj).forEach(item => {
                // 参数str为拼接到接口地址尾部的字符串（参数等）
                api[fileName][item] = (p, str = "") =>
                    method[obj[item].type](obj[item].url + str, p, obj[item].config ? obj[item].config : {});
            });
        });
        window[opt] = api;
        app.config.globalProperties[opt] = api;
    }
}