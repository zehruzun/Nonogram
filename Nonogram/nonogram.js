let NonogramArea;
let item;
let boardHeight;
let boardWidth;
let tiles;
let counts = 0;
let leftCounts;
let topCounts;
let pictureMatrix = 
// [
//     [1,1,1,1,1,1,1,1,1,1],
//     [1,1,1,0,0,0,0,1,1,1],
//     [1,1,0,1,0,0,1,0,1,1],
//     [1,0,0,1,0,0,1,0,0,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,0,1,0,0,0,0,1,0,1],
//     [1,0,0,1,1,1,1,0,0,1],
//     [1,1,0,0,1,1,0,0,1,1],
//     [1,1,1,0,0,0,0,1,1,1],
//     [1,1,1,1,1,1,1,1,1,1]
// ] 
[
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
];
window.onload = () => {
    NonogramArea = document.getElementById("gameBoard");
    leftCounts = document.querySelector(".counts-left");
    topCounts = document.querySelector(".counts-top");
    tiles = Array.from(document.querySelectorAll(".item"));
    item = tiles[0];
    if (item != null && NonogramArea != null) {
        let style = window.getComputedStyle(item);
        boardHeight = (parseInt(style.getPropertyValue("height")) + 2) * pictureMatrix.length;
        boardWidth = (parseInt(style.getPropertyValue("width")) + 2) * pictureMatrix[0].length;
        NonogramArea.style.width = boardWidth + "px";
        NonogramArea.style.height = boardHeight + "px";
    }
    setNonogramItems();
    tiles.forEach(clickedItem => {
        clickedItem.addEventListener('click', clicked);
    });
    setCounts();
};
function setNonogramItems() {
    for (let r = 0; r < pictureMatrix.length; r++) {
        for (let c = 0; c < pictureMatrix[0].length; c++) {
            let tile = document.createElement("div");
            NonogramArea?.append(tile);
            tile.classList.add("item");
            if (pictureMatrix[r][c] == 1) {
                tile.setAttribute("name", "1");
            }
        }
    }
    tiles = Array.from(document.querySelectorAll(".item"));
}
function clicked(event) {
    let nameControl = (event.target.getAttribute("name"));
    paintItem(nameControl, event.target);
}
function paintItem(name, item) {
    if (name === "1") {
        item.style.background = "rgb(148, 49, 178)";
    }
}
function setCounts() {
    for (let r = 0; r < pictureMatrix.length; r++) {
        let tile = document.createElement("div");
        counts = 0;
        for (let c = 0; c < pictureMatrix[0].length; c++) {
            if (pictureMatrix[r][c] == 1) {
                counts++;
            }
            else if (pictureMatrix[r][c] == 0 && counts != 0) {
                leftCounts?.append(tile);
                tile.classList.add("count-left");
                tile.innerHTML += `<p>${counts}</p>`;
                counts = 0;
            }
        }
        if (counts != 0) {
            leftCounts?.append(tile);
            tile.classList.add("count-left");
            tile.innerHTML += `<p>  ${counts}  </p>`;
        }
    }
    for (let r = 0; r < pictureMatrix[0].length; r++) {
        let tile = document.createElement("div");
        counts = 0;
        for (let c = 0; c < pictureMatrix.length; c++) {
            if (pictureMatrix[c][r] == 1) {
                counts++;
            }
            else if (pictureMatrix[c][r] == 0 && counts != 0) {
                topCounts?.append(tile);
                tile.classList.add("count-top");
                tile.innerHTML += `<p>${counts}</p>`;
                counts = 0;
            }
        }
        if (counts != 0) {
            topCounts?.append(tile);
            tile.classList.add("count-top");
            tile.innerHTML += `<p>${counts}</p>`;
        }
    }
}
