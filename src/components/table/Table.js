import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(24)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      console.log('start resizing', event.target.dataset.resize)
    }
  }
}
