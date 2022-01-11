<!--
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-11-04 16:28:15
 * @LastEditors: lsy
 * @LastEditTime: 2021-11-04 16:59:50
-->

vite.config.js配置提醒
=====================
1、配置proxy代理https:
---------------------

来源：https://www.cnblogs.com/roland-sky/p/12916645.html
    
* target 要使用 Proxy 包装的目标
* secure 安全证书校验
* Referer 表示请求的来源（必填）

```
proxy: {
         "/api": {
            target: 'https://example.com',
            changeOrigin: true, 
            secure: false,
            headers: {                  
                Referer: 'https://example.com'
            }
        },
    }
```
    

