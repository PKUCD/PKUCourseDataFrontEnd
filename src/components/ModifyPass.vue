<template>
    <el-form :model="Password" :rules="rules" ref="Password" label-width="120px" class="demo-ruleForm">
      <el-form-item label="请输入原密码" prop="old">
        <el-input type="password" v-model="Password.old" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="请输入新密码" prop="new">
        <el-input type="password" v-model="Password.new" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirm">
        <el-input type="password" v-model="Password.confirm" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifyPassword">确认修改</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
  name: 'ModifyPass',
  data () {
    var validatePass0 = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('请输入原密码'));
      } else if (value.length < 6 || value.length > 15){
          callback(new Error('密码长度在6到15个字符之间'));
      } else {
          callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (value.length < 6 || value.length > 15){
        callback(new Error('密码长度在6到15个字符之间'));
      } else {
        if (this.Password.confirm !== '') {
          this.$refs.Password.validateField('confirm');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value.length < 6 || value.length > 15){
        callback(new Error('密码长度在6到15个字符之间'));
      } else if (value !== this.Password.new) {
      callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      Password: {
        old: '',
        new: '',
        confirm: ''
      },
      rules: {
        old: [
          { validator: validatePass0, trigger: 'blur' }
        ],
        new: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        confirm: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    modifyPassword () {
      var that = this;
      this.$refs.Password.validate((valid) => {
        if (valid) {/* // 测试用
          this.$message({
            type: 'success',
            message: '修改成功！'
          });*/
          var oldPass = this.$md5(this.Password.old),
              newPass = this.$md5(this.Password.new);
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