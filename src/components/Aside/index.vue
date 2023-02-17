<template>
    <div class="aside">
        <div class="aside-main">
            <div style="height: 200px" class="aside-main-item" @click="dSetting = true">
                <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
            </div>
            <div class="aside-main-item">
                <el-icon size="20px" style="margin: 5px"><HomeFilled /></el-icon>
                <div class="title">主页</div>
            </div>
            <div v-for="item in types" class="aside-main-item">
                <el-icon size="20px" style="margin: 5px">
                    <component :is="item.icon"></component>
                </el-icon>
                <div class="title">{{ item.name }}</div>
            </div>
            <div class="aside-main-item" @click="visible = true">
                <el-popover placement="right" :visible="visible" title="添加分类" width="400">
                    <template #reference>
                        <el-icon size="20px" style="margin: 5px"><Plus /></el-icon>
                    </template>
                    <el-form>
                        <el-form-item label="图标">
                            <el-icon size="20px" style="margin: 5px"><HomeFilled /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Service /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Star /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Setting /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><SetUp /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><VideoPlay /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Film /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Picture /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><School /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Grape /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Coffee /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Cpu /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Money /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Goods /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><ShoppingCart /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Ship /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Trophy /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Phone /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Medal /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><Coin /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><SwitchFilled /></el-icon>
                            <el-icon size="20px" style="margin: 5px"><ElementPlus /></el-icon>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input placeholder="名称" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">保存</el-button>
                            <el-button @click="visible = false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-popover>
            </div>
        </div>
        <div class="aside-footer">
            <div class="aside-main-item" @click="dSetting = true">
                <el-icon size="20px" style="margin: 5px"><Setting /></el-icon>
            </div>
        </div>

        <el-drawer v-model="dSetting" title="I am the title" :with-header="false" append-to-body>
            <span>Hi there!</span>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

type _type = {
    name: string;
    icon: string;
};

let types = ref<_type[]>([]);
const visible = ref(false);

const dSetting = ref(false);

onMounted(() => {
    axios
        .get('/data/type.json')
        .then(res => {
            types.value = res.data;
        })
        .catch(error => {
            console.log(error);
        });
});
</script>

<style scoped lang="less">
.aside {
    width: 50px;
    height: 100vh;

    position: fixed;
    top: 0px;
    display: flex;
    flex-direction: column;
    text-align: center;

    z-index: 1;
    color: #fff;
    overflow: hidden;
    backdrop-filter: blur(10px);

    &-main {
        flex: 1;
        margin: 5px;
        &-item {
            cursor: pointer;
            margin: 5px 0px 5px 0px;
        }
    }
    &-footer {
        height: 40px;
        margin: 5px;
    }
}
.title {
    font-size: 10px;
}
</style>
