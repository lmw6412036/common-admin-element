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
  return axios(axiosConfig)
    .then((res) => {
      if (res.status == 200) {
        debug("<==" + service, res.data);
        return res.data;
      }
    })
    .then((data) => {
      if (data.errno != 0) {
        Message.error(getErrmsg(data.errmsg));
      }
      return data;
    });
}
