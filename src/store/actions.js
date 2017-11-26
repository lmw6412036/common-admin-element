import * as types from "./types"
import http from "../lib/http"

export default {
  handleMenus({commit, state}, {menus, path}) {
    commit(types.MENUS, menus);
    commit("setBreadCrumb", path);
  }
}
