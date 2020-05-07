<template>
  <div class="logo-panel" :class="{padding:!collapsed}">
    <router-link :to="{path:'/valueOfOil/dashboard'}">
      <img v-show="!collapsed" src="@/../public/static/image/login/login_logo.png" alt="#" width="100%" height="100%">
      <div v-show="collapsed" class="logo">

      </div>
    </router-link>
  </div>
</template>

<script>

  export default {
    name: 'Logo',
    props:{
      collapsed:{
        type:Boolean,
        default:false
      }
    }
  }
</script>
<style lang="less" scoped>
  .padding{
    padding:10px 20px 10px 15px;
    background: #1739A4;
  }
  .logo{
    width: 36px;
    height: 36px;
    background: url("../../../public/static/image/login/login_logo.png") 3px 2px  no-repeat ;
    background-size: auto 30px;
    margin: 10px auto 0;
  }
</style>