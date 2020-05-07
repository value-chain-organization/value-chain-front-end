<template>
  <div>
    <div class="chart-title">{{ title }}</div>
    <div id="bar-chart"></div>
  </div>
</template>

<script>
import G2 from '@antv/g2'

export default {
  name: 'BarsChart',
  data () {
    return {
      chartTitle: '',
      chartData: []
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    initChart () {
      const textStyle = {
        fill: '#999999',
        fontSize: '10',
        fontWeight: '400',
        rotate: 0
      }
      const chart = new G2.Chart({
        container: 'bar-chart',
        forceFit: true,
        height: 161,
        padding: [25, 20, 20, 55]
      })
      chart.guide().text({
        position: ['0%', '0%'],
        content: '单位: 万元',
        style: textStyle,
        offsetX: -25,
        offsetY: -12
      })
      chart.axis('value', {
        label: {
          textStyle: textStyle,
          autoRotate: false
        }
      })
      chart.axis('time', {
        tickLine: null,
        label: {
          textStyle: textStyle,
          autoRotate: false
        }
      })
      chart.legend('type', {
        position: 'top-right',
        layout: 'horizontal',
        textStyle: textStyle,
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
      chart.source(this.chartData)
      chart.interval().position('time*value').color('type', ['#003096', '#29ABFE', '#F6C425']).adjust([
        {
          type: 'dodge',
          marginRatio: 0
        }
      ])
      chart.render()
    }
  },
  mounted () {
    this.initChart()
  },
  created () {
    this.chartData = this.data
    // this.chartData = this.data.map(item => {
    //   item.value = this.numFilter(item.value)
    //   return item
    // })
    // console.log(this.chartData)
  }
}
</script>

<style lang="less" scoped>
  .chart-title {
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 14px;
    color: rgba(51, 51, 51, 1);
    letter-spacing: 1px;
  }
</style>
