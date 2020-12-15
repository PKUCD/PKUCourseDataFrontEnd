<template>
  <div class="mainframe" id="ProfilePage">
    <el-row class="userprofile default">
      <el-avatar :size="110" :src="avatarUrl" style="float: left"></el-avatar>
      <router-link to="/profile/edit" v-if="isOwner"><el-button style="float: right">编辑资料</el-button></router-link>
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
          <showList :mylist="datalist" :text="datatext" :isOwner="true"></showList>
        </el-tab-pane>
        <el-tab-pane label="我的收藏">
          <showList :mylist="favorlist" :text="favortext" :isOwner="true"></showList>
        </el-tab-pane>
        <el-tab-pane label="密码修改">
          <ModifyPass :mPass="mPass"></ModifyPass>
        </el-tab-pane>
      </el-tabs>
      <el-row v-else>
        <div style="margin-bottom: 20px"> TA的发布</div>
        <showList :mylist="datalist" :text="datatext" :isOwner="false"></showList>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import showList from './showList'
import ModifyPass from './ModifyPass'
export default {
  name: 'Profile',
  components: {
    showList,
    ModifyPass
  },
  data () {
    return {
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
      mPass: {
        oldpass: '',
        newpass: '',
        confirmpass: ''
      },
    }
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
  },
  created () {
    
  },
  mounted () {
    this.userid = this.getQueryString("uid");
//    alert(this.userid);
/* //测试用
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
    */
    
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
  max-width: 1000px;
  margin: auto;
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
  min-height: 540px;
}
</style>
