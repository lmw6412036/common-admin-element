<template>
  <div class="page main-page-box">
    <div class="main-box">
      <div class="filter-box">
        <el-form :inline="true" size="small" :model="form"  class="my-filter-box">
          <el-form-item label="关键词" class="my-form-item">
            <el-input placeholder="关键词" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item class="my-form-item">
            <el-button type="primary">查询</el-button>
          </el-form-item>
          <el-form-item class="my-form-item">
            <el-button type="primary" @click="handelAdd({id:form.fid})">添加</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="main-tabs">
        <el-tabs v-model="activeTab" class="my-tabs">
          <el-tab-pane class="my-tab-pane" :label="tab.label" :name="tab.name" :key="tab.name"
                       v-for="tab in tabs">
            <el-table v-loading="loading" :height="mainTableMixin_tableHeight" stripe size="small" :data="list"
                      style="width: 100%">

              <el-table-column
                prop="id"
                label="编号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="200">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="handelAdd(scope.row)" size="small">
                    添加下级
                  </el-button>
                  <el-button v-show="scope.row.sons>0" type="text" @click="handelOpen(scope.row)" size="small">
                    展开下级
                  </el-button>
                  <el-button type="text" @click="handelEdit(scope.row)" size="small">编辑</el-button>
                  <el-button v-show="scope.row.sons==0" type="text" @click="handelDel(scope.row)" size="small">
                    删除
                  </el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mainTableMixin} from "../../lib/mixin"
  import http from "../../lib/http"

  export default {
    data() {
      return {
        loading:false,
        activeTab: '',
        tabs: [{name: 'coclass', label: '数据字典'}],
        list: [],
        form: {
          fid: 0,
          fname: ""
        }
      };
    },
    computed: {},
    mixins: [mainTableMixin],
    components: {},
    created() {
      this.activeTab = this.tabs[0].name
      this.init(this.$route);
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {
      $route(newV, oldV) {
        if (newV.path === oldV.path && newV.fullPath !== oldV.fullPath) {
          this.init(newV);
        }
        if (/add|edit/.test(oldV.path)) {
          this.init(newV);
        }
        this.getList();
      }
    },
    methods: {
      init(route) {
        this.form.fid = 0;
        let {fid} = route.query;
        fid && (this.form.fid = fid);
      },
      handelAdd(row) {
        this.$router.push({
          path: "/home/coclass/add",
          query: {fid: row.id}
        })
      },
      handelOpen(row) {
        this.$router.push({path: '/home/coclass', query: {fid: row.id}})
      },
      handelEdit(menu) {
        this.$router.push({
          path: `/home/coclass/edit/${menu.id}`
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
        let ret = await http('/coclass/delete', {id})
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
        let ret = await http('/coclass', this.form);
        if (ret.errno == 0) {
          this.list = ret.data;
          this.list.length > 0 && (this.form.fname = this.list[0].fname);
        }
        this.loading = false
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
