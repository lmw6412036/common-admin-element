<template>
  <div class="page form-page">
    <page-header>{{id?'修改':'添加'}}问卷题目</page-header>
    <div v-loading="loading" class="main-form">
      <el-form ref="form" :model="form" size="small" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="题目">
              <el-input type="textarea" :rows="2" placeholder="请输入题目" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="题目排序">
              <el-input placeholder="排序值" v-model="form.sort"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题目类型">
              <el-select placeholder="类型选择" v-model="form.type">
                <el-option v-for="option in optionsType" :key="option.id" :value="option.title" :label="option.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="题目选项默认排序规则">
              <el-input placeholder="默认排序规则" v-model="form.options_sort"></el-input>
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
  import PageHeader from "../../../components/page-header.vue"
  import http from "../../../lib/http"

  export default {
    data() {
      return {
        optionsType:[],
        questionnaireId: "",
        id: "",
        type: "",
        loading: false,
        form: {}
      };
    },
    computed: {},
    components: {
      PageHeader
    },
    created() {
      this.getOptionsType();
      let {id, questionnaireId} = this.$route.params;
      this.questionnaireId = questionnaireId;
      id && this.getDetail(id) && (this.id = id);
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getOptionsType() {
        this.loading = true;
        let ret = await http("/coclass", {fid: 55})
        this.loading = false;
        if (ret.errno == 0) {
          this.optionsType = ret.data;
        }
      },
      async getDetail(id) {
        this.loading = true;
        let ret = await http('/questionnaire/items/detail', {id, questionnaire: this.questionnaireId});
        if (ret.errno == 0) {
          this.form = ret.data
        }
        this.loading = false
      },
      async add() {
        this.loading = true;
        let ret = await http("/questionnaire/items/add", {
          ...this.form,
          questionnaire: this.questionnaireId
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
        let ret = await http("/questionnaire/items/update", {
          ...this.form,
          id: this.id,
          questionnaire: this.questionnaireId
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
