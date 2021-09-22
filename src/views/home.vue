<!--
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:16:55
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-22 14:42:59
-->


<template>
  <router-link :to="'/login'">dsadada</router-link>
  <el-button type="primary" size="default" @click="chang()">
    {{ msg }}{{ count }}
  </el-button>
  姓名：{{ user.name }}、年龄：{{ user.age }}
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from "vue-router";

defineProps({
  msg: String
});

const count = ref(0);

const user = reactive({
  name: "qwe",
  age: 0
})

const router = useRouter()

function chang() {
 router.push({ path: "/login" });
}

</script>

<style scoped>
</style>
