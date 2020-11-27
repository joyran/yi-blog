import Vue from 'vue'
import AlertComp from './components/Alert.vue'

const AlertConstructor = Vue.extend(AlertComp)

const Alert = function (options) {
  options = options || {}
  const instance = new AlertConstructor({
    data: options
  })
  instance.$mount()
  document.body.appendChild(instance.$el)

  instance.visible = true
  return instance
}

export default Alert
