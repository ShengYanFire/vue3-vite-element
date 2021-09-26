<!--
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-07-13 13:47:54
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-26 16:33:53
-->
<template>
  <div :id="id" :style="customStyle"></div>
</template>
<script>
import * as echarts from "echarts";
import { onMounted, watch } from "@vue/runtime-core";

const props = defineProps({
  customOption: {
    type: Object,
    default: () => ({})
  },
  customStyle: {
    type: Object,
    default: () => ({
      height: "200px",
      width: "200px"
    })
  }
})

const id = new Date().getTime() + Math.floor(Math.random() * 10000);

let chart = null;
const initEcharts = function () {
  if (chart) chart.clear();
  let dom = document.getElementById(id);
  if (!dom) return;
  chart = echarts.init(dom);
  if (!props.customOption) return;
  chart.setOption(props.customOption);
};

// 初始化
onMounted(() => {
  initEcharts();
});

// 监听数据更新
watch(
  () => [props.customOption, props.customStyle],
  () => {
    if (chart) chart.resize(props.customStyle);
    initEcharts();
  },
  { deep: true }
);

</script>
