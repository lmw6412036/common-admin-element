<template>
    <div
            :style="avaStyle"
            class="ava overflow-hidden">
        <img
                :style="imgStyle"
                :src="src" alt="">
    </div>
</template>

<script>
  export default {
    props: ['url', 'width', 'height'],
    data() {
      return {
        imgStyle: {},
        avaStyle: {},
        src: ""
      };
    },
    computed: {},
    components: {},
    created() {
      this.url && this.init(this.url);
    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {
      url(newV) {
        this.init(newV);
      }
    },
    methods: {
      async init(url) {
        this.avaStyle = {
          height: `${this.height}px`,
          width: `${this.width}px`
        }
        try {
          let img = await this.getImgPromise(url), aspectRatio = parseFloat(img.width / img.height);
          if (aspectRatio <= 1) {
            this.imgStyle = {
              width: `${this.width}px`
            }
          } else {
            this.imgStyle = {
              height: `${this.height}px`
            }
          }
          this.src = url
        } catch (error) {
          throw error;
        }
      },
      getImgPromise(url) {
        return new Promise((res, rej) => {
          let imgObj = new Image();
          imgObj.src = url;
          imgObj.onload = () => {
            res(imgObj);
          }
          imgObj.onerror = () => {
            rej(imgObj);
          }
        })
      }
    }
  };
</script>

<style scoped lang="scss">
    .ava {
        border-radius: 50%;
    }
</style>
