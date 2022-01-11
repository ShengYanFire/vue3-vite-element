<!--
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-09-22 14:28:23
 * @LastEditors: lsy
 * @LastEditTime: 2021-11-03 12:00:49
-->
<template>
  <div class="login_container">

    <div class="login_div">
      <h1>
        <span style="color: #eaeaea; font-size: 2.5rem">欢迎登录</span>
        <span style="color: #eaeaea; font-size: 2rem; opacity: 0.33">Welcome</span>
      </h1>
      <el-form :model="loginForm" :rules="rules" ref="loginRef" @keyup.enter="onSubmit">
        <el-form-item prop="username">
          <el-input
            class="login_input"
            type="text"
            placeholder="请输入用户名"
            v-model="loginForm.username"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="login_input"
            type="password"
            placeholder="请输入密码"
            v-model="loginForm.password"
          />
        </el-form-item>
        <el-form-item prop="code" style="display: flex">
          <el-input
            class="login_input login_input_code"
            v-model.trim="loginForm.code"
            placeholder="请输入验证码"
          />
          <img
            class="login_img_code"
            :src="`data:image/gif;base64,${captchaImage}`"
            @click="getimg()"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="login_submit" @click="onSubmit">进入网关</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
};

const loginForm = reactive({
  username: "admin",
  password: "admin123",
  code: "",
  uuid: ""
});

const captchaImage = ref(null);
const getimg = (async () => {
  var res = await VE_API.system.captchaImage();
  captchaImage.value = res.data.img;
  loginForm.uuid = res.data.uuid;
})
getimg()

const loginRef = ref(null);
const router = useRouter();
const store = useStore();
const { proxy } = getCurrentInstance();

const onSubmit = () => {
  loginRef.value.validate(async valid => {
    if (valid) {
      store.dispatch("app/login", loginForm).then(() => {
        proxy.$message.success("登录成功");
        router.push({ path: "/" });
      }).catch(() => {
        getimg()
      });
    }
  })
}
</script>

<style lang="scss" scoped>
.login_container {
  display: flex;
  height: 100%;
}
.login_div {
  background: rgba(0, 0, 0, 0);
  position: absolute;
  width: 464px;
  top: 25%;
  right: 20%;
  text-align: center;
}
.login_input :deep(.el-input__suffix) {
  height: 56px;
  line-height: 56px;
}
.login_input :deep(.el-input__inner) {
  height: 56px;
  background: #404466;
  opacity: 1;
  border-radius: 10px;
  border: 0;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 28px;
  color: #eaeaea;
}
.login_submit {
  width: 464px;
  height: 60px;
  margin-top: 30px;
  background: linear-gradient(180deg, #2828da 0%, #000853 100%);
  opacity: 1;
  border-radius: 10px;
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #eaeaea;
  border-color: #000853;
}
.login_input_code {
  width: 60%;
  margin-right: 8%;
}
.login_img_code {
  width: 32%;
  vertical-align: middle;
}
</style>

