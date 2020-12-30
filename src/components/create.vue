<template>
<el-container>
  <el-header><div class="text" style="text-align:center;"><h2>发布页面</h2></div></el-header>
  <el-main><div class="text" style="text-align:center;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="资料标题" prop="title">
    <el-input v-model="ruleForm.title"></el-input>
  </el-form-item>
  <el-form-item label="资料内容" prop="text">
    <el-input type="textarea" :autosize="{ minRows:20}"  v-model="ruleForm.text"></el-input>
  </el-form-item>
  <el-form-item label="资料标签">
      <div class="text" style="text-align:left;">
        <el-tag
  :key="tag"
  v-for="tag in dynamicTags"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
</div>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="POST();submitForm('ruleForm')">立即发布</el-button>
    <el-button @click="resetForm('ruleForm')">取消</el-button>
  </el-form-item>
</el-form>
      </div></el-main>
</el-container>
</template>

<script>
export default {
    
    data() {
      return {
        ruleForm: {
          title: '',
          text: ''
          
        },
        rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 0, max: 50, message: '长度50个字符以内', trigger: 'blur' }
          ],
          text: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('发布成功');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      POST(){
        const url="http:/data/new";
        this.$ajax.get(url,{
          params:{
            title:this.ruleForm.title,
            text:this.ruleForm.text,
            tagList:this.dynamicTags,
            time:new data()
        }})//params可以把参数写进去
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
    .el-container{
        height: 700px;
        background-color: aliceblue;
    }
    .el-header{
        height: 100px;
    }
    .el-main{
        background-color: #FFFFFF;
    }
</style>
