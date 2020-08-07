import { Table } from "./Table"

const CODES = {
    A: 65,
    Z: 90
}

function createCell(row, col) {
    return `
        <div class="cell" contenteditable data-id="${row}:${col}" data-col="${col}"></div>
    `
}

function createCol(el,index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${el}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, content){
    const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

export function createTable(){
    const colsCount = Table.MAX_COLUMN
    const rowsCount = Table.MAX_ROW
    const rows = []

    const cols = new Array(colsCount)
    .fill('')
    .map((el,index) => {
        return String.fromCharCode(CODES.A + index)
    })
    .map(createCol)
    .join('')

    rows.push(createRow(null, cols))
    for(let row = 0; row < rowsCount; row++){
        const cells = new Array(colsCount)
        .fill('')
        .map((_, col) => createCell(row,col))
        .join('')
        rows.push(createRow(row + 1,cells))
    }

    return rows.join('')
}