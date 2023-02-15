<template>
    <div class="index">
        <el-image class="index-image" :src="imgSrc"></el-image>

        <Teleport to="body">
            <Aside></Aside>
            <Header></Header>
            <Search></Search>
            <Main></Main>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import wallpaper from '@/server/wallpaper';
import Header from '@/components/Header/index.vue';
import Search from '@/components/Search/index.vue';
import Main from '@/components/Main/index.vue';
import Aside from '@/components/Aside/index.vue';

const imgSrc = ref('');

onMounted(() => {
    wallpaper
        .get('/', {
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
            imgSrc.value = data;
        })
        .catch(error => {
            console.log(error);
        });
});
</script>

<style scoped lang="less">
.index {
    width: 100%;
    height: 100vh;
    &-image {
        width: 100%;
        height: 100vh;
    }
}
</style>
