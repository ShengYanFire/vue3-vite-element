<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsy
 * @Date: 2021-11-18 09:42:25
 * @LastEditors: lsy
 * @LastEditTime: 2021-11-23 15:48:30
-->
<template>
    <div v-if="tipShow" id="tooltip_div">{{ pointTime }}</div>
    <canvas id="is_have_video" :width="width" height="50"></canvas>
    <canvas id="time_line" :width="width" height="50"></canvas>
    <canvas id="time_line_layer" :width="width" height="50"></canvas>
</template>
<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'

const emit = defineEmits(["changCurrentTime"]);


const props = defineProps({
    width: {//时间轴宽度
        type: Number,
        default: () => 1500
    },
    currentTime: {//视频播放进度时间（s）
        type: Number,
        default: () => 1637300821
    },
    videoRecords: {//视频文件记录
        type: Array,
        default: () => [
            {
                "startTime": "1636971324",//此视频开始时间
                "endTime": "1636971509",//此视频结束时间
                // ...等
            },
        ]
    }
})

// 画线
const drawLine = (beginX, beginY, endX, endY, color, width) => {
    let canvasId = document.getElementById('time_line');
    let ctx = canvasId.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(beginX, beginY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

// 鼠标X轴位置
const mouseSite = ref(0);
// 是否显示时间框tooltip
const tipShow = ref(false);

// 鼠标指的时间
const pointTime = computed(() => {
    let seconds = props.currentTime + mouseSite.value * 60 - props.currentTime % 60 - parseInt(props.width / 2) * 60;
    let d = getTime(seconds);
    return `${d[0]}-${d[1]}-${d[2]} ${d[3]}:${d[4]}:${d[5]}`
})

//tooltip时间显示框跟随鼠标位置
const pointSite = e => {
    mouseSite.value = e.layerX;
    tipShow.value = true;
    nextTick(() => {
        let ele = document.getElementById("tooltip_div");
        ele.style.left = (e.x - 40) + "px";
        ele.style.top = (e.y - e.layerY - 32) + "px";
    })
}

// canvas事件
const addanvasEvent = () => {
    let canvasId = document.getElementById('time_line_layer')

    // 鼠标离开后事件
    canvasId.onmouseleave = e => {
        tipShow.value = false;
        canvasId.onmousemove = e => {
            pointSite(e)
        };
    }

    // 鼠标按下时的位置；
    let start = 0;
    // 鼠标按下时的currentTime
    let oldTime = 0;
    // 鼠标按下状态下的移动事件
    canvasId.onmousedown = e => {
        allowDarw.value = false;
        start = e.layerX;
        oldTime = props.currentTime
        canvasId.onmousemove = e1 => {
            tipShow.value = false;
            let end = e1.layerX;
            let current = (start - end) * 60 + oldTime;
            timeChange(props.width, current)
        }
    }

    // 鼠标弹起事件
    canvasId.onmouseup = e => {
        let end = e.layerX;
        let current = (start - end) * 60 + oldTime;
        // 将鼠标拖动后，指示线代表的时间（S）传出去
        emit('changCurrentTime', current);
        allowDarw.value = true;
        canvasId.onmousemove = e1 => {
            pointSite(e1)
        };
    };

    canvasId.onmousemove = e => {
        pointSite(e)
    }

}

// 计算时间偏移并画线，时间刻度线，半时短线，小时长线,一像素代表一分钟
const carveTimeScale = (width, currentTime) => {
    let canvasId = document.getElementById('time_line')
    let ctx = canvasId.getContext('2d')
    ctx.clearRect(0, 0, width, 50)

    // 将时间戳转为分，再减去到时间轴中部所需分数（为了将指针所指出与startTime时间等同），再取除小时的余数（方便后续刻度显示准确），得到时间戳超过整小时的分数
    let remainder = (parseInt(currentTime / 60) - parseInt(width / 2)) % 60;
    for (var i = 0; i < width; i++) {
        // 半时刻度；
        if ((remainder + i) % 30 == 0) {
            drawLine(i, 0, i, 10, 'white', 1)
        }

        // 获取当前刻度的秒数：  当前时间加上当前刻度再减去时间轴一半的时间（当前时间处于时间轴中间），再减去当前时间取小时的余数（方便后续刻度显示准确）
        let ct = currentTime + i * 60 - currentTime % 60 - parseInt(width / 2) * 60;

        // 小时刻度，及显示时间；
        if ((remainder + i) % 60 == 0) {
            drawLine(i, 0, i, 20, 'white', 1)
            let canvasId = document.getElementById('time_line');
            let ctx = canvasId.getContext('2d');
            ctx.font = '12px Arial';
            let d = getTime(ct);
            ctx.fillStyle = "white";
            ctx.fillText(`${d[3]}:${d[4]}`, i, 25);
        }

    }
}

// 有视频的区域渲染颜色
const carveVideoScope = (width, currentTime) => {
    let canvas = document.getElementById('is_have_video');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, 50);

    // 当前时间轴包括的时间段；
    let maxTime = currentTime + parseInt(width / 2) * 60;
    let minTime = currentTime - parseInt(width / 2) * 60;
    let d = props.videoRecords.filter(item => {
        return parseInt(item.startTime) < maxTime && parseInt(item.endTime) > minTime;
    })
    d.map(item => {
        let startPoint = (parseInt((parseInt(item.startTime) + width * 60 / 2 - currentTime + currentTime % 60) / 60));
        let endPoint = parseInt((parseInt(item.endTime) + width * 60 / 2 - currentTime + currentTime % 60) / 60);

        // 起点不能为负数，
        startPoint = startPoint > 0 ? startPoint : 0;
        // 终点不能超出时间尺总长度。
        endPoint = endPoint < width ? endPoint : width;

        let w = endPoint - startPoint;
        ctx.fillStyle = "rgb(50, 121, 115)";
        ctx.fillRect(startPoint, 0, w, 50);
    })
}

// 获取时间
const getTime = (timeStamp) => {
    let date = new Date(timeStamp * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return [year, month, currentDate, hour, minute, second];
}

// 当前时间改变，重绘刻度，指针，时间
const timeChange = (width, time) => {
    carveVideoScope(width, time);
    carveTimeScale(width, time);

    // 视频播放的当前进度时间刻度指示，默认放在时间轴中间位置
    drawLine(parseInt(width / 2), 0, parseInt(width / 2), 35, 'blue', 1);

    let canvasId = document.getElementById('time_line');
    let ctx = canvasId.getContext('2d');
    ctx.font = '12px Arial';
    ctx.fillStyle = "white";
    let d = getTime(time)

    // 视频正在播放的时间点
    ctx.fillText(`${d[0]}-${d[1]}-${d[2]} ${d[3]}:${d[4]}:${d[5]}`, parseInt(width / 2) - 50, 48)
}

// 是否允许重绘刻度，指针，时间，视频区域
const allowDarw = ref(true);

// 监听
watch(() => [props.currentTime, props.width, props.videoRecords], ([newTime, newWidth, newRecord], [oldTime, oldWidth, oldRecord]) => {
    if (allowDarw.value) timeChange(newWidth, newTime);
})

onMounted(() => {
    timeChange(props.width, props.currentTime);
    addanvasEvent();
})

</script>
<style  scoped>
#time_line {
    background-color: rgb(0, 255, 234, 0);
    position: absolute;
}
#is_have_video {
    background-color: gray;
    position: absolute;
}
#time_line_layer {
    background-color: rgb(0, 255, 234, 0);
    position: absolute;
}
#tooltip_div {
    background-color: rgb(50, 121, 115);
    position: absolute;
    font-size: 10px;
    width: 75px;
    text-align: center;
}
</style>