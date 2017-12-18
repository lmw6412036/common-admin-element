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
                        <el-button type="primary" @click="$router.push('/home/rule/add')">添加</el-button>
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
                                    width="100"></el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="名称"></el-table-column>
                            <el-table-column prop="permissionsText" label="权限"></el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="200">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="handelPermissions(scope.row)" size="small">权限管理
                                    </el-button>
                                    <el-button type="text" @click="handelEdit(scope.row)" size="small">编辑</el-button>
                                    <el-button type="text" @click="handelDel(scope.row)" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <el-dialog
                title="权限管理"
                :modal-append-to-body="false"
                :visible.sync="dialogVisible">

            <el-checkbox-group class="flex permissions" v-model="permissions">
                <ul v-for="cate in cates" class="flex0">
                    <li>
                        <h3>{{cate.name}}</h3>
                        <div v-for="sub in cate.subMenus">
                            <el-checkbox :label="sub.id" :key="sub.id">{{sub.name}}</el-checkbox>
                        </div>
                    </li>
                </ul>
            </el-checkbox-group>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="edit" :loading="loading" size="small">确 定</el-button>
              </span>
        </el-dialog>
        <router-view></router-view>
    </div>
</template>

<script>
  import {mainTableMixin} from "../../lib/mixin"
  import http from "../../lib/http"

  export default {
    data() {
      return {
        dialogVisible: false,
        loading: false,
        tabs: [{name: 'rule', label: '角色列表'}],
        list: [],
        cates: [],
        permissions: [],
        currentRule: "",
        form: {}
      };
    },
    computed: {},
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
        if (oldV.path == "/home/rule/add" || oldV.path.indexOf("/home/rule/edit") >= 0) {
          this.getList();
        }
      }
    },
    methods: {
      handelEdit(menu) {
        this.$router.push({
          path: `/home/rule/edit/${menu.id}`
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
      },

      async handelPermissions(row) {
        let {id, permissions} = row;
        this.currentRule = id;
        this.loading = true;
        if (permissions) {
          this.permissions = permissions.split(',').map((ret) => {
            return parseInt(ret);
          })
        } else {
          this.permissions = [];
        }
        let cates = await http('/coclass', {fid: 2, relation: 'menu'})
        if (cates.errno == 0) {
          this.cates = cates.data;
        }
        this.loading = false;
        this.dialogVisible = true;
      },
      async edit() {
        this.loading = true;
        let {currentRule: id, permissions} = this;
        permissions = permissions.join(',');
        let ret = await http("/rule/update", {id, permissions});
        this.loading = false
        if (ret.errno == 0) {
          this.$message({
            type: "success",
            message: "修改成功"
          })
          this.dialogVisible = false;
          this.getList();
        }
      }
    }
  };
</script>

<style scoped lang="scss">
    .permissions {
        ul {
            width: (100%/4);
        }
    }
</style>
