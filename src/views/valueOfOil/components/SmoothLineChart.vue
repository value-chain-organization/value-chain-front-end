<template>
  <div class="line-chart smooth-line-chart">
    <div class="chart-title">{{ title }}</div>
    <!-- <div class="chart-unit" v-if="options.unit">{{ options.unit }}</div> -->
    <div :id="containerId" class="chart-container"></div>
  </div>
</template>

<script>
import G2 from '@antv/g2'

export default {
  name: 'SmoothLineChart',
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
      default: () => {}
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
      }
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
      chart.legend(false)
      chart.tooltip({
        showTitle: false,
        // follow: false,
        // position: 'top',
        containerTpl:
          '<div class="g2-tooltip"><div class="g2-tooltip-list"></div></div>', // tooltip的外层模板
        itemTpl:
          '<div class="g2-tooltip-list-item" style="color: #666666; margin: 0px">{value}</div>',
        offset: 0,
        crosshairs: {
          type: 'y',
          lineStyle: {
            stroke: this.options.lineColor
          }
        },
        'g2-tooltip': {
          position: 'absolute',
          top: '0px',
          // visibility: 'hidden',
          width: '100px',
          height: '15px',
          border: `1px solid ${this.options.lineColor}`,
          backgroundColor: 'white',
          borderRadius: '15px',
          opacity: '1'
        }, // 设置 tooltip 的 css 样式
        'g2-tooltip-list': {
          position: 'relative',
          top: '-8px',
          left: '-2px',
          fontSize: '10px',
          fontFamily: 'Source Han Sans CN',
          fontWeight: 400,
          lineHeight: '13px'
        }
      })
      chart.axis(this.options.yAxisKey, {
        label: { textStyle: this.axisTextStyle, autoRotate: false },
        line: {
          lineWidth: this.options.axisLineWidth || 1, // 设置线的宽度
          stroke: this.options.axisLineColor || '#E9E9E9', // 设置线的颜色
          lineDash: [ 1, 1 ] // 设置虚线样式
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
            lineDash: [ 1, 1 ]
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
      // 生成折线
      chart.line().position(`${this.options.xAxisKey}*${this.options.yAxisKey}`).color(this.options.lineColor).shape('smooth')
      // 使用area填充
      if (this.options.fillColor) {
        chart.area().tooltip(false).position(`${this.options.xAxisKey}*${this.options.yAxisKey}`).style({ fill: this.options.fillColor }).shape('smooth')
      }
      chart.render()
    }
  }
}
</script>

<style lang="less" scoped>
  .line-chart {
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

    // .chart-unit {
    //   position: absolute;
    //   top: 28px;
    //   left: 0;
    //   font-size: 10px;
    //   font-family: Source Han Sans CN;
    //   font-weight: 400;
    //   line-height: 17px;
    //   color: rgba(153, 153, 153, 1);
    // }

    .chart-container {
      width: 100%;
      height: calc(100% - 24px);
    }
  }
</style>
