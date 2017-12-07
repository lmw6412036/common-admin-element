import List from "../../pages/coclass/list"
import Edit from "../../pages/coclass/add"

export default [
  {
    path: "coclass", component: List,
    children: [
      {path: "edit/:id", component: Edit},
      {path: "add", component: Edit}
    ]
  }
]
