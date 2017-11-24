<template>
  <div class="login">
    <el-form :model="loginForm" status-icon ref="loginForm" label-width="50px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="pass">
        <el-input type="text" v-model="loginForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="submitForm('loginForm')">提交</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import http from "../lib/http"
  import {debug} from "../lib/util"
  import {tokenCache, userToken} from "../lib/cache"

  export default {
    data() {
      return {
        loading: false,
        loginForm: {}
      };
    },
    computed: {},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async submitForm() {
        let form = {...this.loginForm};
        form.pass = hex_md5(form.pass);
        this.loading = true;
        let ret = await http("/admin/login", form);
        this.loading = false;
        if (ret.errno == 0) {
          let user = ret.data, {token} = user;
          tokenCache.set(token);
          userToken.set(user);
          this.$router.push("/home");
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .login {
    position: absolute;
    left: 50%;
    margin-left: -200px;
    width: 400px;
    top: 100px;
  }
</style>
