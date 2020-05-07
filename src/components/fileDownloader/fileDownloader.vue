<template>
  <div style="display: inline-block;">
    <a-button :type="buttonType" :size="size" shape="round" icon="download" @click="getFileList">{{buttonText}}</a-button>
    <a-modal title="选择要下载的文件" v-model="showModel" :footer="null">
      <a-button type="link" v-for="file in fileList" :key="file" @click="downLoadFile(file)">{{file}}</a-button>
    </a-modal>
  </div>
</template>

<script>
  import { axios } from '@/utils/request'

  export default {
    name: 'fileDownloader',
    data() {
      return {
        showModel: false,
        fileList: []
      }
    },
    props: {
      size: { type: String, default: 'default' },
      buttonType: { type: String, default: 'primary' },
      buttonText: { type: String, default: '下载' },
      getFileUrl: { type: String, required: true },
      downLoadUrl: { type: String, required: true }
    },
    methods: {
      getFileList() {
        axios({
          url: this.getFileUrl,
          method: 'post'
        }).then(res => {
          this.fileList = res.data
          console.log(res)
          this.showModel = true
        })
      },
      downLoadFile(fileName) {
        window.location.href = '/huali-api' + this.downLoadUrl + '?fileName=' + fileName
      }
    }
  }
</script>

<style scoped lang="less">
</style>