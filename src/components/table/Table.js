import { createTable } from "./table.template"
import { $ } from "../../core/dom"
import { resizeHandler } from "./table.resize"
import { TableSelection } from "./TableSelection"
import { matrix, nextSelector } from "./table.functions"
import { CHANGED_TEXT,TABLE_RESIZE,CHANGE_STYLES,APPLY_STYLE } from "../../redux/types"
import { defaultStyle } from "../../constants"
import { parse } from '../../core/parse'

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
        return createTable(this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on('formula:input', text => {
            this.selection.current
            .attr('data-value', text)
            .text(parse(text))

            this.updateTextInStore(text)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })

        this.$on('toolbar:applyStyle', style => {
            this.selection.applyStyle(style)
            const data = {
                value: style,
                ids: this.selection.selectedIds
            }
            this.$dispatch({type: APPLY_STYLE, data})
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)

        const styles = $cell.getSyles(Object.keys(defaultStyle))
        this.$dispatch({type: CHANGE_STYLES, styles})
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(event,this.$root)
            this.$dispatch({type: TABLE_RESIZE, data})
        } catch(e) {
            console.warn('Table resize ', e)
        }
    }

    onMousedown(event){
        if ($(event.target).data.resize){
            this.resizeTable(event)
        }
        if ($(event.target).data.id){
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target,this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
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
            this.selectCell($next)
        }
    }

    updateTextInStore(text) {
        const data = {
            id: this.selection.current.id(),
            text
        }
        this.$dispatch({type: CHANGED_TEXT, data})
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }
}