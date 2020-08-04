import { createTable } from "./table.template"

const { ExcelComponent } = require("../../core/ExcelComponent")

export class Table extends ExcelComponent{
    static className = 'excel__table'

    toHTML(){
        return createTable()
    }
}