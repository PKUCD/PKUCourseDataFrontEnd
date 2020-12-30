<template>
  <el-container>
    <el-header>
      <div class="text" style="text-align:center;">
        <h2>修改页面</h2>
      </div>
    </el-header>
    <el-main>
      <div class="text" style="text-align:center;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="资料标题" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="资料内容" prop="desc">
            <el-input type="textarea" :autosize="{ minRows:20}" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="资料标签">
            <div class="text" style="text-align:left;">
              <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm');PUT">立即修改</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {

    data() {
      return {
        ruleForm: {
          name: '',
          desc: ''

        },
        rules: {
          name: [{
              required: true,
              message: '请修改活动名称',
              trigger: 'blur'
            },
            {
              min: 0,
              max: 50,
              message: '长度50个字符以内',
              trigger: 'blur'
            }
          ],
          desc: [{
            required: true,
            message: '请修改活动形式',
            trigger: 'blur'
          }]
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
            alert('修改成功');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      PUT() {
        const url = "http:/data/edit?dataid=X";
        this.$ajax.get(url, {
          params: {
            title: this.ruleForm.name,
            text: this.ruleForm.desc,
            tagList: this.dynamicTags
          }
        })
      },//修改资料信息
      mounted() {
        this.GET()
      },
      GET() {
        const url = "http:/data/read?dataid=X";
        this.$ajax.get(url).then(
          response => {
            result = response.post;
            console.log(result);
            this.ruleForm.name = resuslt.title;
            this.ruleForm.desc = result.text;
            this.dynamicTagst = result.tagList;
          }
        ).catch(
          response => {
            alert('请求失败');
          },
        );
      }//载入资料信息
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-tag+.el-tag {
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

  .el-container {
    height: 700px;
    background-color: aliceblue;
  }

  .el-header {
    height: 100px;
  }

  .el-main {
    background-color: #FFFFFF;
  }

</style>
