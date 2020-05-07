<template>
  <div class="short-outsourcing-table">
    <a-card :bordered="false" class="top-card">
      <a-row class="row">
        <div class="left">外购表</div>
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
        <template slot="title" class="table-title">外购表</template>
        <template slot="min" slot-scope="min">
          <input class="hidden-input" v-model="min.value" @change="changeValue(min)">
        </template>
        <template slot="max" slot-scope="max">
          <input class="hidden-input" v-model="max.value" @change="changeValue(max)">
        </template>
        <template slot="price" slot-scope="price">
          <input class="hidden-input" v-model="price.value" @change="changeValue(price)">
        </template>
      </a-table>
    </a-card>
  </div>

</template>

<script>
import { showTable, updateValue } from '@/api/dataCenterSP'
export default {
  name: 'TableOutSource',
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
      showTable({ dataType: 'purchase' }).then(res => {
        // console.log(res);
        const rawData = res.data
        const formatData = []
        let record = { name: '', MIN: {}, MAX: {}, COST: {} }
        for (let i = 0; i < rawData.length; i++) {
          if (record.name === '') {
            record.name = rawData[i].CName
          }
          const key = rawData[i].TagID.split('_').pop()
          record[key] = { name: rawData[i].TagName, value: this.numFilter(rawData[i].TagValue) }
          if (i === rawData.length - 1 || rawData[i + 1].CName !== record.name) {
            formatData.push(record)
            record = { name: '', MIN: {}, MAX: {}, PRICE: {} }
          }
        }
        const result = [
          { title: '中文名', dataIndex: 'name', width: '25%', scopedSlots: { customRender: 'name' } },
          { title: '最小值', dataIndex: 'MIN', width: '25%', scopedSlots: { customRender: 'min' } },
          { title: '最大值', dataIndex: 'MAX', width: '25%', scopedSlots: { customRender: 'max' } },
          { title: '价格', dataIndex: 'COST', width: '25%', scopedSlots: { customRender: 'price' } }
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
  .short-outsourcing-table {
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
      width: 25%;
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
