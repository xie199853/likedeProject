<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" auto-complete="on" label-position="left" :rules="rules" :model="loginForm">
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/logo.png" alt="">
        </h3>
      </div>
      <el-form-item prop="mobile">
        <span class="svg-container el-icon-mobile-phone" />
        <el-input v-model="loginForm.mobile" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container el-icon-lock" />
        <el-input ref="pwd" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码" />
        <span class="svg-container" @click="showpwd">
          <svg-icon :icon-class="passwordType == 'password'?'eye':'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <span class="svg-container el-icon-mobile-phone" />
        <el-input placeholder="请输入验证码" />
      </el-form-item>
      <el-button class="loginBtn" :loading="loading" @click="login">登录</el-button>

    </el-form>
  </div>
  <!-- 环境变量的作用
  1. 正常公司中 有几个环境 4 开发 dev 测试 test 预发 uat 线上 pro
  2. 在项目里如何配置这几个环境  通过 .env 配置 base api
  开发环境的接口前缀 /api
  线上环境的接口前缀 /prod-api
   -->
</template>
<script>
import { validPhone } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const phoneValid = (rules, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('格式错误'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginName: 'admin',
        mobile: '13800000002',
        password: '123456',
        code: '',
        clientToken: this.$store.state.token,
        loginType: 0,
        account: '13800000002'
      },
      rules: {
        mobile: [
          { required: true, message: '输入手机号码', trigger: 'blur' },
          { validator: phoneValid, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '输入密码', trigger: 'blur' },
          {	min: 6, max: 16, message: '密码格式错误 ', trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false
    }
  },
  methods: {
    showpwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    async login() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/loginAction', this.loginForm)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#999;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #ccc;
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
  }
  .el-form-item__error {
    color: #f56c6c
  }
  .el-form-item__content{
    font-size: 17px;
    padding-right:5px;
  }
  .loginBtn {
    background: #6377ec;
    height: 52px;
    line-height: 26px;
    font-size: 14px;
    width: 100%;
    border: none;
    color: #fff;
    margin-top: 7px;
  }

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#68b0fe;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 518px;
    max-width: 100%;
    height: 388px;
    padding: 25px 35px 0;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 3%;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      img {
        position: absolute;
    width: 96px;
    height: 96px;
    top: -117px;
    left: 50%;
    margin-left: -48px;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
