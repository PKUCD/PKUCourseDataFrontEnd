<template>

  <el-container>
    <el-header>

      <div class="text" style="text-align:center;">
        <h2>{{title}}</h2>
      </div>
      

    </el-header>
    <el-main>
      <h3 >发布者:{{message5}}</h3>
      <el-card class="box-card">
        <div class="text" style="text-align:left;">{{text}}</div>
      </el-card>

      <div class="text" style="text-align:left;">
        <el-badge :value="3" :max="999" class="item">
          <el-button size="small">评论</el-button>
        </el-badge>
        <el-badge :value="7" :max="999" class="item">
          <el-button size="small">喜欢</el-button>
        </el-badge>
      </div>
      <h4>评论</h4>
      <el-card class="box-card">
        <div class="text" style="text-align:left;">{{message2}}</div>
      </el-card>
      <el-card class="box-card">
        <div class="text" style="text-align:left;">{{message3}}</div>
      </el-card>
      <el-card class="box-card">
        <div class="text" style="text-align:left;">{{message4}}</div>
      </el-card>
    </el-main>
    <el-footer>
      <el-card class="box-card">

          <el-input type="textarea" style="width:1350px;"  v-model="comment"></el-input>
      
        <el-button type="primary" style="margin-left: 20px;margin-top: 5px;" icon="el-icon-position" @click="POST"></el-button>
      </el-card>
    </el-footer>
  </el-container>
</template>

<script>
  export default {

    data() {
      return {
        title: '出软工教材',
        text: '上学期刚买的，大概8成新，有名字和少量笔记，20r出，有意者加v 11111111',
        message2: '20太贵了，15把',
        message3: '借一下楼，我也出',
        message4: '我加你了',
        message5:'dhy',
        comment: ''
      };
    },
    methods: {
      POST(){
        const url="http:/data/read/comment?dataid=X";
        this.$ajax.get(url,{
          params:{
            text:this.comment
        }})
      },
      mounted(){
        this.GET()
      },
      async GET(){
        const url="http:/data/read?dataid=X";
        const {data:res}=await this.$ajax.get(url);
        console.log(res)
      }
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
