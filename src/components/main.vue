<template>
    <div class="item-container">
        <el-space direction="vertical" v-for="item in list" @click="routerHandle(item.url)">
            <el-image :src="item.icon">
                <template #error>
                    <Picture></Picture>
                </template>
            </el-image>
            <el-text size="small">{{ item.name }}</el-text>
        </el-space>
    </div>
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

<style scoped lang="less">
.item-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    /* 可选，设置元素在主轴（水平方向）的对齐方式，左对齐 */
    align-items: flex-start;
    /* 可选，设置元素在交叉轴（垂直方向）的对齐方式，顶部对齐 */
}

.el-space {
    width: 60px;
    /* 假设每个 item 宽度为200px，可根据实际调整 */
    margin: 10px;
    /* 设置每个 item 之间的间距 */
}
</style>
