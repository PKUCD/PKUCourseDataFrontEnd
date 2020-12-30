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
      this.$refs.profile.validateField('username',(error) => {
        if (!error) { //测试用
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.$emit('modifyName', this.profile.username);
          
          /*
          this.$axios.post('/profile/edit', {
            newUserName: this.profile.username,
          }).then(function (res) {
            // 修改成功
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          this.$emit('modifyName', this.profile.userName);
          }).catch(function (error) {
            console.log('error');
          });*/
        }
        else{
          console.log('username error')
        }
      })
    },
    modifyAvatar () {
//      this.$refs.avatarUpload.submit();
      this.$refs.profile.validateField('avatarUrl',(error) => {
        if (!error) { //测试用
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.$emit('modifyAvatar', this.profile.avatarUrl);
          /*
          this.$axios.post('/profile/edit', {
            newAvatarUrl: this.profile.avatarUrl
          }).then(function (res) {
            // 修改成功
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          this.$emit('modifyAvatar', this.profile.avatarUrl);
          }).catch(function (error) {
            console.log('error');
          });*/
        }
        else{
          console.log('avatar error')
        }
      })
    },
    closeDialog () {
      this.profile.username = '';
      this.profile.avatarUrl = '';
      this.$emit('close');
    },
    handleAvatarSuccess (res, file) {
      this.profile.avatarUrl = URL.createObjectURL(file.raw);
      alert(this.profile.avatarUrl); // 主要是想看看搞出来的路径是什么东西
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