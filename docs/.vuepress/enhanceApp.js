import Alert from './alert'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default ({ Vue, options, router, siteData }) => {
  Vue.use(ElementUI)
  Vue.prototype.$alert = Alert
}
