import { TABLE_RESIZE, CHANGED_TEXT,CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE } from './types'

export function rootReducer(state, action) {
    let field
    let val
    switch(action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            val = state[field] || {}
            val[action.data.id] = action.data.value
            return {...state, [field]: val}
        case CHANGED_TEXT:
            field = 'dataState'
            val = state[field] || {}
            val[action.data.id] = action.data.text
            return {...state, currentText: action.data.text, [field]: val}
        case CHANGE_STYLES:
            return {...state, currentStyles: action.styles}
        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            });
            return {
                ...state, [field]: val, currentStyles: {...state.currentStyles, ...action.data.value }
            }
        case CHANGE_TITLE:
            return {...state, title: action.data}
        case UPDATE_DATE:
            return {...state, openedDate: new Date().toJSON()}
        default: return state
    }
}