import Home from "../pages/home.vue"
import Main from "../pages/main.vue"
import MenuList from "../pages/menu/list.vue"
import MenuAdd from "../pages/menu/add.vue"

export default [
  {
    path: "/home",
    component: Home,
    meta: {
      needLogin: true
    },
    children: [
      {path: "", component: Main},
      {
        path: "menu",
        component: MenuList,
        children: [
          {path: "add", component: MenuAdd},
          {path: "edit/:id", component: MenuAdd}]
      }
    ]
  }
]
