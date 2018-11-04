var columns = 20,
    rows    = 11;

var tileWidth = 50;
var tileHeight = tileWidth;

var gameWidth = columns * tileWidth;
var gameHeight = rows * tileHeight;

var towers = [];
var runners = [];
var tiles = [];

var availableTowers = 2; //The number of towers that can be currently placed
var placeTower = false; //true = in place tower-mode
var running = false; //true = round is running

var numRunnersThisRound = 3;
var roundNum = 1;

function setup() {
    createCanvas(gameWidth+200, gameHeight);
}

function draw() {
    clear();

    background(255);

    calculatePath();
    drawGrid();
    //drawGameBorder();
    drawAvailableTowers();
    drawStartButton();

    drawTowers();
    drawRunners();

    fill(0);
    textSize(24);
    text('' + availableTowers, gameWidth + 90, 105);
}

function calculatePath() {
    tiles = [];
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < columns; x++) {
            var floor = new Floor(x, y);
            floor.setAvailable();
            floor.setWalkable(!isAnyTowerAt(x, y));

            tiles.push(floor);
        }
    }


    var goalX = 19;
    var goalY = 5;

    var floor = findTileAt(goalX, goalY);
    floor.setPath();
    floor.setVisited(true);
    floor.setDistance(0);

    //push target to frontier
    var frontier = [];
    frontier.push(floor);



    // Fill cameFrom and distance for every tile
    while (frontier.length !== 0) {
        var current = frontier.shift();
        var neighbours = getNeighbours(current.getTileX(), current.getTileY());

        for (var i = 0; i < neighbours.length; i++) {
            var next = neighbours[i];

            if (!next.getVisited()) {
                frontier.push(next);
                next.setDistance(current.getDistance() + 1);
                next.setVisited(true);
            }
        }
    }

    //Draw runner path
    var startX = 0;
    var startY = 5;

    floor = findTileAt(startX, startY);
    floor.setPath();

    var steps = 1500;

    while (floor.getDistance() > 0) {
        if (steps === 0) {
            break;
        }

        var eastD = distanceTo(floor.getTileX() + 1, floor.getTileY());
        var northD = distanceTo(floor.getTileX(), floor.getTileY() - 1);
        var southD = distanceTo(floor.getTileX(), floor.getTileY() + 1);
        var westD = distanceTo(floor.getTileX() - 1, floor.getTileY());

        var east = findTileAt(floor.getTileX() + 1, floor.getTileY());
        var north = findTileAt(floor.getTileX(), floor.getTileY() - 1);
        var south = findTileAt(floor.getTileX(), floor.getTileY() + 1);
        var west = findTileAt(floor.getTileX() - 1, floor.getTileY());

        if (west && westD <= southD && westD <= eastD && westD <= northD) {
            west.setPath();
            floor = west;
        } else if (eastD <= northD && eastD <= southD && eastD <= westD) {
            east.setPath();
            floor = east;
        } else if (northD <= eastD && northD <= southD ) {
            north.setPath();
            floor = north;
        } else if (southD <= northD && southD <= eastD) {
            south.setPath();
            floor = south;
        }

        steps--;
    }
}

function getNeighbours(tileX, tileY) {
    var neighbours = [];

    if (tileX > 0 && !isAnyTowerAt(tileX-1, tileY)) {
        neighbours.push(findTileAt(tileX-1, tileY));
    }

    if (tileX < columns-1 && !isAnyTowerAt(tileX+1, tileY)) {
        neighbours.push(findTileAt(tileX+1, tileY));
    }

    if (tileY > 0 && !isAnyTowerAt(tileX, tileY-1)) {
        neighbours.push(findTileAt(tileX, tileY-1));
    }

    if (tileY < rows-1 && !isAnyTowerAt(tileX, tileY+1)) {
        neighbours.push(findTileAt(tileX, tileY+1));
    }

    return neighbours;

}

function getNumVisited() {
    var numVisited = 0;
    for (var t = 0; t < tiles.length; t++) {
        if (tiles[t].getVisited()) {
            numVisited++;
        }
    }

    return numVisited;
}

function distanceTo(tileX, tileY) {
    var tile = findTileAt(tileX, tileY);
    if (tile !== undefined  ) {
        return tile.getDistance();
    } else {
        return 10000;
    }
}

function findTileAt(tileX, tileY) {
    if (tileX < 0 || tileX > columns) {
        return undefined;
    }

    if (tileY < 0 || tileY > rows) {
        return undefined;
    }

    var tileNum = tileX + (columns*tileY);
    return tiles[tileNum];

}

function drawGrid() {
    for (var t = 0; t < tiles.length; t++) {
        tiles[t].draw();
    }
    /*for (var tileW = 1; tileW <= columns; tileW++) {
        stroke(255, 255, 255);
        line(tileW*tileWidth, 0, (tileW*tileWidth), gameHeight)
    }

    for (var tileH = 1; tileH < rows; tileH++) {
        stroke(255, 255, 255);
        line(0, tileH*tileHeight, gameWidth, tileH*tileHeight)
    }*/
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

function drawStartButton() {
    fill(255);
    stroke(0);
    rect(gameWidth + 50, gameHeight - 100, (tileWidth*2), (tileHeight));

    fill(0);
    textSize(24);
    text('Start', gameWidth + 75, gameHeight - 65);

    fill(0);
    textSize(24);
    text('Round ' + roundNum, gameWidth + 55, gameHeight - 15);
}

function drawTowers() {
    //Check if path is impossible

    if (findTileAt(0,5).getDistance() === 10000) {
        towers.pop();
        availableTowers++;
    }

    for (var t = 0; t < towers.length; t++) {
        towers[t].draw();

        var hasHit = false;
        for (var r = 0; r < runners.length; r++) {
            if (!hasHit && towers[t].canHit(runners[r])) {
                runners[r].hit(1);
                hasHit = true;
            }
        }

    }
}

function drawRunners() {
    if (running) {
        playRound();

        if (runnerReachedGoal()) {
            console.log("Game Lost!");
            runners = [];
            numRunnersThisRound = 3;
            running = false;
        }

        if (allRunnersDead()) {
            console.log("Round WON!");
            running = false;
            numRunnersThisRound += 3;
            roundNum++;
            availableTowers += 1;
        }
    }
}

function runnerReachedGoal() {
    for (var r = 0; r < runners.length; r++) {
        if (runners[r].getTileX() > columns-1) {
            return true;
        }
    }

    return false;
}

function allRunnersDead() {
    return running && runners.length == 0;
}

function startRound() {
    setTimeout(function() {
        running = true;
    }, 100);

    for (var r = 0; r < numRunnersThisRound; r++) {
        setTimeout(function() {
            runners.push(new Runner(40 + (roundNum * 10)));
        }, 350 * r);
    }


}

function playRound() {
    for (var r = 0; r < runners.length; r++) {
        runners[r].update();
        runners[r].draw();

        if (runners[r].isDead()) {
            console.log("DELETING");
            runners.splice(r, 1);
        }
    }
}

function getTileX(xPos) {
    return parseInt(xPos/tileWidth);
}

function getTileY(yPos) {
    return parseInt(yPos/tileHeight);
}

function isAnyTowerAtTile(tile) {
    return isAnyTowerAt(tile.getTileX(), tile.getTileY());
}

function isAnyTowerAt(tileX, tileY) {
    var towerAlreadyPlaced = false;
    for (var t = 0; t < towers.length; t++) {
        if (towers[t].isAt(tileX, tileY)) {
            towerAlreadyPlaced = true;
        }
    }

    return towerAlreadyPlaced;
}

function doMouseClickOrTouch() {
    var tileX = getTileX(mouseX);
    var tileY = getTileY(mouseY);

    if (placeTower && tileX < columns && tileY < rows) {
        if (!isAnyTowerAt(tileX, tileY)) {
            console.log("placing tower!");
            towers.push(new Tower(tileX, tileY));
            availableTowers--;
        } else {
            console.log("Tile already have a tower!");
        }

        placeTower = false;
    }

    console.log("mouse clicked! mouseX: " + mouseX + " mouseY: " + mouseY + " tileX: " + tileX + " tileY: " + tileY);

    //Must do after placing tower
    if (mouseX > gameWidth + 50 && mouseX < gameWidth+200
        && mouseY > 50 && mouseY < 150) {
        placeTower = availableTowers > 0;
        console.log("Tower can be placed: " + placeTower);
    }

    if (mouseX > gameWidth + 50 && mouseX < gameWidth+200
        && mouseY > gameHeight - 100 && mouseY < gameHeight) {

        console.log("starting round");
        startRound();
    }
}

function touchEnded() {
    console.log('touchEnded');
    doMouseClickOrTouch()
}

/*function mouseClicked() {
    console.log('mouseClicked');
    doMouseClickOrTouch()
}*/

//UTILITY

function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });

}
