<template>

  <el-container>
    <el-header>

      <div class="text" style="text-align:center;">
        <h2>{{title}}</h2>
      </div>


    </el-header>
    <el-main>
      <h3>发布者:{{publisher}}</h3>
      <el-card class="box-card">
        <div class="text" style="text-align:left;font-size:6px">发布时间：{{Time}}</div>
        <div class="text" style="text-align:left;">{{text}}</div>
      </el-card>

      <div class="text" style="text-align:left;">
        <el-badge :value="likecount" :max="999" class="item">
          <el-button size="small">评论</el-button>
        </el-badge>
        <el-badge :value="favorcount" :max="999" class="item">
          <el-button size="small">喜欢</el-button>
        </el-badge>
      </div>
      <h4>评论</h4>
      <el-tag
  :key="tag"
  v-for="tag in dynamicTags"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
      <el-card class="box-card" style="text-align:left;" v-for="comment in commentList" v-bind:key="comment">
        <div class="text" style="text-align:left;font-size:6px">{{comment.text}}</div>
        <div class="text" style="text-align:right;font-size:6px">评论者:{{comment.user}} 评论时间：{{comment.time}}</div>
      </el-card>
    </el-main>
    <el-footer>
      <el-card class="box-card">

        <el-input type="textarea" style="width:1350px;" v-model="comment.text"></el-input>

        <el-button type="primary" style="margin-left: 20px;margin-top: 5px;" icon="el-icon-position" @click="POST">
        </el-button>
      </el-card>
    </el-footer>
  </el-container>
</template>

<script>
  export default {

    data() {
      return {
        title: '报告',
        text: 'test',
        publisher:'liufan',
        likecount: '',
        commentList:[
        ],
        favorcount: '',
        comment:{
          text:'',
          time:'',
          user:'',
        },
        Time:'1608983748980',
      };
    },
    methods: {
      mounted() {
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }

  .el-container {
    height: 600px;
    background-color: white;
  }

  .el-header {
    background-color: #FFFFFF;
  }

  .el-main {
    background-color: #FFFFFF;
  }

  .el-footer {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
  }

</style>
