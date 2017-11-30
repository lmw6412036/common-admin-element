import Home from "../pages/home.vue"
import Main from "../pages/main.vue"
import MenuList from "../pages/menu/list.vue"
import MenuAdd from "../pages/menu/add.vue"
import Rule from "../pages/rule/list.vue"
import RoleAdd from '../pages/rule/add.vue'
import Coclass from "../pages/coclass/list.vue"
import CoclassAdd from '../pages/coclass/add.vue'

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
      },
      {
        path: "role",
        component: Rule,
        children: [
          {path: "add", component: RoleAdd},
          {path: "edit/:id", component: RoleAdd}
        ]
      },
      {
        path: "coclass",
        component: Coclass,
        children: [
          {path: "add", component: CoclassAdd},
          {path: "edit/:id", component: CoclassAdd}
        ]
      }
    ]
  }
]
