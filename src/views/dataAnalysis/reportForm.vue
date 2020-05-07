<template>
  <div class="report-form">
    <div class="left-tree">
      <div class="report-list-title">报表列表</div>
      <div class="report-list-control">
        <a-button class="header-btn" type="default" @click="handleRefresh">刷新</a-button>
        <a-button class="header-btn" type="default" @click="handlePreview">预览</a-button>
        <a-button class="header-btn" type="default" @click="handleDownload">下载</a-button>
        <a-button class="header-btn" type="default" @click="handleDelete">删除</a-button>
      </div>
      <div class="report-list">
        <a-tree v-if="treeData.length > 0" :treeData="treeData" showIcon :defaultExpandAll="true" @select="handleFileSelect">
          <template slot="folder">
            <i class="iconfont iconwenjian tree-iconfont"/>
          </template>
          <template slot="excel">
            <i class="iconfont iconexcel tree-iconfont"/>
          </template>
        </a-tree>
      </div>
    </div>
    <a-divider type="vertical" />
    <div class="right-container">
      <div class="preview-title">报表预览(预览时间可能较长)</div>
      <div class="preview-container">
        <a-spin v-if="!showTab" size="large" :spinning="true" tip="Loading..." />
        <a-tabs v-if="tabData.length" :defaultActiveKey="tabData.findIndex(name => name === selectSheet)" @change="handleChangeTab" type="card">
          <a-tab-pane v-for="(sheetName, index) in tabData" :tab="sheetName" :key="index">
            <iframe
              id="image-frame-1"
              v-if="previewData !== ''"
              :src="previewData"
              width="100%"
              height="100%"
              scrolling="yes"
              style="border: none; padding: 10px;"></iframe>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { getFileList, getSheetList, getSheetPreview, deleteFile } from '@/api/planReport'

export default {
  components: {
  },
  data () {
    return {
      treeData: [],
      selectFolder: '',
      selectFile: '',
      selectSheet: '',
      showTab: true,
      tabData: [],
      previewData: ''
    }
  },
  mounted () {
    this.getFileTreeData()
  },
  beforeDestroy () {
  },
  methods: {
    handleRefresh () {
      this.treeData = []
      this.selectFolder = ''
      this.selectFile = ''
      this.selectSheet = ''
      this.showTab = true
      this.tabData = []
      this.previewData = ''
      this.getFileTreeData()
    },
    handlePreview () {
      if (this.selectFolder === '' || this.selectFile === '') {
        this.$message.warning('请先选择一份报表!');
        return;
      }

      this.tabData = []
      this.getSheetTabList()
    },
    handleDownload () {
      if (this.selectFolder === '' || this.selectFile === '') {
        this.$message.warning('请先选择一份报表!');
        return;
      }

      const url = '/huali-api/Download/DownloadPlanReport'
      window.location.href = `${url}?folderName=${this.selectFolder}&fileName=${this.selectFile}`
    },
    handleDelete () {
      if (this.selectFolder === '' || this.selectFile === '') {
        this.$message.warning('请先选择一份报表!');
        return;
      }

      deleteFile(this.selectFolder, this.selectFile).then(res => {
        if (res.code === 1) {
          this.$message.success(res.data);
          this.handleRefresh()
        }
      })
    },
    handleFileSelect (keys) {
      if (keys.length) {
        this.selectFolder = keys[0].split('/-/')[0]
        this.selectFile = keys[0].split('/-/')[1]
        this.selectSheet = ''
      } else {
        this.selectFolder = ''
        this.selectFile = ''
        this.selectSheet = ''
      }
    },
    handleChangeTab (key) {
      this.selectSheet = this.tabData[key]
      this.getPreviewData()
    },
    getFileTreeData () {
      getFileList().then(res => {
        if (res.code === 1) {
          const fileInfo = {}
          res.data.forEach(file => {
            const { foldername, filename } = file
            if (fileInfo[foldername]) {
              fileInfo[foldername].push(filename)
            } else {
              fileInfo[foldername] = [filename]
            }
          })

          this.treeData = Object.keys(fileInfo).map((folder, i) => {
            return {
              title: folder,
              key: folder,
              slots: { icon: 'folder' },
              children: fileInfo[folder].map((file, j) => {
                return {
                  title: file,
                  key: `${folder}/-/${file}`,
                  slots: { icon: 'excel' }
                }
              })
            }
          })
        }
      })
    },
    getSheetTabList () {
      this.showTab = false
      getSheetList(this.selectFolder, this.selectFile).then(res => {
        this.showTab = true
        if (res.code === 1) {
          this.tabData = res.data.map(sheet => sheet.sheetname)
          if (this.tabData.length) {
            this.handleChangeTab(0)
          }
        }
      })
    },
    getPreviewData () {
      this.previewData = ''
      this.showTab = false
      getSheetPreview(this.selectFolder, this.selectFile, this.selectSheet).then(res => {
        if (res.code === 1) {
          this.previewData = 'data:text/html;charset=UTF-8,' + encodeURIComponent(res.data)
        }
        this.showTab = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .report-form {
    width: 100%;
    height: 100%;

    .left-tree {
      width: 250px;
      height: 100%;
      float: left;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      opacity: 1;
      border-radius: 4px;

      .report-list-title {
        width: 100%;
        height: 42px;
        padding: 20px 20px 10px 20px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 12px;
        color: rgba(51, 51, 51, 1);
        letter-spacing: 1px;
        opacity: 1;
      }

      .report-list-control {
        height: 40px;
        opacity: 1;
        border-radius: 4px;

        .header-btn {
          margin: 6px 0 6px 10px;
          padding: 0;
          width: 50px;
          height: 28px;
          border-radius: 20px;
          background: rgba(248, 249, 251, 1);
          border: 1px solid rgba(229, 229, 229, 1);
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 28px;
          color: rgba(153, 153, 153, 1);

          &:first-child {
            margin-left: 10px;
          }

          &:hover {
            background:rgba(23,57,164,1);
            color: rgba(255, 255, 255, 1);
          }
        }
      }

      /deep/ .report-list {
        width: 100%;
        height: calc(100% - 82px);
        padding: 10px 0 20px 20px;

        .tree-iconfont {
          color: #2030A4;
        }

        .ant-tree {
          .ant-tree-child-tree > li:first-child {
            padding-top: 2px;
          }


          li {
            padding: 2px 0;

            .ant-tree-treenode-switcher-open {
              .ant-tree-node-content-wrapper {
                &:hover {
                  background: rgba(224, 228, 241, 1);
                }
              }

              /*&:hover {*/
              /*  background: rgba(224, 228, 241, 1);*/
              /*}*/
            }

            .ant-tree-treenode-selected {
              /*background: rgba(224, 228, 241, 1);*/

              .ant-tree-node-selected {
                background: rgba(224, 228, 241, 1);
                color: rgba(28, 53, 164, 1);
              }
            }
          }
        }
      }
    }

    .ant-divider.ant-divider-vertical {
      width: 6px;
      height: 100%;
      float: left;
      margin: 0;
      background: rgba(247, 247, 251, 1);
    }

    /deep/ .right-container {
      width: calc(100% - 256px);
      height: 100%;
      float: left;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      opacity: 1;
      border-radius: 4px;

      .preview-title {
        width: 100%;
        height: 42px;
        padding: 20px 20px 10px 20px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 12px;
        color: rgba(51, 51, 51, 1);
        letter-spacing: 1px;
        opacity: 1;
      }

      .preview-container {
        position: relative;
        width: 100%;
        height: calc(100% - 42px);
      }

      .ant-tabs {
        width: 100%;
        height: 100%;
      }

      .ant-tabs-bar {
        margin-bottom: 0;
        background: rgba(255, 255, 255, 1) !important;
        height: 28px;
        border-bottom: 1px solid rgba(229, 229, 229, 1) !important;
      }

      .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-nav-container {
        height: 28px;
        font-size: 12px;
      }

      .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
        line-height: 28px;
        height: 28px;
        background: rgba(248, 249, 251, 1);
        color: rgba(153, 153, 153, 1);
        border: 1px solid rgba(229, 229, 229, 1);
        border-radius: 4px 4px 0 0;
        margin: 0 10px 0 0;

        &:first-child {
          margin-left: 10px;
        }

        &::before, &::after {
          content: none;
        }
      }

      .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
        color: rgba(255, 255, 255, 1);;
        background: rgba(23, 57, 164, 1);
        border-color: rgba(23, 57, 164, 1);
      }

      .ant-tabs-content {
        width: 100%;
        height: calc(100% - 28px);

        .ant-tabs-tabpane {
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
