<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>


    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="关键词">
        <el-input placeholder="关键词"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select  placeholder="菜单分类">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import http from "../../lib/http"
  import {debug} from "../../lib/util"

  export default {
    data() {
      return {};
    },
    computed: {},
    components: {},
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      getMenuList() {

      }
    }
  };
</script>

<style scoped lang="scss">

</style>
