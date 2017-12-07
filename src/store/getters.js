import * as types from "./types"

export default {
  [types.MENUS](state) {
    return state[types.MENUS]
  },
  [types.CURRENT_MENU](state) {
    return state[types.CURRENT_MENU]
  }
}
