import {debug} from "./util";
import {userToken} from "./cache";

/**
 * 不用滚动组件，中间滚动区域的计算
 * @type {{mounted: (function())}}
 */
export const mainTableMixin = {
  data() {
    return {
      mainTableMixin_tableHeight: 100
    }
  },
  mounted() {
    this.mainTableMixin_calcTableHeight();
  },
  methods: {
    mainTableMixin_calcTableHeight() {
      let h = 85 + 20 + 55 + 40;
      if (this.footerHeight) {
        h += this.footerHeight;
      }
      this.mainTableMixin_tableHeight = window.innerHeight - h;
    }
  }
}

export const userMixin = {
  data() {
    return {
      userMixin_user: {}
    }
  },
  created() {
    this.userMixin_user = userToken.get();
  },
  methods: {}

}

