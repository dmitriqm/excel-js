import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '@/core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      // const $parent = $resizer.$el.parentNode // bad!
      // const $parent = $resizer.$el.closest('.column') // better but bad
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()

      let resizeValue = 0

      document.onmousemove = (e) => {
        const delta = e.pageX - coords.right
        resizeValue = coords.width + delta
        $parent.$el.style.width = resizeValue + 'px'
      }

      document.onmouseup = (e) => {
        document.onmousemove = null

        this.$root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach((el) => el.style.width = resizeValue + 'px')

        document.onmouseup = null
      }
    }
  }
}
