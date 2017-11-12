<template>
    <div>
        <el-container>
            <el-aside width="200px" class="aside" :style="asideStyle">
                <div class="admin-info">
                    <div class="avabox">
                        <div class="ava">
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510493566104&di=6413e88d507a491c835ba93bb7a5b676&imgtype=0&src=http%3A%2F%2Fimg4.ph.126.net%2FZapIVJIoh1y0VooAkbDNDQ%3D%3D%2F3068921671093760774.jpg"
                                 alt="">
                        </div>
                    </div>
                    <div class="info center">
                        李明卫 管理员
                    </div>
                </div>
                <el-menu default-active="2"
                         background-color="#545c64"
                         text-color="#fff"
                         class="el-menu-vertical-demo"
                         @open="handleOpen"
                         @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="top-bar">
                    <div class="flex">
                        <h1 class="logo-text">管理后台</h1>
                    </div>
                </el-header>
                <el-main :style="mainStyle">Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                asideStyle: {},
                mainStyle: {}
            };
        },
        computed: {},
        components: {},
        created() {
            let height = window.innerHeight;
            this.asideStyle = {
                height: `${height}px`
            }
            this.mainStyle = {
                height: `${height - 60}px`
            }
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
