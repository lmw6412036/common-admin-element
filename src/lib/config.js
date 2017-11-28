export default {
  key_prefix: "common_admin_",
  api_url: "//lmwcms-webapi.limingwei.name/api",
  //api_url: "//localhost:8370/api",
  base_params: {
    channel: "23",
    format: "JSON",
    oper: "127.0.0.1",
    random: "1234",
    sign: "3f52f63fad63c5dd209d28420977fb5d",
    spid: "1001",
  },
  nav: [
    {name: "home", value: "首页"},
    {name: "my-doc", value: "我的医生"},
    {name: "health", value: "健康"},
    {name: "my", value: "我的"}
  ],
  index_fast_nav: [
    {name: "fast-consult", value: "快速咨询", text: "医生说", path: "/"},
    {name: "fast-consult", value: "快速咨询", text: "问医生", path: "/ask-doc"},
    {name: "ask-doc", value: "问医生", text: "更多功能", path: "/more"}
  ],
  index_nav: [
    {name: "guide", value: "我的医生"},
    {name: "book", value: "预约挂号"},
    {name: "queuing", value: "就诊加号"},
    {name: "payment", value: "眼底病优先通道"},
    {name: "report", value: "眼外伤快速预约"},
    {name: "more", value: "更多"}
  ],
  my_doc_nav: [
    {name: "follow", value: "关注医生", path: "/follow-doc"},
    {name: "circle", value: "医生圈", path: "doc-circle"}
  ],
  health_nav: [
    {name: "archives", value: "健康档案"},
    {name: "wiki", value: "健康百科"}
  ],
  my_nav: [
    {name: "my-consult", value: "我的咨询", path: "/my-consult"},
    {name: "my-book", value: "我的挂号", path: "/my-book"},
    {name: "common-visitperson", value: "常用就诊人", path: "/common-visitperson"},
    {name: "archives", value: "健康档案", path: "/archives"},
    {name: "wallet", value: "我的钱包", path: "/wallet"},
    {
      name: "account", value: "账户相关", path: "/account", child: [
      {name: "", value: "修改绑定手机号"},
      {name: "", value: "修改密码"}
    ]
    },
    {name: "about", value: "关于", path: "/about"}
  ],
  doc_nav: [
    {name: "book", value: "预约挂号"},
    {name: "apply", value: "加号申请"},
    {name: "baodao", value: "患者报到"}
  ],
  book_doc_nav: [
    {name: "bypeople", value: "按专家预约"},
    {name: "bytime", value: "按时间预约"}
  ],
  basic_situation: [
    {name: "", value: "所患疾病"},
    {name: "", value: "既往史"},
    {name: "", value: "家族史"},
    {name: "", value: "过敏史"},
  ],
  consult_type_nav: [
    {name: "", value: "全部问诊"},
    {name: "", value: "全部状态"}
  ],
  consult_status: [
    {name: "待付款", status: "0"},
    {name: "待处理", status: "2"},
    {name: "进行中", status: "3"},
    {name: "待评价", status: "5"},
    {name: "已评价", status: "7"},
    {name: "已取消", status: "-1"},
  ],
  book_order_status: [
    {name: "已取消", status: "0"},
    {name: "待取号", status: "1"},
    {name: "待评价", status: "2"},
    {name: "已评价", status: "3"},
    {name: "已过期", status: "4"}
  ],
  help: [
    {name: "全科分诊", class: "qkfz"},
    {name: "名医视频", class: "mysp"},
    {name: "在线医生", class: "zxys"},
    {name: "预约挂号", class: "yygh"},
    {name: "常用就诊人", class: "cyjzr"},
    {name: "健康档案", class: "jkda"},
    {name: "消费明细", class: "xfmx"},
    {name: "修改绑定手机号", class: "xgbdsjh"},
    {name: "修改密码", class: "xgmm"}
  ]
}
