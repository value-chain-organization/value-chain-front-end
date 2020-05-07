<template>
  <div class="value-of-oil-dashboard page-5">
    <div class="page-header">
      <commonHeader :headerData="headerData"/>
    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <BarsChart v-if="plateBenefit.length > 0" title="纤维板块效益" :data="plateBenefit"></BarsChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <SmoothLineChart v-if="polyesterPriceData.length" title="聚酯价格" containerId="polyester_price" :options="polyesterPriceOptions" :data="polyesterPriceData"></SmoothLineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <SmoothLineChart v-if="acrylicPriceData.length" title="腈纶价格" containerId="acrylic_price" :options="acrylicPriceOptions" :data="acrylicPriceData"></SmoothLineChart>
        </a-col>
      </a-row>
    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <LineChart v-if="acrylicLineBenefitData.length" title="腈纶线效益" containerId="acrylicLineBenefit" :options="priceOptionArr[0]" :data="acrylicLineBenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="sourceAcrylicBenefitData.length" title="南腈纶装置效益" containerId="sourceAcrylicBenefit" :options="lineChartOptions" :data="sourceAcrylicBenefitData"></LineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="northAcrylicBenefitData.length" title="北腈纶装置效益" containerId="northAcrylicBenefit" :options="lineChartOptions" :data="northAcrylicBenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="goldAcrylicBenefitData.length" title="金阳腈纶装置效益" containerId="goldAcrylicBenefit" :options="lineChartOptions" :data="goldAcrylicBenefitData"></LineChart>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { commonHeader, LineChart, SmoothLineChart, BarsChart } from './components'
import { getDashboardData } from '@/api/dashboard'
import moment from 'moment'

export default {
  components: {
    commonHeader,
    LineChart,
    SmoothLineChart,
    BarsChart
  },
  data () {
    return {
      compareData: [],
      headerData: [
        { key: 'month-benefit', label: '月度效益', iconFont: 'iconjinbi', value: '', isUp: true },
        { key: 'day-benefit', label: '当天效益', iconFont: 'iconlianhe', value: '', isUp: true },
        { key: 'opt-benefit', label: '优化效益', iconFont: 'iconxiaoshuai', value: '', isUp: true }
      ],
      plateBenefit: [],
      polyesterPriceOptions: {
        unit: '单位：万元',
        xAxisKey: 'time',
        yAxisKey: 'value',
        lineColor: '#003096',
        fillColor: 'l(90) 0:rgba(0,48,150,0.43) 0.5:rgba(0,48,150,0.23) 1:rgba(0,48,150,0.05)'
      },
      polyesterPriceData: [],
      acrylicPriceOptions: {
        unit: '单位：万元',
        xAxisKey: 'time',
        yAxisKey: 'value',
        lineColor: '#F33D20',
        fillColor: 'l(90) 0:rgba(243,61,32,0.43) 0.5:rgba(243,61,32,0.23) 1:rgba(243,61,32,0.05)'
      },
      acrylicPriceData: [],
      lineChartOptions: {
        unit: '单位：万元',
        xAxisKey: 'time',
        yAxisKey: 'value'
      },
      lineChartLevelOptions: {
        unit: '单位：万元',
        xAxisKey: 'time',
        yAxisKey: 'value',
        showLevel: true
      },
      acrylicLineBenefitData: [],
      sourceAcrylicBenefitData: [],
      northAcrylicBenefitData: [],
      goldAcrylicBenefitData: [],
      lineData: [],
      priceOptionArr: []
    }
  },
  mounted () {
    getDashboardData({ id: 5 }).then((res) => {
      this.totalData = res.data.data1
      this.lineData = res.data.data2
      this.initScreen()
      this.initTableLine()
    })
  },
  watch: {
    $route (to, from) {
      if (to.path.indexOf('/valueOfOil/fiber') > -1) {
        const e = document.createEvent('Event')
        e.initEvent('resize', true, true)
        window.dispatchEvent(e)
      }
    }
  },
  beforeDestroy () {
  },
  methods: {
    initTableLine () {
      for (let i = 0; i < this.lineData.length; i += 2) {
        this.priceOptionArr.push(Object.assign({
          showLevel: true,
          hightLevel: this.lineData[i].highlow,
          lowLevel: this.lineData[i + 1].highlow
        }, this.lineChartLevelOptions))
      }
    },
    initScreen () {
      this.plateBenefit = this.getDataByPlateName('纤维板块', true) // 纤维板块效益
      this.compareData.forEach(item => {
        const { type, cur, pre } = item
        const record = this.headerData.find(data => data.label === type)
        record.value = `¥${this.formatMoney(cur)}`
        record.isUp = cur >= pre
      })
      this.polyesterPriceData = this.getDataByPlateName('纤维板块', false, ['聚酯价格']) // 聚酯价格
      this.acrylicPriceData = this.getDataByPlateName('纤维板块', false, ['腈纶价格']) // 腈纶价格
      this.acrylicLineBenefitData = this.getDataByPlateName('腈纶路线') // 腈纶线效益
      this.sourceAcrylicBenefitData = this.getDataByPlateName('南腈纶') // 南腈纶装置效益
      this.northAcrylicBenefitData = this.getDataByPlateName('北腈纶') // 北腈纶装置效益
      this.goldAcrylicBenefitData = this.getDataByPlateName('金阳腈纶') // 金阳腈纶装置效益
    },
    getDataByPlateName (name, isHeader = false, keys = ['月度效益', '当天效益', '优化效益']) {
      const result = this.totalData.filter(d => d['PlateName'] === name && keys.includes(d['TagName'])).map(line => {
        const plateResponseLst = line['plateResponseLst']
        if (isHeader) {
          const size = plateResponseLst.length
          this.compareData.push({ type: line['TagName'], cur: size > 0 ? plateResponseLst[size - 1]['TagValue'] : 0, pre: size > 1 ? plateResponseLst[size - 2]['TagValue'] : 0 })
        }
        return plateResponseLst.map(point => {
          return { type: line['TagName'], time: moment(point['TagTime'].split(' ')[0]).format('MM-DD'), value: parseFloat(point['TagValue']) }
        })
      }).flat()
      return result.length ? result : ['']
    },
    formatMoney (val) {
      const str = (val / 100 * 100).toFixed(2) + ''
      return str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',')
    }
  }
}
</script>

<style lang="less" scoped>
  .value-of-oil-dashboard.page-5 {

  }
</style>
