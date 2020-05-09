<template>
  <div class="main">
    <div class="box-main">
      <div class="box-left">
        <div class="logo">
          <div class="SPC">
            <div class="SPC_logo"></div>
            <div class="SPC_name"></div>
          </div>
          <div class="ECUST">
            <div class="ECUST_logo"></div>
            <div class="ECUST_name">
              <div class="ECUST_cname"></div>
              <div class="ECUST_ename"></div>
            </div>
          </div>
        </div>
        <div class="desc">
          炼化一体化 价值链表征及优化
        </div>
      </div>
      <div class="box-right">
        <a-form
          id="formLogin"
          class="user-layout-login"
          ref="formLogin"
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item style="margin-bottom:10px;">
            <span class="login-title">登录</span>
          </a-form-item>
          <a-form-item style="margin-bottom:10px;">
            <a-input
              size="default"
              class="login-input"
              type="text"
              placeholder="账户: admin"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
            >
              <i class="iconfont iconyonghu" slot="prefix" style="color: #A9B2E2;"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="default"
              type="password"
              class="login-input"
              autocomplete="false"
              placeholder="密码: admin"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <i class="iconfont iconmima" slot="prefix" style="color: #A9B2E2;"/>
            </a-input>
          </a-form-item>

          <a-form-item style="margin-top:24px">
            <a-button
              size="default"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
            >登录
            </a-button>
          </a-form-item>

        </a-form>
        <two-step-captcha
          v-if="requiredTwoStepCaptcha"
          :visible="stepCaptchaVisible"
          @success="stepCaptchaSuccess"
          @cancel="stepCaptchaCancel"
        ></two-step-captcha>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
  components: {
    TwoStepCaptcha
  },
  data () {
    return {
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () {
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['username', 'password']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess (res) {
      const userRole = localStorage.getItem('userrole')
      if (userRole === 'Manager') {
        this.$router.push('/bossHome')
      } else {
        this.$router.push({ path: '/' })
      }

      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      console.log(err)
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: err.data || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .main{
    .box-main{
      position: absolute;
      width: 770px;
      height: 360px;
      left: 50%;
      top: 50%;
      margin-left: -385px;
      margin-top: -180px;
      display: flex;
      align-items: center;
      .box-left{
        width:459px;
        height:360px;
        background:rgba(39, 59, 160,.9);
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 6px;
        box-shadow: -0px 0 2px #333;
        .logo{
          width: 360px;
          height: 170px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          .SPC{
            width: 150px;
            height: 170px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .SPC_logo{
              width: 100px;
              height: 100px;
              background: url("../../../public/static/image/login/SPC_logo.png");
              background-size: 100% 100%;
            }
            .SPC_name{
              width: 160px;
              height: 48px;
              background: url("../../../public/static/image/login/SPC_name.png");
              background-size: 100% 100%;
            }
          }
          .ECUST{
            width: 160px;
            height: 170px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .ECUST_logo{
              width: 100px;
              height: 100px;
              background: url("../../../public/static/image/login/ECUST_logo.png");
              background-size: 100% 100%;
            }
            .ECUST_name{
              width: 160px;
              height: 50px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .ECUST_cname{
                 width: 100px;
              height: 23px;
              background: url("../../../public/static/image/login/ECUST_cname.png");
              background-size: 100% 100%;
              }
              .ECUST_ename{
                 width: 160px;
              height: 23px;
              background: url("../../../public/static/image/login/ECUST_ename.png");
              background-size: 100% 100%;
              }
            }
          }
        }
        .desc{
          margin-top: 20px;
          font-size:28px;
          font-weight:400;
          color:rgba(255,255,255,1);
          text-shadow: 0 0 5px #333;
        }
      }
      .box-right {
        width: 278px;
        height: 280px;
        background: rgba(255, 255, 255, 1);
        opacity: 1;
        border-radius:0 6px 6px 0;
        position: relative;
        box-shadow: -0px 0 2px #333;
      }
    }
  }
  .user-layout-login {

    .ant-form-item{
      margin-left: 24px;
    }

    label {
      font-size: 14px;
    }
    .login-input{
      width: 230px;
    }

    button.login-button {
      padding: 0 15px;
      /*font-size: 16px;*/
      /*height: 40px;*/
      /*width: 100%;*/
      width: 230px;
      height: 30px;
      /*font-size: 12px;*/
      border-radius:30px;
      transition-property: background-color;
      font-size: 14px;

    }

    .login-title {
      display: inline-block;
      font-size:18px;
      font-weight:700;
      line-height:31px;
      color:rgba(51,51,51,1);
      letter-spacing:4px;
      opacity:1;
      /*padding-top: 38px;*/
      padding-top: 20px;
      visibility: hidden;
    }
  }

</style>
