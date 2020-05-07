<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    :width="siderWidth"
    :collapsedWidth="siderCollWidth"
    :collapsible="collapsible"
    v-model="collapsed"
    style="background: #1739A4;"
    :trigger="null">
    <logo :collapsed="collapsed"/>
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0;"></s-menu>
  </a-layout-sider>

</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      siderWidth:this.$flexible(180),
      siderCollWidth:this.$flexible(60),
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  },
  mounted() {
    window.addEventListener('resize',()=>{
      this.siderWidth = this.$flexible(180)
      this.siderCollWidth = this.$flexible(60)
    })
  }
}
</script>
