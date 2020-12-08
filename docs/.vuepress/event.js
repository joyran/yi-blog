export default class Event {
  constructor () {
    this.events = {}
  }

  on (eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }

    this.events[eventName].push({
      handler: callback
    })
  }

  once (eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }

    this.events[eventName].push({
      handler: callback,
      once: true
    })
  }

  emit (eventName, ...args) {
    if (!this.events[eventName]) return
    this.events[eventName].forEach((item, index) => {
      item.handler(...args)
      if (item.once) {
        this.events[eventName].splice(index, 1)
      }
    })
  }

  off (eventName) {
    if (eventName) {
      delete this.events[eventName]
    } else {
      this.events = {}
    }
  }
}
