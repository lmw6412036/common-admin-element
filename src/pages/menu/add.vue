<template>
    <div class="page form-page">
        <page-header>{{id?'修改':'添加'}}菜单</page-header>
        <div v-loading="loading" class="main-form">
            <el-form ref="form" :model="form" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="菜单名称">
                            <el-input placeholder="请输入菜单名称" v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="菜单标识">
                            <el-input placeholder="请输入菜单标识" v-model="form.title"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="URL">
                            <el-input placeholder="请输入URL" v-model="form.url"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="菜单分类">
                    <el-radio-group v-model="form.cate">
                        <el-radio v-for="menu in menus" :key="menu.id" :label="menu.id" :value="menu.id"
                                  name="type">{{menu.name}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
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
  import * as types from "../../store/types"
  import {mapGetters} from "vuex"
  import http from "../../lib/http"

  export default {
    data() {
      return {
        id: "",
        loading: false,
        form: {}
      };
    },
    computed: {
      ...mapGetters({
        menus: types.MENUS
      })
    },
    components: {
      PageHeader
    },
    created() {
      let {id} = this.$route.params;
      id && this.getDetail(id) && (this.id = id);
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getDetail(id) {
        this.loading = true;
        let ret = await http('/menu/detail', {id});
        if (ret.errno == 0) {
          this.form = ret.data
        }
        this.loading = false
      },
      async add() {
        this.loading = true;
        let ret = await http("/menu/add", this.form);
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
        let ret = await http("/menu/update", {...this.form, id: this.id});
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
        z-index: 10000;
    }
</style>
