import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onClick(e) {
    console.log('onClick', e)
  }

  onInput(e) {
    console.log(this.$root)
    console.log(`${this.constructor.name}: onInput`, e.target.textContent)
  }
}
