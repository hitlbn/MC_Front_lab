<template>
  <a-divider>——————————————————————————封禁ip列表——————————————————————————</a-divider>
  <br/>
  <br/>
  <div style="width: 1200px;margin: 0px auto;">
    <div style="float: right;">
    <a-button type="primary" size="large" @click="flush">刷新</a-button>
      </div>
  <a-descriptions  bordered :column="2" v-for="item in data" :key="item.banip">
    <a-descriptions-item label="封禁ip">{{item.banip}}</a-descriptions-item>
    <a-descriptions-item label="操作">
      <a-button type="primary" @click="relink(item.banip)">解除封禁</a-button>
    </a-descriptions-item>
  </a-descriptions>
  </div>
</template>

<script>
import {defineComponent, ref, watch} from 'vue';
import { message } from 'ant-design-vue';
import axios from 'axios'

export default defineComponent({

  mounted() {
    let that = this;
    axios.post('http://localhost:9900/public/getbanlist').then(function (ret) {
      that.data = ret.data.data;
    });
  },

  methods : {
    flush () {
      let that = this;
      axios.post('http://localhost:9900/public/getbanlist').then(function (ret) {
        message.success('Flush Data Success');
        that.data = ret.data.data;
      });
    },

    relink (banip) {
      let that = this;
      axios.post('http://localhost:9900/public/relink', JSON.stringify({
        banip : banip
      })).then(function () {

      });
      message.success('恢复链接成功');
      axios.post('http://localhost:9900/public/getbanlist').then(function (ret) {
        that.data = ret.data.data;
      });
    }
  },


  setup() {
    const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
    const activeKey = ref(['1']);

    watch(activeKey, val => {
      console.log(val);
    });

    const data = ref([
      {
        "banip" : "0.0.0.0"
      }
    ]);


    return {
      text,
      activeKey,
      data,
    };
  },
});
</script>

<style scoped>

</style>