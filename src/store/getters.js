import * as types from "./types"

export default {
  [types.MENUS](state) {
    return state[types.MENUS]
  },
  [types.BREAD_CRUMB_S](state) {
    return state[types.BREAD_CRUMB_S]
  },
  [types.BREAD_CRUMB_F](state) {
    return state[types.BREAD_CRUMB_F]
  }
}
