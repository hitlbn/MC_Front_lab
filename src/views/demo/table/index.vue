<template xmlns:text-algin="http://www.w3.org/1999/xhtml">
  <div style="float: right;">
  <a-button type="primary" size="large" @click="flush">刷新</a-button>
  </div>
  <br/>
  <br/>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel v-for="item in data" :key="item.record_id">
      <template #header>
        <a> {{ item.src_ip }}:{{ item.src_port }}</a>
        <a-divider type="vertical"/>
        <a> {{ item.dst_ip }}:{{ item.dst_port }}</a>
        <a-divider type="vertical"/>
        <a-radio-button @click="gotoDS(item.info_hash)">{{item.info_hash}}</a-radio-button>
      </template>
      <div>
      <a-descriptions title="详细数据" bordered :column="2">
        <a-descriptions-item label="src应用">{{item.client_name1}}</a-descriptions-item>
        <a-descriptions-item label="dst应用">{{item.client_name2}}</a-descriptions-item>
        <a-descriptions-item label="src传输消息数量">{{item.message_count1}}</a-descriptions-item>
        <a-descriptions-item label="dst传输消息数量">{{item.message_count2}}</a-descriptions-item>
        <a-descriptions-item label="src传输数据量">{{item.transfer_bytes1}}</a-descriptions-item>
        <a-descriptions-item label="dst传输数据量">{{item.transfer_bytes2}}</a-descriptions-item>
        <a-descriptions-item label="最后活跃时间">{{item.last_act_time}}</a-descriptions-item>
        <a-descriptions-item label="使用协议">{{item.protocol}}</a-descriptions-item>
      </a-descriptions>
      </div>
      <br/>
      <div>
      <a-button danger @click="banlink(item.src_ip)">封禁源IP</a-button>
        &nbsp&nbsp&nbsp&nbsp&nbsp
        <a-button danger @click="banlink(item.dst_ip)">封禁目的IP</a-button>
      </div>
    </a-collapse-panel>
    <br/>
    <div style="width: 400px;margin: 0px auto;">
      <a-button type="primary" size="large" @click="lastPage">上一页</a-button>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <a-divider type="vertical" />
      <a> 第 {{pageNum}} 页 </a>
      <a-divider type="vertical" />
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <a-button type="primary" size="large" @click="nextPage">下一页</a-button>
    </div>
  </a-collapse>

  <a-form class="">

  </a-form>
</template>

<script>

import {defineComponent, ref, watch} from 'vue';
import { message } from 'ant-design-vue';
import axios from 'axios'

export default defineComponent({

  mounted() {
    let that = this;
    axios.post('http://localhost:9900/public/getData', JSON.stringify({
      pageNum : that.pageNum
    })).then(function (ret) {
      that.data = ret.data.data;
    });
  },

  methods : {
    flush () {
      let that = this;
      axios.post('http://localhost:9900/public/getData', JSON.stringify({
        pageNum : that.pageNum
      })).then(function (ret) {
        message.success('Flush Data Success');
        that.data = ret.data.data;
      });
    },

    lastPage () {
      let that = this;
      if(that.pageNum === 1) {
        message.info('已经是第1页');
      } else {
        that.pageNum = that.pageNum - 1;
        axios.post('http://localhost:9900/public/getData', JSON.stringify({
          pageNum:that.pageNum
        })).then(function (ret) {
          that.data = ret.data.data;
        });
      }
    },

    nextPage () {
      let that = this;
      that.pageNum = that.pageNum + 1;
      axios.post('http://localhost:9900/public/getData', JSON.stringify({
        pageNum:that.pageNum
      })).then(function (ret) {
        that.data = ret.data.data;
      });
    },

    gotoDS (info) {
      this.$router.push("/dataShow/" + encodeURIComponent(info));
    },

    banlink (ip) {
      axios.post('http://localhost:9900/public/banlink', JSON.stringify({
        ip : ip,
      })).then(function (ret) {
      });
      message.success('ban success');
    }
  },


  setup() {
    const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
    const activeKey = ref(['1']);

    const pageNum = 1;

    watch(activeKey, val => {
      console.log(val);
    });

    const totalNum = ref([
      {
        "totalNum" : 15
      }
    ])

    const data = ref([
      {
        "record_id": 8,
        "src_ip": "192.168.122.41",
        "dst_ip": "101.83.46.243",
        "src_port": 62561,
        "dst_port": 12345,
        "info_hash": "kvNwMoKRdxr/zj2uzDcxp4Rp+fc=",
        "client_name1": "qBittorrent/4.2.5",
        "client_name2": "Transmission 3.00",
        "message_count1": 84,
        "message_count2": 12,
        "transfer_bytes1": 0,
        "transfer_bytes2": 0,
        "last_act_time": "2022-04-27T01:22:28.77",
        "protocol": "uTP"
      }
    ]);


    return {
      text,
      activeKey,
      data,
      pageNum,
      totalNum,
    };
  },
});

</script>
