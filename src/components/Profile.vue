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
          <el-form-item label="邮箱">
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
      username: '???',
      studentid: '',
      avatarUrl: '',
      isOwner: true,
      datalist: [],
      datatext: {
        name: '删除',
        confirm: '是否确认删除？',
        success: '删除成功！',
        axiosUrl: '/post/delete'
      },
      favorlist: [],
      favortext: {
        name: '取消收藏',
        confirm: '是否取消收藏？',
        success: '取消成功！',
        axiosUrl: '/post/favor/delete'
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
  watch: {
    '$route' (to, from) {
      this.$router.go(0);
    }
  },
  created () {
    
  },
  mounted () {
    let that = this;
    that.userid = that.$route.query.uid;
//    alert(that.userid);
    that.$axios.get('/post/show', {
      params: {
        userID: that.userid
      }
    })
    .then(res => {
      console.log(res);
      that.username = res.data.user.username;
      that.studentid = res.data.user.pku_mail;
      that.avatarUrl = res.data.user.avatar;
      that.datalist = res.data.post_list;
      that.favorlist = res.data.favor_list;
      that.isOwner = res.data.isOwner;
      if (!that.avatarUrl) that.avatarUrl = '/static/defaultAvatar.png';
    }).catch(function (error) {
    });
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
  font-size: 25px
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
