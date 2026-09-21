import { defineConfig } from 'vitepress'
export default defineConfig({
  lang: 'zh-CN', title: 'Lattivium', description: 'Bot 自动化 · 使用手册与接口参考',
  base: '/lattivium-docs/', lastUpdated: true,
  head: [['meta', {name: 'theme-color', content: '#2563eb'}]],
  themeConfig: {
    siteTitle: 'Lattivium · 手册',
    nav: [{text:'开始使用',link:'/guide/start'},{text:'命令',link:'/reference/executables'},{text:'开发者',link:'/developer/architecture'}],
    sidebar: [
      {text:'使用指南',items:[{text:'安装与第一个任务',link:'/guide/start'},{text:'材料收集与合成',link:'/guide/supply'},{text:'移动与跨维度',link:'/guide/navigation'},{text:'清场与建造',link:'/guide/construction'},{text:'暂停、恢复与排错',link:'/guide/recovery'}]},
      {text:'完整参考',items:[{text:'JSON 执行入口',link:'/reference/executables'},{text:'位置参数与诊断',link:'/reference/commands'},{text:'配置选项',link:'/reference/config'},{text:'输入文件格式',link:'/reference/files'},{text:'调试 HTTP 接口',link:'/reference/http'},{text:'状态与错误码',link:'/reference/failures'}]},
      {text:'开发与语义',items:[{text:'架构与术语',link:'/developer/architecture'},{text:'入口契约',link:'/developer/executables'},{text:'Java API',link:'/developer/api'},{text:'兼容网络协议',link:'/developer/network'},{text:'Atlas 知识库',link:'/developer/atlas'},{text:'覆盖范围与版本',link:'/reference/coverage'}]}
    ],
    search: {provider:'local'}, outline: {level:[2,3],label:'本页目录'},
    docFooter: {prev:'上一页',next:'下一页'}, lastUpdated: {text:'最后更新'},
    socialLinks:[{icon:'github',link:'https://github.com/cwc020730/lattivium-docs'}],
    editLink:{pattern:'https://github.com/cwc020730/lattivium-docs/edit/main/docs/:path',text:'修改此页'},
    footer:{message:'Lattivium 使用手册'}
  }
})
