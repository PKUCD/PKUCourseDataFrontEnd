<template>
<div>
<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" 
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-row justify="space-around" type="flex">
    <router-link to="/Taglist"><el-menu-item index="3" >标签列表</el-menu-item></router-link>
    <router-link to="/create"><el-menu-item index="8" >发布资料</el-menu-item></router-link>
    <el-row justify="space-around" type="flex" :gutter="2">
      <el-menu-item index="5" >
        <el-col :span="100">
          <el-input 
    placeholder="搜索你想要的资料"
    v-model="searchVal">>
          </el-input>
      </el-col>
      </el-menu-item>
      <el-menu-item index="6" >
       <el-col :span="2">
          <div class="grid-content bg-purple">
            <router-link to ="Result">
              <el-button @click= "showresult" class="nextpage">搜索</el-button>
            </router-link>
         </div>
       </el-col>
      </el-menu-item>
    </el-row>
    <el-submenu index="4" :disabled="!userid">
      <template slot="title">当前用户：{{username}}</template>
      <el-menu-item index="4-1" @click="toUserProfile">个人空间</el-menu-item>
      <el-menu-item index="4-2" @click="toLogout">退出登录</el-menu-item>
    </el-submenu>
  </el-row>
</el-menu>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data () {
    return {
      postid:'',
      searchVal:'', 
      time:'',
      favorCnt: '',
      activeIndex: '',
      input: '',
      userid: '',
      username: '未登录',
    }
  },
  mounted () {
//    this.checkLogin();
  },
  watch: {
    '$route':{
      handler(to, from) {
        if (to !== '/' && to !== '/login' && to !== '/register') {
          this.checkLogin();
        }
      },
      immediate: true
    } 
  },
  methods: {
    checkLogin () {
      let that = this;
      that.$axios.get('/user/profile')
      .then(res => {
        console.log(res);
        if (res.data.code == 200) {
          that.userid = res.data.data.profile.user.userID;
          that.username = res.data.data.profile.user.name;
        }
        else if (that.$route.path !== '/register'){
          that.$router.push('/');
        }
      }).catch(function (error) {
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toUserProfile() {
      let that = this;
//      console.log(that.userid);
      that.$router.push({path: '/profile', query: {uid: this.userid}});
    },
    toLogout() {
      let that = this;
      that.$axios.post('/user/logout')
      .then(res => {
        console.log(res);
        if (res.data.code == 200) {
          that.$router.go(0);
        }
      }).catch(function (error) {
      })
    },
    showresult(){
      this.$axios({
        methods:get,
        url: "posts/search/",
          params:{
            keywords: searchVal,
          },
      })
      .then(res => {
        this.time=res.posts.post_info.time;
        this.userid=res.posts.post_info.publisher.userID;
        this.username=res.posts.post_info.publisher.username;
        this.favorCnt=res.posts.post_info.favor.favorCnt;
        this.postid=res.posts.post_info.postID;
      }).catch(function (error) {
        });
      this.$router.push({
        path:"/Result",
        query: {
          postid:this.postid,
          userid:this.userid,
          username:this.username,
          time:this.time,
          favorCnt: this.favorCnt,
        }
      });
    }
  }

}

</script>

<style>
h1{
  font-weight: normal;
}
a{
  color: #42b983
}
</style>
