<template>
    <div>
        <div class="login-back">
            <img src="../assets/images/back.png" alt="">
            <div class="login-box">
                <div class="login-img">
                    <img src="../assets/images/tylogo.png" alt="">
                </div>
                <form class="login-form clearfix">
                    <div class="login-tit marginT20"><h1 style="font-size: 32px;color:#01abac;text-align: center;">
                        双向转诊管理平台</h1></div>
                    <div class="clearfix login-tit  login-item-wrap " style="margin-top:50px;">
                        <label class="login-icon-label login-icon-id w30 h34 fl"></label>
                        <input type="text" style="width:90%;" class="login-input h34  fl"
                               placeholder="请输入手机号" v-model="loginForm.name" required>
                    </div>
                    <div class="clearfix login-tit  login-item-wrap" style="margin-top:30px;">
                        <label class="login-icon-label login-icon-pwd w30 h34 fl"></label>
                        <input type="password" style="width:90%;" class="login-input h34  fl"
                               placeholder="请输入密码" v-model="loginForm.pass" required>
                    </div>
                    <el-button type="primary" style="margin-top:30px;" class="login-btn  login-tit"
                               @click="submitForm"
                               :loading="loading">立即登录
                    </el-button>
                    <div class="link-wrap login-tit  fontSize12" style="margin-top:30px;">
                        <router-link to="">找回密码</router-link>
                    </div>
                </form>
            </div>
        </div>
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
        loginForm: {
          name: "admin"
        }
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
          let user = ret.data, token = ret.data.token;
          tokenCache.set(token);
          userToken.set(user);
          this.$router.push("/home");
        }
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "../common/common";
    /*登录页样式*/
    .login-form {
        width: 400px;
        height: 520px;
        position: absolute;
        left: 520px;
        top: 0;
        padding: 50px 0px;
        box-sizing: border-box;
        background-color: #f7f7f7;
        border-radius: 4px;
        box-shadow: 0 0 10px #c7c7c7;
    }

    .login-form-title {
        position: absolute;
        box-sizing: border-box;
        height: 28px;
        width: 212px;
        left: 50%;
        top: 16%;
        margin-left: -106px;
        line-height: 28px;
        padding-left: 40px;
        color: #00b2b1;
        background-image: url("../assets/images/icon-logo.png");
        background-repeat: no-repeat;

    }

    .login-item-wrap {
        display: inline-block;
        border-radius: 3px;
        // border: 1px solid #c7c7c7;

    }

    .login-input {
        box-sizing: border-box;
        padding-left: 10px;
        border: 1px solid #c7c7c7;
        border-radius: 0 3px 3px 0;
        background-color: #fff;
        &:focus {
            border-color: #00b2b1;
        }
    }

    .login-icon-label {
        box-sizing: border-box;
        border-left: 1px solid #c7c7c7;
        border-top: 1px solid #c7c7c7;
        border-bottom: 1px solid #c7c7c7;
        border-radius: 3px 0 0 3px;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #f4f4f4;
    }

    .login-btn {
        width: 252px;
    }

    .link-wrap {
        width: 252px;
        margin-top: 5px;
        text-align: right;
    }

    .login-icon-captcha {
        background-image: url("../assets/images/icon-login-captcha.png");
    }

    .login-icon-id {
        background-image: url("../assets/images/icon-login-id.png");
    }

    .login-icon-pwd {
        background-image: url("../assets/images/icon-login-pwd.png");
    }

    /*登录注册页面头部样式*/
    .login-title {
        padding-left: 80px;
        position: relative;
        font-size: 20px;
        font-weight: 600;
        line-height: 50px;
        border-bottom: 1px solid #d9d9d9;

        span {
            position: absolute;
            top: 50%;
            left: 53px;
            height: 16px;
            width: 16px;
            margin-top: -8px;
            background-color: $cBlue6;
            background-image: url("../assets/images/icon-arrow.png");
            background-position: center;
            background-repeat: no-repeat;
        }
    }

    .login-back {
        width: 100%;
        height: 90%;
        box-sizing: border-box;
        overflow: hidden;
        background: #ccc;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    .login-box {
        width: 920px;
        height: 520px;
        background: #ccc;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    .login-img {
        width: 520px;
        height: 520px;
    }

    .login-input {
        background-color: #fff;
    }

    .login-tit {
        width: 80%;
        margin-left: 10%;
    }

    .el-button--primary:hover {
        background: #01abac;
    }
</style>
