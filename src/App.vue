<template>
  <a-locale-provider :locale="locale">
    <div id="app">
        <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import { AppDeviceEnquire } from '@/utils/mixin'

  export default {
    mixins: [AppDeviceEnquire],
    data () {
      return {
        locale: zhCN
      }
    },
    mounted () {
      function resetFlexible(){
        window.lib.flexible.setCustomRate(1366 / Math.max(1024, window.innerWidth))
      }
      window.addEventListener('resize',()=>{
        this.$eventHub.$emit('sl-main-size-change')
        resetFlexible()
      })
      resetFlexible()
    }
  }
</script>
<style>
  @import url('./style/icon/iconfont.css') ;
  @import url('./font/font.css');
  *{
    font-family:Source Han Sans CN,serif;
  }
  #app {
    height: 100%;
  }
</style>
