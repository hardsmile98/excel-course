import {$} from "../../core/dom"

export function resizeHandler(event, $root){
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const cords = $parent.getCord()
    const type = $resizer.data.resize
    let value
    const sideProps = type === 'col' ? 'bottom' : 'right'

    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)

    $resizer.css({
        opacity: 1,
        [sideProps]: '-5000px'
    })

    document.onmousemove = e => {
        if (type === 'col') {
            let delta = e.pageX - cords.right
            value = cords.width + delta
            $resizer.css({right: -delta + 'px'})
        } else {
            let delta = e.pageY - cords.bottom
            value = cords.height + delta
            $resizer.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (type === 'col') {
            $parent.css({width: value + 'px'})
            cells.forEach(el => {el.style.width = value + 'px'})
        } else {
            $parent.css({height: value + 'px'})
        }

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })
    }
}