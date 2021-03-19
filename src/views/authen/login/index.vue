<template>
  <div class="auth-container">
    <div class="auth-table">
      <div class="table-cell">
        <div class="auth-wrap">
          <div class="auth-title">
            <h3 class="title">账号登录</h3>
          </div>
          <div class="auth-form">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">
              <el-form-item prop="username">
                <span class="svg">
                  <i class="el-icon-user"></i>
                </span>
                <el-input
                  v-model="loginForm.username"
                  placeholder="登录邮箱账号"
                  name="username"
                  tabindex="2"
                  auto-complete="on"
                />
              </el-form-item>

              <el-form-item prop="password">
                <span class="svg">
                  <i class="el-icon-lock"></i>
                </span>
                <el-input
                  :key="passwordType"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="密码"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <Icon :type=" passwordType ? 'md-eye-off' : 'md-eye'" />
                </span>
              </el-form-item>
              <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
            </el-form>
            <div class="btn-group">
              <el-link type="primary" href="/forget">忘记密码?</el-link>
              <el-link type="primary" href="/welcome">返回首页</el-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate';

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('请输入正确的邮箱账号'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位字符'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: 'admin@qq.com',
        password: '111222'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('auth/login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: this.redirect || '/' });
          }).catch(() => {
            this.loading = false;
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.auth-container {
  height: 100%;
  width: 100%;
  background-color: #f1f1f1;
  background-image: url("~@/assets/images/body.svg");
  overflow: hidden;
  .show-pwd {
    position: absolute;
    top:0;
    right:0px;
    font-size: 16px;
    padding: 0 10px;
    color: #303133;
    cursor: pointer;
    user-select: none;
  }
  .btn-group{
    margin-top: 8px;
    text-align: right;
    a{
      margin-left: 10px;
    }
  }
}
</style>
