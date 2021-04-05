// import { mapState } from 'vuex'
export default {
  data() {
    return {
      eInstance: []
    };
  },
  computed: {
    // ...mapState('root', ['isMenuCollapse']),
    // ...mapState('stage', ['resizeNum']),
  },
  watch: {
    eInstance() {
      this.eInstance.forEach((item, n) => {
        if (item.isDisposed()) {
          this.eInstance.splice(n, 1);
        }
      });
    },
    isMenuCollapse() {
      this.handleResizeAsync();
    },
    resizeNum() {
      this.handleResize();
    }
  },
  mounted() {
    // 窗口改变大小时触发resize
    window.addEventListener('resize', this.handleResizeAsync);
  },
  destroyed() {
    // 防止内存泄漏
    this.eInstance.forEach((chart) => {
      chart.dispose();
      chart = null;
    });
    this.eInstance = [];
    // 删除resize事件
    window.removeEventListener('resize', this.handleResizeAsync);
  },
  methods: {
    // echart初始化方法
    initChart(ele, theme) {
      this.eInstance = this.eInstance || [];
      const echart = this.$echarts.init(ele, theme);
      this.eInstance.push(echart);
      return echart;
    },
    handleResizeAsync() {
      setTimeout(() => {
        this.handleResize();
      }, 300);
    },
    handleResize() {
      this.eInstance = this.eInstance || [];
      this.eInstance.forEach((chart) => {
        !chart.isDisposed() && chart.resize();
      });
    }
  }
};
