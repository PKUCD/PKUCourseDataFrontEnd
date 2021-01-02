<template>
<el-container style="height: 500px; border: 1px solid #eee">

    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="time" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="user" label="发布者" width="120">
        </el-table-column>
        <el-table-column prop="favorcnt" label="点赞数" width="120">
        </el-table-column>
        <el-table-column prop="tag" label="标签" width=200>
          <el-tag>标签一</el-tag>
          <el-tag type="success">标签二</el-tag>
        </el-table-column>
        <el-table-column prop="intro" label="简介" width="700">
        </el-table-column>
        <el-table-column prop="Details" label="详细情况" width="120">
              <el-link type="primary"><a :href="repositoryUrl">Details</a></el-link>
        </el-table-column>
      </el-table>
    </el-main>
</el-container>
</div>
</div>
</template>>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        time: '',
        user: '',
        favorcnt: '',
        intro: '',
         repositoryUrl : '',
      }
    },
    created(){
      var username = this.$route.query.username;
      var qtime = this.$route.query.time;
      var postid=this.$route.query.postid;
      var favorCnt = this.$route.query.favorCnt;
    },
    mounted(){
      this.time= qtime;
      tthis.user= username;
      this.favorcnt = favorCnt;
    }
  };
</script>

<style>
  .el-header {
    background-color: rgb(253, 253, 251);
    color: rgb(14, 13, 13);
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>