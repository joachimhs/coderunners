var columns = 20,
    rows    = 15;

var tileWidth = 50;
var tileHeight = tileWidth;

var gameWidth = columns * tileWidth;
var gameHeight = rows * tileHeight;

var towers = [];

var placeTower = false;
var availableTowers = 5;

function setup() {
    createCanvas(gameWidth+200, gameHeight);
}

function drawGrid() {
    for (var tileW = 1; tileW <= columns; tileW++) {
        stroke(255, 255, 255);
        line(tileW*tileWidth, 0, (tileW*tileWidth), gameHeight)
    }

    for (var tileH = 1; tileH < rows; tileH++) {
        stroke(255, 255, 255);
        line(0, tileH*tileHeight, gameWidth, tileH*tileHeight)
    }
}

function drawAvailableTowers() {
    fill(255);
    stroke(0);
    ellipse(gameWidth + 100, 100, (tileWidth*2), (tileHeight*2));
}

function drawGameBorder() {
    stroke(255, 90, 44);
    strokeWeight(15);
    fill(255, 255, 255, 0);
    rect(0, 0, gameWidth, gameHeight);

    strokeWeight(1);
}

function draw() {
    clear();

    background(100);
    drawGrid();
    //drawGameBorder();
    drawAvailableTowers();

    for (var t = 0; t < towers.length; t++) {
        towers[t].draw();
    }

    fill(0);
    textSize(24);
    text('' + availableTowers, gameWidth + 90, 105);
}

function mouseClicked() {
    var tileX = parseInt(mouseX/tileWidth);
    var tileY = parseInt(mouseY/tileHeight);

    if (placeTower && tileX < columns && tileY < rows) {
        var towerAlreadyPlaced = false;
        for (var t = 0; t < towers.length; t++) {
            if (towers[t].isAt(tileX, tileY)) {
                towerAlreadyPlaced = true;
            }
        }

        if (!towerAlreadyPlaced) {
            console.log("placing tower!");
            towers.push(new Tower(tileX, tileY));
        } else {
            console.log("Tile already have a tower!");
        }

        placeTower = false;
        availableTowers--;
    }

    console.log("mouse clicked! mouseX: " + mouseX + " mouseY: " + mouseY + " tileX: " + tileX + " tileY: " + tileY);

    //Must do after placing tower
    if (mouseX > gameWidth + 50 && mouseX < gameWidth+200
        && mouseY > 50 && mouseY < 150) {
        placeTower = availableTowers > 0;
        console.log("Tower can be placed: " + placeTower);
    }

}