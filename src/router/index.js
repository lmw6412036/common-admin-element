import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'

import home from "./home"
import login from "./login"
import {tokenCache} from "../lib/cache";

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: Index
        },
        ...home,
        ...login
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => {
        return record.meta.needLogin
    })) {
        if(tokenCache.get()){
            next();
        }else{
            next({
                path:"/login"
            })
        }
    }
    else {
        next()
    }

})

export default router