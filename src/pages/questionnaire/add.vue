<template>
  <div class="page form-page">
    <page-header>{{id?'修改':'添加'}}问卷</page-header>
    <div v-loading="loading" class="main-form">
      <el-form ref="form" :model="form" size="small" label-width="160px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="问卷名称">
              <el-input placeholder="请输入问卷名称" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="开启题目自定义选项">
              <el-switch v-model="form.is_diy_options"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!form.is_diy_options">
          <el-col :span="12">
            <el-form-item label="通用选项设置">
              <el-input type="textarea" :rows="5" v-model="form.public_options" placeholder="通用选项设置"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="问卷介绍">
              <vue-editor ref="vueEditor" :type="type" v-model="form.desc"></vue-editor>
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
  import VueEditor from "../../components/vue-editor"

  export default {
    data() {
      return {
        id: "",
        type: "",
        loading: false,
        form: {}
      };
    },
    computed: {},
    components: {
      PageHeader, VueEditor
    },
    created() {
      let {id} = this.$route.params;
      id && this.getDetail(id) && (this.id = id) && (this.type = "edit");
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getDetail(id) {
        this.loading = true;
        let ret = await http('/questionnaire/detail', {id});
        if (ret.errno == 0) {
          this.form = ret.data
          this.form.is_diy_options = !!this.form.is_diy_options;
        }
        this.loading = false
      },
      async add() {
        this.loading = true;
        let ret = await http("/questionnaire/add", {
          ...this.form,
          is_diy_options: this.form.is_diy_options ? 1 : 0,
          desc: this.$refs.vueEditor.getHtml()
        });
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
        let ret = await http("/questionnaire/update", {
          ...this.form,
          is_diy_options: this.form.is_diy_options ? 1 : 0,
          id: this.id,
          desc: this.$refs.vueEditor.getHtml()
        });
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
    z-index: 1100;
  }
</style>
