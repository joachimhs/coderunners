let P5Game = function() {
    this.columns = 10;
    this.rows    = 10;

    this.tileWidth = 50;
    this.tileHeight = this.tileWidth;

    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    this.winText = "Du Klarte Oppgaven!";

    this.pauseFrames = 0;

    this.tiles = [];
    this.stones = [];

    this.gameWidth = this.columns * this.tileWidth;
    this.gameHeight = this.rows * this.tileHeight;

    this.purpleColor = kikoraP5.color(106, 76, 181);
    this.greenColor = kikoraP5.color(140, 217, 92);
    this.blueColor = kikoraP5.color(24, 44, 79);

    this.spiller = new Spiller(this.startX, this.startY);

    this.wizardImg = kikoraP5.loadImage('/sprites/wizard_ice/3_RUN_001.png');
    this.stoneImg = kikoraP5.loadImage('/sprites/stone/stones_10.png');

    this.timeoutIds = [];

    /** Accessors and Mutators **/
    this.getPurpleColor = function() {
        return this.purpleColor;
    };

    this.getBlueColor = function() {
        return this.blueColor;
    };

    this.getGreenColor = function() {
        return this.greenColor;
    };

    this.getGameWidth = function() {
        return this.gameWidth;
    };

    this.getGameHeight = function() {
        return this.gameHeight;
    };

    this.getTileWidth = function() {
        return this.tileWidth;
    };

    this.getTileHeight = function() {
        return this.tileHeight;
    };

    this.getSpiller = function() {
        return this.spiller;
    };

    this.getWizardImg = function() {
        return this.wizardImg;
    };

    /** //Accessors and Mutators **/

    this.getNeighbours = function(tileX, tileY) {
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

    };

    this.findTileAt = function(tileX, tileY) {
        if (tileX < 0 || tileX > columns) {
            return undefined;
        }

        if (tileY < 0 || tileY > rows) {
            return undefined;
        }

        var tileNum = tileX + (columns*tileY);
        return this.tiles[tileNum];

    };

    this.setup = function() {
        this.tiles = [];

        for (var y = 0; y < this.rows; y++) {
            for (var x = 0; x < this.columns; x++) {
                var floor = new Floor(x, y);
                this.tiles.push(floor);
            }
        }

        this.updateFloor();
    };

    this.draw = function() {
        kikoraP5.clear();
        kikoraP5.background(255);

        this.drawGrid();
        //this.drawStartButton();
        this.spiller.draw();
    };

    this.addPauseFrames = function(frames) {
        this.pauseFrames + frames;
    };

    this.setTileVisited = function(tileX, tileY) {

    };

    this.playerCanMoveTo = function(x, y) {
        return this.tiles[this.getIndexFromXY(x, y)].playerCanBeAtTile();
    };

    this.resetPlayer = function() {
        document.getElementById("startGame").classList.remove('hidden');
        document.getElementById("resetGame").classList.add('hidden');

        for (let index = 0; index < this.timeoutIds.length; index++) {
            clearTimeout(this.timeoutIds[index]);
        }

        this.updateFloor();
        this.spiller.resetPlayerTo(this.startX, this.startY);
    };

    this.updateGame = function() {
        console.log('updateGame()');

        var kode = document.getElementById('configInput').value;

        eval(kode);

        this.updateFloor();
        this.spiller.resetPlayerTo(this.startX, this.startY);

        kikoraToolbox.setBlocks(this.blocks);

        //Disposing the old workspace, and creating a new one with updated XML
        workspace.dispose();
        workspace = Blockly.inject('blocklyDiv', {toolbox: kikoraToolbox.generateToolbox(), maxInstances: kikoraToolbox.generateMaxInstances()})
        workspace.options.maxInstances = kikoraToolbox.generateMaxInstances();
    };

    this.updateFloor = function() {
        for (let index = 0; index < this.tiles.length; index++) {
            this.tiles[index].resetTile();
        }

        if (this.tiles.length > 0) {
            this.tiles[this.getIndexFromXY(this.startX, this.startY)].setVisited();
            this.tiles[this.getIndexFromXY(this.endX, this.endY)].setGoal();

            for (let index = 0; index < this.stones.length; index++) {
                let stone = this.stones[index];

                let tile = this.getIndexFromXY(stone[0], stone[1]);
                this.tiles[tile].setTileSprite(this.stoneImg);
            }
        }
    };

    this.getIndexFromXY = function(x, y) {
        return x + (this.columns * y);
    };

    this.testCode = function() {
        document.getElementById("startGame").classList.add('hidden');
        document.getElementById("resetGame").classList.remove('hidden');

        workspace.highlightBlock(null);

        let delay = -2000;

        var self = this;
        //find round_start block and execute
        workspace.getTopBlocks().forEach(function(currBlock) {
            if (currBlock.type === 'round_start') {
                var startRoundCode = Blockly.JavaScript.blockToCode(currBlock).split(";");

                for (let index = 0; index < startRoundCode.length; index++) {
                    var timeoutId = setTimeout(function() {
                        eval(startRoundCode[index] + ";");
                    }, delay+=1500);

                    self.timeoutIds.push(timeoutId);

                    timeoutId = setTimeout(function() {
                        spillet.testWinCondition();
                    },delay + 150);

                    self.timeoutIds.push(timeoutId);
                }
            }
        });
    };

    this.testWinCondition = function() {
        var self = this;
        if (this.spiller.getTileX() === this.endX && this.spiller.getTileY() === this.endY) {
            alert(self.winText);

            setTimeout(function() {
                self.resetPlayer();
            }, 1000);
        }
    };

    this.drawGrid = function() {
        for (var t = 0; t < this.tiles.length; t++) {
            this.tiles[t].draw();
        }
    };

    this.drawGameBorder = function() {
        kikoraP5.stroke(255, 90, 44);
        kikoraP5.strokeWeight(15);
        kikoraP5.fill(255, 255, 255, 0);
        kikoraP5.rect(0, 0, gameWidth, gameHeight);

        kikoraP5.strokeWeight(1);
    };

    this.drawStartButton = function() {
        kikoraP5.fill(255);
        kikoraP5.stroke(0);
        kikoraP5.rect(this.gameWidth + 50, this.gameHeight - 100, (this.tileWidth*2), (this.tileHeight));

        kikoraP5.fill(0);
        kikoraP5.textSize(24);
        kikoraP5.text('Start', this.gameWidth + 75, this.gameHeight - 65);
    };

    this.roundStart = function() {


    };

    this.getTileX = function(xPos) {
        return parseInt(xPos/tileWidth);
    };

    this.getTileY = function(yPos) {
        return parseInt(yPos/tileHeight);
    };

    this.getTileAt = function(tileX, tileY) {
        var tileNum = tileX + (tileY*this.columns);
        return this.tiles[tileNum];
    }
};

let kikoraKodespill = function( sketch) {

    sketch.setup = function() {
        this.createCanvas(spillet.getGameWidth()+200, spillet.getGameHeight());
        sketch.angleMode(sketch.DEGREES);

        spillet.setup();
    };

    sketch.draw = function() {
        sketch.clear();

        sketch.background(255);

        spillet.draw();
    };
};

var kikoraP5 = new p5(kikoraKodespill);
let spillet = new P5Game();


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

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

/**
 * The function below is a callback function that executes when the document is ready,
 * all scripts are loaded and elements are placed on-screen. This is a MVP implementation
 * of the jQuery.ready() callback function.
 *
 * @param callback
 */
function documentReady(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
            if (document.readyState=='complete') callback();
        });
}

/**
 * When the document is ready, ensure that the game is updated according to the input parameters.
 */

documentReady(function(){
    setTimeout(function() {
        kikoraToolbox = new KikoraToolbox();

        workspace = Blockly.inject('blocklyDiv', {toolbox: kikoraToolbox.generateToolbox(), maxInstances: kikoraToolbox.generateMaxInstances()});

        spillet.updateGame();
    }, 100);

});
