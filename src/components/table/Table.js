import { createTable } from "./table.template"
import {$} from "../../core/dom"
import { resizeHandler } from "./table.resize"

const { ExcelComponent } = require("../../core/ExcelComponent")

export class Table extends ExcelComponent{
    static className = 'excel__table'

    constructor($root){
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        })
    }

    toHTML(){
        return createTable()
    }

    onMousedown(event){
        if ($(event.target).data.resize){
            resizeHandler(event,this.$root)
        }

    }
}