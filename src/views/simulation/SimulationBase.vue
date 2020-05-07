<template>
  <div class="simulation-base">
    <div class="page-header">
      <a-select
        class="graph-select-list"
        :defaultValue="'0'"
        optionFilterProp="children"
        style="margin-left: 20px;"
        @change="handleGroupChange">
        <a-select-option v-for="menu in menuList" :key="menu.key" :value="menu.key">{{ menu.name }}</a-select-option>
      </a-select>
      <a-select
        class="graph-select-list"
        v-if="selectedGraph"
        :defaultValue="selectedGraph.gid"
        :filterOption="filterOption"
        showSearch
        :dropdownMatchSelectWidth="false"
        style="min-width: 240px;"
        @change="handleGraphChange">
        <a-select-option v-for="sub in selectedGroup.children" :key="sub.gid" :value="sub.gid">{{ sub.name }}</a-select-option>
      </a-select>
    </div>
    <div v-if="refreshGraph" class="graph-viewer-area" @mousemove="isHover = true" @mouseleave="isHover = false" @mouseout="isActive = false">
      <GraphViewer ref="graphViewer" v-if="isActived" :module-id="selectedGraph.gid"></GraphViewer>
      <div class="tools" :class="{active:isHover}">
        <a class="btn-refresh" @click="$refs.graphViewer.reload()">
          <a-button icon="reload" shape="circle" type="primary" size="small"></a-button>
        </a>
        <a class="btn-edit" target="_blank" :href="`${graphEditBase + selectedGraph.gid}`">
          <a-button icon="edit" shape="circle" type="primary" size="small"></a-button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Graphs from '@/config/graphSettings'
import GraphViewer from '@/components/graph-viewer'
import GraphDisplay from '@/components/GraphDisplay'

export default {
  name: 'SimulationBase',
  components: {
    GraphDisplay,
    GraphViewer
  },
  data () {
    return {
      menuList: [
        { key: '0', name: '炼油板块', children: [] },
        { key: '1', name: '化工板块', children: [] },
        { key: '2', name: '塑料板块', children: [] },
        { key: '3', name: '纤维板块', children: [] }
      ],
      selectedGroup: null,
      selectedGraph: null,
      refreshGraph: false,
      // graph: '',
      graphEditBase: '/huali-mxgraph/#/edit?moduleId=',
      isHover: false,
      isActived: true
    }
  },
  // computed: {
  //   routeGraph () {
  //     return this.$route.path.split('/')[2]
  //   }
  // },
  activated () {
    this.isActived = true
  },
  deactivated () {
    this.isActived = false
  },
  mounted () {
    // if (this.$route.name.startsWith('simulation')) {
    //   this.graph = this.routeGraph;
    // }
    this.getGraphListByGroup()
  },
  methods: {
    getGraphListByGroup () {
      Object.values(Graphs).forEach(t => {
        switch (t.group) {
          case '炼油板块':
            this.menuList[0].children.push(t)
            break
          case '化工板块':
            this.menuList[1].children.push(t)
            break
          case '塑料板块':
            this.menuList[2].children.push(t)
            break
          case '纤维板块':
            this.menuList[3].children.push(t)
            break
          default:
            break
        }
      })
      if (!this.selectedGroup) {
        this.selectedGroup = this.menuList[0]
      }
      if (!this.selectedGraph) {
        this.selectedGraph = this.selectedGroup.children[0]
        this.refreshGraph = true
      }
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    handleGroupChange (value) {
      if (this.selectedGroup.key !== value) {
        this.selectedGroup = this.menuList[value]
        this.refreshGraph = false
        this.selectedGraph = null
        this.$nextTick(() => {
          this.selectedGraph = this.selectedGroup.children[0]
          this.refreshGraph = true
        })
      }
    },
    handleGraphChange (value) {
      this.refreshGraph = false
      this.$nextTick(() => {
        this.selectedGraph = this.selectedGroup.children.find(t => t.gid === value)
        this.refreshGraph = true
      })
    }
  }
  // watch: {
  //   routeGraph (v) {
  //     if (this.$route.name.startsWith('simulation')) {
  //       this.graph = v;
  //     }
  //   }
  // }
}
</script>

<style scoped lang="less">
  .simulation-base {
    height: calc(100% - 20px);
    background: #fff;
    position: relative;
    overflow: hidden;

    .page-header {
      position: relative;
      width: 100%;
      height: 40px;

      .graph-select-list {
        width: auto;
        height: 30px;
        margin-top: 6px;
        margin-left: 10px;

        /deep/ .ant-select-selection {
          height: 30px;
        }
      }
    }

    .graph-viewer-area {
      width: 100%;
      height: calc(100% - 40px);
    }

    .tools {
      position: absolute;
      right: 20px;
      top: -100px;
      cursor: pointer;

      transition: top 500ms ease;

      a {
        margin-left: 3px;
      }

      &.active {
        top: 60px;
      }
    }
  }
</style>
