<template>
  <div class="page-header flex">
    <div class="flex1 text">
      <slot></slot>
    </div>
    <div class="flex0" @click.stop="close"><i class="el-icon-close"></i>关闭</div>
  </div>
</template>

<script>
  import {debug} from "../lib/util"

  export default {
    data() {
      return {};
    },
    computed: {},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      close() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/common";

  .page-header {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #F8F8F8;
    @include h_lh(45px);
    width: 100%;
    z-index: 1100;
    padding: 0 20px;
  }
</style>
