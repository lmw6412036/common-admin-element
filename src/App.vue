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
  @import "common/common";

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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

  .page {
    background-color: white;
    position: absolute;
    left: 0;
    top: 0;
    overflow-y: auto;
    @include w_h(100%, 100%);

  }
</style>
