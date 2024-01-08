"use strict";
function createSketchCells(number_cells){
    // number_cells is the amount of cells in the length and width and of sketchpad.
    let sketchpad = document.querySelector(".sketch-pad");
    console.log(sketchpad);
    // This allows for dynamic calculation of the grid cell dimensions based sketch pad dimensions 
    //and user input for number of cells
    let cellWidth = parseFloat(getComputedStyle(sketchpad).width)/number_cells;
    let cellHeight = parseFloat(getComputedStyle(sketchpad).height)/number_cells;
    cellHeight = cellHeight.toString()+"px";
    cellWidth = cellWidth.toString()+"px";
    for(let i=0;i<number_cells**2;i++){
        let cell = document.createElement('div');
        cell.classList.add('sketch-cell');
        cell.style.width = cellWidth;
        cell.style.height = cellHeight;
        sketchpad.appendChild(cell);
    }

    allowDrawing(sketchpad);

}

function allowDrawing(sketchpad){
    var isDragging = false;

    sketchpad.querySelectorAll('div').forEach(function(div) {
        div.addEventListener('mousedown', function(event) {
            isDragging = true;
        });
      });
      document.addEventListener('mouseover', function(event) {
        if (isDragging && event.target.classList.contains('sketch-cell')) {
          // Update the position of the dragged element based on the mouse movement
          event.target.style.backgroundColor = 'black';
        }
      });
      
      // Add mouseup event listener to the document
      document.addEventListener('mouseup', function() {
        isDragging = false;
      });
}

//this does not work for different inputs
createSketchCells(64);