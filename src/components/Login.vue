<template>
  <div id="Login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号登录</span>
      </div>
      <div>
        <el-form :model="profile" :rules="rules" ref="profile" class="demo-ruleForm">
        <el-form-item prop="studentID">
          <el-input v-model="profile.studentID" placeholder="学号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="profile.password" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <router-link to="/register">还没有账号？点击注册</router-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="submitForm('profile')">登录</el-button>
        </el-form-item>
      </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      profile: {
        studentID: "",
        password: "",
      },
      rules: {
        studentID: [
          { required: true, min: 10, max: 10, message: '请输入正确学号', trigger: 'blur' },
        ],
        password: [
          { required: true, min: 6, max: 15, message: '密码长度在6到15个字符之间', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm(profile) {
      let that = this;
      that.$refs.profile.validate((valid) => {
        if (valid) {
          let pass = that.$md5(that.profile.password);
          that.$axios.post('/login', {
            email: that.profile.studentID,
            password: pass
          }).then(function (res) {
            console.log(res);
            if (res.data.code === 200) {

//              window.localStorage["token"] = res.data.token;
              console.log(res.data.data.profile.user.userID);
              that.$router.push({path: '/profile', query: {uid: res.data.data.profile.user.userID}});
            }
            else {
              alert('失败');
            }
          }).catch(function (error) {
            console.log(error);
            that.$message({
              type: 'failed',
              message: '登录失败'
            });
          });
          console.log('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  created () {
    
  },
  mounted () {
  }
}
</script>
<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  font-size: 25px;
  width: 480px;
  margin: 100px auto
}
</style>
