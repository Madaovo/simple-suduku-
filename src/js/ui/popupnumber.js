"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PopupNumber {
    constructor($panel) {
        this._$panel = $panel.hide().removeClass("hidden");
        this._$panel.on("click", "span", e => {
            const $cell = this._$cell;
            const $span = $(e.target);
            if ($span.hasClass('mark1')) {
                if ($cell.hasClass('mark2')) {
                    $cell.removeClass("mark2");
                }
                if (!$cell.hasClass("mark1")) {
                    $cell.addClass("mark1");
                }
                $cell.addClass("mark1");
            }
            else if ($span.hasClass("mark2")) {
                if ($cell.hasClass('mark1')) {
                    $cell.removeClass("mark1");
                }
                if (!$cell.hasClass("mark2")) {
                    $cell.addClass("mark2");
                }
                $cell.addClass("mark2");
            }
            else if ($span.hasClass('empty')) {
                $cell.attr("class", "");
                $cell.text(0).addClass("empty");
            }
            else {
                $cell.removeClass("empty").text($span.text());
            }
            this._$panel.hide();
        });
    }
    popup($cell) {
        this._$cell = $cell;
        const { left, top } = $cell.position();
        this._$panel
            .css({
            left: `${left}px`,
            top: `${top}px`
        })
            .show();
    }
}
exports.PopupNumber = PopupNumber;
exports.default = PopupNumber;
//# sourceMappingURL=popupnumber.js.map