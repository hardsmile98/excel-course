import { ExcelComponent } from "../../core/ExcelComponent";
import { CHANGE_TITLE } from "../../redux/types";
import { $ } from '../../core/dom'
import { defaultTitle } from '../../constants'

export class Header extends ExcelComponent{
    static className = 'excel__header'

    constructor($root,options){
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
        <input class="input" type="text" value="${title}">
        <div class="icons">
            <div class="button">
                <span class="material-icons">delete</span>
            </div>
            <div class="button">
                <span class="material-icons">exit_to_app</span>
            </div>
        </div>
        `
    }

    onInput(event) {
        const $target = $(event.target)
        const data = $target.text()
        this.$dispatch({type: CHANGE_TITLE, data})
    }
}