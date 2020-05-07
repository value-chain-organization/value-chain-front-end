<template>
  <div class="programme-main">
    <div class="top-card">
      <a-row class="row">
        <div class="left">生产计划优化方案</div>
        <div class="right">
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item v-for="menu in selectMenuList" :key="menu.key">{{ menu.label }}</a-menu-item>
            </a-menu>
            <a-button class="btn">
              {{ selectMenu }}
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
          <a-button class="btn-no-border" type="default" :disabled="currPage === 1" @click="handleRequestPrePageData">上一页</a-button>
          <a-button class="btn-no-border" type="default" :disabled="currPage > (totalCount/pageSize)" @click="handleRequestNextPageData">下一页</a-button>
          <a-button class="btn" type="default" @click="handleRefreshList">刷新列表</a-button>
          <file-downloader
            style="margin-left: 20px;"
            buttonType="default"
            size="small"
            down-load-url="/File/DownloadDown"
            get-file-url="/Download/Down"
            button-text="下载"/>
        </div>
      </a-row>
    </div>
    <div class="main-card">
      <ul>
        <li v-for="(pro, index) in displayProgrammeList" :key="index">
          <a-tooltip placement="topLeft" :title="pro.name">
            <div class="pro-detail" @click="handleClickProgramme(pro)">{{ pro.UnitName }}</div>
          </a-tooltip>
        </li>
      </ul>
    </div>
    <div v-if="isDisplaySpinning" class="spin-container">
      <a-spin :spin="isDisplaySpinning"/>
    </div>
    <a-modal
      :title="detailInfo.title"
      class="programme-detailModal"
      centered
      v-model="detailModalVisible"
      @cancel="() =>parameterFlag = false"
      destroyOnClose
      :closable="false"
      :width="$flexible(800)"
      :footer="null"
    >
      <!-- <template slot="footer">
        <a-button key="back" @click="() => detailModalVisible = false">关闭</a-button>
      </template> -->
      <div class="modal-details" ref="modalDetails">
        <div class="left-info">
          <div class="top-blank"/>
          <ul>
            <li v-for="(info, index) in detailInfo.modalLeftInfo" :key="index">
              <a-row class="row">
                <a-tooltip placement="topLeft" :title="info.StreamName">
                  <div class="info-label label-large">{{ info.StreamName }}</div>
                </a-tooltip>
                <div class="seperator">一</div>
                <div class="info-label label-large">{{ info.Flowrate }}吨</div>
                <a-icon type="arrow-right" style="margin-left: 10px"/>
              </a-row>
            </li>
          </ul>
          <div v-if="parameterFlag" class="parameterLst">
            <ul>
              <li v-for="(info, index) in detailInfo.parameterInfo" :key="index">
                <a-row class="row">
                  <a-tooltip placement="topLeft" :title="info.Parameters">
                    <div class="info-label label-large">{{ info.Parameters }}</div>
                  </a-tooltip>
                  <div class="seperator">一</div>
                  <div class="info-label label-large">{{ info.Value }}</div>
                  <span style="margin-left: 20px"></span>
                </a-row>
              </li>
            </ul>
          </div>
        </div>
        <div class="center-img" id="centerImg"/>
        <div class="right-info">
          <div class="top-blank"/>
          <ul>
            <li v-for="info in detailInfo.modalRightInfo">
              <a-row class="row">
                <a-icon type="arrow-right" style="margin-right: 10px"/>
                <a-tooltip placement="topLeft" :title="info.StreamName">
                  <div class="info-label label-large">{{ info.StreamName }}</div>
                </a-tooltip>
                <div class="seperator">一</div>
                <div class="info-label label-small">{{ info.Flowrate }}吨</div>
                <div class="seperator">一</div>
                <div class="info-label label-small">{{ info.Yields }}%</div>
              </a-row>
            </li>
          </ul>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getProgramList, analysisReport } from '@/api/planReport'
import fileDownloader from '@/components/fileDownloader/fileDownloader'

export default {
  name: 'Programme',
  components: {
    STable,
    Ellipsis,
    fileDownloader
  },
  data () {
    return {
      // timer
      timer: undefined,
      timerImage: undefined,

      currPage: 1,
      totalCount: 0,
      pageSize: 28,
      selectMenu: '',
      selectMenuList: [],
      // data list
      programmeList: [],
      displayProgrammeList: [],
      detailModalVisible: false,
      // Modal info
      detailInfo: {
        title: '',
        modalLeftInfo: [],
        modalRightInfo: [],
        parameterInfo: []
      },
      parameterFlag: false,
      isDisplaySpinning: true
    }
  },
  filters: {},
  mounted () {
    this.requestMenuList()
  },
  beforeDestroy () {
    clearTimeout(this.timerImage)
  },
  methods: {
    requestMenuList () {
      getProgramList().then(res => {
        if (res.code === 1) {
          this.selectMenuList = res.data.map(fileName => {
            return { key: fileName, label: fileName }
          })
          if (this.selectMenuList.length) {
            this.selectMenu = this.selectMenuList[0].key
            this.requestProgrammeData()
          }
        }
      })
    },
    handleMenuClick (e) {
      this.selectMenu = e.key
      this.requestProgrammeData()
    },
    requestProgrammeData () {
      this.isDisplaySpinning = true
      analysisReport(this.selectMenu).then(res => {
        if (res.code === 1) {
          this.currPage = 1
          this.isDisplaySpinning = false
          this.programmeList = res.data
          // console.log(this.programmeList)
          this.totalCount = res.data.length
          this.setDisplayProgrammeList()
        }
      }).catch(err => console.log(err))
    },
    setDisplayProgrammeList () {
      const displayStartIndex = this.pageSize * (this.currPage - 1)
      const endIndex = this.pageSize * this.currPage
      const displayEndIndex = endIndex > this.totalCount ? undefined : endIndex
      this.displayProgrammeList = [...this.programmeList].slice(displayStartIndex, displayEndIndex)
    },
    handleClickProgramme (pro) {
      // console.log(pro)
      if (pro.ParametersLst.length > 0) {
        this.parameterFlag = true
      }
      this.setDetailModalVisible(true, pro)
    },
    setDetailModalVisible (isVisible, pro) {
      this.detailModalVisible = isVisible

      this.detailInfo = {
        title: pro.UnitName,
        modalLeftInfo: pro.FeedStockLst,
        modalRightInfo: pro.ProductLst,
        parameterInfo: pro.ParametersLst
      }
      // this.$set(this.detailInfo, 'modalLeftInfo', modalLeftInfo)
      // this.$set(this.detailInfo, 'modalRightInfo', modalRightInfo)
      this.resetModalCenterImageHeight()
    },
    resetModalCenterImageHeight () {
      clearTimeout(this.timerImage)
      this.timerImage = setTimeout(() => {
        const imgHeight = this.$refs.modalDetails.scrollHeight - this.$flexible(20)
        document.getElementById('centerImg').style.height = `${imgHeight}px`
      }, 0)
    },
    handleRequestNextPageData () {
      this.currPage = this.currPage + 1
      this.setDisplayProgrammeList()
    },
    handleRequestPrePageData () {
      this.currPage = this.currPage - 1
      // console.log('page', this.currPage)
      this.setDisplayProgrammeList()
    },
    handleRefreshList () {
      this.requestProgrammeData()
    }
  }
}
</script>

<style lang="less" scoped>
  .programme-main {
    width: 100%;
    height: 100%;

    .top-card {
      margin-bottom: 20px;
      height: 40px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
      border-radius: 2px;
      background: rgba(255, 255, 255, 1);
      padding: 0 20px;

      .row {
        display: flex;

        .left {
          display: flex;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 40px;
          color: rgba(51, 51, 51, 1);
          // letter-spacing:4px;
          opacity: 1;
        }

        .right {
          flex: 1;
          text-align: right;
        }

        .btn {
          margin-top: 8px;
          margin-left: 10px;
          height: 24px;
          padding: 0 10px;
          background: rgba(248, 249, 251, 1);
          border: 1px solid rgba(229, 229, 229, 1);
          border-radius: 16px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 23px;
          color: rgba(102, 102, 102, 1);
        }

        .btn-no-border {
          margin-top: 8px;
          margin-left: 10px;
          height: 24px;
          padding: 0 10px;
          background: rgba(255, 255, 255, 1);
          border: none;
          box-shadow: none;
          border-radius: 16px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 24px;
          color: rgba(51, 51, 51, 1);
        }

        .btn-no-border:hover {
          background: rgba(248, 249, 251, 1);
        }
      }
    }

    .main-card {
      height: calc(100% - 60px);
      width: 100%;
      background-color: rgba(255, 255, 255, 1);
      padding: 20px 0 0 20px;

      ul {
        list-style-type: none;
        padding-inline-start: 0;
        width: 100%;

        li {
          float: left;
          width: calc(12.5% - 20px);
          min-width: 120px;
          height: 80px;
          margin-right: 20px;
          margin-bottom: 20px;

          .pro-detail {
            cursor: pointer;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
            background: rgba(248, 249, 251, 1);
            border: 1px solid rgba(229, 229, 229, 1);
            border-radius: 4px;
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 20px;
            color: rgba(51, 51, 51, 1);
            // letter-spacing:4px;
          }

          .pro-detail:hover {
            background: rgba(28, 53, 164, 1);
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.14);
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }

    .spin-container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.1);
      text-align: center;
      padding-top: 200px;
    }
  }

  .modal-details {
    background-image: linear-gradient(90deg, rgba(180, 180, 180, 0.15) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgba(180, 180, 180, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
    background-size: 10px 10px;
    height: 386px;
    position: relative;
    overflow-y: auto;
    padding-top: 20px;
    display: flex;

    .center-img {
      height: 100%;
      width: 140px;
      margin: 0 3px;
      background: url("../../../public/static/image/programme.png") center no-repeat;
      background-size: 100% 100%;
    }

    .left-info {
      width: calc(50% - 78px);

      .top-blank {
        width: 100%;
        height: 20%;
      }

      ul {
        list-style-type: none;
        padding-inline-start: 0;
        margin-left: auto;

        li {
          margin-bottom: 6px;
          height: 28px;

          .row {
            justify-content: flex-end;
          }
        }
      }
      .parameterLst{
        margin-top: 30px;
      }
    }

    .right-info {
      width: calc(50% - 78px);
      height: 100%;

      .top-blank {
        width: 100%;
        height: 20%;
      }

      ul {
        list-style-type: none;
        padding-inline-start: 0;

        li {
          margin-bottom: 6px;
          height: 28px;

          .row {
            justify-content: flex-start;
          }
        }
      }
    }

    .row {
      display: flex;
      align-items: center;

      .info-label {
        height: 28px;
        box-sizing: border-box;
        background: rgba(246, 247, 251, 1);
        border: 1px solid rgba(229, 229, 229, 1);
        border-radius: 16px;
        text-align: center;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 28px;
        color: rgba(51, 51, 51, 1);
        //letter-spacing:4px;
      }

      .label-large {
        width: 110px;
        padding: 0 10px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }

      .label-small {
        width: 61px;
      }

      .seperator {
        margin: 0 2px;
      }
    }

  }
</style>
