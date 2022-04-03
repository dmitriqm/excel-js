class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
    // '#app'
     ? document.querySelector(selector)
    // document.createElement
     : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }

    this.$el.outerHTML.trim()
    return this
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data () {
    return this.$el.dataset
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach((key) => {
          this.$el.style[key] = styles[key]
        })

    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)

  if (classes) {
    el.classList.add(classes)
  }

  return $(el)
}

$.all = (selector) => {
  const domInstanseArray = []

  document.querySelectorAll(selector)
      .forEach((el) =>
        domInstanseArray.push($(el))
      )

  return domInstanseArray
}
