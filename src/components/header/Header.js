import { ExcelComponent } from "../../core/ExcelComponent";
import { CHANGE_TITLE } from "../../redux/types";
import { $ } from '../../core/dom'
import { defaultTitle } from '../../constants'
import { ActiveRoute } from "../../core/routes/ActiveRoute";

export class Header extends ExcelComponent{
    static className = 'excel__header'

    constructor($root,options){
        super($root, {
            name: 'Header',
            listeners: ['input','click'],
            ...options
        })
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
        <input class="input" type="text" value="${title}">
        <div class="icons">
            <div class="button" data-button="delete">
                <span class="material-icons" data-button="delete">delete</span>
            </div>
            <div class="button" data-button="exit">
                <span class="material-icons" data-button="exit">exit_to_app</span>
            </div>
        </div>
        `
    }

    onInput(event) {
        const $target = $(event.target)
        const data = $target.text()
        this.$dispatch({type: CHANGE_TITLE, data})
    }

    onClick(event) {
        const $target = $(event.target)

        if ($target.data.button === 'delete') {
            const decision = confirm('Вы действительно хотите удалить таблицу?')
            if(decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        } else if($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }
}