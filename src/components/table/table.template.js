const CODE = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function toColumn(col) {
  return `<div class="column">${col}</div>`
}

function createRow(info, content) {
  return `
    <div class="row">
      <div class="row-info">${info}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODE.A + index)
}

export function createTable(rowCount = 15) {
  const colsCount = CODE.Z - CODE.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow('', cols))

  for (let i = 1; i <= rowCount; i++) {
    const cells = new Array(colsCount)
        .fill(toCell())
        .join('')

    rows.push(createRow(i, cells))
  }

  return rows.join('')
}