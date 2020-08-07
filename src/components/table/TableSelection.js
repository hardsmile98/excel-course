import {$} from "../../core/dom"

export class TableSelection {
    static classSelect = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.focus().addClass(TableSelection.classSelect)
    }

    clear() {
        this.group.forEach(el => el.removeClass(TableSelection.classSelect))
        this.group = []
    }

    selectGroup($cells = []){
        this.clear()

        this.group = $cells
        this.group.forEach(el => el.addClass(TableSelection.classSelect))

    }
}