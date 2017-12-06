<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import "./common/common";

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .my-tabs .el-tabs__header {
    margin-bottom: 0px;
  }

  .my-filter-box {
    .my-form-item {
      margin-bottom: 10px;
    }
  }

  .main-page-box.page {
    .filter-box {
      padding: 10px 10px 0 10px;
      background-color: #ffffff;
    }
    padding: 10px;
    background-color: #f1f1f1;
  }

  .el-submenu__title:hover {
    border-right: 2px solid orange;
    background-color: $cBlue5;
  }

  .icon-ok {
    width: 68px;
    height: 68px;
    margin-right: 20px;
    border-radius: 50%;
    background-color: $cBlue6;
    background-image: url("./assets/images/icon-login-ok.png");
    background-position: center;
    background-repeat: no-repeat;
  }

  .filter-form {
    padding: 10px 20px;
  }

  .main-table {
    padding: 0 20px;
  }

  .main-form {
    margin-top: 55px;
    padding-right: 20px;
  }

  .main-footer {
    display: flex;
    flex-direction: row-reverse;
    padding-top: 10px;
  }

  .el-pager li.active {
    color: #ffffff;
  }

  .page {
    background-color: white;
    position: absolute;
    left: 0;
    top: 0;
    overflow-y: auto;
    @include w_h(100%, 100%);
    &.zIndex {
      z-index: 1000;
    }
  }
</style>
