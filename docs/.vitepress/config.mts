import { defineConfig } from 'vitepress'

const pages = [
  ['使用指南', 'Guides', [
    ['安装与第一个任务','Installation','guide/start'],
    ['恢复与排错','Recovery','guide/recovery']]],
  ['材料收集', 'Material collection', [
    ['总览与流程','Overview','guide/supply'],
    ['需求与规划','Demand and planning','supply/planning'],
    ['来源访问','Source access','supply/travel'],
    ['容器取货与潜影盒','Containers and shulker boxes','supply/containers'],
    ['合成与物资账目','Crafting and accounting','supply/crafting'],
    ['库存分级','Inventory levels','supply/inventory'],
    ['库存要求与水位','Inventory requirements and levels','supply/stock'],
      ['补给与执行恢复','Maintenance and recovery','supply/maintenance'],
    ['交付与结果','Delivery and results','supply/delivery']]],
  ['寻路与旅行', 'Navigation and travel', [
    ['总览与层次','Overview','guide/navigation'],
    ['目的地与到达条件','Destinations and arrival','navigation/targets'],
    ['路线与跨维度','Routes and dimensions','navigation/routes'],
    ['局部寻路与移动','Local paths and movement','navigation/local'],
    ['鞘翅飞行','Elytra flight','navigation/flight'],
    ['烟花储备与补给','Rocket reserves and replenishment','navigation/fuel'],
    ['预算','Budgets','navigation/budgets'],
    ['观察与异常处理','Observation and failures','navigation/recovery']]],
  ['建造', 'Construction', [
    ['总览','Overview','guide/construction'],
    ['布局与勘察','Layout and survey','construction/planning'],
    ['施工物资与补给','Construction supplies','construction/supplies'],
    ['井道','Shaft','construction/shaft'],
    ['连接道路','Access road','construction/road'],
    ['工作站','Workstation','construction/workstation'],
    ['清场','Site clearing','construction/clearing'],
    ['原理图施工','Schematic building','construction/schematic']]],
  ['完整参考', 'Reference', [
    ['执行控制与队列','Execution control and queues','reference/task-control'],
    ['执行入口','Execution entries','reference/executables'],
    ['诊断命令','Diagnostic commands','reference/commands'],
    ['配置选项','Configuration','reference/config'],
    ['输入文件','Input files','reference/files'],
    ['调试 HTTP','Debug HTTP','reference/http'],
    ['状态与错误码','States and failures','reference/failures']]],
  ['开发与语义', 'Development', [
    ['架构与术语','Architecture','developer/architecture'],
    ['声明执行入口','Declare an entry','developer/executables'],
    ['开发测试','Development tests','developer/testing'],
    ['Java API','Java API','developer/api'],
    ['Atlas 知识库','Atlas knowledge','developer/atlas'],
    ['覆盖范围与版本','Coverage and version','reference/coverage']]]
] as const
function theme(en: boolean) {
  const prefix = en ? '/en/' : '/'
  return {
    siteTitle: 'Lattivium',
    nav: [
      { text: en ? 'Guide' : '指南', link: prefix + 'guide/start' },
      { text: en ? 'Materials' : '材料收集', link: prefix + 'guide/supply' },
      { text: en ? 'Travel' : '寻路与旅行', link: prefix + 'guide/navigation' },
      { text: en ? 'Construction' : '建造', link: prefix + 'guide/construction' },
      { text: en ? 'Reference' : '参考', link: prefix + 'reference/executables' },
      { text: en ? 'Development' : '开发', link: prefix + 'developer/architecture' }
    ],
    sidebar: pages.map(group => ({
      text: group[en ? 1 : 0], collapsed: false,
      items: group[2].map(page => ({
        text: page[en ? 1 : 0], link: prefix + page[2],
        ...(page[2] === 'reference/executables' ? { collapsed: false, items: [
          { text: en ? 'Task' : 'Task · 业务任务', link: prefix + 'reference/tasks' },
          { text: en ? 'Flow' : 'Flow · 操作编排', link: prefix + 'reference/flows' },
          { text: en ? 'Action' : 'Action · 底层动作', link: prefix + 'reference/actions' }
        ] } : {})
      }))
    })),
    outline: { level: [2, 3] as [number, number], label: en ? 'On this page' : '本页目录' },
    docFooter: { prev: en ? 'Previous' : '上一页', next: en ? 'Next' : '下一页' },
    lastUpdated: { text: en ? 'Updated' : '更新于' },
    sidebarMenuLabel: en ? 'Menu' : '目录', returnToTopLabel: en ? 'Back to top' : '回到顶部',
    darkModeSwitchLabel: en ? 'Appearance' : '外观',
    darkModeSwitchTitle: en ? 'Switch to dark theme' : '切换为深色',
    lightModeSwitchTitle: en ? 'Switch to light theme' : '切换为浅色',
    skipToContentLabel: en ? 'Skip to content' : '跳转正文', langMenuLabel: en ? 'Language' : '语言',
    editLink: { pattern: 'https://github.com/cwc020730/lattivium-docs/edit/main/docs/:path', text: en ? 'Edit this page' : '编辑此页' }
  }
}
export default defineConfig({
  title: 'Lattivium', base: '/lattivium-docs/', lastUpdated: true,
  locales: {
    root: { label: '简体中文', lang: 'zh-CN', description: 'Lattivium 使用手册与接口参考', themeConfig: theme(false) },
    en: { label: 'English', lang: 'en', description: 'Lattivium user manual and API reference', themeConfig: theme(true) }
  },
  themeConfig: {
    i18nRouting: true,
    search: { provider: 'local', options: { locales: { root: { translations: {
      button: { buttonText: '搜索', buttonAriaLabel: '搜索文档' },
      modal: { displayDetails: '显示详情', resetButtonTitle: '清除搜索', backButtonTitle: '返回', noResultsText: '未找到结果',
        footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } }
    } } } } },
    socialLinks: [{icon:'github',link:'https://github.com/cwc020730/lattivium-docs'}]
  }
})
