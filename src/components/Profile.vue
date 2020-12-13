<template>
  <div class="mainframe">
    <el-row class="userprofile default">
        <el-avatar :size="110" src="./assets/defaultavatar.jpg" style="float: left"> user </el-avatar>
        <router-link to="/user/modify"><el-button style="float: right">编辑资料</el-button></router-link>
        <div style="float: left; padding: 15px 20px"> {{username}} </div>
    </el-row>
    <el-row class="default">
    <el-tabs tab-position="left" class="contain">
      <el-tab-pane label="个人资料">
        <router-link to="/user/modify"><el-button style="float: right">编辑资料</el-button></router-link>
        <el-form ref="form" label-width="80px" style="width: 300px">
        <el-form-item label="用户名">
          <span> {{username}} </span>
        </el-form-item>
        <el-form-item label="性别">
          <span v-if="gender === 'male'"> 男 </span>
          <span v-else-if="gender === 'female'"> 女 </span>
          <span v-else> 未知 </span>
        </el-form-item>
        <el-form-item label="学号">
          <span> {{studentid}} </span>
        </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="我的发布">
        <div v-for="data in datalist" :key="data.title">
          <div class="dataitem">
              <span>{{data.title}}</span>
              <div>
              <el-tag v-for="tag in data.tags" :key="tag" style="margin:10px 5px 0 0">
                {{tag}}
              </el-tag>
              </div>
              <el-button style="float: right; padding: 3px 0" type="text" @click="deleteData(data)">删除</el-button>
              <div class="timedisplay">
              {{data.time}}
              </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的收藏">
        <div v-for="data in favorlist" :key="data.title">
          <div class="dataitem">
              <span>{{data.title}}</span>
              <div>
              <el-tag v-for="tag in data.tags" :key="tag" style="margin:10px 5px 0 0">
                {{tag}}
              </el-tag>
              </div>
              <el-button style="float: right; padding: 3px 0" type="text" @click="deleteFavor(data)">取消收藏</el-button>
              <div class="timedisplay">
              {{data.time}}
              </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的消息">
        <el-button style="right:0; padding: 3px 0 10px 0" type="text"  @click="clearNotice">清空所有消息</el-button>
        <div v-for="notice in noticelist" :key="notice.title">
          <div class="notice">
              <span>{{notice.title}}</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="密码修改">
        <el-form ref="form" label-width="120px">
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
          <el-button type="primary" @click="modifyPassword">确认修改</el-button>
        </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      username: 'username',
      gender: 'undefined',
      studentid: '1234567890',
      datalist: [
        { title: '标题1',
          time: '2020-12-12 01:23'
        },
        { title: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长标题2',
          tags: ['标签1', '2'],
          time: '2020-12-12 01:23'
        }
      ],
      favorlist: [
        { title: '标题3' },
        { title: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长标题4' }
      ],
      noticelist: [
        { title: '通知5' },
        { title: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长通知6' }
      ]
    }
  },
  methods: {
    deleteData (data) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var index = this.datalist.indexOf(data);
        this.datalist.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
      });
    },
    deleteFavor (data) {
      this.$confirm('是否取消收藏?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var index = this.favorlist.indexOf(data);
        this.favorlist.splice(index, 1);
        this.$message({
          type: 'success',
          message: '取消收藏成功!'
        });
      }).catch(() => {
      });
    },
    clearNotice () {
      this.$confirm('是否清空消息通知?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.noticelist.splice(0);
        this.$message({
          type: 'success',
          message: '清空成功!'
        });
      }).catch(() => {
      });
    },
    modifyPassword () {
      this.$message({
        type: 'success',
        message: '修改成功！'
      });
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
.userprofile {
  height: 150px
}
.mainframe {
  max-width: 800px;
  margin: auto;
}
.dataitem {
  padding: 15px 10px 5px 10px;
  border-radius: 1px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(231, 226, 226);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 20px;
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
</style>
