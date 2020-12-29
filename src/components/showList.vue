<template>
  <div v-if="mylist.length > 0">
    <div v-for="data in mylist" :key="data.postid">
      <div class="dataitem">
        <el-link :href="data.Url" :underline="false" class="datatitle">
          {{data.title}}
        </el-link>
          <div>
          <el-tag v-for="tag in data.tags" :key="tag" style="margin:10px 5px 0 0">
            {{tag}}
          </el-tag>
          </div>
          <el-button v-if="isOwner" style="float: right; padding: 3px 0" type="text" @click="deleteData(data)">{{text.name}}</el-button>
          <span v-if="data.time" class="timedisplay">
            {{data.publisher}} 发布于 {{data.time}}
          </span>
      </div>
    </div>
  </div>
  <div v-else class="isEmpty">
    这里空空如也
  </div>
</template>

<script>
export default {
  name: 'ShowList',
  props: ['mylist', 'text', 'isOwner'],
  data () {
    return {
    }
  },
  methods: {
    deleteData (data) {
      if (!this.isOwner) console.log('error');
      this.$confirm(this.text.confirm, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {/*  //测试用
          var index = this.mylist.indexOf(data);
          this.mylist.splice(index, 1);
          this.$message({
            type: 'success',
            message: this.text.success
          });*/
        
        this.$axios.delete(this.text.axiosUrl, {
          params: {
            dataid: data.id
          }
        }).then(res => {
          var index = this.mylist.indexOf(data);
          this.mylist.splice(index, 1);
          this.$message({
            type: 'success',
            message: this.text.success
          });
//          this.$router.go(0);
        }).catch(function (error) {
          document.getElementById("ProfilePage").innerHTML = "404";
        });
      }).catch(() => {
      });
    },
  }
}
</script>

<style scoped>
.dataitem {
  padding: 10px 10px 5px 10px;
  border-radius: 1px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(231, 226, 226);
  margin-bottom: 20px;
}
.datatitle {
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 20px;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
}
.timedisplay {
  color: grey;
  margin-top: 10px;
  font-size: 12px
}
.isEmpty {
  text-align: center;
  font-size: 40px;
  color: rgb(231, 226, 226);
  line-height: 350px
}
</style>