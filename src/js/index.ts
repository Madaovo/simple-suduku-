import {Grid} from "./ui/grid";
import {PopupNumber} from "./ui/popupnumber";

const grid = new Grid($('#container'))
const popupNumber = new PopupNumber($("#popupNumbers"))
grid.build()
grid.layout()
grid.bindPopup(popupNumber)

$("#check").on("click",e=>{
    grid.check()
})
$("#reset").on("click",e=>{
    grid.reset()
})
$("#clear").on("click",e=>{
    grid.clear()
})
$("#rebuild").on("click",e=>{
    grid.rebuild()
})
