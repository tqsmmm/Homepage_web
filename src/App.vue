<template>
    <el-space direction="vertical" style="height: 100vh;display: flex;">
        <Header></Header>
        <Search></Search>
        <Main></Main>
    </el-space>
</template>

<script setup lang="ts">
import Header from '@/components/header.vue';
import Search from '@/components/search.vue';
import Main from '@/components/main.vue';
</script>

<style scoped lang="less"></style>
