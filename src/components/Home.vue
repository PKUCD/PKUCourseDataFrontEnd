<template>
<div class="line">
  <el-menu 
    :default-active="activeIndex" 
    class="el-menu-demo" 
    mode="horizontal" 
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="3" ><router-link to="Taglist">标签列表</router-link></el-menu-item>
      <el-menu-item index="4">个人空间</el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
