<!--
 * @Descripttion: echarts图表，将原生echarts封装一层，封装了图表初始化，刷新重绘
 * @version: 
 * @Author: lsy
 * @Date: 2021-07-13 13:47:54
 * @LastEditors: lsy
 * @LastEditTime: 2021-11-06 11:37:17
-->
<template>
  <div :id="id" :style="customStyle"></div>
</template>
<script>
import * as echarts from "echarts";
import { onMounted, watch } from "@vue/runtime-core";

const props = defineProps({
  customOption: {     // 与原生echarts传入的option一致；
    type: Object,
    default: () => ({})
  },
  customStyle: {      // 控制图表长宽，背景等
    type: Object,
    default: () => ({
      height: "200px",
      width: "200px"
    })
  }
})

// 图表唯一ID
const id = new Date().getTime() + Math.floor(Math.random() * 10000);
// 图表对象
let chart = null;

/**
 * @description: 初始化图表
 * @param {}
 * @return {}
 */
const initEcharts = function () {
  if (chart) chart.clear();
  let dom = document.getElementById(id);
  if (!dom) return;
  chart = echarts.init(dom);
  if (!props.customOption) return;
  chart.setOption(props.customOption);
};

/**
 * @description: 数据更新时重绘；
 * @param {*}
 * @return {*}
 */
watch(
  () => [props.customOption, props.customStyle],
  () => {
    if (chart) chart.resize(props.customStyle);
    initEcharts();
  },
  { deep: true }
);

onMounted(() => {
  initEcharts();
});

</script>
