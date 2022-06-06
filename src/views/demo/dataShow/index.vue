<template xmlns:text-algin="http://www.w3.org/1999/xhtml">
  <a-divider>{{ $route.params.infohash }}</a-divider>
  <a-divider>数据包内容</a-divider>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel v-for="item in data">
      <template #header>
        <a> 片索引 :{{ item.piece_index }}</a>
        <a-divider type="vertical"/>
        <a> 片偏移 :{{ item.begin_piece_offset }}</a>
      </template>
      <div>
        <a-radio-group>
          <a-radio-button value="a" @click="GBase64(item)">Base64</a-radio-button>
          <a-radio-button value="b" @click="Gutf8(item)">utf-8</a-radio-button>
          <a-radio-button value="c" @click="Ghex(item)">hex</a-radio-button>
          <a-radio-button value="d" @click="GASCII(item)">ASCII</a-radio-button>
          <a-radio-button value="d" @click="GGBK(item)">GBK</a-radio-button>
<!--          <a-radio-button value="d" @click="GGB2(item.piece_index, item.begin_piece_offset)">GB2132</a-radio-button>-->
        </a-radio-group>
        <a-divider type="vertical"/>
        <a-button type="primary" @click="inferFileType(item)">推测文件类型</a-button>
        {{item.file_type}}
      </div>
      <a-descriptions layout="vertical" bordered :column="2"  style="word-break: break-all;word-wrap: break-word;">
        <a-descriptions-item label="数据">{{ item.fp ? item.fp : "选择一种表示编码" }}</a-descriptions-item>
      </a-descriptions>
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
</template>

<script>

import {defineComponent, ref, watch} from 'vue';
import {message} from 'ant-design-vue';
import axios from 'axios'
import cptable from '../../../cptable.full'
// import cptable from "codepage/dist/cpexcel.full"

export default defineComponent({

  name: "infohash",

  created(){
    let self = this
    self.getParams()
  },

  mounted() {
    let that = this;
    axios.post('http://localhost:9900/public/getPieces', JSON.stringify({
      infohash : that.$route.params.infohash,
      pageNum : that.pageNum
    })).then(function (ret) {
      that.data = ret.data.data;
    });
  },

  methods: {
    inferFileType(item) {
      let slice = Buffer.from(item.file_piece, 'base64').slice(0, 4096).toString("base64");
      axios.post('http://localhost:9980/filetype', JSON.stringify({
        file_slice: slice
      })).then(function (ret) {
        item.file_type = ret.data;
      });
    },
    getParams(){
      let hash = this.$route.query.infohash
      console.log(hash)
      // 如果是params传参，那就是this.$router.params.site
    },
    lastPage () {
      let that = this;
      if(that.pageNum === 1) {
        message.info('已经是第1页');
      } else {
        that.pageNum = that.pageNum - 1;
        axios.post('http://localhost:9900/public/getPieces', JSON.stringify({
          infohash : that.$route.params.infohash,
          pageNum:that.pageNum
        })).then(function (ret) {
          that.data = ret.data.data;
        });
      }
    },

    nextPage () {
      let that = this;
      that.pageNum = that.pageNum + 1;
      axios.post('http://localhost:9900/public/getPieces', JSON.stringify({
        infohash : that.$route.params.infohash,
        pageNum:that.pageNum
      })).then(function (ret) {
        that.data = ret.data.data;
      });
    },

    GBase64 (item) {
      item.fp = item.file_piece;
    },

    Gutf8 (item) {
      item.fp = Buffer.from(item.file_piece, 'base64').toString();
    },

    Ghex (item) {
      item.fp = Buffer.from(item.file_piece, 'base64').toString("hex");
    },

    GASCII (item) {
      item.fp = Buffer.from(item.file_piece, 'base64').toString("ascii");
    },

    GGBK (item) {
      item.fp = cptable.utils.decode(936, Buffer.from(item.file_piece, 'base64'));
    },

  },

  setup() {
    const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
    const activeKey = ref([]);

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
        "file_piece" : "123",
        "piece_index" : 1,
        "begin_piece_offset" : 1,
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
