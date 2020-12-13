<template>
  <div class="modifyprofile default" id="ProfileModifyPage">
    <el-form ref="form" label-width="80px">
    <h3> 账号信息</h3>
    <el-form-item label="用户名">
      <el-input v-model="username"></el-input>
    </el-form-item>
    <el-form-item  label="头像">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="modifyProfile">确认修改</el-button>
      <el-button>取消</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ProfileModify',
  data () {
    return {
      username: '',
      avatarUrl: ''
    }
  },
  mounted () {
    axios.get('/profile/edit', {
      params: {
      }
    })
    .then(res => {
      this.username = res.userName;
      this.avatarUrl = res.avatarUrl;
    }).catch(function (error) {
      document.getElementById("ProfilePage").innerHTML = "404";
    });
  },
  methods: {
    modifyProfile () {
      this.$message({
        type: 'success',
        message: '修改成功!'
      });
      this.$router.push({
        path: '/profile'
      });
      axios.post('/profile/edit', {
        newUserName: username,
        newAvatarUrl: avatarUrl
      }).then(function (res) {
        // 修改成功
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this.$router.push({
          path: '/profile'
        });
      }).catch(function (error) {
        document.getElementById("ProfileModifyPage").innerHTML = "404";
      });
    },
    handleAvatarSuccess (res, file) {
      this.avatarUrl = URL.createObjectURL(file.raw);
//      alert(this.avatarUrl); 主要是想看看搞出来的路径是什么东西
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
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.default {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(231, 226, 226);
  padding: 20px
}
.modifyprofile {
  max-width: 500px;
  margin: auto;
}
.contain {
  min-height: 450px;
}
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
