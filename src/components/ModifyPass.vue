<template>
    <el-form :model="mPass" :rules="rules" ref="mPass" label-width="120px" class="demo-ruleForm">
      <el-form-item label="请输入原密码" prop="oldpass">
        <el-input type="password" v-model="mPass.oldpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="请输入新密码" prop="newpass">
        <el-input type="password" v-model="mPass.newpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmpass">
        <el-input type="password" v-model="mPass.confirmpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifyPassword">确认修改</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
  name: 'ModifyPass',
  props: ['mPass'],
  data () {
    var validatePass0 = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('请输入原密码'));
      } else if (value.length < 6 || value.length > 15){
          callback(new Error('密码长度在6到15个字符'));
      } else {
          callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (value.length < 6 || value.length > 15){
        callback(new Error('密码长度在6到15个字符'));
      } else {
        if (this.mPass.confirmpass !== '') {
          this.$refs.mPass.validateField('confirmpass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value.length < 6 || value.length > 15){
        callback(new Error('密码长度在6到15个字符'));
      } else if (value !== this.mPass.newpass) {
      callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        oldpass: [
          { validator: validatePass0, trigger: 'blur' }
        ],
        newpass: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        confirmpass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    modifyPassword () {
      var that = this;
      this.$refs.mPass.validate((valid) => {
        if (valid) {/* // 测试用
          this.$message({
            type: 'success',
            message: '修改成功！'
          });*/
          var oldPass = this.$md5(this.mPass.oldpass),
              newPass = this.$md5(this.mPass.newpass);
          this.$axios.post('/profile/edit', {
            oldpass: oldPass,
            newpass: newPass
          }).then(function (res) {
            that.$message({
            type: 'success',
            message: '修改成功！'
            });
            that.$router.go(0);
          }).catch(function (error) {
            that.$message({
            type: 'failed',
            message: '修改失败！原密码输入错误！'
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 300px
}
</style>