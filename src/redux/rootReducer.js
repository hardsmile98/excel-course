import { TABLE_RESIZE, CHANGED_TEXT,CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE } from './types'

export function rootReducer(state, action) {
    let field
    switch(action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: value(state, field, action)}
        case CHANGED_TEXT:
            field = 'dataState'
            return {...state, currentText: action.data.text, [field]: value(state, field, action)}
        case CHANGE_STYLES:
            return {...state, currentStyles: action.styles}
        case APPLY_STYLE:
            field = 'stylesState'
            const val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            });
            return {
                ...state, [field]: val, currentStyles: {...state.currentStyles, ...action.data.value }
            }
        case CHANGE_TITLE:
            return {...state, title: action.data}
        default: return state
    }
}

function value(state,field, action) {
    const val = state[field] || {}
    val[action.data.id] = action.data.text
    return val
}