import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'

import home from "./home"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Index
        },
        ...home
    ]
})
