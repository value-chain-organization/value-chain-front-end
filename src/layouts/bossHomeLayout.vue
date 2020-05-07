<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-layout :class="[layoutMode, `content-width-${contentWidth}`]" :style="{ minHeight: '100vh',marginLeft:contentPaddingLeft }">
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <a-layout-content :style="{ height: '100%', paddingTop: fixedHeader ? '64px' : '0' }">
        <div class="label">
          <div
            class="title"
            :class="{active:$route.path==='/bossHome/valueOfOil/dashboard'}"
            @click="$router.push('/bossHome/valueOfOil/dashboard')">板块价值表征</div>
          <div
            class="title"
            :class="{active:$route.path==='/bossHome/valueOfOil/refining'}"
            @click="$router.push('/bossHome/valueOfOil/refining')">炼油板块价值表征</div>
          <div
            class="title"
            :class="{active:$route.path==='/bossHome/valueOfOil/chemical'}"
            @click="$router.push('/bossHome/valueOfOil/chemical')">化工板块价值表征</div>
          <div
            class="title"
            :class="{active:$route.path==='/bossHome/valueOfOil/plastic'}"
            @click="$router.push('/bossHome/valueOfOil/plastic')">塑料板块价值表征</div>
          <div
            class="title"
            :class="{active:$route.path==='/bossHome/valueOfOil/fiber'}"
            @click="$router.push('/bossHome/valueOfOil/fiber')">纤维板块价值表征</div>
        </div>
        <transition name="page-transition">
          <route-view style="overflow: hidden" />
        </transition>1
      </a-layout-content>

    </a-layout>
  </a-layout>

</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'

import RouteView from './RouteView'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import { asyncRouterMap } from '@/config/router.config.js'
export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    SideMenu,
    GlobalHeader,
    GlobalFooter
  },
  data () {
    return {
      production: config.production,
      collapsed: false,
      userRole: localStorage.getItem('userrole'),
      menus: []
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    contentPaddingLeft () {
      if (!this.fixSidebar || this.isMobile() || this.userRole === 'Manager') {
        return '0'
      }
      if (this.sidebarOpened) {
        // return '270px'
        return this.$flexible(180) + 'px'
      }
      // return '80px'
      return this.$flexible(60) + 'px'
    }
  },
  watch: {
    sidebarOpened (val) {
      this.collapsed = !val
    },
    $route (to, from) {
      if (to.path.indexOf('valueOfOil') > -1) {
        if (this.collapsed === false) {
          this.toggle()
        }
      }
    }
  },
  created () {
    this.menus = asyncRouterMap.find((item) => item.path === '/').children
    this.menus = this.menus.map(menu => {
      if (menu.path !== '/valueOfOil' && this.userRole === 'Manager') {
        menu.hidden = true
      }
      return menu
    })
    this.collapsed = !this.sidebarOpened
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggle () {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    paddingCalc () {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '256px' : '80px'
      } else {
        left = (this.isMobile() && '0') || ((this.fixSidebar && '80px') || '0')
      }
      return left
    },
    changeTab () {
    },
    drawerClose () {
      this.collapsed = false
    }
  }
}
</script>

<style lang="less" scoped>
  .label{
    display: flex;
    font-size: 12px;
    .title{
      margin-left: 10px;
      padding:2px 5px;
      border-radius: 5px 5px 0 0;
      background: #ebeff5;
      color: #666666;
      &:hover{
        cursor: pointer;
      }
    }
    .active{
      color: #1739A4;
      background: #ffffff;
    }
  }
</style>
