<template>
    <div class="page-header flex">
        <div class="flex1 text">
            <slot></slot>
        </div>
        <div class="flex0 icon" @click="close"><span class="el-icon-close"></span>关闭</div>
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
        padding: 0 20px;
    }
</style>
