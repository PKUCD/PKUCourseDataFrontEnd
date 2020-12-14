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
          <el-input v-model="input" placeholder="搜索你想要的资料">
          </el-input>
      </el-col>
      </el-menu-item>
      <el-menu-item index="6" >
       <el-col :span="2">
          <div class="grid-content bg-purple">
            <router-link to="Result">
              <el-button>search</el-button>
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
