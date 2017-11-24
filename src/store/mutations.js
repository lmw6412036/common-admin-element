import * as types from "./types"

export default {
  [types.MENUS](state, payload) {
    state[types.MENUS] = payload
  }
}
