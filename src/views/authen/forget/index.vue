<template>
  <div class="auth-container">
    <div class="auth-table">
      <div class="table-cell">
        <div class="auth-wrap">
          <div class="auth-title">
            <h3 class="title">重置密码</h3>
          </div>
          <div class="auth-form">
            <!-- 获取验证码 -->
            <template v-if="!verified">
              <el-form ref="forgetForm" :model="forgetForm" :rules="forgetRules" auto-complete="on" label-position="left">
                <el-form-item prop="username">
                  <span class="svg">
                    <i class="el-icon-user"></i>
                  </span>
                  <el-input
                    v-model="forgetForm.username"
                    placeholder="登录邮箱账号"
                    name="username"
                    tabindex="2"
                    auto-complete="on"
                  />
                </el-form-item>

                <el-form-item prop="verifyCode" class="el-flex">
                  <span class="svg">
                    <i class="el-icon-circle-check"></i>
                  </span>
                  <el-input
                    v-model="forgetForm.verifyCode"
                    class="el-none"
                    placeholder="请输入验证码"
                  ></el-input>
                  <el-button type="primary">获取验证码</el-button>
                </el-form-item>

                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:100%;"
                  @click.native.prevent="handleApiVerify"
                >确认</el-button>
              </el-form>
            </template>
            <!-- 重置 -->
            <template v-else>
              <el-form ref="resetForm" :model="resetForm" :rules="resetRules" auto-complete="on" label-position="left">
                <el-form-item prop="password">
                  <span class="svg">
                    <i class="el-icon-lock"></i>
                  </span>
                  <el-input
                    :key="passwordType"
                    v-model="resetForm.password"
                    :type="passwordType"
                    placeholder="请输入新密码"
                    name="password"
                    tabindex="2"
                    auto-complete="on"
                  />
                </el-form-item>
                <el-form-item prop="confirmPassword">
                  <span class="svg">
                    <i class="el-icon-lock"></i>
                  </span>
                  <el-input
                    :key="passwordType"
                    v-model="resetForm.confirmPassword"
                    :type="passwordType"
                    placeholder="确认新密码"
                    name="password"
                    tabindex="2"
                    auto-complete="on"
                  />
                </el-form-item>

                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:100%;"
                  @click.native.prevent="handleApiReset"
                >确认</el-button>
              </el-form>
            </template>
            <div class="btn-group">
              <el-link type="primary" href="/login">登录系统</el-link>
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
  name: 'Forget',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('请输入正确的邮箱账号'));
      } else {
        callback();
      }
    };
    const validateVerifyCode = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入6位数字验证码'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('密码至少6位字符'));
      } else {
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('密码至少6位字符'));
      } else {
        if (value !== this.resetForm.password) {
          callback(new Error('两次输入的密码不一致'));
        }
        callback();
      }
    };
    return {
      forgetForm: {
        username: '',
        verifyCode: ''
      },
      resetForm: {
        password: '',
        confirmPassword: ''
      },
      forgetRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        verifyCode: [{ required: true, trigger: 'blur', validator: validateVerifyCode }]
      },
      resetRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }]
      },
      loading: false,
      verified: false,
      passwordType: 'password'
    };
  },
  methods: {
    handleApiReset() {
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          console.log(valid);
          // this.loading = true;
          // this.$store.dispatch('auth/login', this.forgetForm).then(() => {
          //   this.loading = false;
          // }).catch(() => {
          //   this.loading = false;
          // });
        } else {
          return false;
        }
      });
    },
    handleApiVerify() {
      this.$refs.forgetForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('auth/login', this.forgetForm).then(() => {
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
@import '~@/styles/auth.scss';
</style>

<style lang="scss">
.auth-container {
  .el-none{
    width: 60%;
    margin-right: 5%;
  }
  .el-flex{
    .el-button{
      width: 35%;
    }
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
