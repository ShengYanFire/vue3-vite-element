<!--
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-09-26 16:55:02
 * @LastEditors: lsy
 * @LastEditTime: 2021-10-09 17:58:15
-->
<template>
  <customTable :columns="columns" :data="data" style="width: 400px">
    <template #handle="{ scope: { row, $index } }">
      <el-button @click="handleConf($index, row)">配置</el-button>
    </template>
  </customTable>
</template>
<script setup>
import { defineComponent, reactive } from "vue-demi"
import customTable from "@/views/components/customTable/index.vue"
defineComponent({
  customTable
})
const columns = reactive([
  {
    attrs: {
      type: "selection"
    },
    id: 0
  },
  {
    attrs: {
      label: "序号",
      type: "index",
      width: "50",
      align: "center"
    },
    id: 1
  },
  {
    attrs: {
      label: "设备类型编号",
      prop: "type",
      align: "center"
    },
    id: 2
  },
  {
    slot: "handle",
    attrs: {
      label: "操作",
      "class-name": "small-padding fixed-width",
      align: "center"
    },
    id: 3
  }
])

const data = reactive([{
  index: 123,
  type: "wqewqe"
}, {
  index: 123,
  type: "wqewqe"
}])

const handleConf = (index, row) => {
  console.log(index, row)
}
</script>

<style lang="scss" scoped>
</style>