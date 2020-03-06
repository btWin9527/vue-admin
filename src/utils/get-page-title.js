import defaultSettings from '@/settings'// 导入默认页面设置
const title = defaultSettings.title || '后台管理页面'
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
