<!--
 * @Descripttion: 大华sdk视频插件
 * @version: 
 * @Author: lsy
 * @Date: 2021-11-03 14:21:28
 * @LastEditors: lsy
 * @LastEditTime: 2021-11-20 16:20:56
-->

<template>
    <timeLine
        :width="1000"
        :currentTime="currentTime"
        :videoRecords="videoRecords"
        @changCurrentTime="changCurrentTime"
    />
</template>
<script setup>
import { defineComponent, ref } from 'vue-demi';
import timeLine from './timeLine.vue';

defineComponent({ timeLine })

const videoRecords = ref([{
    startTime: 1636971427,
    endTime: 1636989554
}]);
const currentTime = ref(1636971427);

setInterval(() => {
    currentTime.value += 1;
}, 1);

const changCurrentTime = time => {
    currentTime.value = time
}

</script>
<style lang="scss" scoped>
#testPlayer {
    width: 400px;
    height: 400px;
    display: inline-block;
}
</style>
