<template>
  <div class="value-of-oil-dashboard page-4">
    <div class="page-header">
      <commonHeader :headerData="headerData"/>
    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <BarsChart v-if="plateBenefit.length > 0" title="化工板块效益" :data="plateBenefit"></BarsChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <SmoothLineChart v-if="mineralOilPriceData.length" title="石脑油价格" containerId="mineral_oil_price" :options="mineralOilPriceOptions" :data="mineralOilPriceData"></SmoothLineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="ethylenePropylenePxData.length" title="乙烯、丙烯、PX" containerId="ethylenePropylenePx" :options="lineChartOptions" :data="ethylenePropylenePxData"></LineChart>
        </a-col>
      </a-row>

    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <LineChart v-if="naphthaBenefitData.length" title="石脑油线效益" containerId="naphthaBenefit" :options="priceOptionArr[0]" :data="naphthaBenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="aromaticsDeviceBenefitData.length" title="芳烃装置效益" containerId="aromaticsDeviceBenefit" :options="lineChartOptions" :data="aromaticsDeviceBenefitData"></LineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="ethyleneDeviceBenefitData.length" title="乙烯装置效益" containerId="ethyleneDeviceBenefit" :options="lineChartOptions" :data="ethyleneDeviceBenefitData"></LineChart>
        </a-col>
      </a-row>
    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <LineChart v-if="PTADeviceBenefitData.length" title="PTA装置效益" containerId="PTADeviceBenefit" :options="lineChartOptions" :data="PTADeviceBenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="polyester1DeviceBenefitData.length" title="1聚酯装置效益" containerId="polyester1DeviceBenefit" :options="lineChartOptions" :data="polyester1DeviceBenefitData"></LineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="polyester2DeviceBenefitData.length" title="2聚酯装置效益" containerId="polyester2DeviceBenefit" :options="lineChartOptions" :data="polyester2DeviceBenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="disproportionBenefitData.length" title="歧化装置效益" containerId="disproportionBenefit" :options="lineChartOptions" :data="disproportionBenefitData"></LineChart>
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
      mineralOilPriceOptions: {
        unit: '单位：万元',
        xAxisKey: 'time',
        yAxisKey: 'value',
        lineColor: '#003096',
        fillColor: 'l(90) 0:rgba(0,48,150,0.43) 0.5:rgba(0,48,150,0.23) 1:rgba(0,48,150,0.05)'
      },
      mineralOilPriceData: [],
      lineChartOptions: {
        unit: '单位：万元',
        xAxisKey: 'time',
        yAxisKey: 'value'
      },
      ethylenePropylenePxData: [],
      naphthaBenefitData: [],
      aromaticsDeviceBenefitData: [],
      ethyleneDeviceBenefitData: [],
      PTADeviceBenefitData: [],
      disproportionBenefitData: [],
      polyester1DeviceBenefitData: [],
      polyester2DeviceBenefitData: [],
      lineData: [],
      priceOptionArr: []
    }
  },
  mounted () {
    getDashboardData({ id: 4 }).then((res) => {
      this.totalData = res.data.data1
      this.lineData = res.data.data2
      this.initTableLine()
      this.initScreen()
    })
  },
  watch: {
    $route (to, from) {
      if (to.path.indexOf('/valueOfOil/chemical') > -1) {
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
        }, this.lineChartOptions))
      }
    },
    initScreen () {
      this.plateBenefit = this.getDataByPlateName('化工板块', true) // 化工板块效益
      this.compareData.forEach(item => {
        const { type, cur, pre } = item
        const record = this.headerData.find(data => data.label === type)
        record.value = `¥${this.formatMoney(cur)}`
        record.isUp = cur >= pre
      })
      this.mineralOilPriceData = this.getDataByPlateName('化工板块', false, ['石脑油价格']) // 石脑油价格
      this.ethylenePropylenePxData = this.getDataByPlateName('化工板块', false, ['乙烯价格', '丙烯价格', 'PX价格']) // 乙烯、丙烯、PX
      this.naphthaBenefitData = this.getDataByPlateName('石脑油线') // 石脑油线效益
      this.aromaticsDeviceBenefitData = this.getDataByPlateName('2#二甲苯') // 芳烃装置效益
      this.ethyleneDeviceBenefitData = this.getDataByPlateName('2#乙烯') // 乙烯装置效益

      this.PTADeviceBenefitData = this.getDataByPlateName('2#氧化') // PTA装置效益
      this.disproportionBenefitData = this.getDataByPlateName('2#歧化') // 2#氧化
      this.polyester1DeviceBenefitData = this.getDataByPlateName('1#聚酯') // 1聚酯装置效益
      this.polyester2DeviceBenefitData = this.getDataByPlateName('2#聚酯') // 2聚酯装置效益
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
  .value-of-oil-dashboard.page-4 {

  }
</style>
