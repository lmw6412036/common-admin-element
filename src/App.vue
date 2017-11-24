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

  .page {
    position: absolute;
    left: 0;
    top: 0;
    @include w_h(100%, 100%);
  }
</style>
