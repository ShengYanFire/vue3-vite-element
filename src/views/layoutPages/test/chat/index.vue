<!--
 * @Descripttion: 啦啦啦哈哈哈
 * @version: 
 * @Author: lsy
 * @Date: 2021-08-30 17:16:55
 * @LastEditors: lsy
 * @LastEditTime: 2021-11-06 11:20:07
-->

<template>
  <div class="chatContent_div">
    <div
      :class="item.people == 'HE' ? 'leftChat' : 'rightChat'"
      v-for="(item, index) in chatContent"
      :key="index"
    >
      <p v-if="item.people == 'I'">你发送的消息&emsp;{{ item.time }}</p>
      <p v-else>
        {{ `user${userId}` }}回应的消息&emsp;{{
          new Date().toLocaleDateString()
        }}
      </p>
      <p v-html="item.data"></p>
    </div>
  </div>
  <br />
  <el-input @change="send" v-model="inputMsg" placeholder="Please input">
    <template #append>
      <el-button icon="el-icon-right" @click="send(inputMsg)"></el-button>
    </template>
  </el-input>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue-demi';

// 用户Id
const userId = ref(parseInt(Math.random() * 100))
// webSocket地址
const path = ref("ws://192.168.10.20:8001/text");
// webSocket对象
const socket = ref("");
// 输入的信息
const inputMsg = ref("");
// 聊天内容
const chatContent = reactive([]);

/**
 * @description: 获取当前时间
 * @param {}
 * @return {YYYY-MM-DD HH:MM:SS}
 */
const getDate = () => {
  var now = new Date(),
    y = now.getFullYear(),
    m = ("0" + (now.getMonth() + 1)).slice(-2),
    d = ("0" + now.getDate()).slice(-2);
  return y + "-" + m + "-" + d + " " + now.toTimeString().substr(0, 8);
}

/**
 * @description:初始化websocket 
 * @param {}
 * @return {}
 */
const init = () => {
  if (typeof (WebSocket) === "undefined") {
    alert("您的浏览器不支持socket")
  } else {
    // 实例化socketF
    socket.value = new WebSocket(path.value)
    // 监听socket连接
    socket.value.onopen = () => {
      console.log("socket连接成功")
      socket.value.send(`user${userId.value}`);
    }
    // 监听socket错误信息
    socket.value.onerror = () => {
      console.log("连接错误")
    }
    // 监听socket消息
    socket.value.onmessage = (req) => {
      chatContent.push({
        id: chatContent.length,
        people: "HE",
        data: req.data,
        time: getDate()
      })
      nextTick(() => {
        let elem = document.getElementsByClassName("chatContent_div")[0];
        elem.scrollTop = elem.scrollHeight;
      })
    }
    socket.value.onclose = () => {
      console.log("socket已经关闭")
    }
  }
}

/**
 * @description: 发送消息
 * @param {String}
 * @return {}
 */
const send = (param) => {
  if (param == "") return
  chatContent.push({
    id: chatContent.length,
    people: "I",
    data: param,
    time: getDate()
  });
  nextTick(() => {
    let elem = document.getElementsByClassName("chatContent_div")[0];
    elem.scrollTop = elem.scrollHeight;
  });
  socket.value.send(param);
  inputMsg.value = "";
}

onMounted(() => {
  init();
})

onUnmounted(() => {
  socket.value.close();
})

</script>

<style lang="scss" scoped>
.chatContent_div {
  background-color: white;
  height: 400px;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
.chatContent_div::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.leftChat {
  text-align: left;
  color: red;
}
.rightChat {
  text-align: right;
  color: gray;
}
</style>
