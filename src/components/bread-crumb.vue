<template>
  <el-breadcrumb class="bread-crumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{fMenu}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{sMenu}}</el-breadcrumb-item>
    <slot></slot>
  </el-breadcrumb>
</template>

<script>
  import {debug} from "../lib/util"
  import * as types from "../store/types"
  import {mapMutations, mapGetters} from "vuex"

  export default {
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        menus: types.MENUS,
        fMenu: types.BREAD_CRUMB_F,
        sMenu: types.BREAD_CRUMB_S
      })
    },
    components: {},
    created() {
      this.setBreadCrumb(this.$route.path);
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      ...mapMutations(['setBreadCrumb'])
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/common";

  .bread-crumb {
    padding-left: 20px;
    @include h_lh(45px);
    background-color: #F8F8F8;
  }
</style>
