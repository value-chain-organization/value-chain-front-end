<template>
  <div class="month-device-capability-table">
    <a-card :bordered="false" class="top-card">
      <a-row class="row">
        <div class="left">装置能力表</div>
        <!--
        <div class="right">
          <a-button class="btn" shape="round" type="primary" @click="updateConfig">更新配置</a-button>
        </div>
        -->
      </a-row>
    </a-card>

    <a-card :bordered="false" class="table-card">
      <a-table
        :rowKey="(record, index) => index"
        :columns="columns"
        :dataSource="tableData"
        :pagination="pagination"
        :loading="tableLoading"
        @change="handleTableChange">
        <template slot="title" class="table-title">装置能力表</template>
        <template slot="days" slot-scope="days">
          <input class="hidden-input" v-model="days.value" @change="changeValue(days)">
        </template>
        <template slot="dmin" slot-scope="dmin">
          <input class="hidden-input" v-model="dmin.value" @change="changeValue(dmin)">
        </template>
        <template slot="dmax" slot-scope="dmax">
          <input class="hidden-input" v-model="dmax.value" @change="changeValue(dmax)">
        </template>
        <template slot="min" slot-scope="min">
          <input class="hidden-input" v-model="min.value" @change="changeValue(min)">
        </template>
        <template slot="max" slot-scope="max">
          <input class="hidden-input" v-model="max.value" @change="changeValue(max)">
        </template>
      </a-table>
    </a-card>
  </div>

</template>

<script>
import { showTable, updateValue } from '@/api/dataCenter'
export default {
  name: 'TableDevice',
  components: {},
  data () {
    return {
      columns: [],
      tableLoading: false,
      tableData: [],
      pagination: {
        pageSize: 20
      }
    }
  },
  created () {
    this.getTableData()
  },
  mounted () {},
  methods: {
    changeValue (tag) {
      updateValue({ tagName: tag.name, newValue: tag.value }).then(res => {
        // console.log(res);
        this.getTableData()
      })
    },
    getTableData () {
      showTable({ dataType: 'equipment' }).then(res => {
        // console.log(res);
        const rawData = res.data
        const formatData = []
        let record = { name: '', DAYS: {}, DMIN: {}, DMAX: {}, MIN: {}, MAX: {} }
        for (let i = 0; i < rawData.length; i++) {
          if (record.name === '') {
            record.name = rawData[i].CName
          }
          const key = rawData[i].TagID.split('_').pop()
          record[key] = { name: rawData[i].TagName, value: this.numFilter(rawData[i].TagValue) }
          if (i === rawData.length - 1 || rawData[i + 1].CName !== record.name) {
            formatData.push(record)
            record = { name: '', DAYS: {}, DMIN: {}, DMAX: {}, MIN: {}, MAX: {} }
          }
        }
        const result = [
          { title: '中文名', dataIndex: 'name', width: '16%', scopedSlots: { customRender: 'name' } },
          { title: '天数', dataIndex: 'DAYS', width: '16%', scopedSlots: { customRender: 'days' } },
          { title: '日均MIN', dataIndex: 'DAYSMIN', width: '16%', scopedSlots: { customRender: 'dmin' } },
          { title: '日均MAX', dataIndex: 'DAYSMAX', width: '16%', scopedSlots: { customRender: 'dmax' } },
          { title: '月均MIN', dataIndex: 'MIN', width: '16%', scopedSlots: { customRender: 'min' } },
          { title: '月均MAX', dataIndex: 'MAX', width: '16%', scopedSlots: { customRender: 'max' } }
          // { title: '中文名', dataIndex: 'name', width: '16%', scopedSlots: { customRender: 'name' }, customRender: (text, row, index) => this.numFilter(text) },
          // { title: '天数', dataIndex: 'DAYS', width: '16%', scopedSlots: { customRender: 'days' }, customRender: (text, row, index) => this.numFilter(text) },
          // { title: '日均MIN', dataIndex: 'DAYSMIN', width: '16%', scopedSlots: { customRender: 'dmin' }, customRender: (text, row, index) => this.numFilter(text) },
          // { title: '日均MAX', dataIndex: 'DAYSMAX', width: '16%', scopedSlots: { customRender: 'dmax' }, customRender: (text, row, index) => this.numFilter(text) },
          // { title: '月均MIN', dataIndex: 'MIN', width: '16%', scopedSlots: { customRender: 'min' }, customRender: (text, row, index) => this.numFilter(text) },
          // { title: '月均MAX', dataIndex: 'MAX', width: '16%', scopedSlots: { customRender: 'max' }, customRender: (text, row, index) => this.numFilter(text) }
        ]
        for (let i = 0; i < result.length; i++) {
          if (result[i].dataIndex === 'name') {
            result[i].className = 'common name'
          } else {
            result[i].className = 'common'
          }
        }
        this.columns = result
        this.tableData = formatData
      })
    },
    handleTableChange (pagination, filters, sorter) {
      // console.log(pagination);
    }
  }
}
</script>

<style lang="less" scoped>
  .month-device-capability-table {
    height: 100%;

    .top-card {
      .row {
        display: flex;

        .left {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 40px;
          color: rgba(51, 51, 51, 1);
          letter-spacing: 4px;
        }

        .right {
          flex: 1;
          text-align: right;
        }

        .btn {
          margin: 8px 0;
          height: 24px;
          border: none;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 24px;
          color: rgba(255, 255, 255, 1);
        }
      }

      /deep/ .ant-card-body {
        padding: 0 20px;
      }
    }

    .table-card {
      height: calc(100% - 40px);

      .hidden-input {
        width: 120px;
        border: 0 !important;
        background: transparent !important;
        padding: 0 !important;
      }

      /deep/ .ant-card-body {
        padding: 0 20px 20px 20px;
      }
    }

    /deep/ th.common,
    /deep/ td.common {
      width: 16%;
      padding: 0 0 0 10px;
      border: none;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 30px;
      letter-spacing: 4px;
    }

    /deep/ th.common {
      color: #999999;
    }

    /deep/ td.name {
      color: rgba(28, 53, 164, 1);
    }

    /deep/ .ant-table-title {
      padding: 0;
      text-align: center;
      background: rgba(246, 247, 251, 1);
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 30px;
      color: rgba(51, 51, 51, 1);
      letter-spacing: 4px;
    }

    /deep/ .ant-table-thead > tr > th {
      background: #fff;
    }

    /deep/ .ant-table-tbody > tr:nth-child(2n + 1) {
      background: rgba(246, 247, 251, 1);
    }
  }
</style>
