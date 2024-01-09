"use strict";
let sketch_color = document.querySelector(".color-picker");
let mode = "color";
document.addEventListener('DOMContentLoaded', function() {
  let eraser = document.querySelector(".eraser");
  let color = document.querySelector(".color");
  let clear = document.querySelector(".clear");
  let number_cells = 16; //By default the sketchpad will be 16x16
  createSketchCells(number_cells);
  let cellNumber_incrementor = document.querySelector('.increment-grid-size');
  let cellNumber_decrementor = document.querySelector('.decrement-grid-size');
  let gridSize_Display = document.querySelector('.grid-size');
  limitGridSizeRange(number_cells,cellNumber_decrementor,cellNumber_incrementor);
  cellNumber_incrementor.addEventListener('click', function(){
    number_cells++;
    console.log(number_cells);
    createSketchCells(number_cells);
    updateGridSizeDisplay(number_cells,gridSize_Display);
    limitGridSizeRange(number_cells,cellNumber_decrementor,cellNumber_incrementor);
  });
  cellNumber_decrementor.addEventListener('click', function(){
    number_cells--;
    console.log(number_cells);
    createSketchCells(number_cells);
    updateGridSizeDisplay(number_cells,gridSize_Display);
    limitGridSizeRange(number_cells,cellNumber_decrementor,cellNumber_incrementor);
  });
  eraser.addEventListener('click', function(event){
    mode = "erase";
    eraser.classList.toggle("active");
    color.classList.toggle("active");
  });
  color.addEventListener('click', function(event){
    mode = "color";
    eraser.classList.toggle("active");
    color.classList.toggle("active");
  });
  clear.addEventListener('click', function(event){
    createSketchCells(number_cells);
  });

});



function createSketchCells(number_cells){
    // number_cells is the amount of cells in the length and width and of sketchpad.
    let sketchpad = document.querySelector(".sketch-pad");
    sketchpad.innerHTML = '';
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
            if (mode==="color"){
              event.target.style.backgroundColor = sketch_color.value;
            }else if (mode==="erase"){
              event.target.style.backgroundColor = "white";
            }
        });
      });
      document.addEventListener('mouseover', function(event) {
        if (isDragging && event.target.classList.contains('sketch-cell')) {
          // Update the position of the dragged element based on the mouse movement
          if (mode==="color"){
            event.target.style.backgroundColor = sketch_color.value;
          }else if (mode==="erase"){
            event.target.style.backgroundColor = "white";
          }
        }
      });
      
      // Add mouseup event listener to the document
      document.addEventListener('mouseup', function() {
        isDragging = false;
      });
}

function updateGridSizeDisplay(number_cells, gridSize_Display){
  gridSize_Display.textContent = number_cells.toString()+"x"+number_cells.toString();
}

function limitGridSizeRange(number_cells,cellNumber_decrementor,cellNumber_incrementor){
  // users will only be able to select between numbers 16 and 64 by greying out the buttons when
  // the threshold is reached
  if (number_cells==16){
    cellNumber_decrementor.style.opacity = "0.5";
    cellNumber_decrementor.style.cursor = "not-allowed";
    cellNumber_decrementor.style.pointerEvents = 'none';
  }else if (number_cells>16){
    cellNumber_decrementor.style.opacity = "1";
    cellNumber_decrementor.style.cursor = "pointer";
    cellNumber_decrementor.style.pointerEvents = 'auto';
  }
  if(number_cells==64){
    cellNumber_incrementor.style.opacity = "0.5";
    cellNumber_incrementor.style.cursor = "not-allowed";
    cellNumber_incrementor.style.pointerEvents = 'none';
  }else if (number_cells<64){
    cellNumber_incrementor.style.opacity = "1";
    cellNumber_incrementor.style.cursor = "pointer";
    cellNumber_incrementor.style.pointerEvents = 'auto';
  }
}