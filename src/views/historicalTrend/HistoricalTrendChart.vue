<template>
<div class="simulation-chart" id="dropdown-wrapper">
  <div class="page-header">
    <a-select
      class="trend-select-list"
      :defaultValue="'0'"
      optionFilterProp="children"
      style="margin-left: 20px;"
      @change="handleGroupChange">
      <a-select-option v-for="menu in menuList" :key="menu.key" :value="menu.key">{{ menu.name }}</a-select-option>
    </a-select>
    <a-select
      class="trend-select-list"
      v-if="selectedTrend"
      :defaultValue="selectedTrend.cid"
      :filterOption="filterOption"
      showSearch
      :dropdownMatchSelectWidth="false"
      style="min-width: 240px;"
      @change="handleTrendChange">
      <a-select-option v-for="sub in selectedGroup.children" :key="sub.cid" :value="sub.cid">{{ sub.name }}</a-select-option>
    </a-select>
  </div>
  <div class="main-container">
    <div class="filter-form">
      <span class="filter-item">开始时间：<a-date-picker :defaultValue="startDate" @change="onStartDateChange"/></span>
      <span class="filter-item">结束时间：<a-date-picker :defaultValue="endDate" @change="onEndDateChange"/></span>
      <span class="filter-item"><a-button class="ellipse-btn" type="primary" @click="handleFilter">查询</a-button></span>
    </div>
    <div class="chart-area">
      <a-spin v-if="!showGraph" size="large" :spinning="true" tip="Loading..." />
      <div v-if="showGraph" class="chart-container" :id="`slide_line_chart`"></div>
    </div>
  </div>
</div>
</template>

<script>
import Trends from '@/config/trendSettings'
import { getTrendData } from '@/api/trend'
import moment from 'moment'
import echarts from 'echarts'

export default {
  name: 'HistoricalTrend',
  data () {
    return {
      showGraph: false,
      // startDate: moment('2019-11-20 08:00:00').subtract(6, 'd').startOf('day'),
      // endDate: moment('2019-11-20 08:00:00').endOf('day'),
      startDate: moment(new Date()).subtract(6, 'd').startOf('day'),
      endDate: moment(new Date()).endOf('day'),
      lineTitleList: [],
      lineDateList: [],
      lineValueList: [],
      dashDateList: [],
      dashValueList: [],
      axisTextStyle: { fill: '#999999', fontSize: '12', fontWeight: '400', rotate: 0 },
      chart: null,
      menuList: [
        { key: '0', name: '炼油板块', children: [] },
        { key: '1', name: '化工板块', children: [] },
        { key: '2', name: '塑料板块', children: [] },
        { key: '3', name: '纤维板块', children: [] }
      ],
      selectedGroup: null,
      selectedTrend: null
    }
  },
  mounted () {
    this.getTrendListByGroup()
    this.requestData()
    window.addEventListener('resize', () => {
      if (this.chart) {
        this.chart.resize()
      }
    })
  },
  beforeDestroy () {
  },
  methods: {
    onStartDateChange (date) {
      this.startDate = date.startOf('day')
    },
    onEndDateChange (date) {
      this.endDate = date.endOf('day')
    },
    handleFilter () {
      this.requestData()
    },
    requestData () {
      this.showGraph = false
      this.lineTitleList = []
      this.lineDateList = []
      this.lineValueList = []
      this.dashDateList = []
      this.dashValueList = []
      getTrendData({
        id: this.selectedTrend.cid,
        startT: this.startDate.format('YYYY-MM-DD'),
        endT: this.endDate.format('YYYY-MM-DD')
      }).then(res => {
        res.data.trendlist.forEach(line => {
          this.lineTitleList.push(line.name)
          if (line.times.length > this.lineDateList.length) {
            this.lineDateList = line.times
          }
          this.lineValueList.push(line.vals)
        })
        this.dashDateList = res.data.cdata.ctimes
        this.dashValueList = res.data.cdata.cvals
        console.log('虚线的值')
        console.log(this.dashValueList)
        console.log('图例')
        console.log(this.lineTitleList)
        this.showGraph = true
        this.$nextTick(() => this.initLineChart())
      })
    },
    initLineChart () {
      if (this.chart !== null) {
        this.chart.dispose()
        this.chart = null
      }
      this.chart = echarts.init(document.getElementById('slide_line_chart'))
      const option = {
        grid: {
          top: 50,
          right: 70,
          bottom: 80,
          left: 70
        },
        toolbox: {
          show: true,
          showTitle: true,
          feature: {
            dataZoom: {},
            magicType: { type: ['stack'] },
            restore: {},
            dataView: {
              readOnly: true,
              optionToContent: function (opt) {
                const axisData = opt.xAxis[0].data
                // var seriesexplast = opt.series
                // const series = seriesexplast.slice(0, seriesexplast.length - 2)
                const series = opt.series
                let table = '<table style="width: 100%; text-align: center;"><tbody><tr><td>时间</td>'
                // series.forEach(s => {
                //   table += `<td>${s.name}</td>`
                // })
                for (var i = 0; i < series.length - 1; i++) {
                  table += `<td>${series[i].name}</td>`
                }
                table += '</tr>'
                axisData.forEach((data, i) => {
                  table += `<tr><td>${data}</td>`
                  // series.forEach(s => {
                  //   table += `<td>${s.data[i]}</td>`
                  // })
                  for (var j = 0; j < series.length - 1; j++) {
                    table += `<td>${series[j].data[i]}</td>`
                  }
                  table += '</tr>'
                })
                table += '</tbody></table>'
                return table
              }
            },
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765'
            }
          }
        },
        legend: {
          data: this.lineTitleList,
          width: '70%',
          left: 'center'
        },
        color: ['#D67976', '#6F7E89', '#29D2D6', '#E0A58F', '#5BD899', '#07809F', '#F29A15', '#5015F2'],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'empty'
          },
          {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'empty'
          },
          {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty'
          },
          {
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'empty'
          }
        ],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: { onZero: false },
            data: this.lineDateList.map(str => str.replace(' ', '\n'))
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: []
      }
      this.lineValueList.forEach((line, index) => {
        option.series.push({
          name: this.lineTitleList[index],
          type: 'line',
          animation: false,
          lineStyle: {
            width: 1
          },
          tooltip: {
            show: true
          },
          data: line
        })
      })
      option.series.push({
        // name: 'dash',
        type: 'bar',
        barWidth: 1,
        data: this.dashValueList,
        tooltip: {
          show: false
        },
        itemStyle: {
          color: '#fff',
          borderColor: '#ffa643',
          borderType: 'dotted',
          opacity: 0.4
        }
      })

      this.chart.setOption(option)
    },
    getTrendListByGroup () {
      Object.values(Trends).forEach(t => {
        switch (t.group) {
          case '炼油板块':
            this.menuList[0].children.push(t)
            break
          case '化工板块':
            this.menuList[1].children.push(t)
            break
          case '塑料板块':
            this.menuList[2].children.push(t)
            break
          case '纤维板块':
            this.menuList[3].children.push(t)
            break
          default:
            break
        }
      })
      if (!this.selectedGroup) {
        this.selectedGroup = this.menuList[0]
      }
      if (!this.selectedTrend) {
        this.selectedTrend = this.selectedGroup.children[0]
      }
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    handleGroupChange (value) {
      if (this.selectedGroup.key !== value) {
        this.selectedGroup = this.menuList[value]
        this.selectedTrend = null
        this.$nextTick(() => {
          this.selectedTrend = this.selectedGroup.children[0]
          this.requestData()
        })
      }
    },
    handleTrendChange (value) {
      this.selectedTrend = this.selectedGroup.children.find(t => t.cid === value)
      this.requestData()
    }
  }
}
</script>

<style lang="less" scoped>
.simulation-chart {
  width: 100%;
  height: calc(100% - 20px);
  background: #ffffff;

  .page-header {
    position: relative;
    top: 10px;
    width: 100%;
    height: 40px;
    background: rgba(247, 247, 251, 1);

    .trend-select-list {
      width: auto;
      height: 30px;
      margin-top: 6px;
      margin-left: 10px;

      /deep/ .ant-select-selection {
        height: 30px;
      }
    }
  }

  .main-container{
    position: relative;
    top: 10px;
    width: 100%;
    height: calc(100% - 60px);

    .filter-form {
      width: 100%;
      height: 54px;

      /deep/ .filter-item {
        padding-left: 20px;
        line-height: 54px;

        .ant-input {
          width: 200px;
          height: 28px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(229, 229, 229, 1);
          border-radius: 16px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 28px;
          color: rgba(51, 51, 51, 1);
        }

        .ellipse-btn {
          margin-left: auto;
          margin-top: 6px;
          height: 30px;
          width: 100px;
          border: 1px solid rgba(229, 229, 229, 1);
          border-radius: 16px;
          background: rgba(23, 57, 164, 1);
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 24px;
          color: rgba(255, 255, 255, 1);
        }
      }
    }

    .chart-area {
      position: relative;
      width: 100%;
      padding-right: 20px;
      height: calc(100% - 54px);

      .chart-container {
        width: 100%;
        height: 100%;
      }
    }
  }

  .ant-spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
