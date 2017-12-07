<template>
  <div class="page main-page-box">
    <div class="main-box">
      <div class="filter-box">
        <el-form :model="form" :inline="true" size="small" class="my-filter-box">
          <el-form-item label="关键词" class="my-form-item">
            <el-input placeholder="关键词"></el-input>
          </el-form-item>
          <el-form-item label="分类" class="my-form-item">
            <el-select placeholder="分类" v-model="form.area">
              <el-option v-for="cate in cates" :key="cate.id" :label="cate.name" :value="cate.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="my-form-item">
            <el-button type="primary">查询</el-button>
            <el-button type="primary" @click="$router.push('/home/menu/add')">添加菜单</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="main-tabs">
        <el-tabs v-model="activeTab" class="my-tabs">
          <el-tab-pane class="my-tab-pane" :label="tab.label" :name="tab.name" :key="tab.name"
                       v-for="tab in tabs">
            <el-table :height="mainTableMixin_tableHeight" stripe size="small" :data="list"
                      style="width: 100%">
              <el-table-column prop="id" label="id" width="180"></el-table-column>
              <el-table-column prop="name" label="名称" width="180"></el-table-column>
              <el-table-column prop="cateInfo.name" label="父级"></el-table-column>
              <el-table-column prop="url" label="URL"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="handelEdit(scope.row)" size="small">编辑</el-button>
                  <el-button type="text" @click="handelDel(scope.row)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--<div class="main-footer">
        <el-pagination
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="100">
        </el-pagination>
      </div>-->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mainTableMixin} from "../../lib/mixin"
  import http from "../../lib/http"
  import {debug} from "../../lib/util"
  import {getMenusFromData} from "../../lib/functions";

  export default {
    data() {
      return {
        //footerHeight: 42,
        activeTab: "",
        tabs: [{name: "title", label: "菜单列表"}],
        loading: false,
        list: [],
        cates: [],
        form: {}
      };
    },
    computed: {},
    components: {},
    mixins: [mainTableMixin],
    created() {
      this.activeTab = this.tabs[0].name;
      this.getMenuCates();
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {
      $route(newV, oldV) {
        if (oldV.path == "/home/menu/add" || oldV.path.indexOf("/home/menu/edit") >= 0) {
          this.getList();
        }
      }
    },
    methods: {
      handelEdit(menu) {
        this.$router.push({
          path: `/home/menu/edit/${menu.id}`
        })
      },
      handelDel(menu) {
        //debug("menu", menu);
        this.$confirm(`是否删除菜单“${menu.name}”`)
          .then(() => {
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
        let cates = await http('/coclass', {fid: 2})
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

</style>
