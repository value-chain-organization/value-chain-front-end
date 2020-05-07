<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <route-view></route-view>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {}
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background:#18214c url("../../public/login-bg.png") no-repeat;
      background-size: 100%  100%;
      /*padding: 110px 0 144px;*/
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        text-decoration: none;
      }

      .main {
        min-width: 260px;
        margin: 0 auto;
      }
    }
  }
</style>
