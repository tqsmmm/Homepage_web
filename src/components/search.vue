<template>
    <el-autocomplete v-model="inputValue" :fetch-suggestions="querySearch" clearable :trigger-on-focus="false"
        @keyup="get($event)" @select="handleSelect" style="width: 600px">
        <template #prepend>
            <el-select v-model="select" style="width: 100px" size="large">
                <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.url"></el-option>
            </el-select>
        </template>
        <template #append>
            <el-button :icon="Search" size="large" @click="btnSearch" />
        </template>
    </el-autocomplete>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import axios from 'axios';
import baidu from '../server/baiduAxios';
import google from '../server/googleAxios';
import bing from '../server/bingAxios';

const select = ref('');
const inputValue = ref('');

type _option = {
    name: string;
    url: string;
};

type LinkItem = {
    value: string;
    link: string;
};

const options = ref<_option[]>([]);

const links = ref<LinkItem[]>([]);

onMounted(() => {
    axios.get('/data/search.json').then(res => {
        select.value = res.data[0].default;

        options.value = res.data[0].search;
    });
});

const btnSearch = () => {
    for (const i of options.value) {
        if (i.name == select.value) {
            window.open(i.url + inputValue.value);
        } else {
            window.open(select.value + inputValue.value);
        }
    }
};

const get = (event: any) => {
    if (event.key == 'ArrowUp' || event.key == 'ArrowDown') return;

    if (event.key == 'Enter') {
        btnSearch();
    }

    for (const i of options.value) {
        if (i.name == select.value) {
            baiduData();
        } else {
            if (i.url == select.value && i.name == 'Baidu') {
                baiduData();
            } else if (i.url == select.value && i.name == 'Google') {
                googleData();
            } else if (i.url == select.value && i.name == 'Bing') {
                bingData();
            }
        }
    }
};

const bingData = () => {
    bing.get('/qsonhs.aspx?type=cb&q=' + inputValue.value + '&cb=window.bing.sug')
        .then(res => {
            const regex = new RegExp('(?="Txt":)');

            const list = res.data
                .slice(res.data.indexOf('"Suggests":[') + 13, res.data.indexOf(']}]}}'))
                .split(regex);

            const l3 = [];

            for (let k in list) {
                l3.push({
                    value: list[k].slice(list[k].indexOf('":') + 2, list[k].indexOf(',')),
                    link: list[k].slice(list[k].indexOf('":') + 3, list[k].indexOf('",')),
                });
            }

            links.value = l3;
        })
        .catch(error => {
            console.log(error);
        });
};

const googleData = () => {
    google
        .get('/search?client=youtube&q=' + inputValue.value + '&jsonp=window.google.ac.h')
        .then(res => {
            const regex = new RegExp('(?=]],)');

            const list = res.data.slice(19, -44).split(regex);

            const l2 = [];

            for (let k in list) {
                if (list[0] == list[k]) {
                    l2.push({
                        value: list[k].slice(
                            list[k].indexOf(',[[') + 4,
                            list[k].indexOf(',0,[512')
                        ),
                        link: list[k]
                            .slice(list[k].indexOf(',[[') + 4, list[k].indexOf(',0,[512'))
                            .slice(1, -1),
                    });
                } else {
                    l2.push({
                        value: list[k].slice(list[k].indexOf('[') + 1, list[k].indexOf(',0,[512')),
                        link: list[k]
                            .slice(list[k].indexOf('[') + 1, list[k].indexOf(',0,[512'))
                            .slice(1, -1),
                    });
                }
            }

            links.value = l2;
        })
        .catch(error => {
            console.log(error);
        });
};

const baiduData = () => {
    if (inputValue.value != '') {
        baidu
            .get('/su?wd=' + inputValue.value + '&cb=')
            .then(res => {
                const list = res.data
                    .slice(res.data.indexOf('[') + 1, res.data.indexOf(']'))
                    .split(',');

                const l1 = [];

                for (let k in list) {
                    l1.push({
                        value: list[k],
                        link: list[k].slice(1, -1),
                    });
                }

                links.value = l1;
            })
            .catch(error => {
                console.log(error);
            });
    }
};

let timeout: any;

const querySearch = (queryString: string, cb: any) => {
    const results = queryString ? links.value.filter(createFilter(queryString)) : links.value;

    // call callback function to return suggestions

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        cb(results);
    }, 3000 * Math.random());
};

const createFilter = (queryString: string) => {
    return (restaurant: LinkItem) => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 1;
    };
};

const handleSelect = (e: any) => {
    for (const i of options.value) {
        if (i.name == select.value) {
            window.open(i.url + e.link);
        } else {
            window.open(select.value + e.link);
        }
    }
};
</script>

<style scoped lang="less"></style>
