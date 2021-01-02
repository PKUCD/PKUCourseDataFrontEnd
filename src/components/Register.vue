<template>
  <div id="Login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>注册新账号</span>
      </div>
      <div style="font-size: 25px">
        <el-form :model="profile" :rules="rules" ref="profile" class="demo-ruleForm">
        <el-form-item prop="studentID">
          <el-input v-model="profile.studentID" placeholder="学号" clearable>
            <template slot="append">@pku.edu.cn</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="profile.username" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="profile.password" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="valiCode">
          <el-input v-model="profile.valiCode" placeholder="验证码" clearable>
            <el-button slot="append" @click="sendValiCode" :disabled="isDisabled">
              {{ buttonName }}
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="submitForm('profile')">注册</el-button>
        </el-form-item>
      </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Register',
  components: {
  },
  data () {
    return {
      profile: {
        studentID: "",
        username: "",
        password: "",
        valiCode: "",
        lastSended: "",
      },
      isDisabled: false,
      buttonName: '发送验证码',
      time: 60,
      rules: {
        studentID: [
          { required: true, min: 10, max: 10, message: '请输入正确学号', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, min: 6, max: 15, message: '密码长度在6到15个字符之间', trigger: 'blur' },
        ],
        valiCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
    }
  },
  watch: {
  },
  methods: {
    sendValiCode() {
      let that = this;
      that.$refs.profile.validateField('studentID',(error) => {
        if (!error) {
          that.$axios.post('/user/register/validationCode', {
            email: that.profile.studentID,
          }).then(function (res) {
            console.log(res);
            if (res.data.code == 200) {
              that.profile.lastSended = that.profile.studentID;
              that.isDisabled = true;
              that.buttonName = '（' + that.time + '秒）后重新发送';
              let interval = window.setInterval(function() {
                  -- that.time;
                  that.buttonName = '（' + that.time + '秒）后重新发送';
                  if (that.time <= 0) {
                      that.buttonName = '重新发送';
                      that.time = 60;
                      that.isDisabled = false;
                      window.clearInterval(interval);
                  }
              }, 1000);
            } else if (res.data.code == 300) {
              that.profile.studentID = "";
              that.$message({
                type: 'failed',
                message: '该邮箱已注册！'
              });
            } else if (res.data.code == 700) {
              that.profile.studentID = "";
              that.$message({
                type: 'failed',
                message: '邮箱错误！'
              });
            } else{
              that.profile.studentID = "";
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
        else{
          console.log('email error')
        }
      })
    },
    submitForm(profile) {
      let that = this;
      that.$refs[profile].validate((valid) => {
        if (valid) {
          if (that.profile.studentID == that.profile.lastSended) {
            let pass = that.$md5(that.profile.password);
            that.$axios.post('/user/register', {
              email: that.profile.studentID,
              userName: that.profile.username,
              passwordHash: pass,
              verificationCode: that.profile.valiCode,
            }).then(function (res) {
              console.log(res);
              if (res.data.code == 200) {
                that.$message({
                  type: 'success',
                  message: '注册成功！'
                });
                that.$router.push('/login');
              } else if (res.data.code == 300) {
                that.profile.studentID = "";
                that.$message({
                  type: 'failed',
                  message: '该邮箱已注册！'
                });
              } else if (res.data.code == 700) {
                that.$message({
                  type: 'failed',
                  message: '验证码错误！'
                });
              } else{
                that.$message({
                  type: 'failed',
                  message: '注册失败！'
                });
              }
            }).catch(function (error) {
              that.$message({
                type: 'failed',
                message: '注册失败!已有同名用户!'
              });
            });
          } else {
            that.$message({
              type: 'failed',
              message: '请先发送验证码'
            });
          }
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
