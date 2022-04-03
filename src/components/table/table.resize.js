import { $ } from '@/core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const resizeType = $resizer.data.resize
  let resizeValue = 0
  const sideProp = resizeType === 'col' ? 'bottom' : 'right'

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  })


  document.onmousemove = (e) => {
    if (resizeType === 'col') {
      const delta = e.pageX - coords.right
      resizeValue = coords.width + delta
      $resizer.css({ right: -delta + 'px' })
    } else {
      const delta = e.pageY - coords.bottom
      resizeValue = coords.height + delta
      $resizer.css({ bottom: -delta + 'px' })
    }
  }

  document.onmouseup = (e) => {
    document.onmousemove = null
    document.onmouseup = null

    if ($parent.data.col) {
      $parent.css({width: resizeValue + 'px'})
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el) => el.style.width = resizeValue + 'px')
    } else {
      $parent.css({
        height: resizeValue + 'px'
      })
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}
