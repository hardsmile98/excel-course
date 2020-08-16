import { defaultStyle,defaultTitle } from '../constants'

const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyle,
    openedDate: new Date().toJSON()
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyle,
    currentText: ''
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : defaultState
}