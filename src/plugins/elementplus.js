/*
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-09-18 15:14:23
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-30 15:07:05
 */

//按需引入
import 'element-plus/dist/index.css'
import { ElForm, ElFormItem, ElButton, ElInput, ElMessage, ElMessageBox, ElIcon } from 'element-plus'
const components = [
  ElForm, ElFormItem, ElButton, ElInput, ElIcon
]
const plugins = [
  ElMessage, ElMessageBox
]

export default (app) => {
  // 按需导入Element Plus组件和插件
  components.forEach(component => {
    app.component(component.name, component)
  })
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}


// 全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// export default (app) => {
//   app.use(ElementPlus)
// }
