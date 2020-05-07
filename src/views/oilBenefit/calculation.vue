<template>
  <div class="oilBenefit-main">
    <div class="header">原油效益测算</div>
    <div class="center-ctrl">
      <a-row class="row">
        <a-button class="left-btn primary-btn" type="default" @click="handleClickInit"><i class="iconfont iconchushihua custom-iconfont"/>初始化</a-button>
        <a-button class="left-btn" type="default" @click="handleClickBaseOilPriceSetting"><i class="iconfont iconyoujia custom-iconfont"/>基准油价设置</a-button>
        <a-button class="left-btn" type="default" @click="handleClickExchangeRateSetting"><i class="iconfont iconjianqu custom-iconfont"/>汇率设置</a-button>
        <a-button class="left-btn" type="default" @click="handleClickSave"><i class="iconfont iconlujing custom-iconfont"/>保存修改</a-button>
        <a-button class="left-btn" type="default" @click="handleClickBenefitCalculation"><i class="iconfont iconlianhe4 custom-iconfont"/>效益测算</a-button>
        <a-button class="left-btn" type="default" @click="handleClickResult"><i class="iconfont iconchakan custom-iconfont"/>查看结果</a-button>
        <a-upload
          style="display: inline-block;"
          :showUploadList="false"
          name="file"
          :multiple="false"
          action="/huali-api/File/UploadBase"
          @change="handleChange"
        >
          <a-button class="left-btn" type="default"><i class="iconfont iconxiazai1 custom-iconfont"/>选择报表</a-button>
        </a-upload>
      </a-row>
    </div>
    <div class="main-block">
      <div class="custom-common-table-block">
        <a-table
          :row-selection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          ref="table"
          size="default"
          :rowKey="(record, index) => index"
          :columns="tableColumns"
          :dataSource="tableData"
          :loading="tableLoading"
          :pagination="{
            showQuickJumper: true,
            showSizeChanger: true
          }">
          <template slot="colId" slot-scope="text, record, index">
            <span>{{ index + 1 }}</span>
          </template>
          <template slot="CName" slot-scope="text">
            <span :style="{color:'rgba(23, 57, 164, 1)'}">{{ text }}</span>
          </template>
          <template slot="MinVal" slot-scope="text, record">
            <input class="hidden-input" v-model="record.BuyValList.MinVal">
          </template>
          <template slot="MaxVal" slot-scope="text, record">
            <input class="hidden-input" v-model="record.BuyValList.MaxVal">
          </template>
          <template slot="PremiumVal" slot-scope="text, record">
            <input class="hidden-input" v-model="record.BuyValList.PremiumVal">
          </template>
          <template slot="FreightVal" slot-scope="text, record">
            <input class="hidden-input" v-model="record.BuyValList.FreightVal">
          </template>
          <template slot="TonBucRatioVal" slot-scope="text">
            <span>{{ text }}</span>
          </template>
        </a-table>
      </div>
    </div>
    <a-modal
      class="oilBenefitModal-oilPriceSetting"
      title="基准油价设置"
      centered
      v-model="priceSettingModalVisible"
      destroyOnClose
      :maskClosable="false"
      :width="$flexible(800)"
      :footer="null"
    >
      <div class="oilPriceSettingModal">
        <div class="input-label">DTD BRENT</div>
        <a-input placeholder="" :value="priceSettingValue.DTD" @change="handleChangePriceSettingValue($event,'DTD')" allowClear/>
        <div class="input-label">PLATTS(OMA+DUBAI)/2</div>
        <a-input placeholder="" :value="priceSettingValue.PLATTS_2" @change="handleChangePriceSettingValue($event,'PLATTS_2')" allowClear/>
        <div class="input-label">PLATTS DUBAI</div>
        <a-input placeholder="" :value="priceSettingValue.PLATTS" @change="handleChangePriceSettingValue($event,'PLATTS')" allowClear/>
        <div class="input-label">TAPIS</div>
        <a-input placeholder="" :value="priceSettingValue.TAPIS" @change="handleChangePriceSettingValue($event,'TAPIS')" allowClear/>
        <a-row class="footer-btn-area">
          <a-button class="left-btn right" type="default" @click="handleClickPriceSettingModalOK">确定基准油价</a-button>
          <a-button class="left-btn" type="default" @click="handleClickPriceSettingModalCancel">取消</a-button>
        </a-row>
      </div>
    </a-modal>
    <a-modal
      class="oilBenefitModal-oilPriceSetting"
      title="汇率设置"
      centered
      v-model="exchangeRateSettingModalVisible"
      destroyOnClose
      :maskClosable="false"
      :width="$flexible(800)"
      :footer="null"
    >
      <div class="exchangeRatioSettingModal">
        <div class="input-label">Exchange Ratio</div>
        <a-input placeholder="" v-model="exchangeRatio" allowClear/>
        <a-row class="footer-btn-area">
          <a-button class="left-btn right" type="default" @click="handleClickExchangeRatioSetting(true)">确定汇率</a-button>
          <a-button class="left-btn" type="default" @click="handleClickExchangeRatioSetting(false)">取消</a-button>
        </a-row>
      </div>
    </a-modal>
    <a-modal
      class="oilBenefitModal-oilPriceSetting"
      centered
      v-model="calculationModalVisible"
      destroyOnClose
      :keyboard="false"
      :closable="false"
      :maskClosable="false"
      :afterClose="stopCalculation"
      :footer="null"
      :width="$flexible(800)"
    >
      <template slot="title">
        <span>日志</span>
        <a-button
          class="right-btn-cancel"
          v-if="outputLogInterval !== null"
          type="default"
          @click="handleCancelTask">取消当前任务
        </a-button>
        <a-button class="right-btn-cancel" v-if="outputLogInterval === null" type="default" @click="() => calculationModalVisible = false">关闭</a-button>
      </template>
      <div class="calculationModalContent" id="log_content">
        <div class="log-content" v-for="(item, index) in taskLogList" :key="index">{{ item.msgTime + ' ' + item.msgContent }}</div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getOilBenefitInitData, saveChange, runModel, getTaskLog, updateDB } from '@/api/oilValue'
import { requestCancelTask } from '@/api/planOptimization'
import moment from 'moment'

export default {
  name: 'OilBenefit',
  components: {
    STable,
    moment
  },
  data () {
    return {
      tableColumns: [
        { title: 'ID', width: '5%', scopedSlots: { customRender: 'colId' } },
        { title: '原油种类', dataIndex: 'CName', scopedSlots: { customRender: 'CName' } },
        { title: '进厂MIN', dataIndex: 'BuyValList.MinVal', scopedSlots: { customRender: 'MinVal' } },
        { title: '进厂MAX', dataIndex: 'BuyValList.MaxVal', scopedSlots: { customRender: 'MaxVal' } },
        { title: '贴水', dataIndex: 'BuyValList.PremiumVal', scopedSlots: { customRender: 'PremiumVal' } },
        { title: '运费', dataIndex: 'BuyValList.FreightVal', scopedSlots: { customRender: 'FreightVal' } },
        { title: '吨桶比', dataIndex: 'BuyValList.TonBucRatioVal', scopedSlots: { customRender: 'TonBucRatioVal' } }
      ],
      username: 'admin',
      tableLoading: false,
      tableData: [],
      selectedRowKeys: [],
      selectedRowVals: [],
      outputLogInterval: null,
      buyTagValues: { 'DTD': '', 'PLATTS_2': '', 'PLATTS': '', 'TAPIS': '', 'exchangeRatio': '' },
      priceSettingModalVisible: false,
      priceSettingValue: { 'DTD': '', 'PLATTS_2': '', 'PLATTS': '', 'TAPIS': '' },
      exchangeRateSettingModalVisible: false,
      exchangeRatio: '',
      calculationModalVisible: false,
      taskLogList: []
    }
  },
  filters: {
  },
  created () {
    this.getInitData()
  },
  mounted () {
  },
  beforeDestroy () {
    this.stopCalculation()
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRowVals = this.tableData.filter((item, i) => this.selectedRowKeys.indexOf(i) !== -1)
      this.selectedRowVals = this.selectedRowVals.map(item => item.BuyTagList.MaxTag)
      // console.log(this.selectedRowVals)
    },
    getInitData () {
      this.tableLoading = true
      getOilBenefitInitData().then(res => {
        if (res.code === 1) {
          // this.tableData = res.data
          this.tableData = res.data.map(item => {
            for (const key in item.BuyValList) {
              item.BuyValList[key] = this.numFilter(item.BuyValList[key])
            }
            return item
          })
        }
        this.tableLoading = false
      })
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功！`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败！`)
      }
    },
    handleClickInit () {
      if (this.outputLogInterval) {
        return false
      }
      updateDB().then(status => {
        if (status.code === 1) {
          runModel({ username: this.username, type: 'BenefitInit' }).then(res => {
            if (res.code === 1) {
              const guid = res.data
              this.getLogOfInit(guid)
              this.outputLogInterval = setInterval(() => this.getLogOfInit(guid), 3000)
              this.calculationModalVisible = true
            } else {
              this.$message.error(res.data)
            }
          })
        } else {
          this.$message.error(status.data)
        }
      })
    },
    compareTime (property) {
      return (a, b) => {
        const value1 = moment(a[property])
        const value2 = moment(b[property])
        return (value1 < value2) ? 1 : -1
      }
    },
    getLogOfInit (guid) {
      getTaskLog({ username: this.username, guid: guid }).then(res => {
        this.taskLogList = res.data.reverse()
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]['msgContent'].includes('任务执行完成')) {
            this.clearOutputLogInterval()
            break
          }
        }
      })
    },
    getLogOfCalculation (guid) {
      getTaskLog({ username: this.username, guid: guid }).then(res => {
        this.taskLogList = res.data.reverse()
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]['msgContent'].includes('任务执行完成')) {
            this.clearOutputLogInterval()
            break
          }
        }
      })
    },
    handleClickBaseOilPriceSetting () {
      this.priceSettingValue = this.buyTagValues
      this.priceSettingModalVisible = true
    },
    handleClickExchangeRateSetting () {
      this.exchangeRatio = this.buyTagValues['exchangeRatio']
      this.exchangeRateSettingModalVisible = true
    },
    handleClickSave () {
      const newData = { BuyTagVal: {} }
      newData.BuyTagVal.otherDataList = [{ ...this.buyTagValues }]
      newData.BuyTagVal.BuyTagValList = this.tableData

      saveChange(JSON.parse(JSON.stringify(newData))).then(res => {
        // console.log(res);
        this.$message.success(res.data)
        this.getInitData()
      }).catch(err => {
        // console.error('save failed', err);
        this.$message.error(`保存修改失败！`)
      })
    },
    handleClickBenefitCalculation () {
      if (this.outputLogInterval) {
        return false
      }
      runModel({ username: this.username, type: 'BenefitCalc', arr: this.selectedRowVals }).then(res => {
        if (res.code === 1) {
          const guid = res.data
          this.getLogOfCalculation(guid)
          this.outputLogInterval = setInterval(() => this.getLogOfCalculation(guid), 3000)
          this.calculationModalVisible = true
        } else {
          this.$message.error(res.data)
        }
      })
    },
    stopCalculation () {
      this.taskLogList = []
    },
    handleClickResult () {
      this.$router.replace('/oilBenefit/result')
    },
    handleChangePriceSettingValue (e, key) {
      // console.log(key, e.target.value)
      this.priceSettingValue[key] = e.target.value
    },
    handleClickPriceSettingModalOK () {
      this.buyTagValues['DTD'] = this.priceSettingValue['DTD']
      this.buyTagValues['PLATTS_2'] = this.priceSettingValue['PLATTS_2']
      this.buyTagValues['PLATTS'] = this.priceSettingValue['PLATTS']
      this.buyTagValues['TAPIS'] = this.priceSettingValue['TAPIS']
      this.handleClickPriceSettingModalCancel()
    },
    handleClickPriceSettingModalCancel () {
      this.priceSettingValue = { 'DTD': '', 'PLATTS_2': '', 'PLATTS': '', 'TAPIS': '' }
      this.priceSettingModalVisible = false
    },
    handleClickExchangeRatioSetting (save) {
      if (save) {
        this.buyTagValues['exchangeRatio'] = this.exchangeRatio
      }
      this.exchangeRatio = ''
      this.exchangeRateSettingModalVisible = false
    },
    handleCancelTask () {
      requestCancelTask({ username: this.username }).then((res) => {
        if (res.code === 1) {
          this.$message.success(res.data)
          this.clearOutputLogInterval()
          this.taskLogList = []
        } else {
          this.$message.error(res.data)
        }
      })
    },
    clearOutputLogInterval () {
      if (this.outputLogInterval) {
        clearInterval(this.outputLogInterval)
      }
      this.outputLogInterval = null
    }
  }
}
</script>

<style lang="less" scoped>
  .oilBenefit-main {
    width: 100%;
    height: 100%;
    background: rgba(246, 247, 251, 1);

    .header {
      padding-left: 20px;
      height: 40px;
      width: 100%;
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 40px;
      color: rgba(51, 51, 51, 1);
      letter-spacing: 1px;
    }

    .center-ctrl {
      margin-top: 20px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      padding: 0 20px;

      .row {
        display: flex;

        .left-btn {
          margin: 6px 10px 6px 0;
          height: 28px;
          border-radius: 16px;
          border: 1px solid transparent;
          background: rgba(235, 239, 245, 1);
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 26px;
          color: rgba(102, 102, 102, 1);

          .custom-iconfont {
            font-size: 14px;
            margin-right: 10px;
          }

          &:hover:not(.is-disabled):not(.primary-btn) {
            border: 1px solid rgba(23, 57, 164, 1);
            color: rgba(23, 57, 164, 1);
          }
        }

        .primary-btn {
          background: rgba(28, 53, 164, 1);
          color: rgba(255, 255, 255, 1);
        }
      }
    }

    .main-block {
      margin-top: 20px;
      width: 100%;
      height: calc(100% - 120px);
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      padding: 20px;

      /deep/ .custom-common-table-block {
        .ant-table-pagination.ant-pagination {
          margin-right: 0;
        }

        .ant-select {
          margin-right: 0;
        }

        .hidden-input {
          width: 100px;
          border: 0 !important;
          background: transparent !important;
          padding: 0 !important;
        }
      }
    }
  }

  .oilBenefitModal-oilPriceSetting {
    .input-label {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 30px;
      color: rgba(51, 51, 51, 1);
      padding-left: 10px;
      width: auto;
    }

    .oilPriceSettingModal, .exchangeRatioSettingModal {
      width: 100%;
      height: 100%;
      padding: 20px;

      /deep/ .ant-input-affix-wrapper {
        height: 30px;
      }

      /deep/ .ant-input {
        height: 30px; // 32px;
        background: rgba(246, 247, 251, 1); // #fff;
        border: 1px solid transparent;
      }

      .footer-btn-area {
        margin-top: 50px;
        display: flex;

        .left-btn {
          margin-left: 10px;
          height: 28px;
          border-radius: 20px;
          border: 1px solid rgba(229, 229, 229, 1);
          background: rgba(248, 249, 251, 1);
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 26px;
          color: rgba(153, 153, 153, 1);

          &:hover:not(.is-disabled) {
            border: 1px solid rgba(23, 57, 164, 1);
            color: rgba(23, 57, 164, 1);
          }
        }

        .right {
          margin-left: auto;
        }
      }
    }

    .right-btn-cancel {
      float: right;
      margin-top: 6px;
      margin-bottom: 6px;
      height: 28px;
      width: 100px;
      border: 1px solid rgba(229, 229, 229, 1);
      border-radius: 16px;
      background: rgba(23, 57, 164, 1);
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 26px;
      color: rgba(255, 255, 255, 1);
    }

    .right-btn-cancel {
      margin-left: auto;
      background: rgba(255, 255, 255, 1);
      color: rgba(102, 102, 102, 1);

      &:hover:not(.is-disabled) {
        border: 1px solid rgba(23, 57, 164, 1);
        color: rgba(23, 57, 164, 1);
      }
    }

    .right-btn-cancel.is-disabled {
      opacity: 0.6;
    }

    .calculationModalContent {
      height: 400px;
      overflow-y: auto;
      padding: 0 0 0 10px;

      .log-content {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
</style>
