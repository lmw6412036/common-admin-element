<template>
  <div
    class="header">
    <!--上头部-->
    <el-row class="header-wrap overflow-hidden">
      <el-col :span="3" class="flex">
        <div class="toggle-btn">
          <button class="header-show-btn-wrap">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="go-back">
          <i class="el-icon-arrow-left"></i><i class="el-icon-arrow-right"></i>
        </div>
      </el-col>
      <el-col :offset="24-3-5" :span="5">
        <ul class="header-nav flex">
          <li>
            <i class="el-icon-message"></i>消息
          </li>
          <li>
            <i class="el-icon-setting"></i>设置
          </li>
          <li>
            <i class="el-icon-sold-out"></i>退出
          </li>
        </ul>
      </el-col>
    </el-row>
    <!--下头部-日期-->
    <el-row class="header-date">
      <el-col :span="12">
        <show-time></show-time>
      </el-col>
      <el-col class="header-nav" :span="12">
        <bread-crumb></bread-crumb>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import BreadCrumb from "../../components/bread-crumb.vue"
  import ShowTime from "../../components/show-time"

  export default {
    data() {
      return {};
    },
    computed: {},
    components: {BreadCrumb, ShowTime},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/common";

  $height: 50px;
  $heightDate: 35px;
  .header-wrap {
    height: $height;
    border-bottom: 1px solid #cccccc;
    background-color: #fff;
  }

  /*header 左侧按钮*/
  .toggle-btn {
    border-right: 1px solid #cccccc;
    width: $height;
  }

  .go-back {
    line-height: $height;
    i {
      color: #666666;
      font-size: 26px;
    }
  }

  .header-nav {
    > li {
      line-height: $height;
      color: #666666;
      width: (100% / 3);
    }
    padding-right: 35px;
    text-align: right;
    > div {
      display: inline-block;
    }
  }

  .header-show-btn-wrap {
    border: 1px solid transparent;
    outline: none;
    width: $height - 1px;
    height: $height - 1px;
    background-color: #fff;
    cursor: pointer;
    span {
      display: block;
      height: 2px;
      width: 18px;
      margin: 4px auto;
      background-color: $cGray2;
    }
  }

  /*header下侧*/
  .header-date {
    height: $heightDate;
    line-height: $heightDate;
    //background-color: #e3e1e2;
    background-color: rgba(227, 225, 226, 0.69);
  }
</style>
