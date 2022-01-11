/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-09-28 09:51:08
 * @LastEditors: lsy
 * @LastEditTime: 2021-11-20 16:14:26
 */
export default {

    // 验证码
    captchaImage: {
        url: "/api/captchaImage",
        type: "get",
        config: { notToken: true }, //notToken为true，请求不带token
        mock: true,
        data: {
            "msg": "操作成功",
            "img": "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",
            "code": 200,
            "captchaOnOff": true,
            "uuid": "83ebb70c14334f6fa03f1be5dcbc37dd"
        }
    },

    // 登录
    login: {
        url: "/api/login",
        type: "post",
        config: { notToken: true }, //notToken为true，请求不带token
        mock: true,  //mock为false时，可在setting.js USE_MOCK为true时，此api不使用mock
        data: {
            code: 200,
            msg: "success",
            token: "qwewqe1131231",
            data: [{ //输出数据
                'name': '@name', //随机生成姓名
                'age|10-20': 10  //还可以自定义其他数据
            }]
        }
    },

    // 用户菜单
    userMenuList: {
        url: "/api/getRouters",
        type: "get",
        mock: true,
        data: {
            "msg": "操作成功",
            "code": 200,
            "data": [
                {
                    "name": "Home",
                    "path": "/",
                    "component": "home/index",
                    "meta": {
                        "title": "首页",
                        "icon": "el-icon-s-home"
                    }
                },
                {
                    "name": "system",
                    "meta": {
                        "title": "系统管理",
                        "icon": "el-icon-setting",
                    },
                    "children":
                        [
                            {
                                "name": "User",
                                "path": "/user",
                                "component": "system/user/index",
                                "meta": {
                                    "title": "用户管理",
                                    "icon": "el-icon-user-solid"
                                }
                            },
                            {
                                "name": "Role",
                                "path": "/role",
                                "component": "system/role/index",
                                "meta": {
                                    "title": "角色管理",
                                    "icon": "role",
                                }
                            },
                            {
                                "name": "Menu",
                                "path": "/menu",
                                "component": "system/menu/index",
                                "meta": {
                                    "title": "菜单管理",
                                    "icon": "menu"
                                }
                            },
                            {
                                "name": "Organization",
                                "path": "/organization",
                                "component": "system/organization/index",
                                "meta": {
                                    "title": "机构管理",
                                    "icon": "organization"
                                }
                            },
                        ]
                },
                {
                    "name": "test",
                    "meta": {
                        "title": "测试页面",
                        "icon": "el-icon-warning",
                    },
                    "children":
                        [
                            {
                                "name": "chat",
                                "path": "/chat",
                                "component": "test/chat/index",
                                "meta": {
                                    "title": "聊天室",
                                    "icon": "el-icon-phone"
                                }
                            },
                            {
                                "name": "video",
                                "path": "/video",
                                "component": "test/video/index",
                                "meta": {
                                    "title": "视频播放",
                                    "icon": "el-icon-video-camera-solid"
                                }
                            }
                        ]
                }
            ],
        }
    },


}