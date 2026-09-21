import { defineConfig } from 'vitepress'

const pages = [
  ['使用指南', 'Guides', [
    ['安装与第一个任务','Installation','guide/start'],
    ['材料收集与合成','Supply and crafting','guide/supply'],
    ['移动与跨维度','Navigation','guide/navigation'],
    ['清场与建造','Construction','guide/construction'],
    ['恢复与排错','Recovery','guide/recovery']]],
  ['完整参考', 'Reference', [
    ['任务控制与队列','Task control and queues','reference/task-control'],
    ['JSON 执行入口','JSON execution entries','reference/executables'],
    ['Task · 业务任务','Task','reference/tasks'],
    ['Flow · 操作编排','Flow','reference/flows'],
    ['Action · 底层动作','Action','reference/actions'],
    ['位置参数与诊断','Positional commands','reference/commands'],
    ['配置选项','Configuration','reference/config'],
    ['输入文件','Input files','reference/files'],
    ['调试 HTTP','Debug HTTP','reference/http'],
    ['状态与错误码','States and failures','reference/failures']]],
  ['开发与语义', 'Development', [
    ['架构与术语','Architecture','developer/architecture'],
    ['声明执行入口','Declare an entry','developer/executables'],
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
      { text: en ? 'Reference' : '参考', link: prefix + 'reference/executables' },
      { text: en ? 'Development' : '开发', link: prefix + 'developer/architecture' }
    ],
    sidebar: pages.map(group => ({
      text: group[en ? 1 : 0], collapsed: false,
      items: group[2].map(page => ({ text: page[en ? 1 : 0], link: prefix + page[2] }))
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
