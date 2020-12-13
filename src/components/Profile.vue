<template>
  <div class="mainframe" id="ProfilePage">
    <el-row class="userprofile default">
      <el-avatar :size="110" :src="avatarUrl" style="float: left"></el-avatar>
      <router-link to="/profile/edit"><el-button style="float: right">编辑资料</el-button></router-link>
      <div style="float: left; padding: 15px 20px"> {{username}} </div>
    </el-row>
    <el-row class="default contain">
      <el-tabs v-if="isOwner" tab-position="left">
        <el-tab-pane label="个人资料">
          <el-form ref="form" label-width="80px" style="width: 300px">
          <el-form-item label="用户名">
            <span> {{username}} </span>
          </el-form-item>
          <el-form-item label="学号">
            <span> {{studentid}} </span>
          </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="我的发布">
          <div v-for="data in datalist" :key="data">
            <div class="dataitem">
              <el-link :href="data.Url" :underline="false" class="datatitle">
                {{data.title}}
              </el-link>
                <div>
                <el-tag v-for="tag in data.tags" :key="tag" style="margin:10px 5px 0 0">
                  {{tag}}
                </el-tag>
                </div>
                <el-button style="float: right; padding: 3px 0" type="text" @click="deleteData(data)">删除</el-button>
                <span class="timedisplay">
                  {{data.publisher}} 发布于 {{data.time}}
                </span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的收藏">
          <div v-for="data in favorlist" :key="data">
            <div class="dataitem">
              <el-link :href="data.Url" :underline="false" class="datatitle">
                {{data.title}}
              </el-link>
                <div>
                <el-tag v-for="tag in data.tags" :key="tag" style="margin:10px 5px 0 0">
                  {{tag}}
                </el-tag>
                </div>
                <el-button style="float: right; padding: 3px 0" type="text" @click="deleteFavor(data)">取消收藏</el-button>
                <span class="timedisplay">
                  {{data.publisher}} 发布于 {{data.time}}
                </span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="密码修改">
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
        </el-tab-pane>
      </el-tabs>
      <el-row v-else>
        <div style="margin-bottom: 20px"> TA的发布</div>
        <div v-if="datalist.length > 0">
          <div v-for="data in datalist" :key="data">
            <div class="dataitem">
              <el-link :href="data.Url" :underline="false" class="datatitle">
                {{data.title}}
              </el-link>
                <div>
                <el-tag v-for="tag in data.tags" :key="tag" style="margin:10px 5px 0 0">
                  {{tag}}
                </el-tag>
                </div>
                <div class="timedisplay">
                  {{data.publisher}} 发布于 {{data.time}}
                </div>
            </div>
          </div>
        </div>
        <div v-else class="isEmpty">
          这里空空如也
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    var validatePass0 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
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
      userid: '',
      username: '',
      studentid: '',
      avatarUrl: '',
      isOwner: true,
      datalist: [],
      favorlist: [],
      mPass: {
        oldpass: '',
        newpass: '',
        confirmpass: ''
      },
      rules: {
        oldpass: [
//          {required: true, message: '请输入原密码', trigger: 'blur'},
//          {min: 6, max: 15, message: '密码长度在6到15个字符', trigger:'blur'}
          { validator: validatePass0, trigger: 'blur' }
        ],
        newpass: [
//          {required: true, message: '请输入新密码', trigger: 'blur'},
//          {min: 6, max: 15, message: '密码长度在6到15个字符', trigger:'blur'},
          { validator: validatePass1, trigger: 'blur' }
        ],
        confirmpass: [
//         {required: true, message: '请再次输入新密码', trigger: 'blur'},
//          {min: 6, max: 15, message: '密码长度在6到15个字符', trigger:'blur'},
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    deleteData (data) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { /*测试用
          var index = this.datalist.indexOf(data);
          this.datalist.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });*/
        axios.delete('/data/read', {
          params: {
            dataid: data.id
          }
        }).then(res => {
          var index = this.datalist.indexOf(data);
          this.datalist.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$router.go(0);
        }).catch(function (error) {
          document.getElementById("ProfilePage").innerHTML = "404";
        });
      }).catch(() => {
      });
    },
    deleteFavor (data) {
      this.$confirm('是否取消收藏?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {/* 测试用
        var index = this.favorlist.indexOf(data);
        this.favorlist.splice(index, 1);
        this.$message({
          type: 'success',
          message: '取消收藏成功!'
        });*/
        axios.delete('/data/read/favor', {
          params: {
            dataid: data.id
          }
        }).then(res => {
          var index = this.favorlist.indexOf(data);
          this.favorlist.splice(index, 1);
          this.$message({
            type: 'success',
            message: '取消收藏成功!'
          });
          this.$router.go(0);
        }).catch(function (error) {
          document.getElementById("ProfilePage").innerHTML = "404";
        });
      }).catch(() => {
      });
    },
    modifyPassword () {
        this.$refs.mPass.validate((valid) => {
          if (valid) {/* 测试用
              this.$message({
                type: 'success',
                message: '修改成功！'
              });
              this.$router.go(0);*/
            axios.post('/profile/edit', {
              oldpass: this.mPass.oldpass,
              newpass: this.mPass.newpass
            }).then(function (res) {
              this.$message({
                type: 'success',
                message: '修改成功！'
              });
              this.$router.go(0);
              //
            }).catch(function (error) {
              this.$message({
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
  },
  created () {
    
  },
  mounted () {
    this.userid = this.getQueryString("uid");
//    alert(this.userid);
    var res = {
      userName: 'username',
      studentID: '-11',
      avatarUrl: '',
      isOwner: true,
      datalist: [
        { title: '标题1',
          time: '2020-12-12 01:23',
          publisher: 'xxx',
          Url: ''
        },
        { title: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长标题2',
          tags: ['标签1', '2'],
          time: '2020-12-12 01:23',
          publisher: 'yyy'
        }
      ],
      favorlist: [
        { title: '标题3' },
        { title: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长标题4' }
      ],
    }
    this.username = res.userName;
    this.studentid = res.studentID;
    this.avatarUrl = res.avatarUrl;
    this.datalist = res.datalist;
    this.favorlist = res.favorlist;
    this.isOwner = res.studentID !== "-1";
    
    axios.get('/profile', {
      params: {
        uid: this.userid
      }
    })
    .then(res => {
      this.username = res.userName;
      this.studentid = res.studentID;
      this.avatarUrl = res.avatarUrl;
      this.datalist = res.datalist;
      this.favorlist = res.favorlist;
      this.isOwner = res.studentID !== "-1";
    }).catch(function (error) {
      document.getElementById("ProfilePage").innerHTML = "404";
    });
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
.userprofile {
  height: 150px
}
.mainframe {
  max-width: 800px;
  margin: auto;
}
.dataitem {
  padding: 10px 10px 5px 10px;
  border-radius: 1px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(231, 226, 226);
  margin-bottom: 20px;
}
.datatitle {
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 20px;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
}
.notice {
  padding: 15px;
  border-radius: 1px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(231, 226, 226);
  margin-bottom: 20px;
}
.avatarimage {
  float: left;
  padding: 0px;
  height: 100%;
  width: auto;
  margin: auto
}
.contain {
  min-height: 440px;
}
.timedisplay {
  color: grey;
  margin-top: 10px;
  font-size: 12px
}
.el-input {
  width: 300px
}
.isEmpty {
  text-align: center;
  font-size: 40px;
  color: rgb(231, 226, 226);
  line-height: 350px
}
</style>
