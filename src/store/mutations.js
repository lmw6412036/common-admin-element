import * as types from "./types"

export default {
  [types.MENUS](state, payload) {
    state[types.MENUS] = payload
  },
  setBreadCrumb(state, payload) {
    let menus = state[types.MENUS];
    menus.forEach((menu) => {
      menu.subMenus.forEach((sub) => {
        if (sub.url === payload) {
          state[types.BREAD_CRUMB_F] = menu.name;
          state[types.BREAD_CRUMB_S] = sub.name;
        }
      })
    })
  }
}
