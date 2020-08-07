import { range } from "../../core/utils"
import { Table } from "./Table"

export function matrix($targer, $current) {
    const target = $targer.id(true)
    const current = $current.id(true)

    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)
    
    return rows.reduce((acc, row) => {
        cols.forEach(col => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(key, {row,col}) {
    const MIN_VALUE = 0
    const MAX_COLUMN = Table.MAX_COLUMN - 1
    const MAX_ROW = Table.MAX_ROW - 1

    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row = row + 1 < MAX_ROW ? row + 1 : MAX_ROW
            break
        case 'Tab':
        case 'ArrowRight':
            col = col + 1 < MAX_COLUMN ? col + 1 : MAX_COLUMN
            break
        case 'ArrowUp':
            row = row - 1 > MIN_VALUE ? row - 1 : MIN_VALUE
            break
        case 'ArrowLeft':
            col = col - 1 > MIN_VALUE ? col - 1 : MIN_VALUE
            break
    }
    return `[data-id="${row}:${col}"]`
}