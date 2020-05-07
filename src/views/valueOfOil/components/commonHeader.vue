<template>
  <div class="common-header">
    <div class="icon-list-block" v-if="headerData && headerData.length>0">
      <div class="icon-info" v-for="(icon,index) in headerData" :key="icon.key" :style="{width: `${100 / headerData.length}%`}">
        <div v-if="index!==headerData.length-1" class="right-border"/>
        <div class="icon-detail">
          <div class="custom-icon">
            <i class="iconfont custom-iconfont" :class="icon.iconFont"/>
          </div>
          <div class="icon-label">
            <div class="label-large">
              <span>{{ icon.value }}</span>
              <span v-if="icon.isUp"><i class="iconfont icontisheng-copy iconUp"/></span>
              <span v-if="!icon.isUp"><i class="iconfont icontisheng iconDown"/></span>
            </div>
            <div class="label-small">{{ `${icon.label}(${icon.unit || '万元'})` }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonHeader',
  props: {
    headerData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
  .common-header {
    width: 100%;
    height: 100%;
    padding: 20px 0;

    .icon-list-block {
      width: 100%;
      height: 100%;
      display: flex;

      .icon-info {
        // width: 25%;
        height: 100%;
        position: relative;

        .right-border {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(0, -50%);
          height: 20px;
          width: 1px;
          background: rgba(219, 219, 220, 1);
        }

        .icon-detail {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: auto;
          height: auto;
          display: flex;

          .custom-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            opacity: 1;
            text-align: center;
            position: relative;

            .custom-iconfont {
              font-size: 40px;
              color: rgba(23, 57, 164, 1);
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }

          .icon-label {
            width: max-content;
            padding: 10px 0;

            .label-large {
              font-size: 16px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              line-height: 16px;
              color: rgba(51, 51, 51, 1);
              margin-bottom: 10px;

              .iconUp {
                padding-left: 5px;
                color: rgba(90, 200, 131, 1);
              }

              .iconDown {
                padding-left: 5px;
                color: rgba(235, 85, 98, 1)
              }
            }

            .label-small {
              font-size: 12px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              line-height: 12px;
              color: rgba(102, 102, 102, 1);
            }
          }
        }
      }
    }
  }
</style>
