<template>
    <div class="vue-editor" v-loading="loading">
        <div id="editorbox" class="vue-editor">
        </div>
        <input ref="file" type="file" @change="imageChange">
    </div>
</template>

<script>
  import Quill from "quill"
  import "quill/dist/quill.snow.css"
  import {debug} from "../lib/util";
  import uploadAjax from "../lib/upload"


  export default {
    props: {
      type: String,
      value: String,
    },
    data() {
      return {
        loading: false,
        editor: null,
        toolbarOptions: [
          ['bold', 'italic', 'underline'], // toggled buttons
          ['blockquote', 'code-block'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['image'],
          ['clean']                                         // remove formatting button
        ]
      };
    },
    computed: {},
    components: {},
    mounted() {
      this.eidtorInit();
    },
    beforeDestroy() {

    },
    watch: {
      value(newV) {
        this.editor && this.editor.pasteHTML(newV);
      }
    },
    methods: {
      eidtorInit() {
        let editorDom = document.querySelector("#editorbox");
        if (!editorDom) {
          setTimeout(this.eidtorInit, 20);
          return
        } else {
          if (this.editor) {
            return
          }
          this.editor = new Quill(editorDom, {
            placeholder: "请输入内容",
            theme: "snow",
            modules: {
              toolbar: this.toolbarOptions
            }
          })
          let toolbar = this.editor.getModule('toolbar')
          toolbar.addHandler("image", this.image);
          this.editor.on("text-change", this.textChange)
        }
      },

      textChange(delta, oldDelta, source) {
        //console.log(this.editor.container.firstChild.innerHTML);
        let html = this.editor.container.firstChild.innerHTML;
        //this.$emit("html", html);
      },

      image() {
        this.$refs.file && (this.$refs.file.click());
      },

      imageChange() {
        let files = this.$refs.file.files;
        this.upload(files);
      },

      getHtml() {
        return this.editor.container.firstChild.innerHTML;
      },

      async upload(files) {
        for (let i = 0; i < files.length; i++) {
          let formdata = new FormData();
          formdata.append("file", files[i]);
          this.loading = true;
          let ret = await uploadAjax("/upload", formdata, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded '}
          });
          this.loading = false
          debug('ret', ret);
          if (ret.errno == 0) {
            this.editor.insertEmbed(this.editor.getSelection().index, 'image', ret.data.url);
          }
        }
      }


    }
  };
</script>

<style scoped lang="scss">
    .vue-editor {
        > input {
            opacity: 0;
            height: 0;
            width: 0;
            position: fixed;
            left: -100px;
            top: -100px;
        }
    }
</style>
