import {debug} from "./util";

/**
 * 不用滚动组件，中间滚动区域的计算
 * @type {{mounted: (function())}}
 */

export const mainTableMixin = {
  data() {
    return {
      tableHeight: 0
    }
  },
  mounted() {
    this._calcTableHeight();
  },
  methods: {
    _calcTableHeight() {
      let h = 60 + 45 + 85 + 30;
      if (this.footerHeight) {
        h += this.footerHeight;
      }
      debug("h", h, window.innerHeight);
      this.tableHeight = window.innerHeight - h;
    }
  }
}
