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
                        <el-button type="primary" @click="handleClick('add')">添加</el-button>
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
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <el-form size="small" label-position="left" inline>
                                        <el-form-item :label="option.showsort||option.index+1"
                                                      :key="option.id"
                                                      v-for="(option,index) in scope.row.options"><span>{{option.name}}({{option.score}})</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
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
                                    <el-button type="text" @click="handelOption(scope.row)" size="small">选项</el-button>
                                    <el-button type="text" @click="handelEdit(scope.row)" size="small">编辑</el-button>
                                    <el-button type="text" @click="handelDel(scope.row)" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <!--<div class="main-footer">
            <el-pagination
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>-->
        <el-dialog title="题目选项"
                   :modal="false"
                   :visible.sync="showOptions" ref="options">
            <el-table v-loading="optionLoading" :data="itemOptions" size="small">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="编号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.showsort" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="选项">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="得分">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.score" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleClick('delOption',scope.row,scope.$index)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer">
                <el-button type="primary" size="small" @click="handleClick('saveOption')">保存</el-button>
                <el-button type="primary" size="small" @click="handleClick('addOption')">添加</el-button>
            </div>
        </el-dialog>
        <router-view></router-view>
    </div>
</template>

<script>
  import {mainTableMixin} from "../../../lib/mixin"
  import http from "../../../lib/http"
  import {debug} from "../../../lib/util";
  import {delay} from "../../../lib/util";

  export default {
    data() {
      return {
        questionnaireId: 0,
        showOptions: false,
        loading: false,
        optionLoading: false,
        tabs: [{name: 'rule', label: '问卷题目'}],
        list: [],
        item: '',
        itemOptions: [],
        total: 0,
        form: {}
      };
    },
    computed: {},
    mixins: [mainTableMixin],
    components: {},
    created() {
      this.activeTab = this.tabs[0].name;
      let params = this.$route.params, {questionnaireId} = params;
      this.questionnaireId = questionnaireId;
      this.getList(questionnaireId);
    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {
      $route(newV, oldV) {
        if (newV !== oldV) {
          this.getList(this.questionnaireId);
        }
      }
    },
    methods: {
      handleClick(type, data, index) {
        switch (type) {
          case "add":
            this.$router.push(`/home/questionnaire/${this.questionnaireId}/items/add`);
            break;
          case "addOption":
            this.itemOptions.push({
              showsort: "",
              name: "",
              score: ""
            });
            break;
          case "delOption":
            if (data.id) {
              this.delOption(data.id, index);
            } else {
              this.itemOptions.splice(index, 1);
            }
            break;
          case "saveOption":
            if (this.itemOptions.length == 0) {
              return;
            }
            this.saveOption();
            break;
        }
      },
      handelShow(row) {
        this.$router.push({
          path: `/home/questionnaire/${menu.id}/items`
        })
      },
      handelEdit(menu) {
        this.$router.push({
          path: `/home/questionnaire/${this.questionnaireId}/items/edit/${menu.id}`
        })
      },
      handelDel(row) {
        //debug("menu", menu);
        this.$confirm(`是否删除题目 ${row.name}`)
          .then(() => {
            this.del(row.id);
          })
      },

      delOption(id, index) {
        this.$confirm(`是否删除选项`)
          .then(() => {
            this.itemOptions.splice(index, 1);
            this.delOptionAsync(id);
          })
      },

      async handelOption(row) {
        await this.getOptions(row.id);
        this.item = row.id;
        this.showOptions = true;
      },


      async delOptionAsync(id) {
        this.optionLoading = true;
        let ret = http('/questionnaire/options/delete', {
          item: this.item, id
        });
        if (ret.errno == 0) {
          this.$message({
            type: "success", duration: 1000,
            message: `删除成功`
          })
        }
        this.optionLoading = false
      },

      async saveOption() {
        this.optionLoading = true;
        debug("data", this.itemOptions);
        for (let i in this.itemOptions) {
          let data = this.itemOptions[i],
            service = data.id ? '/questionnaire/options/update' : '/questionnaire/options/add',
            form = {...data, item: this.item},
            ret = await http(service, form);
          if (ret.errno == 0) {
            this.$message({
              type: "success", duration: 1000,
              message: `保存 ${form.name} 成功`
            })
            await delay(1100);
          }
        }
        await this.getOptions(this.item);
        this.optionLoading = false
      },

      async getOptions(item) {
        this.loading = true;
        let ret = await http('/questionnaire/options/list', {item});
        this.loading = false;
        if (ret.errno == 0) {
          this.itemOptions = ret.data;
        }
        return this.itemOptions;
      },
      async del(id) {
        let ret = await http('/questionnaire/items/delete', {
          id,
          questionnaire: this.questionnaireId
        })
        if (ret.errno == 0) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getList(this.questionnaireId)
        }
      },
      async getList(questionnaire) {
        this.loading = true;
        let ret = await http("/questionnaire/items/list", {questionnaire});
        if (ret.errno == 0) {
          this.list = ret.data;
        }
        this.loading = false
      }
    }
  };
</script>

<style scoped lang="scss">
    .page {
        z-index: 2;
    }
</style>
