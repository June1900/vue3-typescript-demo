<template>
  <div class="home">
    <Test />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';
import { getCurrentInstance } from 'vue';
import Test from '@/components/Test.vue';
import { login } from '@/api/login';

@Options({
  components: {
    HelloWorld,
    Test
  },
  mounted(): void {
    this.loginTest();
    this.logout();
  },
  methods: {
    async loginTest() {
      const data = await login(null);
      console.log(data);
    },
    async logout(data: any) {
      // 使用插件方式
      const axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
      const res = await axios.request({
        url: '/logout',
        method: 'get',
        data
      });
      console.log(res);
    }
  }
})
export default class Home extends Vue {}
</script>
