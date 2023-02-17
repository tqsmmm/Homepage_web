<template>
    <div class="time">
        <div style="font-size: 64px; font-weight: 500; color: #ffffff">{{ timeNow }}</div>
        <div style="font-size: 14px; color: #ffffff">
            {{ dateNow }} {{ weekNow }} {{ lunarNow }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { getLunar } from 'chinese-lunar-calendar';
import { useNow, useDateFormat } from '@vueuse/core';

let timeNow = ref('');
let dateNow = ref('');
let weekNow = ref('');
let lunarNow = ref('');

let timer = 0;

setInterval(() => {
    timeNow.value = useDateFormat(useNow(), 'HH:mm:ss').value;

    dateNow.value = useDateFormat(useNow(), 'YYYY年MM月DD日').value;

    weekNow.value = useDateFormat(useNow(), 'dddd', { locales: 'zh-cn' }).value;

    lunarNow.value = getLunar(
        useDateFormat(useNow(), 'YYYY').value,
        useDateFormat(useNow(), 'M').value,
        useDateFormat(useNow(), 'D').value
    ).dateStr;
}, 1000);

onMounted(() => {});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<style scoped lang="less">
.time {
    height: 100px;
    width: 500px;

    text-align: center;

    position: absolute;
    left: 50%;
    top: 10%;
    margin-left: -250px;
    margin-top: -50px;
}
</style>
