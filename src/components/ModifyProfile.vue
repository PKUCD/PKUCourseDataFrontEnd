<template>
  <el-dialog title="账号信息" :visible="visible" :before-close="closeDialog">
    <el-form :model="profile" :rules="rules" ref="profile" label-width="80px" hide-required-asterisk>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="profile.username" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifyUserName">提交</el-button>
      </el-form-item>
      <el-form-item label="头像" prop="avatarUrl">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="profile.avatarUrl" :src="profile.avatarUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifyAvatar">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'ModifyProfile',
  props: ['visible'],
  data () {
    return {
      profile: {
        username: '',
        avatarUrl: ''
      },
      rules: {
        username: [
          { min: 2, max: 16, message: '用户名长度应在 2 到 16 个字符之间', trigger: 'blur' },
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        avatarUrl: [
          { required: true, message: '请上传头像' }
        ],
      },
    }
  },
  mounted () {
  },
  methods: {
    modifyUserName () {
      let that = this;
      that.$refs.profile.validateField('username',(error) => {
        if (!error) {
          that.$axios.post('/user/profile/edit', {
            newUserName: that.profile.username,
          }).then(function (res) {
            console.log(res);
            // 修改成功
            if (res.data.code == 200){
              that.$message({
                type: 'success',
                message: '修改成功!'
              });
              that.$emit('modifyName', that.profile.username);
//              that.$router.go(0);
            }
            else{
              console.log(res);
            }
          }).catch(function (error) {
            console.log('error');
            that.$message({
              type: 'failed',
              message: '修改失败!已有同名用户!'
            });
          });
        }
        else{
          console.log('username error')
        }
      })
    },
    modifyAvatar () {
      let that = this;
      that.$refs.profile.validateField('avatarUrl',(error) => {
        if (!error) { //测试用
          that.$axios.post('/user/profile/edit', {
            newAvatarUrl: that.profile.avatarUrl
          }).then(function (res) {
            console.log(res);
            // 修改成功
            if (res.data.code == 200){
              that.$message({
                type: 'success',
                message: '修改成功!'
              });
              that.$emit('modifyAvatar', that.profile.avatarUrl);
            }
            else console.log(res);
          }).catch(function (error) {
            console.log('error');
          });
        }
        else{
          console.log('avatar error')
        }
      })
    },
    closeDialog () {
      this.profile.username = '';
      this.profile.avatarUrl = '';
      this.$refs.profile.resetFields();
      this.$emit('close');
      this.$router.go(0);
    },
    handleAvatarSuccess (res, file) {
      this.profile.avatarUrl = URL.createObjectURL(file.raw);
//      alert(this.profile.avatarUrl); // 主要是想看看搞出来的路径是什么东西
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },/*
    uploadHttpRequest (file) {
      let url = '/files';
      this.$axios.post(url, file).then( res => {
        console.log(response.data);
      })
    }*/
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>