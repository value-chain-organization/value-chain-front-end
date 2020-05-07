<template>
  <div class="month-table-config">
    <a-card :bordered="false" style="margin-bottom: 20px;" class="top-card">
      <a-row class="row">
        <div class="left">
          <a-upload
            style="display: inline-block;"
            :showUploadList="false"
            name="file"
            :multiple="false"
            action="/huali-api/File/UploadTBM"
            @change="handleChange"
          >
            <a-button shape="round" class="btn"> <a-icon type="upload" />解析文件</a-button>
          </a-upload>
          <a-button class="btn" shape="round" :type="configIndex === 0 ? 'primary' : 'default'" @click="productConfig">产品表显示配置</a-button>
          <a-button class="btn" shape="round" :type="configIndex === 1 ? 'primary' : 'default'" @click="outSourceConfig">外购表显示配置</a-button>
          <a-button class="btn" shape="round" :type="configIndex === 2 ? 'primary' : 'default'" @click="oidConfig">原油表显示配置</a-button>
          <a-button class="btn" shape="round" :type="configIndex === 3 ? 'primary' : 'default'" @click="deviceConfig">装置表显示配置</a-button>
        </div>
        <div class="right">
          <a-button class="btn" shape="round" type="primary" @click="updateConfig">更新配置</a-button>
        </div>
      </a-row>
    </a-card>

    <a-card :bordered="false" class="table-card">
      <a-table
        rowKey="key"
        :columns="columns"
        :dataSource="tableData"
        :pagination="pagination"
        :loading="tableLoading"
        :locale="{emptyText: '尚未选择任何配置'}"
        @change="handleTableChange">
        <template slot="ifShow" slot-scope="text, record">
          <a-checkbox :checked="text == 1 ? true : false" @change="selectRecord(record)"></a-checkbox>
        </template>
      </a-table>
    </a-card>
  </div>

</template>

<script>
  import { analyseTBM, getTableData, updateConfig } from '@/api/dataCenter'

  export default {
    name: 'TableConfig',
    components: {},
    data () {
      return {
        configIndex: -1,
        columns: [
          {
            title: '中文名称',
            dataIndex: 'cnName',
            className: 'common'
          },
          {
            title: '英文代号',
            dataIndex: 'enName',
            className: 'common'
          },
          {
            title: '是否显示',
            dataIndex: 'ifShow',
            className: 'common select',
            scopedSlots: { customRender: 'ifShow' }
          }
        ],
        tableLoading: false,
        tableData: [],
        pagination: {
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          pageSize: 10
        }
      }
    },
    computed: {
      scrollHeight () {
        let container = document.body
        return container.offsetHeight - 40 - 50 - 80 - 40 - 105
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      handleChange (info) {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          this.$message.success(`${info.file.name} 上传成功！`)
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} 上传失败！`)
        }
      },
      handleTableChange (pagination, filters, sorter) {
        // console.log('table changed: ', pagination)
      },
      upload () {
        analyseTBM().then(res => {
          this.$message.success(res.data)
        })
      },
      setTableData (dataType) {
        getTableData({ dataType: dataType }).then(res => {
          // console.log(res)
          let rawList = res.data
          for (let i = 0; i < rawList.length; i++) {
            rawList[i].key = i
          }
          this.tableData = rawList
        })
      },
      productConfig () {
        this.configIndex = 0
        this.setTableData('product')
      },
      outSourceConfig () {
        this.configIndex = 1
        this.setTableData('purchase')
      },
      oidConfig () {
        this.configIndex = 2
        this.setTableData('crude')
      },
      deviceConfig () {
        this.configIndex = 3
        this.setTableData('equipment')
      },
      updateConfig () {
        if (this.configIndex < 0) {
          this.$message.warning('请选择一个显示配置!')
          return
        }
        // console.log('更新配置')
        let type = ['product', 'purchase', 'crude', 'equipment'][this.configIndex]
        updateConfig({ dataType: type, configObjList: this.tableData }).then(res => {
          // console.log(res)
          this.$message.success(res.data)
        }).catch(err => {
          // console.error('update failed', err)
          this.$message.error('更新配置失败！')
        })
      },
      selectRecord (record) {
        // console.log('切换显示状态: ', record)
        this.tableData[record.key].ifShow = this.tableData[record.key].ifShow == 0 ? 1 : 0
      }
    }
  }
</script>

<style lang="less" scoped>
  .month-table-config {
    height: 100%;

    .top-card {
      .row {
        display: flex;

        .left {
          .ant-btn {
            border: none;
            background: rgba(235, 239, 245, 1);
            margin-right: 10px;
          }

          .ant-btn-primary {
            background: rgba(28, 53, 164, 1);
          }
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
        }
      }

      /deep/ .ant-card-body {
        padding: 0 20px;
      }
    }

    .table-card {
      height: calc(100% - 60px);

      /deep/ .ant-card-body {
        padding: 20px;
      }
    }

    /deep/ th.common,
    /deep/ td.common {
      width: 33%;
      padding-top: 0;
      padding-bottom: 0;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 30px;
      color: rgba(102, 102, 102, 1);
      letter-spacing: 4px;
    }

    /deep/ th.select,
    /deep/ td.select {
      text-align: center !important;
    }

    /deep/ .ant-table-thead > tr > th {
      background: rgba(235, 239, 245, 1);
    }

    /deep/ .ant-pagination-options-size-changer.ant-select {
      margin-right: 0;
    }
  }
</style>
