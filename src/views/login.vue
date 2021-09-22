<!--
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-09-22 14:28:23
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-22 16:42:25
-->
<template>
  <div id="login_div" align="center">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginRef"
      @keyup.enter="onSubmit"
    >
      <el-form-item label="账号" prop="userName">
        <el-input type="text" v-model="loginForm.userName" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

const loginRef = ref(null);
const rules = {
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const loginForm = reactive({
  userName: "admin",
  password: "admin"
})

const router = useRouter();
const onSubmit = () => {
  loginRef.value.validate(valid => {
    if (valid) {
      router.push({ path: "/home" })
    }
  })
}
</script>

<style lang="scss" scoped>
#login_div {
  position: relative;
  top: 40%;
  left:50%;
  width: 300px;
  padding: 25px;
  padding-top: 50px;
  padding-right: 40px;
  background: linear-gradient(30deg, #15151a 0%, #b7bef8 100%);
  color: white;
  .el-form {
    width: 100%;
    .el-form-item :deep(.el-form-item__label) {
      color: white;
      font-size: 17px;
    }
    .el-form-item {
      .el-form-item__content {
        .el-input :deep(.el-input__inner) {
          border: none;
          background: linear-gradient(30deg, #eeeef1 0%, #8590f3 100%);
        }
        .el-button {
          margin-top: 20px;
          width: 200px;
          border: none;
          border-radius: 25px;
          font-size: 17px;
          background: linear-gradient(30deg, #eeeef1 0%, #8590f3 100%);
          &:hover {
            background: linear-gradient(30deg, #8590f3 0%, #eeeef1 100%);
          }
        }
      }
    }
  }
}
</style>

