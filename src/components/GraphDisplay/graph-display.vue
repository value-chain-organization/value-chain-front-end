<template>
  <div class="graph-display" ref="container" :style="{
  backgroundColor:bgColor
  }">
    <div class="inner" :style="{
      width:`${width}px`,
      height:`${height}px`,
      left:`${offsetX}px`,
      top:`${offsetY}px`,
      backgroundImage:`url('${bgImage}')`,
      transform:`scale(${scale})`
      }">
      <span class="item"
            :class="`item-${item.align}`"
            v-for="item in items"
            :style="{
        left:`${item.x}px`,
        top:`${item.y}px`
      }" :key="item.tag">{{item.value||'---'}}</span>

    </div>
  </div>
</template>

<script>
  import Graphs from '@/config/graphSettings'
  import {getGraphData} from '@/api/simulation'

  export default {
    name: "graph-display",
    props: {
      graph: String
    },
    data() {
      return {
        bgImage: '',
        bgColor: '',
        width: '',
        height: '',
        gid: '',
        offsetX: 0,
        offsetY: 0,
        scale: 1,
        items: []
      }
    },
    watch: {
      graph(v) {
        let g = Graphs[v];
        this.updateGraph(g)
      }
    },
    methods: {
      clearGraph() {
        this.bgImage = '';
        this.bgColor = '';
        this.padding = 0;
        this.width = 0;
        this.height = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 1;
        this.items = [];
      },

      async queryData(gid) {
        try {
          const res = await getGraphData({
            id: gid
          });

          if (this.gid === gid) {
            return {
              gid: gid,
              data: res.data
            }
          } else {
            return null
          }

        } catch (e) {
          return null
        }

      },
      parseData(data) {
        if (data) {
          if (data.gid === this.gid) {
            this.items = this.items.map(d => {
              let find = data.data.filter(t => t.tagNum === d.tag);
              find = find && find [0];
              d.value = find ? find.tagVal : undefined;
              return d;
            })
          }
        }

      },
      async startRefreshData() {
        clearTimeout(this.refreshTimer)
        let data = await this.queryData(this.gid);
        this.parseData(data);
        this.refreshTimer = setTimeout(() => {
          this.startRefreshData(this.gid)
        }, 20 * 1000)
      },
      stopRefreshData() {
        clearTimeout(this.refreshTimer)
        this.refreshTimer = null
      },
      updateScale() {
        let w = this.$refs.container.clientWidth - (this.padding || 0) * 2;
        let h = this.$refs.container.clientHeight - (this.padding || 0) * 2;
        this.scale = Math.min(w / this.width, h / this.height);
        this.offsetX = (w - this.width * this.scale) / 2 + this.padding;
        this.offsetY = (h - this.height * this.scale) / 2 + this.padding;
      },
      updateGraph(g = {}) {
        this.stopRefreshData();
        this.loading = true;
        let img = new Image();
        img.onload = async () => {
          this.bgImage = g.bgImage;
          this.bgColor = g.bgColor;
          this.padding = g.padding;
          this.width = g.width || img.width;
          this.height = g.height || img.height;
          this.updateScale();
          this.gid = g.gid;
          this.items = Object.keys(g.items || {}).map((d) => ({
            ...g.items[d],
            tag: d
          }));

          if (this.gid != null) {
            await this.startRefreshData()
          }
          this.loading = false;
        };
        img.onerror = () => {
          this.clearGraph();
          this.loading = false;
        };
        img.src = g.bgImage;
      }
    },

    mounted() {
      let g = Graphs[this.graph];
      this.updateGraph(g);
      window.addEventListener('resize',this.updateScale)
    },
    beforeDestroy() {
      window.removeEventListener('resize',this.updateScale)
    }
  }
</script>

<style scoped lang="less">
  .graph-display {
    position: relative;
    height: 100%;

    .inner {
      position: absolute;
      background-repeat: no-repeat;
      background-position: left top;
      transform-origin: left top;


    }

    .item {
      position: absolute;
      white-space: nowrap;
      color: orange;
      font-size: 9px;
      transform: translateX(-50%) translateY(-50%);

      &.item-center {
        transform: translateX(-50%) translateY(-50%);
      }

      &.item-left {
        transform: translateX(0%) translateY(-50%);
      }

      &.item-right {
        transform: translateX(100%) translateY(-50%);
      }
    }
  }
</style>