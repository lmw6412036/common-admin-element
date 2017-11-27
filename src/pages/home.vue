<template>
    <div>
        <el-container>
            <el-aside width="200px" class="aside" :style="asideStyle">
                <div class="admin-info">
                    <div class="avabox">
                        <div class="ava">
                            <img
                                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510493566104&di=6413e88d507a491c835ba93bb7a5b676&imgtype=0&src=http%3A%2F%2Fimg4.ph.126.net%2FZapIVJIoh1y0VooAkbDNDQ%3D%3D%2F3068921671093760774.jpg"
                                    alt="">
                        </div>
                    </div>
                    <div class="info center">
                        李明卫 管理员
                    </div>
                </div>
                <el-menu
                        ref="elMenu"
                        router
                        v-loading="loadedMenu"
                        background-color="#545c64"
                        text-color="#fff"
                        :default-active="$route.path"
                        class="el-menu-vertical-demo">
                    <el-submenu :index="menu.id+''" :key="index" v-for="(menu,index) in menus">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{menu.name}}</span>
                        </template>
                        <el-menu-item v-for="sub in menu.subMenus" :index="sub.url" :key="sub.id">{{sub.name}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="top-bar">
                    <div class="flex">
                        <h1 class="logo-text">管理后台</h1>
                    </div>
                </el-header>
                <el-main :style="mainStyle" class="main-box">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
  import {debug} from "../lib/util"
  import http from "../lib/http"
  import {mapGetters, mapMutations, mapActions} from "vuex"
  import * as types from "../store/types"
  import {getMenusFromData} from "../lib/functions"

  export default {
    data() {
      return {
        loadedMenu: false,
        asideStyle: {},
        mainStyle: {},
      };
    },
    computed: {
      ...mapGetters({
        menus: types.MENUS
      })
    },
    components: {},
    created() {
      let height = window.innerHeight;
      this.asideStyle = {
        height: `${height}px`
      }
      this.mainStyle = {
        height: `${height - 60}px`
      }
      this.getAdminMenu();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getAdminMenu() {
        this.loadedMenu = true;
        let ret = await http('/admin/menu');
        this.loadedMenu = false;
        if (ret.errno == 0) {
          this.handleMenus({menus: ret.data, path: this.$route.path});
          let list = getMenusFromData(ret.data), key = list.findIndex((menu) => {
            return menu.url == this.$route.path;
          })
          this.$nextTick(() => {
            this.$refs.elMenu.open(list[key].cate);
          })
        }

      },
      ...mapActions(['handleMenus'])
    }
  };
</script>

<style scoped lang="scss">
    @import "../common/common";

    .main-box {
        position: relative;
    }

    .aside {
        background-color: map_get($colors, topBarBg);
        .admin-info {
            padding-bottom: 15px;
            .avabox {
                padding: 20px 0;
            }
            .ava {
                margin: 0 auto;
                $w: 60px;
                @include w_h($w, $w);
                overflow: hidden;
                border-radius: $w/2;
                img {
                    @include w_h($w, $w);
                }
            }
            .info {
                color: white;
            }
        }
    }

    .top-bar {
        $height: 60px;
        background-color: map_get($colors, topBarBg);
        height: $height;
        padding: 0;
        .logo-text {
            color: white;
            line-height: $height;
        }
    }


</style>
