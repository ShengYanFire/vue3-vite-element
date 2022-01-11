<!--
 * @Author: your name
 * @Date: 2021-01-08 16:58:43
 * @LastEditTime: 2021-11-03 12:00:24
 * @LastEditors: lsy
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\layout\components\SlideMenu.vue
-->
<template>
  <el-sub-menu
    :index="menu.name"
    v-if="menu.children"
    popper-append-to-body
    popper-class="menu_popper"
  >
    <template v-slot:title>
      <i v-if="menu.meta.icon.split('-')[0] == 'el'" :class="menu.meta.icon" />
      <svg-icon v-else :iconClass="menu.meta.icon" />
      <span>{{ menu.meta.title }}</span>
    </template>
    <slide-menu v-for="child in menu.children" :key="child.name" :menu="child"></slide-menu>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.name" @click="clickMenu(menu)">
    <i v-if="menu.meta.icon.split('-')[0] == 'el'" :class="menu.meta.icon" />
    <svg-icon v-else :iconClass="menu.meta.icon" />
    <template #title>{{ menu.meta.title }}</template>
  </el-menu-item>
</template>

<script setup>
import { ElMenuItem, ElSubMenu } from "element-plus";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

defineComponent({
  ElSubMenu, ElMenuItem
})

const props = defineProps({
  menu: {
    type: Object,
    default: () => { }
  }
})

const router = useRouter();
const clickMenu = menu => {
  let name = menu.name;
  router.push({
    name
  });
};
</script>

<style lang="scss" scoped>
</style>
