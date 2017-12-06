import * as types from "./types"

export default {
  [types.CURRENT_MENU](state, payload) {
    state[types.CURRENT_MENU] = payload
  },
}
