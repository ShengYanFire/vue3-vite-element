<!--
 * @Author: your name
 * @Date: 2021-01-07 16:21:00
 * @LastEditTime: 2021-11-03 12:00:29
 * @LastEditors: lsy
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\layout\SideBar.vue
-->
<template>
  <router-link to="/">
    <el-image
      v-show="!opened"
      style="height: 40px; width: 300px; margin: 20px; margin-top: 40px"
      :src="logo"
      fit="contain"
    ></el-image>
    <el-image
      v-show="opened"
      style="height: 40px; width: 100px; margin-top: 40px"
      :src="smallLogo"
      fit="contain"
    ></el-image>
  </router-link>
  <br />
  <br />
  <div class="ve_el_menu">
    <el-menu
      class="main_menu"
      :default-active="defaultActive"
      :collapse="opened"
      :collapseTransition="false"
      unique-opened
      background-color="rgba(0,0,0,0)"
      text-color="rgba(120, 123, 132, 1)"
      active-text-color="rgb(103, 89, 230)"
    >
      <slide-menu v-for="item in menus" :key="item.name" :menu="item"></slide-menu>
    </el-menu>
  </div>
</template>

<script setup>
import logo from "@/assets/images/logo.png";
import smallLogo from "@/assets/images/smallLogo.png";

import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ElMenu, ElImage } from "element-plus";
import SlideMenu from "./components/SlideMenu.vue";

defineComponent({
  ElMenu, SlideMenu, ElImage
})
const store = useStore();
const route = useRoute();
const opened = computed(() => store.getters.opened);
const menus = computed(() => store.getters.userMenuList);
const defaultActive = computed(() => {
  return route.name;
});
</script>

<style lang="scss" scoped>
.ve_el_menu {
  background: rgba(0, 0, 0, 0);
}
.main_menu {
  border: none;
}
.el-menu--inline :deep(li.el-menu-item.is-active) {
  background-color: rgba(0, 0, 0, 0) !important;
}
ul :deep(.el-menu-item) {
  background-color: rgba(0, 0, 0, 0) !important;
  font-size: 18px;
  &:hover {
    color: white !important;
    i {
      color: white !important;
    }
  }
}
ul :deep(.el-sub-menu__title) {
  background-color: rgba(0, 0, 0, 0) !important;
  font-size: 18px;
  &:hover {
    color: white !important;
    i {
      color: white !important;
    }
  }
}
.el-menu--collapse :deep(.el-menu-item [class^="el-icon-"]) {
  margin: 0 !important;
  vertical-align: middle;
  width: 55px !important;
  font-size: 40px !important;
  text-align: center !important;
  &:hover {
    color: white !important;
  }
}
.el-menu--collapse .el-sub-menu :deep(.el-sub-menu__title [class^="el-icon-"]),
.el-menu--collapse .el-sub-menu :deep(.svg-icon) {
  margin: 0 !important;
  vertical-align: middle;
  width: 55px !important;
  font-size: 40px !important;
  text-align: center !important;
  &:hover {
    color: white !important;
  }
}
</style>
