<template>
    <div class="page form-page">
        <page-header>{{id ? '修改' : '添加'}}数据字典</page-header>
        <div v-loading="loading" class="main-form">
            <el-form ref="form" :model="form" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="字典名称">
                            <el-input placeholder="请输入字典名称" v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="字典标识">
                            <el-input placeholder="请输入标识名称" v-model="form.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="字典排序">
                            <el-input placeholder="请输入排序值，默认按由大到小" v-model="form.sort"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col v-if="id" :span="6">
                        <el-form-item label="父级名称">
                            <el-select v-model="form.fid" placeholder="请选择">
                                <el-option
                                        v-for="item in list"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col v-else :span="6">
                        <el-form-item label="父级名称">
                            <el-input :disabled="true" placeholder="请输入父级名称" v-model="form.fname"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button v-if="id" :loading="loading" type="primary" @click="edit">保存</el-button>
                    <el-button v-else :loading="loading" type="primary" @click="add">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  import PageHeader from "../../components/page-header.vue"
  import http from "../../lib/http"
  import {debug} from "../../lib/util"

  export default {
    data() {
      return {
        list: [],
        id: "",
        loading: false,
        form: {
          fid: 0
        }
      };
    },
    computed: {},
    components: {
      PageHeader
    },
    created() {
      this.init();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      init() {
        let {fid} = this.$route.query;
        let {id} = this.$route.params;
        if (id) {
          //编辑
          this.initEdit(id);
        } else {
          //添加
          this.initAdd(fid);
        }
      },
      async initEdit(id) {
        this.id = id;
        let form = await this.getDetail(id);
        let fid = form.fid;
        if (!fid) {
          this.form = form;
          return
        }
        let fidInfo = await this.getDetail(fid);
        await this.getList(fidInfo.fid);
        this.form = form;

      },
      async initAdd(fid) {
        this.form.fid = fid;
        let fidCoclass = await this.getDetail(fid);
        this.$set(this.form, 'fname', fidCoclass.name);
      },
      /*根据id获得coclass详情*/
      async getDetail(id) {
        this.loading = true;
        let ret = await http('/coclass/detail', {id});
        this.loading = false
        if (ret.errno == 0) {
          return ret.data
        } else {
          return {}
        }
      },
      async getList(fid) {
        this.loading = true;
        let ret = await http('/coclass', {fid});
        this.loading = false
        this.list = ret.data;
        return
      },
      async add() {
        this.loading = true;
        let ret = await http("/coclass/add", this.form);
        this.loading = false
        if (ret.errno == 0) {
          this.$message({
            type: "success",
            message: "添加成功"
          })
          this.$router.go(-1);
        }
      },
      async edit() {
        this.loading = true;
        let ret = await http("/coclass/update", {...this.form, id: this.id});
        this.loading = false
        if (ret.errno == 0) {
          this.$message({
            type: "success",
            message: "修改成功"
          })
          this.$router.go(-1);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
    .form-page {
        z-index: 1000;
    }
</style>
