<template>
  <div class="app-container">
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <div class="avatar">
          <div class="avatar-wrapper">
            <img v-if="avatar" src="avatar" class="user-avatar">
            <img v-else src="~@/assets/images/user.png" class="user-avatar">
          </div>
        </div>
        <div class="form-wrapper">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="用户名：">
              <el-input v-model="form.username" disabled />
            </el-form-item>
            <el-form-item label="昵称：">
              <el-input v-model="form.nickname" disabled />
            </el-form-item>
            <template v-if="changePwd">
              <el-form-item label="旧密码：">
                <el-input v-model="form.oldpwd" />
              </el-form-item>
              <el-form-item label="新密码：">
                <el-input v-model="form.newpwd" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">更新</el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="密码：">
                <div class="edit-item">
                  <el-button type="text" disabled>******</el-button>
                  <el-button type="text" @click="handleChangePwd"><i class="el-icon-edit"></i>修改密码</el-button>
                </div>
              </el-form-item>
            </template>
            <el-form-item label="注册时间：">
              <span>2020-01-01 10:00:00</span>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      form: {
        username: '',
        nickname: '',
        oldpwd: '',
        newpwd: ''
      },
      changePwd: false
    };
  },
  computed: {
    ...mapGetters([
      'avatar',
      'username',
      'nickname'
    ])
  },
  created() {
    this.form.username = this.username;
    this.form.nickname = this.nickname;
  },
  methods: {
    onSubmit() {
      this.$message('submit!');
    },
    onCancel() {
      this.changePwd = false;
    },
    handleChangePwd() {
      this.changePwd = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container{
  .avatar{
    padding: 2.8em 0;
    text-align: center;
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
    margin-top: 24px;
  }
  .edit-item{
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

