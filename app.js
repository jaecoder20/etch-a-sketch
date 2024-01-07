"use strict";
function createSketchCells(number_cells){
    // number_cells is the amount of cells in the length and width and of sketchpad.
    let sketchpad = document.querySelector(".sketch-pad");
    console.log(sketchpad);
    // This allows for dynamic calculation of the grid cell dimensions based sketch pad dimensions 
    //and user input for number of cells
    let cellWidth = getComputedStyle(sketchpad).width/number_cells;
    let cellHeight = getComputedStyle(sketchpad).height/number_cells;
    for(let i=0;i<number_cells**2;i++){
        let cell = document.createElement('div');
    cell.style.width = cellWidth;
    cell.style.height = cellHeight;
        sketchpad.appendChild(cell);
    }

}


createSketchCells(16);