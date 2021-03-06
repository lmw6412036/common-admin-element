import axios from "axios";
import config from "./config"
import {debug} from "./util";
import {tokenCache} from "./cache";
import {Message} from "element-ui"

function getErrmsg(errmsg) {
  if (typeof errmsg == "string") {
    return errmsg;
  }
  return errmsg[Object.keys(errmsg)[0]];
}

export default function (service, options, conf) {
  let baseParams = config.base_params,
    data = {
      ...baseParams,
      ...options
    },
    token = tokenCache.get();
  token && (data.token = token);
  //data.random = makeRandom(4);
  //const sign = hex_md5(hex_md5(config.password) + JSON.stringify(data));
  let axiosConfig = {
    url: data.mock ? "/api" : config.api_url + service,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  }

  if (conf) {
    axiosConfig = Object.assign({}, axiosConfig, conf);
  }

  debug("==>" + service);
  debug(axiosConfig);
  return axios(axiosConfig)
    .then((res) => {
      if (res.status == 200) {
        debug("<==" + service, res.data);
        return res.data;
      }
    })
    .then((data) => {
      if (data.errno != 0) {
        let errmsg = "";
        if (typeof data.errmsg != "string") {
          errmsg = data.errmsg[Object.keys(data.errmsg)[0]]
        } else {
          errmsg = data.errmsg;
        }
        Message.error(errmsg || "服务器错误：" + data.errno);
      }
      return data;
    });
}
