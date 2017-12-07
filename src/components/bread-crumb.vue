<template>
  <el-breadcrumb class="bread-crumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :key="item.value" v-for="item in lists">{{item.name}}</el-breadcrumb-item>
    <slot></slot>
  </el-breadcrumb>
</template>

<script>
  import {debug} from "../lib/util"
  import * as types from "../store/types"
  import {mapGetters} from "vuex"

  export default {
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        lists: types.CURRENT_MENU
      })
    },
    components: {},
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../common/common";

</style>
