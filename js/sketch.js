var columns = 20,
    rows    = 15;

var tileWidth = 50;
var tileHeight = tileWidth;

var gameWidth = columns * tileWidth;
var gameHeight = rows * tileHeight;

var towers = [];
var runners = [];

var availableTowers = 2; //The number of towers that can be currently placed
var placeTower = false; //true = in place tower-mode
var running = false; //true = round is running

numRunnersThisRound = 3;
roundNum = 1;

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

function drawStartButton() {
    fill(255);
    stroke(0);
    rect(gameWidth + 50, gameHeight - 100, (tileWidth*2), (tileHeight));

    fill(0);
    textSize(24);
    text('Start', gameWidth + 75, gameHeight - 65);

    fill(255);
    textSize(24);
    text('Round ' + roundNum, gameWidth + 55, gameHeight - 15);
}

function draw() {
    clear();

    background(100);
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

function drawTowers() {
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
    }, 340);

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

function isAnyTowerAt(tileX, tileY) {
    var towerAlreadyPlaced = false;
    for (var t = 0; t < towers.length; t++) {
        if (towers[t].isAt(tileX, tileY)) {
            towerAlreadyPlaced = true;
        }
    }

    return towerAlreadyPlaced;
}

function mouseClicked() {
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

//UTILITY

function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });

}
