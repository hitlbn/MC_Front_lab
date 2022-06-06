<!--  -->
<template>
  <div>
    <div id="main" style="width:100%; height:400px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {onMounted, ref} from 'vue'
import axios from "axios";
export default {
  setup() {
    const echartInit = (a, b) =>{
      var myChart = echarts.init(document.getElementById("main"),'light')

      var option = {
         title: {
          text: "抓取链接类型饼图",
        },
        tooltip: {

        },
        legend: {
                 top: '5%',
        left: 'center'
        },
        xAxis: {
          data: ["BT/TCP", "UTP", "UDP"],
        },
        yAxis: {},
        grid:{
          left:300,
          right:'40%',
          height:'100%'
        },
        dataset:{
            source:[
              /*["衬衫",5,20,"王大合",30],
              ["羊毛衫",20,36,"王小河",30],
              ["雪纺衫",36,10,"王小军",40],
              ["裤子",10,5],
              ["高跟鞋",10,10],
              ["袜子",20,30]*/
                ["BT/TCP",a],
                ["uTP",b],
            ]
        },
        series: [

           {
            name: "饼形占比",
            type: "pie",
            center:['25%','50%'],
            radius:[0,'30%'],
            encode:{itemName:0,value:1}
          },



             {
            name: '圆角矩形占比',
            type: 'pie',
            radius: ['40%', '70%'],
            center:['75%','50%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            encode:{itemName:0,value:1}
        },
          {
            name: '自定义饼图',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            encode:{itemName:3,value:4},
            roseType: 'radius',
            label: {
                color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',

        }

        ],
      }

      myChart.setOption(option)
    }

    onMounted(()=>{
      axios.post('http://localhost:9900/public/getprotocol').then(function (ret) {
        console.log(ret)
        echartInit(ret.data.data.bttcpc, ret.data.data.utpc);
      });

    })



    return {
      echartInit
    }
  }
}

</script>
