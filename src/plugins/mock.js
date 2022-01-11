/*
 * @Author: your name
 * @Date: 2021-03-02 15:29:31
 * @LastEditTime: 2021-09-30 14:27:12
 * @LastEditors: lsy
 * @Description: In User Settings Edit1
 * @FilePath: \vue3-element-admin\src\plugins\mock.js
 */
import { USE_MOCK } from "@/setting.js"
import Mock from 'mockjs'

export default {
    install: () => {
        if (USE_MOCK) {
            const files = import.meta.globEager("./../api/**/*.js");
            Object.keys(files).forEach(key => {
                let obj = files[key].default;
                Object.keys(obj).forEach(item => {
                    if (obj[item].mock) {
                        Mock.mock(
                            obj[item].url,
                            obj[item].data
                        );
                    }
                });
            })
        }
    }
}
