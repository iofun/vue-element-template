<template>
  <div class="container">
    <el-card shadow="false">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="8">
          <div class="avatar">
            <div class="avatar-wrapper">
              <img v-if="avatar" :src="avatar" class="user-avatar">
              <img v-else src="~@/assets/images/user.png" class="user-avatar">
            </div>
          </div>
          <div class="form-wrapper">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="登录邮箱：">
                <el-input v-model="username" disabled />
              </el-form-item>
              <el-form-item label="真实姓名：">
                <el-input v-model="realname" disabled />
              </el-form-item>
              <el-form-item label="角色权限：">
                <el-button v-if="access===9" type="text" disabled>超级管理员</el-button>
                <el-button v-else-if="access===8" type="text" disabled>管理员</el-button>
                <el-button v-else type="text" disabled>普通用户</el-button>
              </el-form-item>
              <template v-if="changeNick">
                <el-form-item label="用户昵称：" style="margin-bottom:8px">
                  <el-input v-model="form.nick" placeholder="请输入昵称" />
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary" @click="nickOnSubmit">确定修改</el-button>
                  <el-button size="small" @click="nickOnCancel">取消</el-button>
                </el-form-item>
              </template>
              <template v-else>
                <el-form-item label="用户昵称：">
                  <div class="justify-item">
                    <el-button type="text" disabled>{{ nickname }}</el-button>
                    <el-button type="text" @click="changeNick=true"><i class="el-icon-edit"></i>修改昵称</el-button>
                  </div>
                </el-form-item>
              </template>
              <template v-if="changePwd">
                <el-form-item label="旧密码：" style="margin-bottom:8px">
                  <el-input v-model="form.oldpwd" placeholder="请输入旧密码" />
                </el-form-item>
                <el-form-item label="新密码：" style="margin-bottom:4px">
                  <el-input v-model="form.newpwd" placeholder="请输入新密码" />
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary" @click="pwdOnSubmit">确定修改</el-button>
                  <el-button size="small" @click="pwdOnCancel">取消</el-button>
                </el-form-item>
              </template>
              <template v-else>
                <el-form-item label="密码：">
                  <div class="justify-item">
                    <el-button type="text" disabled>******</el-button>
                    <el-button type="text" @click="changePwd=true"><i class="el-icon-edit"></i>修改密码</el-button>
                  </div>
                </el-form-item>
              </template>
              <el-form-item label="联系手机：">
                <el-button type="text" disabled>{{ phone }}</el-button>
              </el-form-item>
              <el-form-item label="注册时间：">
                <span>2020-01-01 10:00:00</span>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      form: {
        nick: '',
        oldpwd: '',
        newpwd: ''
      },
      changePwd: false,
      changeNick: false
    };
  },
  computed: {
    ...mapGetters([
      'avatar',
      'phone',
      'access',
      'username',
      'nickname',
      'realname'
    ])
  },
  created() {},
  methods: {
    // 确定修改密码
    pwdOnSubmit() {
      this.$message('submit!');
    },
    // 取消修改密码
    pwdOnCancel() {
      this.form.oldpwd = '';
      this.form.newpwd = '';
      this.changePwd = false;
    },
    // 确定修改昵称
    nickOnSubmit() {
      this.$message('submit!');
    },
    // 取消修改昵称
    nickOnCancel() {
      this.form.nick = '';
      this.changeNick = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.container{
  background: #fff;
  min-height: 100%;
  .avatar{
    padding: 2.4em 0;
    text-align: center;
  }
  .el-card{
    border: none;
  }
  .avatar-wrapper{
    display: inline-block;
    width: 130px;
    height: 130px;
    // border: 2px solid #C0C4CC;
    border-radius: 50%;
    overflow: hidden;
  }
  .form-wrapper{
    margin-top: 1em;
  }
  .justify-item{
    width: 100%;
    display: flex;
    align-self: center;
    justify-content: space-between;
  }
}
@keyframes animal {
  0%{
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  100%{
    transform: rotate(-360deg);
    -ms-transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
@-webkit-keyframes animal {
  0%{
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  100%{
    transform: rotate(-360deg);
    -ms-transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>

