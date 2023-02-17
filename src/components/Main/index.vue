<template>
    <div class="main">
        <div v-for="item in list" class="main-card" @click="routerHandle(item.url)">
            <el-image class="main-card-image" :src="item.icon">
                <template #error>
                    <el-icon class="main-card-image-slot"><Picture /></el-icon>
                </template>
            </el-image>
            <div class="main-card-title">{{ item.name }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Picture } from '@element-plus/icons-vue';
import axios from 'axios';
import ico from '@/server/ico';

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

<style scoped lang="less">
.main {
    width: 1120px;
    height: 600px;

    position: absolute;
    left: 50%;
    top: 25%;
    margin-left: -560px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;

    &-card {
        width: 60px;
        height: 70px;
        margin: 10px;
        border-radius: 5px;

        z-index: 1;
        color: #fff;
        overflow: hidden;
        backdrop-filter: blur(10px);

        cursor: pointer;

        &-image {
            display: flex;
            width: 40px;
            height: 40px;
            margin: 10px 10px 5px 10px;

            &-slot {
                width: 40px;
                height: 40px;
                line-height: 40px;
                margin: auto;
            }
        }
        &-title {
            font-size: 10px;
            color: #ffffff;
            text-align: center;
        }
    }
}
</style>
