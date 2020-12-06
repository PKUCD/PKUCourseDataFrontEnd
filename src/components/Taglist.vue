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
      <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="开课学院" name="1">
    <el-table :data="tableData">
        <el-table-column prop="tagname" label="标签名称" width="500">
        </el-table-column>
        <el-table-column prop="tagdetails" label="详情" width="500">
          <el-tag type="success">tag</el-tag>
        </el-table-column>
      </el-table>
  </el-collapse-item>
  <el-collapse-item title="热门课程" name="2">
    <el-table :data="tableData">
        <el-table-column prop="tagname1" label="标签名称" width="300">
        </el-table-column>
        <el-table-column prop="tagdetails1" label="详情" width="300">
          <router-link to="Result"><el-tag type="success">tag</el-tag></router-link>
        </el-table-column>
        <el-table-column prop="tagname2" label="标签名称" width="300">
        </el-table-column>
        <el-table-column prop="tagdetails2" label="详情" width="300">
          <el-tag type="success">tag</el-tag>
        </el-table-column>
      </el-table>
  </el-collapse-item>
  <el-collapse-item title="课程类型" name="3">
    <el-table :data="tableData">
        <el-table-column prop="tagname" label="标签名称" width="500">
        </el-table-column>
        <el-table-column prop="tagdetails" label="详情" width="500">
          <el-tag type="success">tag</el-tag>
        </el-table-column>
      </el-table>
  </el-collapse-item>
  <el-collapse-item title="其他" name="4">
    <el-table :data="tableData">
        <el-table-column prop="tagname" label="标签名称" width="500">
        </el-table-column>
        <el-table-column prop="tagdetails" label="详情" width="500">
          <el-tag type="success">tag</el-tag>
        </el-table-column>
      </el-table>
  </el-collapse-item>
</el-collapse>
    </el-main>
  </el-container>
</el-container> 

  </div>
</template>
<script>
export default {
  name: 'taglist',
  data() {
      const item = {
        tagname1: '信息科学技术学院'
      };
      return {
        tableData: Array(10).fill(item)
      }
    }
}
</script>
<style>
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>