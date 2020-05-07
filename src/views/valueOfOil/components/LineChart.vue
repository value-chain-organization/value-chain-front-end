<template>
  <div class="custom-line-chart">
    <div class="chart-title">{{ title }}</div>
    <div :id="containerId" class="chart-container"></div>
  </div>
</template>

<script>
import G2 from '@antv/g2'

export default {
  name: 'LineChart',
  props: {
    title: {
      type: String,
      default: ''
    },
    containerId: {
      type: String,
      default: 'smooth_line_chart'
    },
    options: {
      type: Object,
      default: () => {
      }
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      chartData: [],
      axisTextStyle: {
        fill: '#999999',
        fontSize: '10',
        fontWeight: '400',
        rotate: 0
      },
      customColor: ['rgba(0, 48, 150, 1)', 'rgba(41, 171, 254, 1)', 'rgba(246, 196, 37, 1)']
    }
  },
  created () {
    this.chartData = this.data
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      const container = document.getElementById(this.containerId)
      const TICKS = this.chartData.map(d => d[this.options.xAxisKey])
      const chart = new G2.Chart({
        container: container,
        forceFit: true,
        height: container.offsetHeight,
        padding: this.options.chartPadding || [(this.options.unit ? 25 : 20), 20, 20, 45]
      })
      chart.guide().text({
        position: ['0%', '0%'],
        content: this.options.unit,
        style: this.axisTextStyle,
        offsetX: -25,
        offsetY: -15
      })
      chart.source(this.chartData, {
        [this.options.xAxisKey]: {
          ticks: TICKS,
          range: [0, 1]
        }
        // [this.options.yAxisKey]: {
        //   tickInterval: this.options.yAxisTickInterval || 20,
        //   max: this.options.yAxisTickMax || 100,
        //   min: this.options.yAxisTickMin || 0
        // }
      })
      // chart.legend('type',{position: 'right-top',itemGap: 16 })// 图例项之间的间距
      chart.legend('type', {
        position: 'top-right',
        layout: 'horizontal',
        textStyle: this.axisTextStyle,
        offsetX: 0,
        offsetY: 0,
        itemGap: 35,
        marker: 'circle'
      })
      chart.tooltip(true, {
        'g2-tooltip': {
          width: 'unset',
          height: 'unset',
          border: 'unset'
        }
      })
      chart.axis(this.options.yAxisKey, {
        label: { textStyle: this.axisTextStyle, autoRotate: false },
        line: {
          lineWidth: this.options.axisLineWidth || 1, // 设置线的宽度
          stroke: this.options.axisLineColor || '#E9E9E9', // 设置线的颜色
          lineDash: [1, 1] // 设置虚线样式
        }
      })
      chart.axis(this.options.xAxisKey, {
        label: { textStyle: this.axisTextStyle, autoRotate: false },
        tickLine: null, // 不显示X轴刻度线
        line: {
          lineWidth: this.options.axisLineWidth || 1, // 设置线的宽度
          stroke: this.options.axisLineColor || '#E9E9E9' // 设置线的颜色
        },
        grid: {
          type: 'line', // 声明网格的类型，line 表示线，polygon 表示矩形框
          // 当网格类型 type 为 line 时，使用 lineStyle 设置样式
          lineStyle: {
            stroke: '#E9E9E9',
            lineWidth: 1,
            lineDash: [1, 1]
          }
          // highLightZero: true, // 默认不高亮0轴
          // zeroLineStyle: { // 当且仅当 highLightZero 为 true 时生效
          //   stroke: '#ff0000',
          //   lineDash: [ 1, 1 ]
          // },
          // alternateColor: '#ccc' | [ '#f80', '#ccc' ], // 当网格类型 type 为 polygon 时，使用 alternateColor 为网格设置交替的颜色，指定一个值则先渲染奇数层，两个值则交替渲染
          // hideFirstLine: false, // 是否隐藏第一条网格线，默认为 false
          // hideLastLine: false // 是否隐藏最后一条网格线，默认为 false
          // align: 'center' // 声明网格顶点从两个刻度中间开始，默认从刻度点开始
        }
      })
      if (this.options.showLevel) {
        chart.guide().line({
          top: true,
          start: ['min', this.options.hightLevel],
          end: ['max', this.options.hightLevel],
          lineStyle: {
            stroke: 'rgba(16, 247, 51, .5)',
            lineWidth: 1,
            lineDash: [3, 3]
          }
        })
        chart.guide().line({
          top: true,
          start: ['min', this.options.lowLevel],
          end: ['max', this.options.lowLevel],
          lineStyle: {
            stroke: 'rgba(255, 3, 3, .3)',
            lineWidth: 1,
            lineDash: [3, 3]
          }
        })
      }
      // 生成折线
      chart.line().position(`${this.options.xAxisKey}*${this.options.yAxisKey}`).shape('smooth').color('type', this.customColor)
      chart.point().position(`${this.options.xAxisKey}*${this.options.yAxisKey}`).color('type', this.customColor)
      chart.render()
    }
  }
}
</script>

<style lang="less" scoped>
  .custom-line-chart {
    position: relative;
    width: 100%;
    height: 100%;

    .chart-title {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 24px;
      color: rgba(51, 51, 51, 1);
      letter-spacing: 1px;
      opacity: 1;
    }

    .chart-container {
      width: 100%;
      height: calc(100% - 24px);
    }
  }
</style>
