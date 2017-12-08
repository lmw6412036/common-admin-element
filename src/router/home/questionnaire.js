import List from "../../pages/questionnaire/list"
import Edit from "../../pages/questionnaire/add"

export default [
  {
    path: "questionnaire", component: List,
    children: [
      {path: "edit/:id", component: Edit},
      {path: "add", component: Edit}
    ]
  }
]
