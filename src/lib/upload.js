import axios from "axios";
import config from "./config"
import {debug} from "./util";
import {Message} from "element-ui"

function getErrmsg(errmsg) {
  if (typeof errmsg == "string") {
    return errmsg;
  }
  return errmsg[Object.keys(errmsg)[0]];
}

export default function (service, options, conf) {
  //data.random = makeRandom(4);
  //const sign = hex_md5(hex_md5(config.password) + JSON.stringify(data));
  let axiosConfig = {
    url: options.mock ? "/api" : config.api_url + service,
  }

  debug("==>" + service);
  return axios.post(axiosConfig.url, options, conf)
    .then((res) => {
      if (res.status == 200) {
        debug("<==" + service, res.data);
        return res.data;
      }
    })
    .then((data) => {
      if (data.errno != 0) {
        let errmsg = getErrmsg(data.errmsg);
        Message.error(errmsg || "服务器错误：" + data.errno);
      }
      return data;
    });
}
