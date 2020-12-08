import Alert from './alert'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Event from './event'

export default ({ Vue, options, router, siteData }) => {
  Vue.use(ElementUI)
  Vue.prototype.$alert = Alert
  Vue.prototype.$event = new Event()
}
