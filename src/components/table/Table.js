import { createTable } from "./table.template"
import {$} from "../../core/dom"
import { resizeHandler } from "./table.resize"
import { TableSelection } from "./TableSelection"
import { matrix, nextSelector } from "./table.functions"

const { ExcelComponent } = require("../../core/ExcelComponent")

export class Table extends ExcelComponent{
    static className = 'excel__table'
    static MAX_COLUMN = 26
    static MAX_ROW = 15

    constructor($root, options){
        super($root, {
            name: 'Table',
            listeners: ['mousedown','keydown','input'],
            ...options
        })
    }

    toHTML(){
        return createTable()
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)
        this.$emit('table:select', $cell)

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }

    onMousedown(event){
        if ($(event.target).data.resize){
            resizeHandler(event,this.$root)
        }
        if ($(event.target).data.id){
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target,this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown(event){
        const keys = [
            'Tab',
            'Enter',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown'
        ]

        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key,id))
            this.selection.select($next)
            this.$emit('table:select', $next)
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}