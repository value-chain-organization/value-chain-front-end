<template>
  <div class="tool-content">
    <div class="title">
      原油切割工具
    </div>
    <div class="option">
      <div class="desc">
        {{ descData[cA] }}
      </div>
      <a-select class="select" v-model="cU" style="width: 210px;" @change="handleProvinceChange">
        <a-select-option v-for="area in areaData" :key="area.code">
          {{ area.name }}
        </a-select-option
        >
      </a-select>
      <a-select class="select" v-model="cA" style="width: 200px" @change="selectCA">
        <a-select-option v-for="assay in assays" :key="assay">{{ assay }}</a-select-option>
      </a-select>
      <!-- 上传模板 -->
      <a-upload
        style="display: inline-block;margin-right:10px"
        :showUploadList="false"
        name="file"
        :multiple="false"
        action="/huali-api/File/UploadAssayTemplate"
        @change="handleChange"
      >
        <a-button shape="round" class="btn"> <a-icon type="upload" />上传模板</a-button>
      </a-upload>
      <file-downloader :down-load-url="downLoadUrl" :get-file-url="fileUrl" button-text="下载文件"/>
    </div>

    <div class="panel">
      <div class="left">
        <div class="top">
          <div class="tip">
            设置区域安排侧线分布
          </div>

          <div class="btns">
            <a-button
              class="btn"
              @click="addLine(btn)"
              v-for="btn in btnData"
              :key="btn.name"
              type="default"
              shape="round"
            >{{ btn.name }}
            </a-button>

            <a-button
              class="btn"
              type="danger"
              shape="round"
              @click="removeAllLine"
            >删除全部
            </a-button>
          </div>

        </div>
        <div class="bottom">
          <div class="left">
            <div class="lines">
              <div
                class="line"
                draggable
                v-for="(line,index) in lines"
                @dragstart="dragStart($event, index)"
                @dragover="allowDrop"
                @drop="drop($event, index)"
              >
                <input class="label" v-model="lines[index].name"/>
                <input class="num" :disabled="line.name!=='悬摆'" v-model="lines[index].num"/>
                <div class="reduce" @click="removeLine(index)">
                  <div class="short-line"></div>
                </div>
                <div class="xb" v-if="line.name==='悬摆'&&line.num!=0">
                  <div class="xb_left">
                    <slider vertical :step="0.1" :max="1" v-model="line.cxRight"></slider>
                  </div>
                  <div class="xb_right">
                    <div class="xb_top">
                      {{ (1-line.cxRight).toFixed(1) }}
                    </div>
                    <div class="xb_bottom">
                      {{ line.cxRight }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="info">
              <div class="label">损失值：</div>
              <input class="value" type="text" v-model="cL">
              <a-button
                @click="saveConfig"
                type="primary"
                shape="round">
                保存配置
              </a-button>
            </div>
          </div>
          <div class="right">
            <div v-if="cU==='unit1'" class="img-unit1">

            </div>
            <div v-else-if="cU==='unit2'" class="img-unit2">

            </div>
            <div v-else class="img-unit3">

            </div>
          </div>
        </div>

      </div>
      <div class="right">
        <div class="top">
          <div class="tip">
            计算区域，选择油品和温度
          </div>
          <div class="oils">
            <div class="oilLines">
              <div class="oilLine" v-for="(oilInfo,index) in selectedOilList">
                <a-select
                  class="chooseOil"
                  placeholder="请选择油品"
                  :filterOption="filterOption"
                  v-model="selectedOilList[index]"
                  showSearch
                  labelInValue
                  style="width: 210px;"
                  @change="chooseOil($event,1)">
                  <a-select-option v-for="oil in oilList" :key="oil.abbr">
                    {{ oil.name }}
                  </a-select-option>
                </a-select>
                <a-tag class="assay"> {{ oilInfo.key }}</a-tag>
                <!-- <input type="text" class="num" v-model="oR[index]" placeholder="输入占比"> -->
                <input type="text" class="num" v-model="oR[index]">

                <a-button type="default" shape="circle" icon="plus" @click="addOil"/>

                <a-button
                  type="default"
                  shape="circle"
                  icon="minus"
                  style="margin-left: 10px;"
                  v-if="index!==0"
                  @click="reduceOil(index)"/>
              </div>
            </div>
            <a-button
              @click="confirmOil"
              style="margin-top: 10px;"
              type="primary"
              shape="round">
              确认
            </a-button>
          </div>
        </div>
        <div class="bottom">
          <div class="calculater">
            <div class="tip">
              <span class="left">输入温度</span>
              <span class="right">计算收率</span>
            </div>
            <div class="tempLines">
              <div class="tempLine" v-for="(temp,index) in cT">
                <input v-if="index===0" type="text" class="temp" value="IBP" disabled>
                <input v-else type="text" class="temp" v-model="cT[index]" :disabled="index===cT.length-1">
                <input type="text" class="shouyi" v-model="realY[index]">
              </div>
            </div>

            <div class="btns">
              <a-button
                @click="cutOil"
                type="primary"
                shape="round">
                切割
              </a-button>
              <a-button
                @click="simulateCut"
                style="margin:0 15px;"
                type="primary"
                shape="round">
                模拟切割
              </a-button>
              <a-button
                @click="matching"
                type="primary"
                shape="round">
                匹配
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import applicationTools from '../../api/applicationTool'
import Slider from 'ant-design-vue/lib/slider'
import 'ant-design-vue/lib/slider/style' // 或者 ant-design-vue/lib/button/style/css 加载 css 文件
import fileDownloader from '@/components/fileDownloader/fileDownloader'

const areaData = [{ name: '老区常压250', code: 'unit1' }, { name: '新区常减压350', code: 'unit2' }, {
  name: '3号常减压',
  code: 'unit3'
}]
const assayData = {
  unit1: ['Assay1'],
  unit2: ['Assay2', 'Assay3', 'Assay4', 'Assay5'],
  unit3: ['Assay6', 'Assay7', 'Assay8', 'Assay9']
}
const descData = {
  Assay1: '2#250常压切割方案',
  Assay2: '2#350常减石脑油去乙烯柴油去加氢',
  Assay3: '2#350常减石脑油去乙烯柴油去临氢加氢',
  Assay4: '2#350常减石脑油去重整柴油去加氢',
  Assay5: '2#350常减石脑油去重整柴油去临氢加氢',
  Assay6: '3#常减石脑油去乙烯柴油去加氢',
  Assay7: '3#常减石脑油去乙烯柴油去临氢加氢',
  Assay8: '3#常减石脑油去重整柴油去加氢',
  Assay9: '3#常减石脑油去重整柴油去临氢加氢'
}
export default {
  components: {
    Slider,
    fileDownloader
  },
  data () {
    return {
      areaData,
      assayData,
      descData,
      assays: assayData[areaData[0].code],
      cA: assayData[areaData[0].code][0],
      cU: 'unit1', // 当前装置(unit1 or 2 or 3)
      cL: '', // 损失值
      cT: [], // 切割温度，首尾显示锁定，只有中间的数据可供用户修改。第一个锁定为“IBP”(传值的时候仍然为 -1)  最下边一个 707
      realY: [], // 实际收率
      btnData: [
        {
          name: '添加顶气',
          label: '顶气'
        },
        {
          name: '添加初顶',
          label: '初顶'
        },
        {
          name: '添加常顶',
          label: '常顶'
        },
        {
          name: '添加常线',
          label: '常线'
        },
        {
          name: '添加常渣',
          label: '常渣'
        },
        {
          name: '添加减线',
          label: '减线'
        },
        {
          name: '添加减渣',
          label: '减渣'
        },
        {
          name: '添加悬摆',
          label: '悬摆'
        }

      ],
      processHeight: 0.8,
      lines: [],
      oilData: [],
      oR: [100], // 已添加原油占比数组
      oilList: [],
      selectedOilList: [],
      fileUrl: '/Download/Assay',
      downLoadUrl: '/Download/DownloadAssay'
    }
  },
  methods: {
    // 上传模板
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功！`)
        this.upload()
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败！`)
      }
    },
    // 取消默认行为
    allowDrop (e) {
      e.preventDefault()
    },
    // 开始拖动
    dragStart (e, index) {
      const tar = e.target
      e.dataTransfer.setData('Text', index)
    },
    // 放置
    drop (e, index) {
      this.allowDrop(e)
      // 使用一个新数组重新排序后赋给原变量
      const arr = this.lines.concat([])
      const dragIndex = e.dataTransfer.getData('Text')
      const temp = arr.splice(dragIndex, 1)
      arr.splice(index, 0, temp[0])
      this.lines = arr
      console.log(this.lines)
    },
    handleProvinceChange (value) {
      this.assays = assayData[value]
      this.cA = assayData[value][0]
      this.getData(this.cA)
    },
    selectCA (value) {
      this.getData(this.cA)
    },
    getData (cA) {
      applicationTools.GetCX({ cA }).then(res => {
        if (res.code === 1) {
          this.cL = res.data.cxLoss
          this.lines = []
          console.log(this.lines)
          console.log(res.data.cxPosition)
          let i = 0
          this.cT = []
          res.data.cxNames.forEach((c, index) => {
            // 添加温度行数
            this.realY.push(0)
            if (c === '悬摆') {
              this.lines.push({
                name: c,
                num: res.data.cxPosition[index],
                cxRight: res.data.cxRightyd[i++]
              })
            } else {
              this.cT.push(-1)
              this.lines.push({
                name: c,
                num: res.data.cxPosition[index]
              })
            }
          })

          this.cT[this.cT.length - 1] = 707
          i = 0
        }
      })
    },
    getOilData () {
      applicationTools.getOilList().then(res => {
        this.oilList = res.data
        this.selectedOilList.push({
          label: res.data[0].name,
          key: res.data[0].abbr
        })
      })
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    addLine (btn) {
      this.lines.push(
        {
          name: btn.label,
          num: 0
        }
      )
    },
    removeLine (index) {
      this.lines.splice(index, 1)
    },
    removeAllLine () {
      this.$confirm({
        title: '确认删除全部侧线吗?',
        content: h => <div style="color:red;">当前侧线配置将会清空，刷新可重新载入</div>,
        width: 600,
        onOk () {
          this.lines = []
        },
        onCancel () {
        },
        class: 'test'
      })
    },
    chooseOil (value, index) {
      // 回传搜索结果
      applicationTools.SortOil({ oilSearched: value.label.trim() })
    },
    saveConfig () {
      const cN = []; const cP = []; const cR = []
      this.lines.forEach(line => {
        if (line.cxRight) {
          cR.push(line.cxRight)
        }
        cN.push(line.name)
        cP.push(Number(line.num))
      })
      console.log(this.lines)
      applicationTools.GetConf({ cN, cP, cR, cU: this.cU, cA: this.cA, cL: this.cL }).then(res => {
        if (res.code === 1) {
          this.cT = []
          this.lines.forEach(line => {
            if (line.name !== '悬摆') { this.cT.push(-1) }
          })
          this.cT[this.cT.length - 1] = 707
          this.realY.push(0)
          this.$message.success('保存侧线成功！')
        } else {
          this.$message.error(res.data)
        }
      })
    },
    addOil () {
      this.selectedOilList.push({
        label: this.oilList[0].name,
        key: this.oilList[0].abbr
      })
      this.oR.push(100)
    },
    reduceOil (index) {
      this.selectedOilList.splice(index, 1)
      this.oR.splice(index, 1)
    },
    // 保存原油
    confirmOil () {
      const oN = []; const oA = []; const oR = this.oR
      this.selectedOilList.forEach((oil, index) => {
        oN.push(oil.label)
        oA.push(oil.key)
        oR[index] = Number(oR[index])
      })
      applicationTools.GetFeedOil({ oN, oA, oR, cU: this.cU, cA: this.cA }).then(res => {
        this.$message.success('确认完成')
        if (res.code === 1) {
          this.cT = res.data
        }
      })
    },
    // 切割
    cutOil () {
      const oN = []; const oA = []; const oR = this.oR
      this.selectedOilList.forEach((oil, index) => {
        oN.push(oil.label)
        oA.push(oil.key)
        oR[index] = Number(oR[index])
      })
      applicationTools.GetCutOilFwd({
        oN, oA, oR, cU: this.cU, cA: this.cA, cT: this.cT
      }).then(res => {
        this.realY = res.data
      })
    },
    // 模拟切割
    simulateCut () {
      const oN = []; const oA = []; const oR = this.oR
      this.selectedOilList.forEach((oil, index) => {
        oN.push(oil.label)
        oA.push(oil.key)
        oR[index] = Number(oR[index])
      })
      applicationTools.GetAllCut({
        oN, oA, oR, cU: this.cU, cA: this.cA, cT: this.cT
      }).then(res => {
        this.$message.success(res.data)
      })
    },
    // 匹配
    matching () {
      const oN = []; const oA = []; const oR = this.oR
      this.selectedOilList.forEach((oil, index) => {
        oN.push(oil.label)
        oA.push(oil.key)
        oR[index] = Number(oR[index])
      })
      applicationTools.GetMatchTandY({
        oN, oA, oR, cU: this.cU, cA: this.cA, realT: this.cT, realY: this.realY
      }).then(res => {
        this.$message.success(res.data)
      })
    },
    downloadFile () {
      applicationTools.Assay().then(res => {
        console.log(res)
      })
    }
  },
  created () {
    this.getData(this.cA)
    this.getOilData()
  }
}
</script>

<style scoped lang="less">
  .tool-content {
    user-select: none;
    font-size: 12px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
    opacity: 1;
    border-radius: 4px;
    padding-bottom: 20px;

    .title {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 24px;
      color: rgba(51, 51, 51, 1);
      padding: 10px 20px;
    }

    .option {
      padding: 10px 10px;
      margin: 0 20px;
      height: 40px;
      background: rgba(247, 247, 251, 1);
      opacity: 1;
      border-radius: 4px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .desc {
        text-align: left;
        font-size: 14px;
        margin-right: 20px;
      }

      .select {
        margin-right: 10px;
        border-radius: 20px;
      }
    }

    .panel {
      margin: 10px 20px;
      display: flex;

      .left {
        .top {
          .btns {
            width: 450px;

            .btn {
              margin: 10px 10px 0 0;
            }
          }
        }

        .bottom {
          display: flex;

          .left {
            .lines {
              margin-top: 30px;

              .line {
                margin-top: 10px;
                display: flex;
                align-items: center;

                .label {
                  width: 80px;
                  height: 30px;
                  background: rgba(249, 249, 251, 1);
                  border: 1px solid rgba(229, 229, 229, 1);
                  opacity: 1;
                  border-radius: 16px;
                  line-height: 30px;
                  text-align: center;
                }

                .num {
                  width: 80px;
                  height: 30px;
                  background: rgba(249, 249, 251, 1);
                  border: 1px solid rgba(229, 229, 229, 1);
                  opacity: 1;
                  border-radius: 16px;
                  line-height: 30px;
                  text-align: center;
                  margin-left: 20px;
                }

                .reduce {
                  width: 30px;
                  height: 30px;
                  background: rgba(255, 255, 255, 1);
                  border: 1px solid rgba(229, 229, 229, 1);
                  opacity: 1;
                  border-radius: 16px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-left: 20px;
                  cursor: pointer;

                  .short-line {
                    width: 11px;
                    height: 2px;
                    background: rgba(153, 153, 153, 1);
                  }
                }

                .reduce:hover {
                  background: rgba(42, 55, 160, 1);
                }

                .reduce:hover .short-line {
                  background: rgba(255, 255, 255, 1);
                }

                .xb {
                  display: flex;
                  align-items: center;
                  margin-left: 20px;

                  .xb_left {
                    height: 30px;
                  }

                  .xb_right {
                    margin-left: 10px;
                  }
                }
              }
            }

            .info {
              margin-top: 20px;
              display: flex;
              align-items: center;

              .value {
                width: 90px;
                height: 30px;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(229, 229, 229, 1);
                border-radius: 16px;
                text-align: center;
                line-height: 30px;
                margin: 0 10px;
              }

            }
          }

          .right {
            width: 235px;
            height: 394px;
            margin: 30px 40px 20px 30px;
            display: flex;
            justify-content: center;

            .img-unit2 {
              width: 235px;
              height: 394px;
              background: url("../../../public/static/image/applicationTool/unit2.png") no-repeat;
              background-size: 100% 100%;
            }
            .img-unit3{
              width: 235px;
              height: 394px;
              background: url("../../../public/static/image/applicationTool/unit3.png") no-repeat;
              background-size: 100% 100%;
            }
            .img-unit1 {
              width: 97px;
              height: 394px;
              background: url("../../../public/static/image/applicationTool/unit1.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }

      .right {
        .top {
          .oilLines {
            max-height: 120px;
            overflow: auto;
            margin-top: 10px;

            .oilLine {
              margin-top: 10px;
              display: flex;
              align-items: center;

              .chooseOil {

              }

              .assay {
                margin: 0 10px;
              }

              .num {
                width: 60px;
                height: 30px;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(229, 229, 229, 1);
                opacity: 1;
                border-radius: 16px;
                margin-right: 10px;
                text-align: center;
              }
            }
          }
        }

        .bottom {
          .calculater {
            margin-top: 30px;

            .tip {
              margin: 10px;

              .left {
                margin-left: -7px;
              }

              .right {
                width: 80px;
                margin-left: 90px;
              }
            }

            .tempLines {
              .tempLine {
                display: flex;
                align-items: center;
                margin-top: 10px;

                .temp {
                  width: 120px;
                  height: 30px;
                  background: rgba(249, 249, 251, 1);
                  border: 1px solid rgba(229, 229, 229, 1);
                  opacity: 1;
                  border-radius: 16px;
                  text-align: center;
                  line-height: 30px;
                }

                .shouyi {
                  margin-left: 20px;
                  width: 160px;
                  height: 30px;
                  background: rgba(249, 249, 251, 1);
                  border: 1px solid rgba(229, 229, 229, 1);
                  opacity: 1;
                  border-radius: 16px;
                  text-align: center;
                  line-height: 30px;
                }
              }
            }

            .btns {
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
</style>
