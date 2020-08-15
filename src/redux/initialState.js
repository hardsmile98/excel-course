import {storage} from '@core/utils'
import { defaultStyle,defaultTitle } from '../constants'

const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyle
}

export const initialState = storage('excel-state') ? storage ('excel-state') : defaultState