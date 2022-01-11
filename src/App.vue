<!--
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:16:55
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-29 17:37:09
-->
<template>
  <div id="app_div" :style="{ height: clientHeight + 'px' }">
    <router-view />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const clientHeight = ref(document.documentElement.clientHeight);
window.onresize = () => {
  clientHeight.value = document.documentElement.clientHeight;
};
</script>

<style lang="scss" scoped>
</style>

