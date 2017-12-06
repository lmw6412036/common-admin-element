<template>
  <div class="show-time">
    {{showTime}}
  </div>
</template>

<script>
  import timeFormat from 'lmw-time-format'

  export default {
    data() {
      return {
        showTime: ""
      };
    },
    computed: {},
    components: {},
    created() {
      this.djs();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      djs() {
        let t = new Date().getTime();
        this.showTime = timeFormat(t, `%Y年%m月%d日 %H:%M:%S`) + ` 星期${['日', '一', "二", "三", "四", "五", "六"][timeFormat(t, '%w')]}`;
        setTimeout(this.djs, 1000)
      }
    }
  };
</script>

<style scoped lang="scss">
  .show-time {
    padding-left: 35px;
    color: #515151;
    font-weight: 600;
  }
</style>
