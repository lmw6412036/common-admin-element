import Home from "../pages/home.vue"
import Main from "../pages/main.vue"
import MenuList from "../pages/menu/list.vue"

export default [
  {
    path: "/home",
    component: Home,
    meta: {
      needLogin: true
    },
    children: [
      {path: "", component: Main},
      {path: "menu", component: MenuList}
    ]
  }
]
