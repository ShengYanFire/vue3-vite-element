<!--
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-09-26 16:24:00
 * @LastEditors: lsy
 * @LastEditTime: 2021-09-26 17:10:09
-->
<template>
  <!-- vue3弃用v-on="$listeners" -->
  <el-table v-bind="$attrs">
    <el-table-column
      v-for="item in normalColumns"
      :key="item.id"
      v-bind="item.attrs"
    ></el-table-column>
    <el-table-column
      v-for="item in slotColumns"
      :key="item.id"
      v-bind="item.attrs"
    >
      <!-- vue3弃用slot-scope -->
      <template v-slot="scope">
        <slot :scope="scope" :name="item.slot"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { computed } from "vue-demi";

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  }
})
// 获取普通的columns数据
const normalColumns = computed(() => {
  return props.columns.filter(item => !item.slot);
});
// 获取是插槽的columns数据
const slotColumns = computed(() => {
  console.log(props.columns)
  return props.columns.filter(item => item.slot);
});
</script>
<style lang="scss" scoped>
</style>
