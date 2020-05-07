<template>
  <div class="common-loading">

    <slot class="loading-inner"></slot>

    <div class="loading-ani" v-show="loading">
      <div class="mask" :style="{'background-color':options.maskColor}"></div>

      <div class="sk-cube-grid" :style="sizeStyle" v-if="type ==='cube-grid'">
        <div class="sk-cube sk-cube1" :style="{'background-color':options.color}"></div>
        <div class="sk-cube sk-cube2" :style="{'background-color':options.color}"></div>
        <div class="sk-cube sk-cube3" :style="{'background-color':options.color}"></div>
        <div class="sk-cube sk-cube4" :style="{'background-color':options.color}"></div>
        <div class="sk-cube sk-cube5" :style="{'background-color':options.color}"></div>
        <div class="sk-cube sk-cube6" :style="{'background-color':options.color}"></div>
        <div class="sk-cube sk-cube7" :style="{'background-color':options.color}"></div>
        <div class="sk-cube sk-cube8" :style="{'background-color':options.color}"></div>
        <div class="sk-cube sk-cube9" :style="{'background-color':options.color}"></div>
      </div>

      <div class="sk-circle" :style="sizeStyle" v-else-if="type ==='circle'">
        <div class="sk-circle1 sk-child">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-circle2 sk-child">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-circle3 sk-child">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-circle4 sk-child">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-circle5 sk-child">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-circle6 sk-child">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-circle7 sk-child">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-circle8 sk-child">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-circle9 sk-child">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-circle10 sk-child">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-circle11 sk-child">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-circle12 sk-child">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
      </div>

      <div class="spinner" :style="[sizeStyle,{height:'auto'}]" v-else-if="type ==='spinner'">
        <div class="bounce1"
             :style="{width:`${size.width/4}px`,height:`${size.width/4}px`, 'background-color':options.color}"></div>
        <div class="bounce2"
             :style="{width:`${size.width/4}px`,height:`${size.width/4}px`, 'background-color':options.color}"></div>
        <div class="bounce3"
             :style="{width:`${size.width/4}px`,height:`${size.width/4}px`, 'background-color':options.color}"></div>
      </div>

      <div class="spinner-debounce" :style="[sizeStyle]" v-else-if="type ==='debounce'">
        <div class="double-bounce1" :style="{'background-color':options.color}"></div>
        <div class="double-bounce2" :style="{'background-color':options.color}"></div>
      </div>

      <div class="spinner-rotate" :style="[sizeStyle]" v-else-if="type ==='spinner-rotate'">
        <div class="dot1" :style="{'background-color':options.color}"></div>
        <div class="dot2" :style="{'background-color':options.color}"></div>
      </div>

      <div class="spinner-scaleout" :style="[sizeStyle,{ 'background-color':options.color}]"
           v-else-if="type ==='spinner-scaleout'"></div>

      <div class="spinner-stretch" :style="[sizeStyle]" v-else-if="type ==='spinner-stretch'">
        <div class="rect1" :style="{'background-color':options.color}"></div>
        <div class="rect2" :style="{'background-color':options.color}"></div>
        <div class="rect3" :style="{'background-color':options.color}"></div>
        <div class="rect4" :style="{'background-color':options.color}"></div>
        <div class="rect5" :style="{'background-color':options.color}"></div>
      </div>

      <div class="spinner-flip" :style="[sizeStyle,{ 'background-color':options.color}]"
           v-else-if="type ==='flip'"></div>

      <div class="sk-folding-cube" :style="[sizeStyle]" v-else-if="type ==='folding-cube'">
        <div class="sk-cube1 sk-cube">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-cube2 sk-cube">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-cube4 sk-cube">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
        <div class="sk-cube3 sk-cube">
          <div class="before" :style="{'background-color':options.color}"></div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>


  export default {
    name: "common-loading",
    props: {
      type: {
        type: String,
        default() {
          return 'cube-grid'
        }
      },
      size: {
        type: Object,
        default() {
          return {
            // width: 50,
            // height: 50
          }
        }
      },
      options: {
        type: Object,
        default() {
          return {
            color: '#fff'
          }
        }
      },
      loading:{
        type: Boolean,
        default() {
          return true
        }
      }
    },
    computed: {
      sizeStyle() {
        return {width: `${this.size.width}px`, height: `${this.size.height}px`}
      }
    }
  }
</script>

<style lang="less" scoped>

  .common-loading {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;

    .loading-inner {
      position: relative;
      z-index: 10;
    }

    .loading-ani {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 30;
      > * {
        position: relative;
        z-index: 10;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .mask {
      position: absolute;
      z-index: 1;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, .2);
      transform: none;
    }
  }

  .sk-cube-grid {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    /*margin: 100px auto;*/

    .sk-cube {
      width: 33%;
      height: 33%;
      background-color: #fff;
      float: left;
      -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
      animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    }

    .sk-cube1 {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }
    .sk-cube2 {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
    }
    .sk-cube3 {
      -webkit-animation-delay: 0.4s;
      animation-delay: 0.4s;
    }
    .sk-cube4 {
      -webkit-animation-delay: 0.1s;
      animation-delay: 0.1s;
    }
    .sk-cube5 {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }
    .sk-cube6 {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
    }
    .sk-cube7 {
      -webkit-animation-delay: 0s;
      animation-delay: 0s;
    }
    .sk-cube8 {
      -webkit-animation-delay: 0.1s;
      animation-delay: 0.1s;
    }
    .sk-cube9 {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }

    @-webkit-keyframes sk-cubeGridScaleDelay {
      0%, 70%, 100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
      }
      35% {
        -webkit-transform: scale3D(0, 0, 1);
        transform: scale3D(0, 0, 1);
      }
    }

    @keyframes sk-cubeGridScaleDelay {
      0%, 70%, 100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
      }
      35% {
        -webkit-transform: scale3D(0, 0, 1);
        transform: scale3D(0, 0, 1);
      }
    }

  }

  .sk-circle {
    margin: 0px auto;
    width: 40px;
    height: 40px;
    position: relative;

    .sk-child {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }

    .sk-child .before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      background-color: #fff;
      border-radius: 100%;
      -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
      animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    }
    .sk-circle3 {
      -webkit-transform: rotate(60deg);
      -ms-transform: rotate(60deg);
      transform: rotate(60deg);
    }

    .sk-circle2 {
      -webkit-transform: rotate(30deg);
      -ms-transform: rotate(30deg);
      transform: rotate(30deg);
    }

    .sk-circle4 {
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
    }

    .sk-circle5 {
      -webkit-transform: rotate(120deg);
      -ms-transform: rotate(120deg);
      transform: rotate(120deg);
    }

    .sk-circle6 {
      -webkit-transform: rotate(150deg);
      -ms-transform: rotate(150deg);
      transform: rotate(150deg);
    }

    .sk-circle7 {
      -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }

    .sk-circle8 {
      -webkit-transform: rotate(210deg);
      -ms-transform: rotate(210deg);
      transform: rotate(210deg);
    }

    .sk-circle9 {
      -webkit-transform: rotate(240deg);
      -ms-transform: rotate(240deg);
      transform: rotate(240deg);
    }

    .sk-circle10 {
      -webkit-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      transform: rotate(270deg);
    }

    .sk-circle11 {
      -webkit-transform: rotate(300deg);
      -ms-transform: rotate(300deg);
      transform: rotate(300deg);
    }

    .sk-circle12 {
      -webkit-transform: rotate(330deg);
      -ms-transform: rotate(330deg);
      transform: rotate(330deg);
    }

    .sk-circle2:before {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
    .sk-circle3:before {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }
    .sk-circle4 .before {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    .sk-circle5 .before {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
    .sk-circle6 .before {
      -webkit-animation-delay: -0.7s;
      animation-delay: -0.7s;
    }
    .sk-circle7 .before {
      -webkit-animation-delay: -0.6s;
      animation-delay: -0.6s;
    }
    .sk-circle8 .before {
      -webkit-animation-delay: -0.5s;
      animation-delay: -0.5s;
    }
    .sk-circle9 .before {
      -webkit-animation-delay: -0.4s;
      animation-delay: -0.4s;
    }
    .sk-circle10 .before {
      -webkit-animation-delay: -0.3s;
      animation-delay: -0.3s;
    }
    .sk-circle11 .before {
      -webkit-animation-delay: -0.2s;
      animation-delay: -0.2s;
    }
    .sk-circle12 .before {
      -webkit-animation-delay: -0.1s;
      animation-delay: -0.1s;
    }

    @-webkit-keyframes sk-circleBounceDelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }

    @keyframes sk-circleBounceDelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
  }

  .spinner {
    margin: 0 auto;
    width: 70px;
    text-align: center;
    > div {
      width: 18px;
      height: 18px;
      background-color: #fff;

      border-radius: 100%;
      display: inline-block;
      -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }
    .bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
    .bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0)
      }
      40% {
        -webkit-transform: scale(1.0)
      }
    }

    @keyframes sk-bouncedelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
      }
    }
  }

  .spinner-rotate {
    margin: 0 auto;
    width: 40px;
    height: 40px;
    position: relative;
    text-align: center;

    -webkit-animation: sk-rotate 2.0s infinite linear;
    animation: sk-rotate 2.0s infinite linear;

    .dot1, .dot2 {
      width: 60%;
      height: 60%;
      display: inline-block;
      position: absolute;
      top: 0;
      background-color: #333;
      border-radius: 100%;

      -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
      animation: sk-bounce 2.0s infinite ease-in-out;
    }

    .dot2 {
      top: auto;
      bottom: 0;
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }

    @-webkit-keyframes sk-rotate {
      100% {
        -webkit-transform: rotate(360deg)
      }
    }
    @keyframes sk-rotate {
      100% {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg)
      }
    }

    @-webkit-keyframes sk-bounce {
      0%, 100% {
        -webkit-transform: scale(0.0)
      }
      50% {
        -webkit-transform: scale(1.0)
      }
    }

    @keyframes sk-bounce {
      0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      }
      50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
    }
  }

  .spinner-scaleout {
    width: 40px;
    height: 40px;
    margin: 0px auto;
    background-color: #333;

    border-radius: 100%;
    -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
    animation: sk-scaleout 1.0s infinite ease-in-out;

    @-webkit-keyframes sk-scaleout {
      0% {
        -webkit-transform: scale(0)
      }
      100% {
        -webkit-transform: scale(1.0);
        opacity: 0;
      }
    }

    @keyframes sk-scaleout {
      0% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      100% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
        opacity: 0;
      }
    }
  }

  .spinner-stretch {
    margin: 0px auto;
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;
    > div {
      background-color: #333;
      height: 100%;
      width: 6px;
      display: inline-block;

      -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
      animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }
    .rect2 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
    .rect3 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }
    .rect4 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    .rect5 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }

    @-webkit-keyframes sk-stretchdelay {
      0%, 40%, 100% {
        -webkit-transform: scaleY(0.4)
      }
      20% {
        -webkit-transform: scaleY(1.0)
      }
    }

    @keyframes sk-stretchdelay {
      0%, 40%, 100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
      }
      20% {
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
      }
    }
  }

  .spinner-debounce {
    width: 40px;
    height: 40px;
    position: relative;
    margin: 0px auto;

    .double-bounce1, .double-bounce2 {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #333;
      opacity: 0.6;
      position: absolute;
      top: 0;
      left: 0;

      -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
      animation: sk-bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }

    @-webkit-keyframes sk-bounce {
      0%, 100% {
        -webkit-transform: scale(0.0)
      }
      50% {
        -webkit-transform: scale(1.0)
      }
    }

    @keyframes sk-bounce {
      0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      }
      50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
    }
  }

  .spinner-flip {
    width: 40px;
    height: 40px;
    background-color: #333;

    margin: 0px auto;
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
    animation: sk-rotateplane 1.2s infinite ease-in-out;

    @-webkit-keyframes sk-rotateplane {
      0% {
        -webkit-transform: perspective(120px)
      }
      50% {
        -webkit-transform: perspective(120px) rotateY(180deg)
      }
      100% {
        -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg)
      }
    }

    @keyframes sk-rotateplane {
      0% {
        transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
      }
      50% {
        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
      }
      100% {
        transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      }
    }
  }

  .sk-folding-cube {
    margin: 0px auto;
    width: 40px;
    height: 40px;
    position: relative;
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);

    .sk-cube {
      float: left;
      width: 50%;
      height: 50%;
      position: relative;
      -webkit-transform: scale(1.1);
      -ms-transform: scale(1.1);
      transform: scale(1.1);
    }
    .sk-cube .before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
      -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
      animation: sk-foldCubeAngle 2.4s infinite linear both;
      -webkit-transform-origin: 100% 100%;
      -ms-transform-origin: 100% 100%;
      transform-origin: 100% 100%;
    }
    .sk-cube2 {
      -webkit-transform: scale(1.1) rotateZ(90deg);
      transform: scale(1.1) rotateZ(90deg);
    }
    .sk-cube3 {
      -webkit-transform: scale(1.1) rotateZ(180deg);
      transform: scale(1.1) rotateZ(180deg);
    }
    .sk-cube4 {
      -webkit-transform: scale(1.1) rotateZ(270deg);
      transform: scale(1.1) rotateZ(270deg);
    }
    .sk-cube2 .before {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
    }
    .sk-cube3 .before {
      -webkit-animation-delay: 0.6s;
      animation-delay: 0.6s;
    }
    .sk-cube4 .before {
      -webkit-animation-delay: 0.9s;
      animation-delay: 0.9s;
    }

    @-webkit-keyframes sk-foldCubeAngle {
      0%, 10% {
        -webkit-transform: perspective(140px) rotateX(-180deg);
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0;
      }
      25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
      }
      90%, 100% {
        -webkit-transform: perspective(140px) rotateY(180deg);
        transform: perspective(140px) rotateY(180deg);
        opacity: 0;
      }
    }

    @keyframes sk-foldCubeAngle {
      0%, 10% {
        -webkit-transform: perspective(140px) rotateX(-180deg);
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0;
      }
      25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
      }
      90%, 100% {
        -webkit-transform: perspective(140px) rotateY(180deg);
        transform: perspective(140px) rotateY(180deg);
        opacity: 0;
      }
    }
  }


</style>
