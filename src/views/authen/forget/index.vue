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
            <template>
              <el-form v-show="!verified" ref="forgetForm" :model="forgetForm" :rules="forgetRules" auto-complete="on" label-position="left">
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
                  <el-button type="primary" :disabled="!canSend" @click="handleApiGetCode">{{ sendTxt }}</el-button>
                </el-form-item>

                <el-button
                  type="primary"
                  style="width:100%;"
                  @click.native.prevent="handleApiVerify"
                >确认</el-button>
              </el-form>
            </template>
            <!-- 重置 -->
            <template>
              <el-form v-show="verified" ref="resetForm" :model="resetForm" :rules="resetRules" auto-complete="on" label-position="left">
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
import { calcuMd5 } from '@/utils/libs';

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
      if (!value) {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码至少6位字符'));
      } else {
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (value.length < 6) {
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
        username: 'admin@qq.com',
        verifyCode: ''
      },
      resetForm: {
        password: '',
        confirmPassword: '',
        md5Code: ''
      },
      forgetRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        verifyCode: [{ required: true, trigger: 'blur', validator: validateVerifyCode }]
      },
      resetRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }]
      },
      verified: false,
      passwordType: 'password',
      canSend: true,
      sendTxt: '获取验证码',
      codeIimer: null
    };
  },
  destroyed() {
    this.handleClearTimer();
  },
  methods: {
    // 倒计时
    handleCountdown() {
      this.canSend = false;
      let timer = 120;
      this.codeIimer = setInterval(() => {
        timer = timer - 1;
        if (timer <= 0) {
          this.handleClearTimer();
        } else {
          this.sendTxt = `重新发送( ${timer}秒 )`;
        }
      }, 1000);
    },
    // 清楚倒计时
    handleClearTimer() {
      clearTimeout(this.codeIimer);
      this.codeIimer = null;
      this.canSend = true;
      this.sendTxt = '获取验证码';
    },
    // 获取验证码
    handleApiGetCode() {
      if (!this.canSend) {
        return false;
      }
      if (!this.forgetForm.username) {
        return this.$message.error('请输入邮箱账号');
      }

      const opt = {
        toEmail: this.forgetForm.username
      };

      this.$store.dispatch('auth/getForgetCode', opt).then((res) => {
        console.log(res);
        const { code } = res;
        if (code === 1) {
          this.handleCountdown();
          this.$message.success('验证码发送成功');
        }
      }).catch((err) => {
        this.$message.error(err);
      });
    },
    // 校验验证码
    handleApiVerify() {
      this.$refs.forgetForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('auth/verifyForgetCode', this.forgetForm).then((res) => {
            const { code, data } = res;
            if (code === 1) {
              this.verified = true;
              this.resetForm.md5Code = data;
              this.handleClearTimer();
            }
          }).catch((err) => {
            this.$message.error(err);
          });
        } else {
          return false;
        }
      });
    },
    // 确定重置密码
    handleApiReset() {
      if (!this.resetForm.md5Code) {
        return this.$message.error('缺少校验码');
      }

      const opt = {
        password: calcuMd5(this.resetForm.password),
        confirmPassword: calcuMd5(this.resetForm.confirmPassword),
        md5Code: this.resetForm.md5Code
      };

      this.$refs.resetForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('auth/outResetPassword', opt).then((res) => {
            const { code } = res;
            if (code === 1) {
              this.$message({
                message: '密码重置成功',
                type: 'success',
                duration: 1000
              });
              setTimeout(() => {
                this.$router.push({ path: '/' });
              }, 1500);
            }
          }).catch((err) => {
            this.$message.error(err);
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
  .el-none{
    width: 55%;
    margin-right: 5%;
  }
  .el-flex{
    .el-button{
      width: 40%;
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
