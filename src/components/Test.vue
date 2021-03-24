<template>
  <div>
    <van-button>点击按钮</van-button>
    <h1>{{state.count}}</h1>
    <h1>{{state.double}}</h1>
    <van-button @click="increment">加加</van-button>
    <hr>
    <h4>{{current}}</h4>
    <van-button @click="inc">+1</van-button>
    <van-button @click="dec">-1</van-button>
    <van-button @click="set(12)">设置</van-button>
    <van-button @click="reset">重置</van-button>
    <hr>
    <van-button @click="showToast">轻提示</van-button>
  </div>
</template>

<script lang="ts">
import { reactive, computed } from 'vue';
import { Button, Toast } from 'vant';
import useCount from '@/components/useCount';

export default {
  components: {
    [Button.name]: Button
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const { current, inc, dec, set, reset } = useCount(100);
    const state: any = reactive({
      count: 4,
      double: computed(() => (state.count * 2))
    });

    const increment = () => {
      state.count++;
    };

    const showToast = () => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      });
    };

    return {
      state,
      increment,
      showToast,
      current,
      inc,
      dec,
      set,
      reset
    };
  }
};

</script>

<style lang='less' scoped>

</style>
