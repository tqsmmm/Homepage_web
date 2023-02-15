import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        proxy: {
            '/baidu': {
                target: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy', //
                changeOrigin: true,
                rewrite: path => path.replace(/^\/baidu/, ''),
            },
            '/google': {
                target: 'http://suggestqueries.google.com/complete',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/google/, ''),
            },
            '/bing': {
                target: 'http://api.bing.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/bing/, ''),
            },
            '/wallpaper': {
                target: 'https://api.kdcc.cn/img/',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/wallpaper/, ''),
            },
            '/ico': {
                target: 'https://www.smzdm.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/ico/, ''),
            },
        },
    },
});
