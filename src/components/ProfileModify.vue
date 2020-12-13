<template>
  <div class="modifyprofile default">
    <el-form ref="form" label-width="80px">
    <h3> 账号信息</h3>
    <el-form-item label="用户名">
      <el-input v-model="username"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="gender">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item  label="头像">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认修改</el-button>
      <el-button>取消</el-button>
    </el-form-item>
    </el-form>
    <!--
    <el-form ref="form" label-width="120px">
    <h3> 密码修改</h3>
    <el-form-item label="请输入原密码">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="请输入新密码">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="确认新密码">
      <el-input></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认修改</el-button>
      <el-button>取消</el-button>
    </el-form-item>
    </el-form>
    -->
  </div>
</template>

<script>
export default {
  name: 'ProfileModify',
  data () {
    return {
      username: '',
      gender: true,
      imageUrl: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('修改成功！')
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
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
