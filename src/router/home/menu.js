import Menu from "../../pages/menu/list"
import MenuEdit from "../../pages/menu/add"

export default [
  {
    path: "menu", component: Menu,
    children: [
      {path: "edit/:id", component: MenuEdit},
      {path: "add", component: MenuEdit}
    ]
  }
]
