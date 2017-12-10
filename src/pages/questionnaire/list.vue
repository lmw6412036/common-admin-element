<template>
    <div class="page main-page-box">
        <div class="main-box">
            <div class="filter-box">
                <el-form size="small" :inline="true" :model="form" class="my-filter-box">
                    <el-form-item label="关键词" class="my-form-item">
                        <el-input placeholder="关键词" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item class="my-form-item">
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                    <el-form-item class="my-form-item">
                        <el-button type="primary" @click="$router.push('/home/questionnaire/add')">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="main-tabs">
                <el-tabs v-model="activeTab" class="my-tabs">
                    <el-tab-pane class="my-tab-pane" :label="tab.label" :name="tab.name" :key="tab.name"
                                 v-for="tab in tabs">
                        <el-table v-loading="loading" :height="mainTableMixin_tableHeight" stripe size="small"
                                  :data="list"
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
                                    width="150">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="handelShow(scope.row)" size="small">查看</el-button>
                                    <el-button type="text" @click="handelEdit(scope.row)" size="small">编辑</el-button>
                                    <el-button type="text" @click="handelDel(scope.row)" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="main-footer">
            <el-pagination
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
  import {mainTableMixin} from "../../lib/mixin"
  import http from "../../lib/http"
  import {debug} from "../../lib/util";

  export default {
    data() {
      return {
        footerHeight: 42,
        loading: false,
        tabs: [{name: 'rule', label: '问卷列表'}],
        list: [],
        total: 0,
        form: {}
      };
    },
    computed: {
    },
    mixins: [mainTableMixin],
    components: {},
    created() {
      this.activeTab = this.tabs[0].name;
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {
      $route(newV, oldV) {
        if (oldV.path == "/home/questionnaire/add" || oldV.path.indexOf("/home/questionnaire/edit") >= 0) {
          this.getList();
        }
      }
    },
    methods: {
      handelShow(row) {
        this.$router.push({
          path: `/home/questionnaire/${row.id}/items`
        })
      },
      handelEdit(menu) {
        this.$router.push({
          path: `/home/questionnaire/edit/${menu.id}`
        })
      },
      handelDel(row) {
        //debug("menu", menu);
        this.$confirm(`是否删除问卷 ${row.name}`)
          .then(() => {
            this.del(row.id);
          })
      },
      async del(id) {
        let ret = await http('/questionnaire/delete', {id})
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
        let ret = await http('/questionnaire');
        if (ret.errno == 0) {
          this.list = ret.data.data;
          this.total = ret.data.count;
        }
        this.loading = false
      }
    }
  };
</script>

<style scoped lang="scss">
    .page{
        z-index: 1;
    }
</style>
