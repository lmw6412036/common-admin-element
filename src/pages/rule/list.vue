<template>
    <div class="page">
        <bread-crumb></bread-crumb>
        <div class="filter-form">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="关键词">
                    <el-input placeholder="关键词" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="$router.push('/home/role/add')">添加</el-button>
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
                        label="编号"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handelEdit(scope.row)" size="small">编辑</el-button>
                        <el-button type="text" @click="handelDel(scope.row)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
  import BreadCrumb from "../../components/bread-crumb.vue"
  import {mainTableMixin} from "../../lib/mixin"
  import http from "../../lib/http"

  export default {
    data() {
      return {
        list: [],
        form: {}
      };
    },
    computed: {},
    mixins: [mainTableMixin],
    components: {
      BreadCrumb
    },
    created() {
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {
      $route(newV, oldV) {
        if (oldV.path == "/home/role/add" || oldV.path.indexOf("/home/role/edit") >= 0) {
          this.getList();
        }
      }
    },
    methods: {
      handelEdit(menu) {
        this.$router.push({
          path: `/home/role/edit/${menu.id}`
        })
      },
      handelDel(row) {
        //debug("menu", menu);
        this.$confirm(`是否删除菜单${row.name}`)
          .then(() => {
            this.del(row.id);
          })
      },
      async del(id) {
        let ret = await http('/rule/delete', {id})
        if (ret.errno == 0) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getList()
        }

      },
      async getList() {
        this.loading = true;
        let ret = await http('/rule');
        if (ret.errno == 0) {
          this.list = ret.data;
        }
        this.loading = false
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
