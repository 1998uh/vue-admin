<template>
  <div class="score-pie">
    <!-- <div class="rank" :class="rankLevel">
      <img :src="img" alt />
      <div>
        <div class="score">{{ `NO.${echartsData.allRanking||'-'}` }}</div>
        <div class="label">{{rankType}}</div>
      </div>
    </div>-->
    <div class="echarts" ref="echarts"></div>
    <div class="center-txt">
      <div>得分</div>
      <div class="text">
        {{ score !== null ? score : '-' }}
        <!-- <svg viewBoxs="0 0 100 100" class="svgBox">
            <defs>
                <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="50">
                    <stop  offset="0" style="stop-color:yellow"/>
                    <stop  offset="0.5" style="stop-color:#ff7c3b"/>
                    <stop  offset="1" style="stop-color:#ffd43b"/>
                </linearGradient>
            </defs>
            <text text-anchor="middle" class="gradient-text-three" x="45px" y="20%" v-text="score"></text>
        </svg>-->
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 雷达图
 */

import mixin from './echart';
// import { getEchartsFontSize, loopShowTooltip } from '@/scripts/utils'
import { getEchartsFontSize } from '@/scripts/utils';
// import { mapState } from 'vuex'
export default {
  name: 'PieChart',
  mixins: [mixin],
  props: {
    echartsData: {
      type: Object,
      default: function () {
        return {};
      }
    },
    scores: {
      type: String,
      default: function () {
        return '';
      }
    },
    rankType: {
      type: String,
      default: function () {
        return '世界排名';
      }
    }
  },
  computed: {
    // ...mapState(['isOnResize']),
    // img() {
    //   const val = this.echartsData.allRanking
    //   if (this.rankType === '世界排名') {
    //     return val <= 10
    //       ? require('../../assets/img/top10.png')
    //       : val <= 50
    //       ? require('../../assets/img/top50.png')
    //       : require('../../assets/img/top100.png')
    //   } else {
    //     return val <= 1
    //       ? require('../../assets/img/top10.png')
    //       : val <= 2
    //       ? require('../../assets/img/top50.png')
    //       : require('../../assets/img/top100.png')
    //   }
    // },
    rankLevel() {
      const val = this.echartsData.allRanking;
      if (this.rankType === '世界排名') {
        return val <= 10 ? 'gold' : val <= 50 ? 'silver' : 'copper';
      } else {
        return val <= 1 ? 'gold' : val <= 2 ? 'silver' : 'copper';
      }
    }
  },
  data() {
    return {
      score: '',
      myChart: null,
      clearLoop: null,
      legendArrs: [],

      option: {
        tooltip: {
          // formatter: params => {
          //   return str;
          // },
          show: true,
          confine: true,
          trigger: 'item',
          // axisPointer: {
          //   type: "line"
          // },
          padding: [8, 12],
          extraCssText: 'background: rgba(0,0,0,0.80);border: 1px solid #2569C1;border-radius: 4px;'
        },
        color: [
          '#3BA0FF',
          '#36CBCB',
          '#4DCB73',
          '#FAD337',
          '#F2637B',
          '#975FE4',
          '#ff9c00',
          '#fce74d',
          '#CEFC51',
          '#73FBD8',
          '#4FB7F9',
          '#2A75F6',
          '#1E64F6',
          '#0F51F5'
        ],
        legend: {
          show: false
        },
        series: {
          type: 'pie',
          radius: ['45%', '65%'],
          center: ['50%', '50%'],
          roseType: this.echartsData.roseType, // 'area',radius玫瑰图
          label: {
            formatter: (params) => {
              let val = params.name.length > 4 ? params.name.substr(0, 4) + '...' : params.name;
              // let val = params.name
              val = val.replace('（', '(');
              val = val.replace('）', ')');
              return '{b|' + val + '}\n{c|' + params.value + '}';
            },
            rich: {
              b: {
                color: 'rgba(0,0,0,0.65)',
                fontSize: 14 || getEchartsFontSize(14),
                lineHeight: 22 || getEchartsFontSize(22)
              },
              c: {
                color: '#32a3b4',
                fontSize: 14 || getEchartsFontSize(14),
                lineHeight: 22 || getEchartsFontSize(22)
              }
            }
          },
          labelLine: {
            lineStyle: {
              color: '#03688C'
            }
          }
        }
      }
    };
  },
  created() {
    this.score = this.scores || this.echartsData.total;
  },
  mounted() {
    this.score = this.scores || this.echartsData.total;
    this.$nextTick(() => {
      if (this.echartsData.seriesData && this.echartsData.seriesData.length !== 0) {
        this.initData();
      }
    });
  },
  methods: {
    // // echart初始化方法
    // initChart(ele, theme) {
    //   this.eInstance = this.eInstance || []
    //   const echart = window.echarts.init(ele, theme)
    //   this.eInstance.push(echart)
    //   return echart
    // },
    // initChart(ele, theme) {
    //   const echart = echarts.init(ele, theme) // eslint-disable-line
    //   this.chartsArr.push(echart)
    //   return echart
    // },
    initData() {
      // 初始化数据
      let data = [];
      this.echartsData.seriesData.forEach((item) => {
        data.push({
          value: item.value,
          name: item.name
        });
      });
      this.option.series.data = data;
      // this.option.legend.data = this.echartsData.seriesData.map(i => {
      //   return i.name
      // })
      this.init();
    },
    init() {
      // 初始化图表
      this.myChart = this.initChart(this.$refs.echarts);
      this.myChart.setOption(this.option);
      // this.myChart.resize();
      // clearTimeout(this.clearLoop);
      // let dataIndex = 0;
      // const loopTips = () => {
      //   this.myChart.dispatchAction({
      //     type: "showTip",
      //     seriesIndex: 0,
      //     dataIndex
      //   });

      //   if (dataIndex++ < count) {
      //     this.clearLoop = setTimeout(loopTips, 2000);
      //   } else {
      //     this.clearLoop = setTimeout(() => {
      //       this.myChart.dispatchAction({
      //         type: "hideTip"
      //       });
      //     }, 2000);
      //   }
      // };
      // this.clearLoop = setTimeout(loopTips, 2000);
    }
  },
  watch: {
    'echartsData.seriesData': {
      handler() {
        if (this.myChart) {
          this.myChart.clear();
          this.score = this.echartsData.total;
        }
        this.initData();
      },
      deep: true
    },
    /* isOnResize(cur, old) {
      this.myChart.clear()
      this.$nextTick(() => {
        this.myChart.setOption(this.option)
        this.myChart.resize()
      })
    }, */
    'echartsData.total': {
      handler(newVal) {
        this.score = newVal;
        // console.log(this.echartsData.total)
      }
    },
    scores(v) {
      this.score = v;
    }
  },

  beforeDestroy() {}
};
</script>
<style lang="less" scoped>
.score-pie {
  position: relative;
  // background: url('../../assets/img/panel_bg.png');
  background-size: 100% 100%;
  height: 320px;
  width: 410px;
  float: left;
  position: relative;
  .echarts {
    height: 100%;
    width: 100%;
  }
}
.rank {
  position: absolute;
  top: 8%;
  left: 5%;
  display: flex;
  img {
    width: 40px;
    height: 40px;
  }
  .score {
    font-family: DIN;
    font-size: 32px;
    letter-spacing: 0;
    text-align: left;
    margin-top: -7px;
    margin-left: 4px;
  }
  .label {
    font-size: 14px;
    letter-spacing: 0;
    margin-top: -8px;
    margin-left: 4px;
  }
}
.gold {
  color: #ffc41a;
}
.silver {
  color: #abe0ff;
}
.copper {
  color: #ff8920;
}
.center-txt {
  text-align: center;
  position: absolute;
  top: 40%;
  right: 155px;
  div {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    letter-spacing: 0;
    height: auto;
  }
  .text {
    width: 100px;
    line-height: 40px;
    font-size: 14px;
    letter-spacing: 0;
    font-family: HelveticaNeue;
    font-size: 30px;
    color: rgba(0, 0, 0, 0.9);
    // background-image: -webkit-linear-gradient(bottom, #ff7c3b, #ffd43b);
    // background-image: linear-gradient(bottom, #ff7c3b, #ffd43b);
    // background-clip: text;
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }
}
</style>
