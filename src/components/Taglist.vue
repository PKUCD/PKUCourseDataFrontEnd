<template>
 <div>
<el-container >
  <el-container>
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