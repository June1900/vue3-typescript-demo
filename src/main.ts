import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axiosPlugin from '@/utils/plugins/axios';
// 引入全部样式
import 'vant/lib/index.less';

createApp(App).use(store).use(router).use(axiosPlugin).mount('#app');
