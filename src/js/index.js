"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("./ui/grid");
const popupnumber_1 = require("./ui/popupnumber");
const grid = new grid_1.Grid($('#container'));
const popupNumber = new popupnumber_1.PopupNumber($("#popupNumbers"));
grid.build();
grid.layout();
grid.bindPopup(popupNumber);
$("#check").on("click", e => {
    grid.check();
});
$("#reset").on("click", e => {
    grid.reset();
});
$("#clear").on("click", e => {
    grid.clear();
});
$("#rebuild").on("click", e => {
    grid.rebuild();
});
//# sourceMappingURL=index.js.map