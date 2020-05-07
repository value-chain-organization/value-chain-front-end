<template>
  <div class="graph-viewer" ref="viewer" :style="{background: graphStyle.background}">
    <div class="graph" ref="graph" :style="graphStyle" v-show="showView"></div>
    <!--    <div class="empty" v-show="showView && !currentModuleInfo.xmlstring">暂无组态信息</div>-->
    <!--<Icon type="md-refresh" class="btn-reset" v-show="showModuleId" @click="reset()" style="color:white;"/>-->
    <a-icon type="left" class="btn-reset" v-show="showModuleId.length>0" @click="reset()"/>
    <!--    <Icon type="md-backspace" size="26" class="btn-reset" v-show="showModuleId.length>0" @click="reset()"/>-->
    <!--<Button type="default" >重置</Button>-->
    <div class="graph-cover" v-show="!showView">
      <CommonLoading
        class="loading"
        type="spinner"
        :size="{width:50,height:50}"
        :options="{
          color:'rgba(23,57,164,1)',
          maskColor:'transparent'
        }"></CommonLoading>
    </div>

  </div>
</template>

<script>

import CommonLoading from '@/components/common-loading'
import { editCmd, getBindDataList, getModuleInfo } from '../../api/zutai'
import { cellToInfo, getCellBindType, mappingDataToCell } from './util'
import moment from 'moment'

export default {
  name: 'GraphViewer',
  i18n_prefix: 'component.graph-viewer',
  components: {
    CommonLoading
  },
  props: {
    // ["moduleId", "background"],
    moduleId: {
      type: String
    },
    background: {
      type: String
    },
    zoomEnable: {
      type: Boolean,
      default () {
        return false
      }
    },
    panEnable: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      timeRange: [
        moment()
          .add(-1, 'd')
          .format('YYYY-MM-DD HH:mm:ss'),
        moment().format('YYYY-MM-DD HH:mm:ss')
      ],
      showInfo: false,
      tipPosition: null,
      showEdit: false,
      showView: false,
      planSaving: false,
      viewer: null,
      _fla: false,

      flag: 0,
      InfoRules: {},
      currentEdit: {},
      currentModuleInfo: {},
      currentGraphInfo: null,
      scale: 1,
      itemRefreshTimer: null,
      showModuleId: [],
      chartLoading: false,
      chartOptions: {},
      historyData: []
    }
  },
  computed: {
    tipStyle () {
      if (this.tipPosition) {
        return {
          display: 'block',
          left: this.tipPosition[0] + 'px',
          top: this.tipPosition[1] + 'px'
        }
      } else {
        return {
          display: 'none'
        }
      }
    },
    graphStyle () {
      return this.currentGraphInfo ? {
        width: 'auto !important',
        // height:"auto !important",
        // width: (this.currentGraphInfo._pageWidth || this.currentGraphInfo.pageWidth) * this.scale + 'px',
        // height: (this.currentGraphInfo._pageHeight || this.currentGraphInfo.pageHeight) * this.scale + 'px',
        background: this.background || this.currentGraphInfo.background
      } : {
        width: 'auto !important'
        //  height:"auto !important",
      }
    }
  },
  watch: {
    showModuleId (v) {
      if (v && v.length) {
        this.loadModuleInfo(v[v.length - 1])
      }
    },
    moduleId (v) {
      this.showModuleId = []
      this.loadModuleInfo(v)
    }
  },
  methods: {
    showTip (x, y) {
      this.tipPosition = [x + 10, y]
    },
    hideTip () {
      this.tipPosition = null
    },
    initViewer () {
      return new Promise((resolve, reject) => {
        mxUtils.get('./static/vendor/mxgraph/default.xml', (xhr) => {
          var themes = new Object()
          themes[Graph.prototype.defaultThemeName] = xhr.getDocumentElement()
          var graph = this.viewer = new Graph(this.$refs.graph, undefined, undefined, undefined, themes)
          graph.resizeContainer = true
          graph.setEnabled(false)

          function updateEdgeStyle (graph, edge) {
            // setTimeout(() => {
            try {
              if (edge.getStyle().includes('shape=flowLine')) {
                const ele = graph.view.getState(edge).shape.node
                ele.getElementsByTagName('path')[0].removeAttribute('visibility')
                ele.getElementsByTagName('path')[0].setAttribute('stroke-width', '6')
                ele.getElementsByTagName('path')[0].setAttribute('stroke', 'lightGray')
                ele.getElementsByTagName('path')[1].setAttribute('class', 'flow')
              }
            } catch (e) {
            }
            // }, 10)
          }

          graph.addListener(mxEvent.REFRESH, function (sender, evt) {
            // debugger;
            sender.view.states.visit(function (key, state) {
              if (sender.model.isEdge(state.cell)) {
                updateEdgeStyle(sender, state.cell)
              }
            })
          })
          graph.addListener(mxEvent.SIZE, function (sender, evt) {
            // debugger;
            sender.view.states.visit(function (key, state) {
              if (sender.model.isEdge(state.cell)) {
                updateEdgeStyle(sender, state.cell)
              }
            })
          })

          graph.addListener(mxEvent.CELLS_ADDED, function (sender, evt) {
            // debugger;
            const edge = evt.properties.cells[0]
            if (edge && edge.isEdge()) {
              updateEdgeStyle(sender, edge)
            }
          })

          if (this.zoomEnable) {
            this.$refs.graph.addEventListener('mousewheel', function (evt) {
              evt.preventDefault()
              evt.stopPropagation()
              if (evt.wheelDelta > 100) {
                const zoom = 1.1
                graph.zoom(zoom)
              } else if (evt.wheelDelta < -100) {
                const zoom = 0.9
                graph.zoom(zoom)
              }
            }, {
              passive: false
            })
          }

          if (this.panEnable) {
            let _isMoving = false; let _startPoint
            this.$refs.graph.addEventListener('mousedown', function (evt) {
              _isMoving = true
              _startPoint = evt
            })
            this.$refs.graph.addEventListener('mousemove', function (e) {
              if (_isMoving) {
                if (!_startPoint) {

                } else {
                  const deltaX = e.clientX - _startPoint.clientX
                  const deltaY = e.clientY - _startPoint.clientY
                  graph.panGraph(deltaX, deltaY)
                }
              }
            })
            this.$refs.graph.addEventListener('mouseup', function (evt) {
              _isMoving = false
              _startPoint = null
            })
            this.$refs.graph.addEventListener('mouseleave', function (evt) {
              _isMoving = false
              _startPoint = null
            })
          }

          // window.onresize = this.refreshScale
          resolve(graph)
        }, () => {
          reject()
        })
      })
    },
    onPlanSave () {
      this.editCmd(this.currentEdit)
      this.showEdit = false
      // console.log(this.editCmd(this.this.editCmd(this.currentEdit)))
    },
    updateGraphInfo (xmlstring = '') {
      const xmlDoc = mxUtils.parseXml(xmlstring)
      const res = /pageWidth="(\d+)".*pageHeight="(\d+)"/.exec(xmlstring) || []
      let pageSize
      if (res[1] && res[2]) {
        pageSize = {
          pageWidth: res[1] * 1,
          pageHeight: res[2] * 1
        }
      }
      const codec = new mxCodec(xmlDoc)
      this.currentGraphInfo = codec.decode(xmlDoc.documentElement, this.viewer.getModel())
      this.refreshScale(pageSize).then(() => {
        this.showView = true
      })
    },
    loadModuleInfo (moduleId) {
      console.log('moduleId', moduleId)
      if (!moduleId) {
        if (this.showModuleId.length) {
          moduleId = this.showModuleId[this.showModuleId.length - 1]
        } else {
          moduleId = this.moduleId
        }
      }
      if (moduleId) {
        this.showView = false
        getModuleInfo({
          id: moduleId
        }).then((res) => {
          this.currentModuleInfo = res.data || {}
          this.updateGraphInfo(this.currentModuleInfo.xmlstring || '')
          if (this.currentModuleInfo.type === 1) {
            this.startGraphRefresh()
          } else {
            this.stopGraphRefresh()
          }
        }, (e) => {
          this.$message.error({
            title: '错误',
            description: '获取组态信息失败'
          })
        })
      }
    },
    refreshScale (graphSize) {
      return new Promise((resolve, reject) => {
        clearTimeout(this.refreshTimer)
        this.refreshTimer = setTimeout(() => {
          if (!graphSize) {
            graphSize = this.currentGraphInfo
          }
          const viewEl = this.$refs && this.$refs.viewer
          if (graphSize && graphSize.pageWidth && graphSize.pageHeight && viewEl) {
            const pw = viewEl.clientWidth; const ph = viewEl.clientHeight
            const gw = Math.abs(this.currentGraphInfo._pageWidth || this.viewer.view.graphBounds.width + this.viewer.view.graphBounds.x * 2)
            const gh = Math.abs(this.currentGraphInfo._pageHeight || this.viewer.view.graphBounds.height + this.viewer.view.graphBounds.y * 2)
            let scale = 1
            if (pw / ph > gw / gh) {
              scale = ph / gh
            } else {
              scale = pw / gw
            }
            this.currentGraphInfo._pageWidth = gw
            this.currentGraphInfo._pageHeight = gh

            this.viewer.zoomTo(scale, false)
            this.scale = scale
            resolve()
          } else {
            reject && reject()
          }
        }, 10)
      })
    },

    startGraphRefresh () {
      this.stopGraphRefresh()
      this.refreshGraphDataView()
      if (this.currentModuleInfo.refreshInterval) {
        const time = this.currentModuleInfo.refreshInterval * 1000

        this.itemRefreshTimer = setInterval(() => {
          this.refreshGraphDataView()
          // console.log('refreshGraphDataView')
        }, time)
      }
    },
    stopGraphRefresh () {
      clearInterval(this.itemRefreshTimer)
      this.showView = true
    },
    refreshGraphDataView () {
      const graph = this.viewer
      const model = graph.getModel()
      const items = []
      const itemCellMap = {}

      for (const i in model.cells) {
        const info = cellToInfo(model.cells[i], {
          graph
        })
        if (info.detail.type === '1') {
          const key = `${info.detail.deviceId}-${info.detail.item}`
          if (itemCellMap[key]) {
            itemCellMap[key].push(model.cells[i])
          } else {
            itemCellMap[key] = [model.cells[i]]
            items.push({
              itemId: info.detail.item,
              deviceId: info.detail.deviceId
            })
          }
        }
      }
      items.length && getBindDataList({
        items: items
      }).then((res) => {
        // console.log(res)
        (res.data || []).forEach((d) => {
          const key = `${d.deviceId}-${d.itemId}`
          if (itemCellMap[key]) {
            itemCellMap[key].forEach((cell) => {
              const info = cellToInfo(cell, {
                graph
              })
              const needBindText = ['true', '1'].includes(info.detail.bindText + '')

              if (needBindText) {
                let val = d.val == null ? '' : d.val + ''
                if (val) {
                  val = Number(val)
                  const { bindTextOp = '*', bindTextOpValue = 1 } = info.detail || {}
                  const opValue = Number(bindTextOpValue)
                  switch (bindTextOp) {
                    case '*':
                      val = val * opValue
                      break
                    case '/':
                      val = val / opValue
                      break
                    case '+':
                      val = val + opValue
                      break
                    case '-':
                      val = val - opValue
                      break
                  }
                  if (info.valueFixed) {
                    val = val.toFixed(info.valueFixed)
                  }
                }
                cell.setAttribute('label', val)
              }
              if (info.detail.mapping && info.detail.mapping.length) {
                mappingDataToCell(cell, info.detail.mapping, d)
              }
            })
          }
        })
        graph.refresh()
      })
    },

    reload () {
      this.loadModuleInfo()
    },
    reset () {
      const nextList = [].concat(this.showModuleId)
      nextList.pop()
      this.showModuleId = nextList
      if (nextList.length === 0) {
        this.loadModuleInfo(this.moduleId)
      }
    },
    editCmd (data) {
      editCmd(data).then(res => {
        // console.log(123,res)
        this.$Message.success(res.data)
      }, res => {
        if (res.code == 1000) {
          this.$Message.error(res.msg)
        } else {
          this.$message.error({
            title: '错误',
            description: '命令下发失败'
          })
        }
      })
    }
  },
  mounted () {
    this.initViewer().then((view) => {
      // 鼠标事件
      const track = new mxCellTracker(view)
      track.mouseMove = function (sender, e) {
        const cell = e.sourceState && e.sourceState.cell
        if (cell) {
          const type = getCellBindType(cell)
          if (type == 2) {
            e.getState().setCursor('pointer')
          }
        }
      }

      view.getTooltipForCell = (cell) => {
        const type = getCellBindType(cell)
        if (type == 2) {
          const info = cellToInfo(cell, { graph: this.viewer })
          return `${$t_p('click_go')} ${info.detail.moduleName}`
        }
      }

      // 点击事件

      view.click = (e) => {
        const cell = e.sourceState && e.sourceState.cell

        if (cell) {
          const info = cellToInfo(cell, { graph: view })
          if (info.detail && info.detail.infoType == 1) {
            if (info.detail && info.detail.cmdType == 0 || info.detail.cmdType == 1) {
              const obj = {}
              obj.args = info.detail.cmdType
              obj.devices = info.detail.devices
              obj.bindTime = info.detail.bindTime || 10
              this.currentEdit = { ...obj }
              this.editCmd(this.currentEdit)
            }
          }
          if (info.detail && info.detail.cmdType == 2) {
            const obj = {}
            obj.devices = info.detail.devices
            obj.bindTime = info.detail.bindTime || 10
            this.currentEdit = { ...obj }
            this.showEdit = true
          }
          if (info.detail && info.detail.cmdType == 3) {
            const obj = {}
            obj.args = ''
            obj.devices = info.detail.devices
            obj.bindTime = info.detail.bindTime || 10
            this.currentEdit = { ...obj }
            this.editCmd(this.currentEdit)
          }

          if (info.detail && info.detail.infoType == 1) {
            const infoDetail = {}
            infoDetail.infoDevice = info.detail.infoDevice
            infoDetail.infoDeviceId = info.detail.infoDeviceId
            infoDetail.infoDeviceName = info.detail.infoDeviceName
            infoDetail.infoItem = info.detail.infoItem
            infoDetail.infoItemName = info.detail.infoItemName
            infoDetail.infoName = info.detail.infoName
            this.$emit('on-info', infoDetail)
          }
          if (info.detail && info.detail.type == 2) {
            this.showModuleId.push(info.detail.module)
          }
        }
      }
    })
    this.loadModuleInfo()
    this.$eventHub.$on('sl-main-size-change', () => {
      this.refreshScale()
    })
    setTimeout(() => {
      if (this.currentModuleInfo.xmlstring) {
        this.refreshScale()
      }
    }, 300)
  },
  destroyed () {
    this.stopGraphRefresh()
  }
}
</script>

<style>
  .flow {
    stroke-dasharray: 8;
    animation: dash 0.5s linear;
    animation-iteration-count: infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: -16;
    }
  }
</style>

<style lang="less" scoped>
  .graph-viewer {
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-items: center;
    align-items: center;
    position: relative;

    .tip {
      position: absolute;
      background: yellow;
      width: 400px;
      height: 300px;
      z-index: 99;
      /* background: @color-blue-light;*/
      /*border-radius: 5px;*/
      color: #000;
      transition: all ease 400ms;
      padding: 10px;
      /*background-size: 100% 100%;*/

      .title {
        height: 30px;
        line-height: 30px;
        display: flex;
        border-bottom: 1px solid #d2d2d2;

        div:first-child {
          flex: 1;
          font-size: 14px;
        }

        .close {
          width: 20px;
          height: 20px;
          font-size: 18px;
          border: 1px solid #d2d2d2;
          line-height: 20px;
          text-align: center;
        }

        .close:hover {
          cursor: pointer;
        }
      }
    }

    .graph {
      margin: 0 auto;
      width: 100% !important;
      /*box-sizing: border-box;*/
      /*border: 1px solid white;*/

    }

    .chart {
      height: 400px;

      .chart-ele {
        width: 100%;
        height: 100%;
      }
    }

    .btn-reset {
      position: absolute;
      left: 10px;
      top: 10px;
      color: white;
      cursor: pointer;
    }

    .graph-cover {
      position: absolute;
      width: 100%;
      height: 100%;

      .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        text-align: center;
        margin-left: -100px;
        transform: translateY(-50%);

      }
    }

  }

</style>
