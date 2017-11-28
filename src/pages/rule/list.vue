<template>
  <div class="page">
    <div class="filter-form">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input placeholder="关键词" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$router.push('/home/rule/add')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from "../../components/bread-crumb.vue"

  export default {
    data() {
      return {
        form: {}
      };
    },
    computed: {},
    components: {
      BreadCrumb
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">

</style>
