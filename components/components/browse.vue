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
        {{comment}}
      </el-card>
    </el-main>
    <el-footer>
      <el-card class="box-card">

        <el-input type="textarea" style="width:1350px;" v-model="comment"></el-input>

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
        title: '',
        text: '',
        publisher:'',
        likecount: '',
        commentList:[],
        favorcount: '',
        comment: ''
      };
    },
    methods: {
      POST() {
        const url = "http:/data/read/comment?dataid=X";
        this.$ajax.get(url, {
          params: {
            text: this.comment
          }
        })
      },//评论资料
      mounted() {
        this.GET()
      },
      GET() {
        const url = "http:/data/read?dataid=X";
        this.$ajax.get(url).then(
          response => {
            result = response.data;
            console.log(result);
            this.titile = resuslt.title;
            this.text = result.text;
            this.publisher = result.publisher;
            this.likecount=result.likecount;
            this.commentList=result.commentList;
            this.favorcount=result.favorcount;
          }
        ).catch(
          response => {
            alert('请求失败');
          },
        );
      }//载入资料信息
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
