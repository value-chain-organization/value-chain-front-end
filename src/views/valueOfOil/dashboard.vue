<template>
  <div class="value-of-oil-dashboard page-1">
    <div class="page-header">
      <commonHeader :headerData="headerData" :pieData="pieData"/>
      <div class="pie-chart-line">
        <div class="pie-chart" id="month-benefit"></div>
        <div class="pie-chart" id="daily-benefit"></div>
        <div class="pie-chart" id="optimize-benefit"></div>
      </div>
    </div>
    <div class="chart-group">
      <a-row>
        <a-col :span="24" class="chart-bar">
          <BarsChart v-if="plateBenefit.length > 0" title="效益趋势图" :data="plateBenefit"></BarsChart>
        </a-col>
      </a-row>
      <a-divider/>
      <a-row>
        <a-col :span="12" class="chart-line">
          <router-link to="/valueOfOil/refining">
            <LineChart
              v-if="oilPriceData.length"
              title="炼油板块"
              containerId="oil_price"
              :options="priceOptionArr[0]"
              :data="oilPriceData"></LineChart>
          </router-link>
        </a-col>
        <a-col :span="12" class="chart-table">
          <div class="table-block autoScroll">
            <div class="table-block-title">炼油装置负荷</div>
            <a-table
              :rowKey="(record) => record.id"
              :columns="tableColumns"
              :dataSource="loadDataOil"
              :pagination="false"
              :scroll="{y:$flexible(155),x:$flexible(700)}"
            />
          </div>
        </a-col>
      </a-row>
      <a-divider/>
      <a-row>
        <a-col :span="12" class="chart-line">
          <router-link to="/valueOfOil/chemical">
            <LineChart
              v-if="chemicalPriceData.length"
              title="化工板块"
              containerId="chemical_price"
              :options="priceOptionArr[1]"
              :data="chemicalPriceData"></LineChart>
          </router-link>
        </a-col>
        <a-col :span="12" class="chart-table">
          <div class="table-block autoScroll">
            <div class="table-block-title">化工装置负荷</div>
            <a-table
              :rowKey="(record) => record.id"
              :columns="tableColumns"
              :dataSource="loadDataChemical"
              :pagination="false"
              :scroll="{y:$flexible(155),x:$flexible(700)}"
            />
          </div>
        </a-col>
      </a-row>
      <a-divider/>
      <a-row>
        <a-col :span="12" class="chart-line">
          <router-link to="/valueOfOil/plastic">
            <LineChart
              v-if="fiberPriceData.length"
              title="塑料板块"
              containerId="fiber_price"
              :options="priceOptionArr[2]"
              :data="fiberPriceData"></LineChart>
          </router-link>
        </a-col>
        <a-col :span="12" class="chart-table">
          <div class="table-block autoScroll">
            <div class="table-block-title">塑料装置负荷</div>
            <a-table
              :rowKey="(record) => record.id"
              :columns="tableColumns"
              :dataSource="loadDataPlastic"
              :pagination="false"
              :scroll="{y:$flexible(155),x:$flexible(700)}"
            />
          </div>
        </a-col>
      </a-row>
      <a-divider/>
      <a-row>
        <a-col :span="12" class="chart-line">
          <router-link to="/valueOfOil/fiber">
            <LineChart
              v-if="plasticPriceData.length"
              title="化纤板块"
              containerId="plastic_price"
              :options="priceOptionArr[3]"
              :data="plasticPriceData"></LineChart>
          </router-link>
        </a-col>
        <a-col :span="12" class="chart-table">
          <div class="table-block autoScroll">
            <div class="table-block-title">化纤装置负荷</div>
            <a-table
              :rowKey="(record) => record.id"
              :columns="tableColumns"
              :dataSource="loadDataFiber"
              :pagination="false"
              :scroll="{y:$flexible(155),x:$flexible(700)}"
            />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { commonHeader, LineChart, BarsChart } from './components'
import { getDashboardData } from '@/api/dashboard'
import moment from 'moment'
import echarts from 'echarts'

export default {
  name: 'ValueOfOilDashboard',
  components: {
    commonHeader,
    LineChart,
    BarsChart
  },
  data () {
    return {
      headerData: [
        { key: 'month-benefit', label: '月度效益', iconFont: 'iconjinbi', value: '', isUp: true },
        { key: 'day-benefit', label: '当天效益', iconFont: 'iconlianhe', value: '', isUp: true },
        { key: 'opt-benefit', label: '优化效益', iconFont: 'iconxiaoshuai', value: '', isUp: true },
        { key: 'oil-capacity', label: '原油加工量', unit: '桶', iconFont: 'iconlianhe13', value: '', isUp: true }
      ],
      compareData: [],
      plateBenefit: [],
      tableColumns: [
        { title: 'cou1', dataIndex: 'cou1', width: 140, customRender: (text, row, index) => this.numFilter(text) },
        { title: '生产值', dataIndex: 'proValue', width: 140, customRender: (text, row, index) => this.numFilter(text) },
        { title: '优化值', dataIndex: 'optValue', width: 210, customRender: (text, row, index) => this.numFilter(text) },
        { title: '月度计划值', dataIndex: 'monthPlanValue', customRender: (text, row, index) => this.numFilter(text) }
      ],
      priceOptions: {
        unit: '单位：万元',
        xAxisKey: 'time',
        yAxisKey: 'value'
      },
      priceOptionArr: [],
      oilPriceData: [],
      loadDataOil: [],
      chemicalPriceData: [],
      loadDataChemical: [],
      plasticPriceData: [],
      loadDataPlastic: [],
      fiberPriceData: [],
      loadDataFiber: [],
      lineData: [],
      pieData: { month: [], daily: [], optimize: [] },
      monthChart: null,
      dailyChart: null,
      optimizeChart: null,
      role: localStorage.getItem('userrole'),
      tableScrollInterval: null
    }
  },
  filters: {},
  mounted () {
    getDashboardData({ id: 1 }).then((res) => {
      this.totalData = res.data.data1
      this.lineData = res.data.data2
      this.getPieData(res.data.data3)

      this.initPieCharts('month', this.pieData.month)
      this.initPieCharts('daily', this.pieData.daily)
      this.initPieCharts('optimize', this.pieData.optimize)
      this.initTableLine()
      this.initScreen()
    })
  },
  watch: {
    $route (to, from) {
      if (to.path.indexOf('/valueOfOil/dashboard') > -1) {
        const e = document.createEvent('Event')
        e.initEvent('resize', true, true)
        window.dispatchEvent(e)
      }
    }
  },
  beforeDestroy () {
    if (this.tableScrollInterval) {
      clearInterval(this.tableScrollInterval)
      this.tableScrollInterval = null
    }
  },
  methods: {
    getPieData (dataList) {
      dataList.forEach(data => {
        if (data.name.startsWith('月度')) {
          this.pieData.month.push(this.checkItemName(data))
        } else if (data.name.startsWith('当天')) {
          this.pieData.daily.push(this.checkItemName(data))
        } else if (data.name.startsWith('优化')) {
          this.pieData.optimize.push(this.checkItemName(data))
        }
      })
    },
    checkItemName (data) {
      let name = ''
      if (data.name.includes('炼油')) {
        name = '炼油板块'
      } else if (data.name.includes('化工')) {
        name = '化工板块'
      } else if (data.name.includes('塑料')) {
        name = '塑料板块'
      } else {
        name = '纤维板块'
      }
      return { value: Math.round(data.share * 1000) / 10, name: name }
    },
    initPieCharts (id, dataList) {
      const key = `${id}Chart`
      if (this[key] !== null) {
        this[key].dispose()
        this[key] = null
      }

      this[key] = echarts.init(document.getElementById(`${id}-benefit`))
      const option = {
        grid: {
          bottom: 30
        },
        legend: {
          icon: 'circle',
          orient: 'vertical',
          itemGap: this.$flexible(5),
          right: '10%',
          itemWidth: this.$flexible(10),
          textStyle: {
            fontSize: this.$flexible(10),
            fontFamily: 'Source Han Sans CN',
            fontWeight: 400,
            lineHeight: this.$flexible(10),
            color: 'rgba(102, 102, 102, 1)'
          },
          top: 'middle',
          data: ['炼油板块', '化工板块', '塑料板块', '纤维板块'],
          formatter: name => {
            const data = dataList.find(d => d.name === name)
            return `${name}${data.value.toFixed(1)}%`
          }
        },
        color: ['#1C35A4', '#F5C625', '#11986E', '#31A9FF'],
        series: [
          {
            type: 'pie',
            // silent: true,
            radius: ['40%', '65%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: dataList
          }
        ]
      }
      this[key].setOption(option)

      window.addEventListener('resize', () => {
        this[key].resize()
      })
      // this[key].resize({width: this.$flexible(280), height: this.$flexible(90)})
    },
    initTableLine () {
      for (let i = 0; i < this.lineData.length; i += 2) {
        this.priceOptionArr.push(Object.assign({
          showLevel: true,
          hightLevel: this.lineData[i].highlow,
          lowLevel: this.lineData[i + 1].highlow
        }, this.priceOptions))
      }
    },
    initScreen () {
      this.plateBenefit = this.getDataByPlateName('上海石化', true) // 效益趋势图
      this.compareData.forEach(item => {
        const { type, cur, pre } = item
        const record = this.headerData.find(data => data.label === type)
        record.value = `¥${this.formatMoney(cur)}`
        record.isUp = cur >= pre
      })
      const oilProductValues = this.getDataByPlateName('上海石化', false, ['原油加工量'])
      const oilValuesLength = oilProductValues.length
      const curValue = oilValuesLength > 0 ? oilProductValues[oilValuesLength - 1].value : 0
      const preValue = oilValuesLength > 1 ? oilProductValues[oilValuesLength - 2].value : 0
      this.headerData[3].value = this.formatMoney(curValue)
      this.headerData[3].isUp = curValue >= preValue

      this.oilPriceData = this.getDataByPlateName('炼油板块') // 炼油板块
      this.loadDataOil = this.getTableDataByPlateName('炼油板块') // 炼油装置负荷

      this.chemicalPriceData = this.getDataByPlateName('化工板块') // 化工板块
      this.loadDataChemical = this.getTableDataByPlateName('化工板块') // 化工装置负荷

      this.fiberPriceData = this.getDataByPlateName('塑料板块') // 塑料板块
      this.loadDataPlastic = this.getTableDataByPlateName('塑料板块') // 塑料装置负荷

      this.plasticPriceData = this.getDataByPlateName('纤维板块') // 化纤板块
      this.loadDataFiber = this.getTableDataByPlateName('纤维板块') // 化纤装置负荷

      this.$nextTick(() => {
        const elTables = document.getElementsByClassName('autoScroll')
        this.tableScrollInterval = setInterval(() => {
          for (let i = 0; i < elTables.length; i++) {
            const table = elTables[i].getElementsByClassName('ant-table-body')[0]
            if ((table.scrollTop + table.offsetHeight) >= table.scrollHeight) {
              table.scrollTop = 0
            } else {
              table.scrollTop++
            }
          }
        }, 50)
      })
    },
    getDataByPlateName (name, isHeader = false, keys = ['月度效益', '当天效益', '优化效益']) {
      const result = this.totalData.filter(d => d['PlateName'] === name && keys.includes(d['TagName'])).map(line => {
        const plateResponseLst = line['plateResponseLst']
        if (isHeader) {
          const size = plateResponseLst.length
          this.compareData.push({
            type: line['TagName'],
            cur: size > 0 ? plateResponseLst[size - 1]['TagValue'] : 0,
            pre: size > 1 ? plateResponseLst[size - 2]['TagValue'] : 0
          })
        }
        return plateResponseLst.map(point => {
          return {
            type: line['TagName'],
            time: moment(point['TagTime'].split(' ')[0]).format('MM-DD'),
            value: parseFloat(point['TagValue'])
          }
        })
      }).flat()
      return result.length ? result : ['']
    },
    getTableDataByPlateName (name, keys = ['月度效益', '当天效益', '优化效益']) {
      return this.totalData.filter(d => d['PlateName'] === name && !keys.includes(d['TagName'])).map((item, index) => {
        return {
          id: index + 1,
          cou1: item['TagName'],
          proValue: item['plateResponseLst'].find(d => d['TagValue'] === '生产值')['TagTime'],
          optValue: item['plateResponseLst'].find(d => d['TagValue'] === '优化值')['TagTime'],
          monthPlanValue: item['plateResponseLst'].find(d => d['TagValue'] === '月度计划值')['TagTime']
        }
      })
    },
    formatMoney (val) {
      const str = (val / 100 * 100).toFixed(2) + ''
      return str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',')
    }
  }
}
</script>

<style lang="less" scoped>
  .page-1 {
    .page-header {
      position: relative;
      margin-bottom: 70px;

      .pie-chart-line {
        position: absolute;
        top: 75px;
        width: 100%;
        height: 80px;
        background: #FFFFFF;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.04);
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;

        .pie-chart {
          width: 25%;
          height: 100%;
          float: left;

          canvas {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .ant-row {
      padding: 20px;
    }

    /deep/ .table-block {
      width: 100%;
      height: 100%;

      .table-block-title {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 14px;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 10px;

      }

      // table title
      .ant-table-thead > tr > th {
        background: rgba(246, 247, 251, 1);
        border-bottom: none;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 40px;
        color: rgba(102, 102, 102, 1);
      }

      .ant-table {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 40px;
        color: rgba(51, 51, 51, 1);
      }

      .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
        padding: 0 10px;
        white-space: nowrap;
      }

      .ant-table-tbody {
        tr:nth-child(2n) {
          background: rgba(246, 247, 251, 1);
        }
      }
    }
  }
</style>
