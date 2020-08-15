import { Table } from "./Table"
import { toInlineStyles } from "../../core/utils"
import { defaultStyle } from "../../constants"
import { parse } from '../../core/parse'

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function createCell(row, col, state) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState,col)
    const data = state.dataState[id] || ''
    const styles = toInlineStyles({
        ...defaultStyle,
        ...state.stylesState[id]
    })
    return `
        <div class="cell" 
        contenteditable 
        data-id="${id}" 
        data-col="${col}"
        data-value="${data}"
        style="${styles}; width: ${width}">
        ${parse(data)}
        </div>
    `
}

function createCol(el, index, width) {
    return `
        <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
            ${el}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, content, state){
    const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    const height = getHeight(state, index)
    return `
        <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
            <div class="row-info">
                ${index ? index : ''}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

export function createTable(state = {}){
    const colsCount = Table.MAX_COLUMN
    const rowsCount = Table.MAX_ROW
    const rows = []

    const cols = new Array(colsCount)
    .fill('')
    .map((_,index) => {
        return String.fromCharCode(CODES.A + index)
    })
    .map((col,index) => {
        const width = getWidth(state.colState, index)
        return createCol(col, index, width)
    })
    .join('')

    rows.push(createRow(null, cols, {}))
    for(let row = 0; row < rowsCount; row++){
        const cells = new Array(colsCount)
        .fill('')
        .map((_, col) => createCell(row,col,state))
        .join('')
        rows.push(createRow(row + 1, cells, state.rowState))
    }

    return rows.join('')
}