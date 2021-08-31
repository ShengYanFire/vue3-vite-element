<!--
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:16:55
 * @LastEditors: lsy
 * @LastEditTime: 2021-08-31 11:02:43
-->
<script setup>
import { ref ,reactive} from 'vue'

defineProps({
  msg: String
});

const count = ref(0);

const user=reactive({
  name:"qwe",
  age:0
})

function chang() {
  count.value++;
  user.name="qwer";
  user.age=count.value
}

</script>

<template>
<el-button type="primary" size="default" @click="chang()">{{ msg }}{{ count }}</el-button>
姓名：{{user.name}}、年龄：{{user.age}}
</template>

<style scoped>

</style>
