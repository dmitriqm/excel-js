const CODE = {
  A: 65,
  Z: 90
}

function toCell(_, colId) {
  return `
    <div class="cell" contenteditable data-col="${colId}"></div>
  `
}

function toColumn(col, id) {
  return `
    <div class="column" data-type="resizable" data-col="${id}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `.trim()
}

function createRow(index, content) {
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''

  return `
    <div class="row">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
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
        .fill('')
        .map(toCell)
        .join('')

    rows.push(createRow(i, cells))
  }

  return rows.join('')
}
