<template>
  <div class="oilBenefit-result">
    <div class="main-block">
      <!-- <div class="header-block">
        <div class="common-block-title">效益测算结果</div>
        <a-dropdown :trigger="['click']" >
          <a-menu slot="overlay" @click="handleMenuClick" >
            <a-menu-item v-for="menu in menuList" :key="menu.key">{{ menu.label }}</a-menu-item>
          </a-menu>
          <a-button class="dropdown-btn" @click="requestDownList">
            {{ selectMenu }} <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div> -->
      <div class="custom-common-table-block">
        <a-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="tableColumns"
          :dataSource="tableData"
          :loading="tableLoading"
          :pagination="{
            showQuickJumper: true,
            showSizeChanger: true
          }">
          <span slot="oilType" slot-scope="text">
            <span :style="{color:'rgba(23, 57, 164, 1)'}">{{ text }}</span>
          </span>
        </a-table>
      </div>
      <!-- <div class="footer-area">
        <a-button class="footer-btn" type="default" @click="handleBack">Back</a-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getOilBenefitInitResult, getDownList, getLatestList } from '@/api/oilValue'
import moment from 'moment'

export default {
  name: 'OilBenefitResult',
  components: {},
  data () {
    return {
      tableColumns: [
        { title: 'ID', dataIndex: 'id' },
        { title: '原油种类', dataIndex: 'oil_type', scopedSlots: { customRender: 'oilType' } },
        { title: '优化配置值', dataIndex: 'opt_config_val' },
        { title: '影子价格', dataIndex: 'shadow_price' },
        { title: '增量法保本价', dataIndex: 'increment_method' },
        { title: '替换法保本价', dataIndex: 'instead_method' }
      ],
      tableLoading: false,
      tableData: [],
      selectMenu: '',
      menuList: []
    }
  },
  filters: {
  },
  mounted () {
    // this.requestMenuList()
    this.requestLatestList()
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  methods: {
    // getTableData (filename) {
    //   this.tableLoading = true
    //   getOilBenefitInitResult({ filename: filename }).then(res => {
    //     console.log(res)
    //     const rawData = res.data
    //     const formatData = []
    //     for (let i = 0; i < rawData.length; i++) {
    //       formatData.push({
    //         id: i + 1,
    //         oid_code: rawData[i].PIMSCode,
    //         oil_type: rawData[i].PIMSCName,
    //         opt_config_val: rawData[i].Allocation,
    //         shadow_price: this.numFilter(rawData[i].ShadowPrice),
    //         increment_method: this.numFilter(rawData[i].AdditionPrice),
    //         instead_method: this.numFilter(rawData[i].SubstitutionPrice)
    //       })
    //     }
    //     this.tableData = formatData
    //     this.tableLoading = false
    //   })
    // },
    // requestDownList () {
    //   getDownList({ username: 'admin' }).then(res => {
    //     // console.log(res)
    //     const menuList = []
    //     res.data.forEach(item => {
    //       menuList.push({
    //         key: item,
    //         label: item.split('.')[0]
    //       })
    //     })
    //     this.menuList = menuList
    //     this.selectMenu = menuList[0].label
    //   })
    // },
    // requestMenuList () {
    //   getDownList({ username: 'admin' }).then(res => {
    //     // console.log(res)
    //     const menuList = []
    //     res.data.forEach(item => {
    //       menuList.push({
    //         key: item,
    //         label: item.split('.')[0]
    //       })
    //     })
    //     this.menuList = menuList
    //     this.selectMenu = menuList[0].label
    //     this.getTableData(menuList[0].key)
    //   })
    // },
    requestLatestList () {
      this.tableLoading = true
      getLatestList().then(res => {
        // console.log(res)
        // this.tableLoading = true
        const rawData = res.data
        const formatData = []
        for (let i = 0; i < rawData.length; i++) {
          formatData.push({
            id: i + 1,
            oid_code: rawData[i].PIMSCode,
            oil_type: rawData[i].PIMSCName,
            opt_config_val: rawData[i].Allocation,
            shadow_price: this.numFilter(rawData[i].ShadowPrice),
            increment_method: this.numFilter(rawData[i].AdditionPrice),
            instead_method: this.numFilter(rawData[i].SubstitutionPrice)
          })
        }
        this.tableData = formatData
        this.tableLoading = false
      })
    },
    // handleMenuClick (e) {
    //   console.log('click', e)
    //   this.selectMenu = e.key.split('.')[0]
    //   this.getTableData(e.key)
    // },

    handleBack () {
      // this.$router.replace('/oilBenefit/calculation');
    }
  }
}
</script>

<style lang="less" scoped>
  .oilBenefit-result {
    width: 100%;
    height: 100%;
    .main-block {
      width: 100%;
      height: 100%;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 8px rgba(0,0,0,0.04);
      border-radius:4px;
      padding: 20px;
      .header-block {
        width: 100%;
        height: 30px;
        display: flex;
        .common-block-title {
          height: 30px;
          font-size:14px;
          font-family:Source Han Sans CN;
          font-weight:400;
          line-height:30px;
          color:rgba(51,51,51,1);
          letter-spacing:1px;
        }
        .dropdown-btn {
          margin-left: auto;
          height: 30px;
          padding: 0 10px;
          background:rgba(248,249,251,1);
          border:1px solid rgba(229,229,229,1);
          border-radius:16px;
          font-size:12px;
          font-family:Source Han Sans CN;
          font-weight:400;
          line-height:30px;
          color:rgba(102,102,102,1);
        }
      }
      .footer-area {
        width: 100%;
        margin-top: 20px;
        .footer-btn {
          float: right;
          height: 28px;
          padding: 0 20px;
          background:rgba(248,249,251,1);
          border:1px solid rgba(229,229,229,1);
          border-radius:16px;
          font-size:12px;
          font-family:Source Han Sans CN;
          font-weight:400;
          line-height:26px;
          color:rgba(102,102,102,1);
        }
      }
      /deep/.custom-common-table-block {
        .ant-table-pagination.ant-pagination {
          margin-right: 0;
        }
        .ant-select {
          margin-right: 0;
        }
      }
    }
  }
</style>
