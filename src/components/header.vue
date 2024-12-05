<template>
    <el-space direction="vertical">
        <el-text style="font-size: 64px; font-weight: 500;">{{ timeNow }}</el-text>
        <el-text style="font-size: 14px;">{{ dateNow }} {{ weekNow }} {{ lunarNow }}</el-text>
    </el-space>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
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

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<style scoped lang="less"></style>
