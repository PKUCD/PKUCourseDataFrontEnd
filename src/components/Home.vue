<template>
<div>
<el-container >
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-row justify="space-around" type="flex">
    <el-menu-item index="1">首页</el-menu-item>
      <router-link to="Taglist"><el-menu-item index="3" >标签列表</el-menu-item></router-link>
    <el-menu-item index="4">个人空间</el-menu-item>
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
  </el-row>
</el-menu>
    </el-header>
    <el-main>
      
    </el-main>
  </el-container>
</el-container> 

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'home',
  data(){
    return{
      postid:'',
      searchVal:'', 
      userid:'',
      username:'',
      time:'',
      favorCnt: '',
    }
  },
  methods:{
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
