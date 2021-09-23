<!--
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-09-23 09:48:15
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-23 10:28:18
-->
<template>
  <div class="error" align="center">
    <div class="error__title">404</div>
    <div class="error__subtitle">🐱🐱🐱(⓿_⓿)🐱🐱🐱</div>
    <div class="error__description">看来你是迷路了......</div>
    <router-link to="/"> 回到首页 </router-link>
  </div>
</template>
<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  padding-top: 10%;
  color: white;
  font-size: 50px;
  font-weight: 40px;
  line-height: 100px;
  .error__title {
    font-size: 100px;
    font-weight: 40px;
    line-height: 120px;
  }
}
</style>
