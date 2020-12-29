<template>
  <div class="mainframe" id="ProfilePage">
  <el-row class="default">
      <div style="margin:0 auto; float:left">
        <el-avatar shape="square" :size="100" :src="avatarUrl"></el-avatar>
      </div>
      <div style="padding: 0px 20px; float:left"> {{username}} </div>
      <el-button v-if="isOwner" style="float: right" @click="ModifyProfileVisible = true">编辑资料</el-button>
      <ModifyProfile
        :visible.sync="ModifyProfileVisible"
        @close="ModifyProfileVisible = false"
        @modifyName="modifyName"
        @modifyAvatar="modifyAvatar">
      </ModifyProfile>
      <!--
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; text-align: center; margin: 20px">
        <div style="width:50%">
          <div>{{datalist.length}}</div><div>已发布</div>
        </div>
        <div style="width:50%">
          <div>{{favorlist.length}}</div><div>已收藏</div>
        </div>
      </div>
      -->
  </el-row>
  <el-row>
      <el-tabs v-if="isOwner" type="border-card" class="contain">
        <el-tab-pane label="个人资料">
          <el-form label-width="80px" style="width: 300px">
          <el-form-item label="用户名">
            <span> {{username}} </span>
          </el-form-item>
          <el-form-item label="学号">
            <span> {{studentid}} </span>
          </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="我的发布">
          <ShowList :mylist="datalist" :text="datatext" :isOwner="true"></ShowList>
        </el-tab-pane>
        <el-tab-pane label="我的收藏">
          <ShowList :mylist="favorlist" :text="favortext" :isOwner="true"></ShowList>
        </el-tab-pane>
        <el-tab-pane label="密码修改">
          <ModifyPass></ModifyPass>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-else type="border-card" class="contain">
        <el-tab-pane label="TA的发布">
          <ShowList :mylist="datalist" :text="datatext" :isOwner="false"></ShowList>
        </el-tab-pane>
      </el-tabs>
  </el-row>
  </div>
</template>

<script>
import ShowList from './ShowList'
import ModifyPass from './ModifyPass'
import ModifyProfile from './ModifyProfile'
export default {
  name: 'Profile',
  components: {
    ShowList,
    ModifyPass,
    ModifyProfile
  },
  data () {
    return {
      ModifyProfileVisible: false,
      userid: '',
      username: '',
      studentid: '',
      avatarUrl: '',
      isOwner: true,
      datalist: [],
      datatext: {
        name: '删除',
        confirm: '是否确认删除？',
        success: '删除成功！',
        axiosUrl: '/data/read'
      },
      favorlist: [],
      favortext: {
        name: '取消收藏',
        confirm: '是否取消收藏？',
        success: '取消成功！',
        axiosUrl: '/data/read/favor'
      },
    }
  },
  methods: {
    modifyName (newName) {
      this.username = newName;
    },
    modifyAvatar (newAvatar) {
      this.avatarUrl = newAvatar;
    }
  },
  created () {
    
  },
  mounted () {
    this.userid = this.$route.query.uid;
//    alert(this.userid);
 //测试用
    var res = {
      userName: 'username',
      studentID: '-11',
      avatarUrl: '',
      isOwner: true,
      datalist: [
        { title: '标题1',
          time: '2020-12-12 01:23',
          publisher: 'xxx',
          Url: '',
          postid: 1
        },
        { title: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长标题2',
          tags: ['标签1', '2'],
          time: '2020-12-12 01:23',
          publisher: 'yyy',
          postid: 2
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
    if (!this.avatarUrl) this.avatarUrl = '/static/defaultAvatar.png';
    
    /*
    this.$axios.get('/profile', {
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
      if (!this.avatarUrl) this.avatarUrl = require('@/assets/defaultAvatar.png');
    }).catch(function (error) {
      document.getElementById("ProfilePage").innerHTML = "404";
    });*/
  }
}
</script>
<style scoped>
.default {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(231, 226, 226);
  padding: 20px;
  margin-bottom: 30px
}
.mainframe {
  max-width: 1200px;
  margin: auto;
}
.notice {
  padding: 15px;
  border-radius: 1px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(231, 226, 226);
  margin-bottom: 20px;
}
.avatar {
  padding: 0px;
  height: auto;
  width: auto;
  margin: auto
}
.contain {
  min-height: 600px;
}
</style>
