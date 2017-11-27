<template>
  <div class="page">
    <bread-crumb></bread-crumb>
    <div class="filter-form">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input placeholder="关键词" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select placeholder="菜单分类" v-model="form.id">
            <el-option v-for="cate in cates" :label="cate.name" :value="cate.id" :key="cate.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$router.push('/home/menu/add')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="main-table">
      <el-table
        v-loading="loading"
        :data="list"
        stripe
        border
        :height="tableHeight"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="cateInfo.name"
          label="分类">
        </el-table-column>
        <el-table-column
          prop="url"
          label="地址">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" @click="handelDel(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import {mainTableMixin} from "../../lib/mixin"
  import {getMenusFromData} from "../../lib/functions"
  import BreadCrumb from "../../components/bread-crumb.vue"
  import http from "../../lib/http"
  import {debug} from "../../lib/util"

  export default {
    data() {
      return {
        loading: false,
        list: [],
        cates: [],
        form: {}
      };
    },
    computed: {},
    components: {
      BreadCrumb
    },
    mixins: [mainTableMixin],
    created() {
      this.getMenuCates();
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      handelDel(menu) {
        //debug("menu", menu);
        this.$confirm(`是否删除菜单${menu.name}`).then(() => {
          this.del(menu.id);
        })
      },
      async del(id) {
        let ret = await http('/admin/menu/del', {id})
        if (ret.errno == 0) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getList()
        }

      },
      async getMenuCates() {
        let cates = await http('/coclass/list', {fid: 2})
        if (cates.errno == 0) {
          this.cates = cates.data;
        }
      },
      async getList() {
        this.loading = true;
        let list = [], ret = await http("/admin/menu", {})
        this.loading = false;
        if (ret.errno == 0) {
          list = getMenusFromData(ret.data);
          this.list = list;
        }

      }
    }
  };
</script>

<style scoped lang="scss">


  .filter-form {
    padding: 10px 20px;
  }
</style>
