<!--
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-07-06 15:00:47
 * @LastEditors: lsy
 * @LastEditTime: 2021-11-06 11:44:32
-->

<!-- 来源：https://blog.csdn.net/muge1161105403/article/details/119349845 -->
<template>
  <svg :class="svgClass" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  iconClass: { type: String },  //svg名称
  className: { type: String },  //图标样式
})

const iconName = computed(() =>
  props.iconClass ? `#icon-${props.iconClass}` : "#icon"
);
const svgClass = computed(() =>
  props.className ? `svg-icon  ${props.className}` : "svg-icon"
)

</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
  margin: 5px;
}
</style>
