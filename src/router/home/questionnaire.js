import List from "../../pages/questionnaire/list"
import Edit from "../../pages/questionnaire/add"
import Items from "../../pages/questionnaire/items/list"
import ItemEdit from "../../pages/questionnaire/items/add"
export default [
  {
    path: "questionnaire", component: List,
    children: [
      {path: "edit/:id", component: Edit},
      {path: "add", component: Edit},
      {path: ':questionnaireId/items', component: Items,
        children:[
          {path: "edit/:id", component: ItemEdit},
          {path: "add", component: ItemEdit}
        ]}
    ]
  }
]
