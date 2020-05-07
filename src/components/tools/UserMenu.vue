<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" src="./avatar2.png"/>
          <span>{{userName}}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'UserMenu',
    computed: {
      ...mapGetters(['nickname', 'avatar'])
    },
    data() {
      return {
        userName:''
      }
    },
    created() {
      this.userName=localStorage.getItem('userName');
    },
    methods: {
      ...mapActions(['Logout']),
      handleLogout() {
        this.$confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          onOk: () => {
            return this.Logout({}).then(() => {
                window.location.reload()
            }).catch(err => {
              this.$message.error({
                title: '错误',
                description: err.message
              })
            })
          },
          onCancel() {
          }
        })
      }
    }
  }
</script>
