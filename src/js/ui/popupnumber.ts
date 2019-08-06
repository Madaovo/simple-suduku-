//处理弹出的操作面板

export class PopupNumber {

    private _$panel:JQuery
    private _$cell:JQuery

    constructor($panel:JQuery) {
        this._$panel = $panel.hide().removeClass("hidden")
        this._$panel.on("click", "span", e => {
            const $cell = this._$cell
            const $span = $(e.target)
            if ($span.hasClass('mark1')) {
                if ($cell.hasClass('mark2')){
                    $cell.removeClass("mark2")
                }
                if (!$cell.hasClass("mark1")){
                    $cell.addClass("mark1")
                }
                $cell.addClass("mark1")
            } else if ($span.hasClass("mark2")) {
                if ($cell.hasClass('mark1')){
                    $cell.removeClass("mark1")
                }
                if (!$cell.hasClass("mark2")){
                    $cell.addClass("mark2")
                }
                $cell.addClass("mark2")
            } else if ($span.hasClass('empty')) {
                if ($cell.hasClass("mark1")){
                    $cell.removeClass("mark1")
                }
                if ($cell.hasClass("mark2")){
                    $cell.removeClass("mark2")
                }
                $cell.text(0).addClass("empty")
            } else {
                $cell.removeClass("empty").text($span.text())
            }
            this._$panel.hide()
        })
    }

    popup($cell:JQuery) {
        this._$cell = $cell
        const {left, top} = $cell.position()
        this._$panel
            .css({
                left: `${left}px`,
                top: `${top}px`
            })
            .show()
    }
}

export default PopupNumber