<template>
    <el-space direction="vertical" v-for="item in list" @click="routerHandle(item.url)">
        <el-image :src="item.icon">
            <template #error>
                <Picture></Picture>
            </template>
        </el-image>
        <el-text size="small">{{ item.name }}</el-text>
    </el-space>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Picture } from '@element-plus/icons-vue';
import axios from 'axios';
import ico from '../server/ico';

type _list = {
    name: string;
    url: string;
    icon: string;
    type: string;
};

let list = ref<_list[]>([]);

onMounted(() => {
    axios.get('/data/web.json').then(res => {
        list.value = res.data;
    });

    ico.get('/favicon.ico', {
        responseType: 'arraybuffer',
    })
        .then(res => {
            return (
                'data:image/jpeg;base64,' +
                btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                )
            );
        })
        .then(data => {
            list.value[2].icon = data;
        })
        .catch(error => {
            console.log(error);
        });
});

const routerHandle = (url: string) => {
    window.open(url);
};
</script>

<style scoped lang="less"></style>
