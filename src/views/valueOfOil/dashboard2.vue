<template>
  <div class="value-of-oil-dashboard page-2">
    <div class="page-header">
      <commonHeader :headerData="headerData"/>
    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <BarsChart v-if="plateBenefit.length > 0" title="炼油板块效益" :data="plateBenefit"></BarsChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <SmoothLineChart v-if="crudeOilPriceData.length" title="原油价格" containerId="crude_oil_price" :options="crudeOilPriceOptions" :data="crudeOilPriceData"></SmoothLineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="gasfiredDieselPriceData.length" title="汽煤柴价格" containerId="gasfiredDiesel_price" :options="lineChartOptions" :data="gasfiredDieselPriceData"></LineChart>
        </a-col>
      </a-row>

    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <LineChart v-if="waxOilLineBenefitData.length" title="蜡油线效益" containerId="waxOilLineBenefit" :options="priceOptionArr[0]" :data="waxOilLineBenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="mediumPressureDeviceData.length" title="中压加氢装置效益" containerId="mediumPressureDevice" :options="lineChartOptions" :data="mediumPressureDeviceData"></LineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="highPressureDeviceData.length" title="高压加氢装置效益" containerId="highPressureDevice" :options="lineChartOptions" :data="highPressureDeviceData"></LineChart>
        </a-col>
      </a-row>
    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <LineChart v-if="residueLineBenefitData.length" title="渣油线效益" containerId="residueLineBenefit" :options="priceOptionArr[1]" :data="residueLineBenefitData"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="catalyticUnitBenefitData.length" title="2#催化裂化装置效益" containerId="catalyticUnitBenefit" :options="lineChartOptions" :data="catalyticUnitBenefitData"></LineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="residueLineBenefitData2.length" title="渣油加氢装置效益" containerId="residueLineBenefit2" :options="lineChartOptions" :data="residueLineBenefitData2"></LineChart>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="cokingPlantBenefitData.length" title="1#延迟焦化装置效益" containerId="cokingPlantBenefit" :options="lineChartOptions" :data="cokingPlantBenefitData"></LineChart>
        </a-col>
        <a-col :span="12" class="chart-line">
          <LineChart v-if="asphaltPlantBenefitData.length" title="2#延迟焦化装置效益" containerId="asphaltPlantBenefit" :options="lineChartOptions" :data="asphaltPlantBenefitData"></LineChart>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { commonHeader, SmoothLineChart, BarsChart, LineChart } from './components'
import { getDashboardData } from '@/api/dashboard'
import moment from 'moment'

export default {
  components: {
    commonHeader,
    SmoothLineChart,
    BarsChart,
    LineChart
  },
  data () {
    return {
      compareData: [],
      headerData: [
        { key: 'month-benefit', label: '月度效益', iconFont: 'iconjinbi', value: '', isUp: true },
        { key: 'day-benefit', label: '当天效益', iconFont: 'iconlianhe', value: '', isUp: true },
        { key: 'opt-benefit', label: '优化效益', iconFont: 'iconxiaoshuai', value: '', isUp: true }
      ],
      crudeOilPriceOptions: {
        unit: '单位：万元',
        xAxisKey: 'time',
        yAxisKey: 'value',
        lineColor: '#003096',
        fillColor: 'l(90) 0:rgba(0,48,150,0.43) 0.5:rgba(0,48,150,0.23) 1:rgba(0,48,150,0.05)'
      },
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
      plateBenefit: [],
      crudeOilPriceData: [],
      gasfiredDieselPriceData: [],
      waxOilLineBenefitData: [],
      mediumPressureDeviceData: [],
      highPressureDeviceData: [],
      residueLineBenefitData: [],
      catalyticUnitBenefitData: [],
      residueLineBenefitData2: [],
      cokingPlantBenefitData: [],
      asphaltPlantBenefitData: [],
      lineData: [],
      priceOptionArr: []
    }
  },
  methods: {
    initScreen () {
      this.plateBenefit = this.getDataByPlateName('炼油板块', true) // 炼油板块效益
      this.compareData.forEach(item => {
        const { type, cur, pre } = item
        const record = this.headerData.find(data => data.label === type)
        record.value = `¥${this.formatMoney(cur)}`
        record.isUp = cur >= pre
      })
      this.crudeOilPriceData = this.getDataByPlateName('炼油板块', false, ['原油价格']) // 原油价格
      this.gasfiredDieselPriceData = this.getDataByPlateName('炼油板块', false, ['汽油价格', '煤油价格', '柴油价格']) // 汽煤柴价格
      this.waxOilLineBenefitData = this.getDataByPlateName('蜡油线路') // 蜡油线效益
      this.mediumPressureDeviceData = this.getDataByPlateName('中压加氢') // 中压加氢装置效益
      this.highPressureDeviceData = this.getDataByPlateName('高压加氢') // 高压加氢装置效益
      this.residueLineBenefitData = this.getDataByPlateName('渣油线路') // 渣油线效益
      this.catalyticUnitBenefitData = this.getDataByPlateName('2#催化裂化') // 2#催化裂化装置效益
      this.residueLineBenefitData2 = this.getDataByPlateName('渣油加氢') // 渣油加氢装置效益
      this.cokingPlantBenefitData = this.getDataByPlateName('1#延迟焦化') // 1#延迟焦化装置效益
      this.asphaltPlantBenefitData = this.getDataByPlateName('2#延迟焦化') // 沥青装置效益
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
    },
    initTableLine () {
      for (let i = 0; i < this.lineData.length; i += 2) {
        this.priceOptionArr.push(Object.assign({
          showLevel: true,
          hightLevel: this.lineData[i].highlow,
          lowLevel: this.lineData[i + 1].highlow
        }, this.lineChartLevelOptions))
      }
    }
  },
  mounted () {
    getDashboardData({ id: 2 }).then((res) => {
      this.totalData = res.data.data1
      this.lineData = res.data.data2
      this.initScreen()
      this.initTableLine()
    })
  },
  watch: {
    $route (to, from) {
      if (to.path.indexOf('/valueOfOil/refining') > -1) {
        const e = document.createEvent('Event')
        e.initEvent('resize', true, true)
        window.dispatchEvent(e)
      }
    }
  },
  beforeDestroy () {
  }
}
</script>

<style lang="less" scoped>
  .value-of-oil-dashboard.page-2 {
  }
</style>
