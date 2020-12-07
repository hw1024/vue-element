<template>
  <div class='login-container'>
    <div class='login-header'>
      <img class='logo' src='../assets/images/logo.png' alt='logo'>
      <div class='message'>
        <span class='version'>版本：1.0.0.P</span>
      </div>
    </div>
    <el-form ref='loginForm' class='login-form' :model='loginForm' :rules='loginRules'>
      <h3 class='title'>XXX后台管理系统</h3>
      <el-form-item prop='username'>
        <el-input v-model='loginForm.username' type='text' placeholder='用户名'></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input v-model='loginForm.password' type='password' autocomplete='new-password' placeholder='密码'
                  @keyup.enter.native='handleLogin'></el-input>
      </el-form-item>
      <el-form-item prop='code'>
        <el-input v-model='loginForm.code' auto-complete='off' placeholder='验证码' style='width: 63%'
                  @keyup.enter.native='handleLogin'></el-input>
        <div class='login-code'>
          <img :src='codeUrl' alt="codeUrl" @click='getCode' class='login-code-img'/>
        </div>
      </el-form-item>
      <el-checkbox v-model='loginForm.rememberMe' class='login-pact'>我已同意《XXX用户管理平台服务协议》</el-checkbox>
      <el-form-item>
        <el-button class='login-btn' :disabled='disabled' :loading='loading' size='medium' type='primary'
                   @click.native.prevent='handleLogin'>
          <span v-if='!loading'>登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <div class='login-footer'>
      <p class='alg-c'>沪ICP备14034737号-3</p>
    </div>
  </div>
</template>

<script>
  import {apiGetCodeImg} from '@/api/login';
  import {encrypt} from '@/utils/jsencrypt'

  export default {
    name: 'Login',
    data() {
      return {
        codeUrl: '',
        loading: false,
        cookiePassword: '',
        loginForm: {
          username: 'admin',
          password: '123456',
          code: '123456',
          uuid: '',
          rememberMe: false
        },
        loginRules: {
          username: [
            {required: true, trigger: 'blur', message: '用户名不能为空'}
          ],
          password: [
            {required: true, trigger: 'blur', message: '密码不能为空'}
          ],
          code: [
            {required: true, trigger: 'blur', message: '验证码不能为空'}
          ]
        },

        redirect: undefined
      };
    },
    computed: {
      disabled() {
        return !(this.loginForm.username !== '' && this.loginForm.password !== '' && this.loginForm.code !== '' && this.loginForm.rememberMe)
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true
      }
    },
    created() {
      this.getCode();
    },
    methods: {
      getCode() {
        apiGetCodeImg().then(res => {
          this.codeUrl = 'data:images/gif;base64,' + res.img;
          this.loginForm.uuid = res.uuid;
        });
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            let params = {
              username:  this.loginForm.username.trim(),
              password: encrypt(this.loginForm.password),
              code: this.loginForm.code,
              uuid:this.loginForm.uuid,
            };
            this.$store.dispatch('Login', params).then(() => {
              this.$router.push({path: this.redirect || '/'});
            }).catch(() => {
              this.loading = false;
              this.getCode();
            });
          }
        });
      }
    }
  };
</script>

<style rel='stylesheet/scss' lang='scss'>
  .login-container {
    display: flex;
    align-items: center;
    height: 100%;
    color: #ffffff;
    background: #000000;
    /*background-image: url('../assets/images/login-background.jpg');*/
    /*background-size: cover;*/

    .login-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      line-height: 50px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99;
      background: transparent;
      padding: 0 20px;

      .logo {
        width: 155px;
        height: 28px;
        margin-top: 11px;
      }
    }

    .login-form {
      margin-left: auto;
      margin-right: 120px;
      background: transparent;
      width: 400px;
      border: 1px solid #86bc26;
      padding: 25px 25px 5px 25px;

      .title {
        margin: 0 auto 30px auto;
        text-align: center;
      }

      .login-pact {
        margin: 0 0 10px 0;
      }

      .login-btn {
        width: 100%;
      }

      .el-input {
        height: 40px;

        input {
          height: 40px;
        }
      }
    }

    .login-footer {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 99;
      background: transparent;
      padding: 0 20px;
    }

    .login-code {
      width: 33%;
      height: 38px;
      float: right;

      .login-code-img {
        cursor: pointer;
        vertical-align: middle;
        height: 38px;
      }
    }
  }

</style>
