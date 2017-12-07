import Home from "../pages/home.vue"
import HomeMain from "../pages/home/main.vue"

import Menu from "./home/menu"

export default [
  {
    path: "/home",
    component: Home,
    meta: {
      needLogin: true
    },
    children: [
      {path: "", component: HomeMain},
      ...Menu
    ]
  }
]
