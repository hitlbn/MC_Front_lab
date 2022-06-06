<!--  -->
<template>
  <div>
    <a-card title="BT数据抓取管控信息" class="version-info">

      <div style="background-color: #ececec; padding: 20px" v-for="item in data">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-card title="链接总数" :bordered="false">
              <p>{{item.linknum}}</p>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="封禁IP数" :bordered="false">
              <p>{{item.banipnum}}</p>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="链接最后活跃时间" :bordered="false">
              <p>{{item.lastactime}}</p>
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div style="background-color: #ececec; padding: 20px" v-for="item in data">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-card title="消息总数" :bordered="false">
              <p>{{item.messagenum}}</p>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="BT传输总量" :bordered="false">
              <p>{{item.btmem}}</p>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="传输文件总数" :bordered="false">
              <p>{{item.docnum}}</p>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <br/>
    <br/>
    <div style="float: right;">
      <a-button type="primary" size="large" @click="flush">刷新</a-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {defineComponent, ref, watch} from "vue";
import {message} from "ant-design-vue";

export default defineComponent({

  mounted() {
    let that = this;
    axios.post('http://localhost:9900/public/getMessage').then(function (ret) {
      that.data = ret.data.data;
    });
  },

  methods : {
    flush() {
      let that = this;
      axios.post('http://localhost:9900/public/getMessage').then(function (ret) {
        that.data = ret.data.data;
        message.success('Flush Data Success');
      });
    },
  },

  setup() {

    const data = ref([
      {
        "linknum" : 1,
        "banipnum" : 1,
        "lastactime" : "2022-04-27T01:22:28.77",
        "messagenum" : 1,
        "btmem" : 1,
        "docnum" : 1,
      }
    ]);

    return {
      data,

    };
  }
});
</script>
<style lang="less" scoped>
.version-info {
  margin-top: 20px;
}
</style>