<template>
  <div class="value-of-oil-dashboard page-3">
    <div class="page-header">
      <commonHeader :headerData="headerData"/>
    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <BarsChart v-if="plateBenefit.length > 0" title="塑料板块效益" :data="plateBenefit"></BarsChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <SmoothLineChart v-if="pePriceData.length" title="PE价格" containerId="pe_price" :options="pePriceOptions" :data="pePriceData"></SmoothLineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <SmoothLineChart v-if="ppPriceData.length" title="PP价格" containerId="pp_price" :options="ppPriceOptions" :data="ppPriceData"></SmoothLineChart>
        </a-col>
      </a-row>
    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <LineChart v-if="ethyleneLineBenefitData.length" title="乙烯线效益" containerId="ethyleneLineBenefit" :options="priceOptionArr[0]" :data="ethyleneLineBenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="PE1DeviceBenefitData.length" title="1PE装置效益" containerId="1PEDeviceBenefit" :options="lineChartOptions" :data="PE1DeviceBenefitData"></LineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="PE2DeviceBenefitData.length" title="2PE装置效益" containerId="2PEDeviceBenefit" :options="lineChartOptions" :data="PE2DeviceBenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="PE4DeviceBenefitData.length" title="4PE装置效益" containerId="4PEDeviceBenefit" :options="lineChartOptions" :data="PE4DeviceBenefitData"></LineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="glycol_1_DeviceBenefitData.length" title="1乙二醇装置效益" containerId="glycol1DeviceBenefit" :options="lineChartOptions" :data="glycol_1_DeviceBenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="glycol_2_DeviceBenefitData.length" title="2乙二醇装置效益" containerId="glycol2DeviceBenefit" :options="lineChartOptions" :data="glycol_2_DeviceBenefitData"></LineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="VACDeviceBenefitData.length" title="VAC装置效益" containerId="VACDeviceBenefit" :options="lineChartOptions" :data="VACDeviceBenefitData"></LineChart>
        </a-col>
      </a-row>
    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <LineChart v-if="acrylicLineBenefitData.length" title="丙烯线效益" containerId="acrylicLineBenefit" :options="priceOptionArr[1]" :data="acrylicLineBenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="PP1DeviceBenefitData.length" title="1PP装置效益" containerId="PP1DeviceBenefit" :options="lineChartOptions" :data="PP1DeviceBenefitData"></LineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="PP2DeviceBenefitData.length" title="2PP装置效益" containerId="PP2DeviceBenefit" :options="lineChartOptions" :data="PP2DeviceBenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="PP3DeviceBenefitData.length" title="3PP装置效益" containerId="PP3DeviceBenefit" :options="lineChartOptions" :data="PP3DeviceBenefitData"></LineChart>
        </a-col>
      </a-row>
    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <LineChart v-if="C5BenefitData.length" title="C5效益" containerId="C5Benefit" :options="lineChartOptions" :data="C5BenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="C5_1_BenefitData.length" title="1C5效益" containerId="C5_1_Benefit" :options="lineChartOptions" :data="C5_1_BenefitData"></LineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="C5_2_BenefitData.length" title="2C5效益" containerId="C5_2_Benefit" :options="lineChartOptions" :data="C5_2_BenefitData"></LineChart>
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
      totalData: {},
      plateBenefit: [],
      pePriceOptions: {
        unit: '单位：万元',
        xAxisKey: 'time',
        yAxisKey: 'value',
        lineColor: '#003096',
        fillColor: 'l(90) 0:rgba(0,48,150,0.43) 0.5:rgba(0,48,150,0.23) 1:rgba(0,48,150,0.05)'
      },
      pePriceData: [],
      ppPriceOptions: {
        unit: '单位：万元',
        xAxisKey: 'time',
        yAxisKey: 'value',
        lineColor: '#F33D20',
        fillColor: 'l(90) 0:rgba(243,61,32,0.43) 0.5:rgba(243,61,32,0.23) 1:rgba(243,61,32,0.05)'
      },
      ppPriceData: [],
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
      ethyleneLineBenefitData: [],
      PE1DeviceBenefitData: [],
      PE2DeviceBenefitData: [],
      PE4DeviceBenefitData: [],
      glycol_1_DeviceBenefitData: [],
      glycol_2_DeviceBenefitData: [],
      VACDeviceBenefitData: [],
      acrylicLineBenefitData: [],
      PP1DeviceBenefitData: [],
      PP2DeviceBenefitData: [],
      PP3DeviceBenefitData: [],
      C5BenefitData: [],
      C5_1_BenefitData: [],
      C5_2_BenefitData: [],
      lineData: [],
      priceOptionArr: []
    }
  },
  mounted () {
    getDashboardData({ id: 3 }).then((res) => {
      this.totalData = res.data.data1
      this.lineData = res.data.data2
      this.initTableLine()
      this.initScreen()
    })
  },
  watch: {
    $route (to, from) {
      if (to.path.indexOf('/valueOfOil/plastic') > -1) {
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
      this.plateBenefit = this.getDataByPlateName('塑料板块', true) // 塑料板块效益
      this.compareData.forEach(item => {
        const { type, cur, pre } = item
        const record = this.headerData.find(data => data.label === type)
        record.value = `¥${this.formatMoney(cur)}`
        record.isUp = cur >= pre
      })
      this.pePriceData = this.getDataByPlateName('塑料板块', false, ['PE价格']) // PE价格
      this.ppPriceData = this.getDataByPlateName('塑料板块', false, ['PP价格']) // PP价格
      this.ethyleneLineBenefitData = this.getDataByPlateName('乙烯线') // 乙烯线效益
      this.PE1DeviceBenefitData = this.getDataByPlateName('1#聚乙烯') // 1PE装置效益
      this.PE2DeviceBenefitData = this.getDataByPlateName('2#聚乙烯') // 2PE装置效益
      this.PE4DeviceBenefitData = this.getDataByPlateName('4#聚乙烯') // 4PE装置效益
      this.glycol_1_DeviceBenefitData = this.getDataByPlateName('1#乙二醇') // 1乙二醇装置效益
      this.glycol_2_DeviceBenefitData = this.getDataByPlateName('2#乙二醇') // 2乙二醇装置效益
      this.VACDeviceBenefitData = this.getDataByPlateName('1#醋酸乙烯') // VAC装置效益
      this.acrylicLineBenefitData = this.getDataByPlateName('丙烯线') // 丙烯线效益
      this.PP1DeviceBenefitData = this.getDataByPlateName('1#聚丙烯') // 1PP装置效益
      this.PP2DeviceBenefitData = this.getDataByPlateName('2#聚丙烯') // 2PP装置效益
      this.PP3DeviceBenefitData = this.getDataByPlateName('3#聚丙烯') // 3PP装置效益
      this.C5BenefitData = this.getDataByPlateName('C5线') // C5效益
      this.C5_1_BenefitData = this.getDataByPlateName('1#碳五') // 1C5效益
      this.C5_2_BenefitData = this.getDataByPlateName('2#碳五分离') // 2C5效益
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
  .value-of-oil-dashboard.page-3 {

  }
</style>
