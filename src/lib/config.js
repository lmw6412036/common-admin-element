export default {
  key_prefix: "common_admin_",
  api_url: "//127.0.0.1:8370/api",
  //api_url: "//nethos.diandianys.com/api/app",
  base_params: {
    channel: "1",
    format: "JSON",
    oper: "127.0.0.1",
    spid: "1001",
  },
  password: "aAr9MVS9j1",
  menus: [
    {
      name: "远程会诊", value: "1", subs: [
        {name: "我发起的", value: "11", path: "/home/consult-group/send"},
        {name: "我收到的", value: "12", path: "/home/consult-group/receive"}
      ]
    },
    {
      name: "双向转诊", value: "2", subs: [
        {name: "我发起的", value: "21"},
        {name: "我收到的", value: "22"}
      ]
    }
  ],
  consult_group_tabs: [
    {name: "wait", label: "待处理"},
    {name: "complete", label: "已完成"},
    {name: "cancel", label: "已取消"}
  ]
}
