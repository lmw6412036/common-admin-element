import Home from "../pages/home.vue"

export default [
    {
        path: "/home",
        component: Home,
        meta: {
            needLogin: true
        }
    }
]