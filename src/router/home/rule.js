import Rule from "../../pages/rule/list"
import RuleEdit from "../../pages/rule/add"

export default [
  {
    path: "rule", component: Rule,
    children: [
      {path: "edit/:id", component: RuleEdit},
      {path: "add", component: RuleEdit}
    ]
  }
]
