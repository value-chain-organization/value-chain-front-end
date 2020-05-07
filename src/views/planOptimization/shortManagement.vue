<template>
  <div class="planOptimization-main">
    <div class="top-block">
      <div class="common-block-title">计划优化管理</div>
      <div class="icon-list-block">
        <div class="icon-info" @click="setSelectMenu('basicData')">
          <div class="right-border" />
          <div class="icon-detail" :class="selectMenu === 'basicData'? 'select' : ''">
            <div class="custom-icon">
              <i class="iconfont iconlianhe7 custom-iconfont"/>
            </div>
            <div class="icon-label">基础数据</div>
          </div>
        </div>
        <div class="icon-info" @click="setSelectMenu('modelCheck')">
          <div class="right-border" />
          <div class="icon-detail" :class="selectMenu === 'modelCheck'? 'select' : ''">
            <div class="custom-icon">
              <i class="iconfont iconmoxing custom-iconfont"/>
            </div>
            <div class="icon-label">模型校核</div>
          </div>
        </div>
        <div class="icon-info" @click="setSelectMenu('startOptimize')">
          <div class="right-border" />
          <div class="icon-detail" :class="selectMenu === 'startOptimize'? 'select' : ''">
            <div class="custom-icon">
              <i class="iconfont iconlianhe5 custom-iconfont"/>
            </div>
            <div class="icon-label">开始优化</div>
          </div>
        </div>
        <div class="icon-info" @click="setSelectMenu('resultPreview')">
          <div class="icon-detail" :class="selectMenu === 'resultPreview'? 'select' : ''">
            <div class="custom-icon">
              <i class="iconfont iconlianhe2 custom-iconfont"/>
            </div>
            <div class="icon-label">结果预览</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectMenu === 'basicData'" class="custom-main-block">
      <div class="center-block" id="center-block-basicData">
        <a-row class="row">
          <!-- <div class="custom-date-picker" style="margin-left: 0;"><span>开始时间：</span><a-date-picker v-model="basicStartTime" /></div>
          <div class="custom-date-picker"><span>结束时间：</span><a-date-picker v-model="basicEndTime" /></div> -->
          <div class="custom-date-picker" style="margin-left: 0;"><span>开始时间：</span><a-date-picker v-model="startTime" /></div>
          <div class="custom-date-picker"><span>结束时间：</span><a-date-picker v-model="endTime" /></div>
          <a-button
            :class="['right-btn-cancel', isIntervalStart('basicData') ? '' : 'is-disabled']"
            :disabled="!isIntervalStart('basicData')"
            type="default"
            @click="handleCancelCurrTask('basicData')">取消当前任务
          </a-button>
          <a-button
            :class="['right-btn-start', isIntervalStart() ? 'is-disabled' : '']"
            :disabled="isIntervalStart()"
            @click="handleStartCalc">开始计算
          </a-button>
        </a-row>
      </div>
      <div class="bottom-block">
        <div class="common-block-title" :style="{padding: '20px 0 10px 20px'}">优化管理</div>
        <div class="custom-common-table-block">
          <!-- <a-table
            :rowKey="(record, index) => index"
            :columns="tableColumns"
            :dataSource="calculationTableData"
            :scroll="{ y: bottomTableHeightBasicData }"
            :pagination="false"
          /> -->
          <a-table
            :rowKey="(record, index) => index"
            :columns="tableColumns"
            :dataSource="calculationTableData"
            :pagination="false"
            :scroll="{ y: bottomTableHeightBasicData }"
          />
        </div>
      </div>
    </div>
    <div v-if="selectMenu === 'modelCheck'" class="custom-main-block custom-main-block-check">
      <div class="center-block" id="center-block-modelCheck">
        <a-checkbox-group :options="optionsModelCheck" v-model="checkedListModelCheck"/>
        <a-row class="row">
          <!-- <div class="custom-date-picker"><span>开始时间：</span><a-date-picker v-model="checkStartTime" /></div>
          <div class="custom-date-picker"><span>结束时间：</span><a-date-picker v-model="checkEndTime" /></div> -->
          <div class="custom-date-picker"><span>开始时间：</span><a-date-picker v-model="startTime" /></div>
          <div class="custom-date-picker"><span>结束时间：</span><a-date-picker v-model="endTime" /></div>
          <a-button
            :class="['right-btn-cancel', isIntervalStart('modelCheck') ? '' : 'is-disabled']"
            :disabled="!isIntervalStart('modelCheck')"
            type="default"
            @click="handleCancelCurrTask('modelCheck')">取消当前任务
          </a-button>
          <a-button
            :class="['right-btn-start', isIntervalStart() ? 'is-disabled' : '']"
            :disabled="isIntervalStart()"
            @click="handleStartCalcModelCheck">开始计算</a-button>
        </a-row>
      </div>
      <div class="bottom-block">
        <div class="common-block-title" :style="{padding: '20px 0 10px 20px'}">结果预览</div>
        <div class="custom-common-table-block">
          <!-- <a-table
            :rowKey="(record, index) => index"
            :columns="tableColumns"
            :dataSource="checkTableData"
            :scroll="{ y: bottomTableHeightModelCheck }"
            :pagination="false"
          /> -->
          <a-table
            :rowKey="(record, index) => index"
            :columns="tableColumns"
            :dataSource="checkTableData"
            :pagination="false"
            :scroll="{ y: bottomTableHeightModelCheck }"
          />
        </div>
      </div>
    </div>
    <div v-if="selectMenu === 'startOptimize'" class="custom-main-block custom-main-block-optimization">
      <div class="bottom-block">
        <a-row class="row">
          <div class="common-block-title">优化结果</div>
          <a-button
            :class="['right-btn-cancel', isIntervalStart('optimize') ? '' : 'is-disabled']"
            :disabled="!isIntervalStart('optimize')"
            type="default"
            @click="handleCancelCurrTask('optimize')">取消当前任务
          </a-button>
          <a-button
            :class="['right-btn-start', isIntervalStart() ? 'is-disabled' : '']"
            :disabled="isIntervalStart()"
            @click="handleStartCalcOptimize">开始计算</a-button>
        </a-row>
        <div class="custom-common-table-block" >
          <!-- <a-table
            :rowKey="(record, index) => index"
            :columns="tableColumns"
            :dataSource="optimizeTableData"
            :scroll="{ y: bottomTableHeightStartOptimize }"
            :pagination="false"
          /> -->
          <a-table
            :rowKey="(record, index) => index"
            :columns="tableColumns"
            :dataSource="optimizeTableData"
            :pagination="false"
            :scroll="{ y: bottomTableHeightStartOptimize }"
          />
        </div>
      </div>
    </div>
    <div v-if="selectMenu === 'resultPreview'" class="custom-main-block custom-main-block-result">
      <div class="center-block" id="center-block-resultPreview">
        <a-row class="row">
          <a-button class="left-btn" type="default" @click="handleResultViewModalOpen('MESSP')">查看MES收率库存结果</a-button>
          <a-button class="left-btn" type="default" @click="handleResultViewModalOpen('DBSP')">查看DeltaBase结果</a-button>
          <a-button class="left-btn" type="default" @click="handleViewModelRunLog">查看模型运行日志</a-button>
          <a-button
            :class="['left-btn', isIntervalStart('scheduleReport') ? '' : 'is-disabled']"
            :disabled="!isIntervalStart('scheduleReport')"
            type="default"
            @click="handleCancelCurrTask('scheduleReport')">取消当前任务
          </a-button>
          <a-button
            :class="['left-btn', isIntervalStart() ? 'is-disabled' : '']"
            type="default"
            :disabled="isIntervalStart()"
            @click="handleGenerateMonthScheduleReport">生成短周期计划报表
          </a-button>
          <a-upload
            :showUploadList="false"
            action="/huali-api/File/UploadTemplate"
            @change="handleChange"
          >
            <a-button class="left-btn" type="default">计划报表模版上传</a-button>
          </a-upload>
          <!--
          <a-button class="left-btn" type="default" @click="handleBackupDB">备份数据库</a-button>
          <file-downloader style="margin-top: 11px; margin-right: 0.2rem;" buttonType="default" size="small" down-load-url="/File/DownloadDataBase" get-file-url="/Download/Database" button-text="下载数据库"/>
          <a-upload
                  :showUploadList="false"
                  action="/huali-api/File/UploadBak"
                  @change="handleChange"
          >
            <a-button class="left-btn" type="default">上传数据库</a-button>
          </a-upload>
          <a-button class="left-btn" type="default" @click="handleRestoreDB">恢复数据库</a-button>
          -->
          <div class="custom-date-picker"><span>报表时间：</span><a-date-picker v-model="previewDate" /></div>
        </a-row>
      </div>
      <div class="bottom-block">
        <div class="common-block-title" :style="{padding: '20px 0 10px 20px'}">结果预览</div>
        <div v-show="showLogTable" class="custom-common-table-block">
          <!-- <a-table
            :rowKey="(record, index) => index"
            :columns="tableColumns"
            :dataSource="genReportLogTable"
            :scroll="{ y: bottomTableHeightBasicData }"
            :pagination="false"
          /> -->
          <a-table
            :rowKey="(record, index) => index"
            :columns="tableColumns"
            :dataSource="genReportLogTable"
            :scroll="{ y: bottomTableHeightBasicData }"
            :pagination="false"
          />
        </div>
        <div v-show="!showLogTable" class="bottom-list-area">
          <div class="custom-list-header">内容</div>
          <div class="custom-list-area" id="result-custom-list-area">
            <a-list :dataSource="resultTableData" :loading="resultViewtableLoading">
              <a-list-item slot="renderItem" slot-scope="item">
                <div class="custom-list-item">{{ item.Msg }}</div>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </div>
      <a-modal
        class="planOptimaization-result-detailModal"
        centered
        v-model="resultModalVisible"
        destroyOnClose
        :maskClosable="false"
        :closable="false"
        :width="$flexible(840)"
        :footer="null"
        :afterClose="handleResultViewModalClose"
      >
        <div class="modal-details-result" ref="modalDetails">
          <div class="detail-header">
            <a-row class="row">
              <a-button class="left-btn" type="default" @click="handleOpeartePIMSData('UpdatePIMS')">更新到PIMS模型</a-button>
              <a-button class="left-btn" type="default" @click="handleOpeartePIMSData('RestorePIMS')">恢复到PIMS模型</a-button>
              <a-button class="left-btn" type="default" @click="handleCloseResultModal">关闭</a-button>
              <a-dropdown :getPopupContainer="getPopupContainer" :overlayStyle="{maxHeight: '360px', overflowY: 'auto'}" :trigger="['click']">
                <a-menu slot="overlay" @click="handleResultMenuClick">
                  <a-menu-item v-for="menu in resultMenuList" :key="menu.key">{{ menu.label }}</a-menu-item>
                </a-menu>
                <a-button class="left-btn">
                  {{ selectResultMenu==''?'全部':selectResultMenu }}<a-icon type="down" />
                </a-button>
              </a-dropdown>
              <div class="red-label">值为-326729的点位将不写入PIMSEE，请到相应装置页面修改</div>
            </a-row>
          </div>
          <div class="detail-table custom-common-table-block">
            <!-- <a-table
              :rowKey="(record, index) => index"
              :columns="tableColumnsResultModal"
              :dataSource="resultModalMesData"
              :scroll="{ y: $flexible(310) }"
              :pagination="false"
              :loading="resultViewModaltableLoading"
            /> -->
            <a-table
              :rowKey="(record, index) => index"
              :columns="tableColumnsResultModal"
              :dataSource="resultModalMesData"
              :scroll="{ y: $flexible(380) }"
              :pagination="false"
              :loading="resultViewModaltableLoading"
            />
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {
  requestGetJiChuShuJu,
  requestGetTaskLogJiChu,
  requestCancelTask,
  requestJiaoHe,
  requestGetTaskLogJiaoHe,
  requestYouHua,
  requestGetTaskLogYouHua,
  requestGetCache,
  requeseOpeartePIMSData,
  requestGetPIMSExecLog,
  genPlanReport,
  getTaskLog } from '@/api/planOptimization'
export default {
  name: 'PlanOptimization',
  components: {
  },
  data () {
    return {
      heightTimer: undefined,
      selectMenu: 'basicData',
      username: 'admin', // dummy
      // 表头
      tableColumns: [
        { title: '时间', dataIndex: 'msgTime', width: '25%' },
        { title: '内容', dataIndex: 'msgContent' }
      ],
      calculationTableData: [],
      outputLogInterval: null,
      outputLogType: '',
      // basicStartTime: null,
      // basicEndTime: null,
      startTime: null,
      endTime: null,
      bottomTableHeightBasicData: 300,
      bottomTableHeightModelCheck: 300,
      bottomTableHeightStartOptimize: 300,
      optionsModelCheck: [
        { label: '中压加氢裂化', value: '中压加氢裂化' },
        { label: '高压加氢裂化', value: '高压加氢裂化' },
        { label: 'Ⅱ催化裂化', value: 'Ⅱ催化裂化' },
        { label: 'I延迟焦化', value: 'I延迟焦化' },
        { label: 'Ⅱ延迟焦化', value: 'Ⅱ延迟焦化' },
        { label: '渣油加氢', value: '渣油加氢' },
        { label: 'I重整装置', value: 'I重整装置' },
        { label: 'Ⅱ重整装置', value: 'Ⅱ重整装置' },
        { label: 'Ⅲ重整装置', value: 'Ⅲ重整装置' },
        { label: 'Ⅱ乙烯装置', value: 'Ⅱ乙烯装置' }
      ],
      checkedListModelCheck: [],
      checkTableData: [],
      // checkStartTime: null,
      // checkEndTime: null,
      checkSetting: {},
      // start optimization:
      optimizeTableData: [],
      // result Preview modal:
      resultModalVisible: false,
      resultModalType: '',
      selectResultMenu: '',
      resultMenuList: [],
      resultViewModaltableLoading: true,
      tableColumnsResultModal: [
        { title: '点位名称', dataIndex: 'TagName', width: '30%' },
        { title: 'PIMSEE数据值', dataIndex: 'TagValue', width: '20%' },
        { title: '最新计算值', dataIndex: 'TagValueNew', width: '20%' },
        { title: '计算时间', dataIndex: 'TagTime' }
      ],
      MesDataMap: [],
      MesDataAll: [],
      resultModalMesData: [],
      getPopupContainer: triggerNode => { return triggerNode.parentElement },
      // result Preview
      previewDate: null,
      tableColumnsResult: [
        { title: '内容', dataIndex: 'Msg' }
      ],
      resultTableData: [],
      resultViewtableLoading: false,
      showLogTable: false,
      genReportLogTable: []
    }
  },
  filters: {
  },
  watch: {
    selectMenu (val) {
      clearTimeout(this.heightTimer)
      this.heightTimer = setTimeout(() => {
        this.setListHeight()
      }, 0)
    }
  },
  computed: {
    isIntervalStart () {
      return (type) => {
        if (type) {
          return this.outputLogInterval !== null && this.outputLogType === type
        }
        return this.outputLogInterval !== null
      }
    }
  },
  mounted () {
    clearTimeout(this.heightTimer)
    this.heightTimer = setTimeout(() => {
      this.setListHeight()
    }, 0)
    this.windowOnResize()
  },
  beforeDestroy () {
    this.clearOutputLogInterval()
  },
  created () {
    this.getLastMonth()
  },
  methods: {
    getLastMonth () {
      const nowdays = new Date()
      let year = nowdays.getFullYear()
      let month = nowdays.getMonth()
      if (month === 0) {
        month = 12
        year = year - 1
      }
      if (month < 10) {
        month = '0' + month
      }

      const myDate = new Date(year, month, 0)

      this.startTime = moment(year + '-' + month + '-01') // 上个月第一天
      this.endTime = moment(year + '-' + month + '-' + myDate.getDate())// 上个月最后一天
    },
    clearOutputLogInterval () {
      if (this.outputLogInterval) {
        clearInterval(this.outputLogInterval)
      }
      this.outputLogInterval = null
      this.outputLogType = ''
    },
    windowOnResize () {
      window.onresize = () => {
        this.setListHeight()
      }
    },
    setSelectMenu (menu) {
      this.selectMenu = menu
    },
    setListHeight () {
      const menu = this.selectMenu
      const screenHeight = window.innerHeight
      const commonHeight = 375// header: 40, tab: 20, foolerPadding: 50 topBlock: 148, margin: 40, bottomBlockTitle: 44, tableHeader: 30
      if (menu === 'resultPreview') {
        const centerHeight = document.getElementById('center-block-resultPreview').offsetHeight
        document.getElementById('result-custom-list-area').style.height = `${screenHeight - commonHeight - centerHeight}px`
      } else if (menu === 'basicData') {
        const centerHeight = document.getElementById('center-block-basicData').offsetHeight
        this.bottomTableHeightBasicData = screenHeight - commonHeight - centerHeight
      } else if (menu === 'modelCheck') {
        const centerHeight = document.getElementById('center-block-modelCheck').offsetHeight
        this.bottomTableHeightModelCheck = screenHeight - commonHeight - centerHeight
      } else if (menu === 'startOptimize') {
        this.bottomTableHeightStartOptimize = screenHeight - commonHeight
      }
    },
    handleCancelCurrTask (type) {
      requestCancelTask({ username: this.username }, true).then((res) => {
        if (res.code === 1 && this.outputLogInterval) { // success
          this.$message.success(res.data)

          this.clearOutputLogInterval()

          switch (type) {
            case 'basicData':
              this.calculationTableData = []
              break
            case 'modelCheck':
              this.checkTableData = []
              break
            case 'optimize':
              this.optimizeTableData = []
              break
            case 'scheduleReport':
              this.genReportLogTable = []
              this.showLogTable = true
              break
            default:
              break
          }
        } else if (res.code === -1) { // failed
          this.$message.error(res.data)
        }
      })
    },
    handleStartCalc () {
      // if (this.basicStartTime && this.basicEndTime && moment(this.basicStartTime.format('YYYY-MM-DD')) > moment(this.basicEndTime.format('YYYY-MM-DD'))) {
      if (this.startTime && this.endTime && moment(this.startTime.format('YYYY-MM-DD')) > moment(this.endTime.format('YYYY-MM-DD'))) {
        this.$message.error('结束时间不能早于开始时间。')
      } else {
        this.calculationTableData = []
        this.calculationJiChuData()
      }
    },
    calculationJiChuData () {
      if (this.outputLogInterval) {
        return false
      }

      const params = {
        username: this.username,
        // startT: this.basicStartTime ? this.basicStartTime.format('YYYY-MM-DD') : '',
        // endT: this.basicEndTime ? this.basicEndTime.format('YYYY-MM-DD') : ''
        startT: this.startTime ? this.startTime.format('YYYY-MM-DD') : '',
        endT: this.endTime ? this.endTime.format('YYYY-MM-DD') : ''
      }
      requestGetJiChuShuJu(params, true).then(res => {
        if (res.code === 1) {
          const guid = res.data
          this.requestJiChuTableData(guid)
          this.outputLogType = 'basicData'
          this.outputLogInterval = setInterval(this.requestJiChuTableData.bind(this, guid), 3000)
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
    compare (property) {
      return (a, b) => {
        const value1 = a[property]
        const value2 = b[property]
        return (value2 < value1 ? 1 : -1)
      }
    },
    validateStartEndTime (startT, endT) {
      let flag = true
      if (startT !== '' && endT !== '') {
        const startTime = moment(startT)
        const endTime = moment(endT)
        flag = startTime < endTime
      }
      return flag
    },
    requestJiChuTableData (guid) {
      requestGetTaskLogJiChu({ username: this.username, guid: guid }, true).then(res => {
        this.calculationTableData = res.data.reverse()

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]['msgContent'].includes('任务执行完成')) {
            this.clearOutputLogInterval()
            break
          }
        }
      })
    },
    handleStartCalcModelCheck () {
      // if (this.checkStartTime && this.checkEndTime && moment(this.checkStartTime.format('YYYY-MM-DD')) > moment(this.checkEndTime.format('YYYY-MM-DD'))) {
      if (this.startTime && this.endTime && moment(this.startTime.format('YYYY-MM-DD')) > moment(this.endTime.format('YYYY-MM-DD'))) {
        this.$message.error('结束时间不能早于开始时间。')
      } else {
        this.checkTableData = []
        this.calculationJiaoHeData()
      }
    },
    calculationJiaoHeData () {
      if (this.outputLogInterval) {
        return false
      }

      const params = {
        username: this.username,
        // startT: this.checkStartTime ? this.checkStartTime.format('YYYY-MM-DD') : '',
        // endT: this.checkEndTime ? this.checkEndTime.format('YYYY-MM-DD') : '',
        startT: this.startTime ? this.startTime.format('YYYY-MM-DD') : '',
        endT: this.endTime ? this.endTime.format('YYYY-MM-DD') : '',
        units: this.checkedListModelCheck
      }
      requestJiaoHe(params, true).then(res => {
        if (res.code === 1) {
          const guid = res.data
          this.requestJiaoHeTableData(guid)
          this.outputLogType = 'modelCheck'
          this.outputLogInterval = setInterval(this.requestJiaoHeTableData.bind(this, guid), 3000)
        }
      })
    },
    requestJiaoHeTableData (guid) {
      requestGetTaskLogJiaoHe({ username: this.username, guid: guid }, true).then(res => {
        this.checkTableData = res.data.reverse()

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]['msgContent'].includes('任务执行完成')) {
            this.clearOutputLogInterval()
            break
          }
        }
      })
    },
    // start Optimize
    handleStartCalcOptimize () {
      this.optimizeTableData = []
      this.calculationYouHuaData()
    },
    calculationYouHuaData () {
      if (this.outputLogInterval) {
        return false
      }

      requestYouHua({ username: this.username }, true).then(res => {
        if (res.code === 1) {
          const guid = res.data
          this.requestYouHuaTableData(guid)
          this.outputLogType = 'optimize'
          this.outputLogInterval = setInterval(this.requestYouHuaTableData.bind(this, guid), 3000)
        }
      })
    },
    requestYouHuaTableData (guid) {
      requestGetTaskLogYouHua({ username: this.username, guid: guid }, true).then(res => {
        this.optimizeTableData = res.data.reverse()

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]['msgContent'].includes('任务执行完成')) {
            this.clearOutputLogInterval()
            break
          }
        }
      })
    },
    // result Preview -- modal
    handleResultViewModalOpen (type) {
      this.resultModalVisible = true
      this.resultViewModaltableLoading = true
      this.resultModalType = type
      this.requestResultModalData(type)
    },
    requestResultModalData (type) {
      const params = { type }
      requestGetCache(params, true).then(res => {
        this.resultModalMesData = res.data
        this.resultViewModaltableLoading = false
        const { map, menuList } = this.handleGroupByAttr('UnitName', res.data)
        this.resultMenuList = menuList
        this.MesDataMap = map
        this.MesDataAll = res.data
      })
    },
    handleGroupByAttr (key, dataList) {
      const map = {}
      const menuList = []
      for (let i = 0; i < dataList.length; i++) {
        const dataEl = dataList[i]
        if (map[dataEl[key]] === undefined) {
          map[dataEl[key]] = [dataEl]
          menuList.push({ key: dataEl[key], label: dataEl[key] })
        } else {
          map[dataEl[key]].push(dataEl)
        }
      }
      menuList.sort(this.compare('label'))
      menuList.unshift({ key: '', label: '全部' })
      return { map, menuList }
    },
    handleResultMenuClick ({ key }) {
      if (key === '') {
        this.resultModalMesData = [...this.MesDataAll]
      } else {
        const map = { ...this.MesDataMap }
        this.resultModalMesData = [...map[key]]
      }
      this.selectResultMenu = key
    },
    handleOpeartePIMSData (action) {
      const params = {
        action,
        info: `${this.resultModalType}+${this.selectResultMenu}`
      }
      requeseOpeartePIMSData(params, true).then(res => {
        if (res.code === 1) {
          this.$message.success(res.data)
        } else {
          this.$message.error(res.data)
        }
      })
    },
    handleCloseResultModal () {
      this.resultModalVisible = false
    },
    handleResultViewModalClose () {
      this.resultModalType = ''
      this.resultMenuList = []
      this.selectResultMenu = ''
      this.resultModalMesData = []
      this.MesDataMap = []
      this.MesDataAll = []
    },
    // result Preview
    handleViewModelRunLog () {
      this.showLogTable = false
      this.resultViewtableLoading = true
      const params = { username: this.username }
      requestGetPIMSExecLog(params, true).then(res => {
        if (res.code === 1) {
          const allDataAvaliable = []
          res.data.forEach(d => {
            if (d.Msg !== '') {
              allDataAvaliable.push(d)
            }
          })
          this.resultTableData = allDataAvaliable
          this.resultViewtableLoading = false
        }
      })
    },
    handleGenerateMonthScheduleReport () {
      this.showLogTable = true
      if (!this.previewDate) {
        this.$message.warning('请先选择日期!')
        return
      }
      if (this.outputLogInterval) {
        return false
      }
      genPlanReport({ username: this.username, time: this.previewDate.format('YYYY-MM-DD') }, true).then(res => {
        const guid = res.data
        this.getLogOfTask(guid)
        this.outputLogType = 'scheduleReport'
        this.outputLogInterval = setInterval(this.getLogOfTask.bind(this, guid), 3000)
      })
    },
    getLogOfTask (guid) {
      getTaskLog({ username: this.username, guid: guid }, true).then(res => {
        this.genReportLogTable = res.data

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]['msgContent'].includes('任务执行完成')) {
            this.clearOutputLogInterval()
            break
          }
        }
      })
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功！`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败！`)
      }
    },
    handleBackupDB () {
      requestBackupDB().then(res => {
        if (res.code === 1) {
          this.$message.success(res.data)
        } else {
          this.$message.error(res.data)
        }
      }, () => {
        this.$message.error('数据库备份失败')
      })
    },
    handleDownloadDB () {
    },
    handleRestoreDB () {
      requestRecoverDB().then(res => {
        if (res.code === 1) {
          this.$message.success(res.data)
        } else {
          this.$message.error(res.data)
        }
      }, () => {
        this.$message.error('数据库恢复失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .planOptimization-main {
    width: 100%;
    height: 100%;

    .common-block-title {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 14px;
      color: rgba(51, 51, 51, 1);
      letter-spacing: 1px;
    }

    .top-block {
      width: 100%;
      height: 148px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      padding: 20px;

      .icon-list-block {
        width: 100%;
        height: calc(100% - 14px);
        display: flex;

        .icon-info {
          width: 25%;
          height: 100%;
          position: relative;

          .right-border {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            height: 20px;
            width: 1px;
            background: rgba(219, 219, 220, 1);
          }

          .icon-detail {
            cursor: pointer;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: auto;
            height: auto;
            padding: 10px;

            .custom-icon {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              opacity: 1;
              text-align: center;

              .custom-iconfont {
                line-height: 60px;
                font-size: 30px;
                color: rgba(23, 57, 164, 1);
              }
            }

            .icon-label {
              margin-top: 5px;
              text-align: center;
              font-size: 12px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              line-height: 12px;
              color: rgba(153, 153, 153, 1);
            }
          }

          .icon-detail:hover, .icon-detail.select {
            .custom-icon {
              background: rgba(23, 57, 164, 1);

              .custom-iconfont {
                color: rgba(255, 255, 255, 1);
              }
            }

            .icon-label {
              color: rgba(23, 57, 164, 1);
            }
          }
        }
      }
    }

    .custom-main-block {
      margin-top: 20px;
      width: 100%;
      height: calc(100% - 168px);
      display: flex;
      flex-direction: column;
    }

    .center-block {
      width: 100%;
      height: auto;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      margin-bottom: 20px;
      padding: 0 20px;

      .row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .left-btn {
          margin: 6px 10px 6px 0;
          height: 28px;
          border: 1px solid rgba(229, 229, 229, 1);
          border-radius: 16px;
          background: rgba(255, 255, 255, 1);
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 26px;
          color: rgba(102, 102, 102, 1);

          &:hover:not(.is-disabled) {
            border: 1px solid rgba(23, 57, 164, 1);
            color: rgba(23, 57, 164, 1);
          }
        }

        .left-btn.is-disabled {
          opacity: 0.6;
        }

        /deep/ .checkbox {
          margin-left: 10px;
          margin-top: 14px;
          font-size: 12px;
          height: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 12px;
          color: rgba(102, 102, 102, 1);

          .ant-checkbox-inner {
            width: 10px;
            height: 10px;
            border: 1px solid rgba(210, 210, 210, 1);
          }
        }

        /deep/ .custom-date-picker {
          margin-left: 20px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 40px;
          color: rgba(51, 51, 51, 1);

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
        }

        .right-btn-cancel,
        .right-btn-start {
          margin-left: 10px;
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

        .right-btn-cancel.is-disabled,
        .right-btn-start.is-disabled {
          opacity: 0.6;
        }
      }
    }

    .bottom-block {
      width: 100%;
      flex: 1;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
      border-radius: 4px;

      .bottom-list-area {
        width: 100%;
        height: calc(100% - 44px);

        .custom-list-area {
          width: 100%;
          height: 300px;
          overflow-y: auto;
        }
      }
    }

    .custom-main-block-result {
      .center-block {
        .row {
          /deep/ .custom-date-picker {
            margin-left: 0;
          }
        }
      }

      .bottom-block {
        height: calc(100% - 60px);
      }
    }

    .custom-main-block-check {
      .center-block {
        padding: 0 20px;

        /deep/ .ant-checkbox-group {
          .ant-checkbox-group-item {
            margin: 6px 10px 6px 0;
            padding: 7px 10px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(229, 229, 229, 1);
            border-radius: 16px;
            font-size: 12px;
            height: 28px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 12px;
            color: rgba(102, 102, 102, 1);

            .ant-checkbox-inner {
              width: 10px;
              height: 10px;
              border: 1px solid rgba(210, 210, 210, 1);
            }
          }

          .ant-checkbox-wrapper-checked {
            background: rgba(23, 57, 164, 1);
            color: rgba(255, 255, 255, 1);
          }
        }
      }

      .bottom-block {
        height: calc(100% - 100px);
      }
    }

    .custom-main-block-optimization {
      .bottom-block {
        height: 100%;

        .row {
          padding: 20px 20px 10px 20px;

          .common-block-title {
            line-height: 24px;
          }

          display: flex;

          /*.right-btn-start {*/
          /*  margin-left: auto;*/
          /*  margin-top: 0;*/
          /*}*/

          .right-btn-cancel,
          .right-btn-start {
            margin-left: 10px;
            margin-top: 0;
            margin-bottom: 0;
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

          .right-btn-cancel.is-disabled,
          .right-btn-start.is-disabled {
            opacity: 0.6;
          }
        }
      }
    }
  }

  .custom-list-header {
    width: 100%;
    height: 30px;
    background: rgba(255, 255, 255, 1);
    padding-left: 20px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 30px;
    color: rgba(153, 153, 153, 1);
    letter-spacing: 1px;
  }

  /deep/ .custom-list-area {
    .ant-list-header {
      padding-top: 0;
      padding-bottom: 0;
      border-bottom: 1px solid transparent;
    }

    .custom-list-item {
      padding-left: 20px;
    }

    .ant-spin-container {
      .ant-list-item {
        height: 30px;
        padding: 0;
        border-bottom: 1px solid transparent;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 30px;
        color: rgba(51, 51, 51, 1);
        letter-spacing: 1px;
      }

      .ant-list-item:nth-child(2n+1) {
        background: rgba(246, 247, 251, 1);
      }

      .ant-list-item:hover {
        background: rgba(224, 228, 241, 1);
      }
    }
  }

  .modal-details-result {
    width: 100%;
    height: 420px;
    position: relative;

    .detail-header {
      width: 100%;
      height: 40px;
      background: rgba(246, 247, 251, 1);

      .row {
        display: flex;
        align-items: center;
        padding: 0 20px;

        .left-btn {
          margin: 6px 10px 6px 0;
          height: 28px;
          border: 1px solid rgba(210, 210, 210, 1);
          border-radius: 16px;
          background: rgba(255, 255, 255, 1);
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 28px;
          color: rgba(102, 102, 102, 1);

          &:hover:not(.is-disabled) {
            border: 1px solid rgba(23, 57, 164, 1);
            color: rgba(23, 57, 164, 1);
          }
        }

        .red-label {
          width: auto;
          height: auto;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 20px;
          color: rgba(255, 16, 16, 1);
        }
      }

      /deep/ .ant-dropdown-menu-item {
        min-height: 30px;
      }
    }

    .detail-table {
      height: 380px;
      padding: 20px;
    }
  }
</style>
