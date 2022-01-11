<!--
 * @Author: your name
 * @Date: 2021-01-07 14:04:59
 * @LastEditTime: 2021-10-25 17:54:25
 * @LastEditors: lsy
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\views\AppMain.vue
 *<el-scrollbar></el-scrollbar>
-->
<template>
  <el-container id="appmain_div">
    <el-aside width="auto">
      <side-bar></side-bar>
    </el-aside>
    <el-container>
      <el-header style="margin-top: 40px">
        <i
          :class="[
            !store.getters.opened ? 'el-icon-back' : 'el-icon-right',
            'opened_icon',
          ]"
          @click="store.dispatch('app/closeMenu')"
        />
        <i class="el-icon-switch-button exit_icon" @click="exit" />
      </el-header>
      <el-main>
        <transition name="el-zoom-in-top" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import mainBackgroundImg from "@/assets/images/home.png"
import { defineComponent } from "vue";
import sideBar from "@/views/components/layout/SideBar.vue"
import { ElContainer, ElAside, ElHeader, ElMain } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
defineComponent({
  sideBar, ElContainer, ElAside, ElHeader, ElMain
})

const store = useStore();
const router = useRouter();
const exit = () => {
  store.dispatch('app/exit')
  router.push("/login")
}

</script>
<style lang="scss" scoped>
#appmain_div {
  width: 100%;
  height: 100%;
}
.opened_icon {
  font-size: 50px;
  color: rgb(170, 168, 168);
  &:hover {
    color: white;
  }
}
.exit_icon {
  font-size: 50px;
  color: rgb(170, 168, 168);
  position: absolute;
  right: 10px;
  &:hover {
    color: red;
  }
}
</style>
