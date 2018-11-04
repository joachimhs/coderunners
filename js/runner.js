function Runner(health) {
    this.position = createVector(0, gameHeight/2);
    this.speed = 3;
    this.direction = "E";
    this.health = health;

    this.getTileX = function() {
        return getTileX(this.position.x);
    };

    this.getTileY = function() {
        return getTileY(this.position.y);
    };

    this.getPosition = function() {
        return this.position;
    };

    this.isDead = function() {
        return this.health <= 0;
    };

    this.draw = function() {
        stroke(0);
        fill(255);
        if (this.direction === "N") {
            rect(this.position.x, this.position.y, 5, 15);
        } else {
            rect(this.position.x, this.position.y, 15, 5);
        }


        fill(255);
        textSize(12);
        text('' + this.health, this.position.x, this.position.y + 20);
    };

    this.hit = function(damage) {
        this.health -= damage;
    };

    this.update = function() {
        var tileX = getTileX(this.position.x);
        var tileY = getTileY(this.position.y);

        if (this.direction === "E") {
            if (isAnyTowerAt(tileX+1, tileY)) {
                console.log("BLOCKING TOWER!");
                this.direction = "N";
            } else {
                this.position.x += this.speed;
            }
        } else if (this.direction === "N") {
            if (isAnyTowerAt(tileX, tileY-1)) {
                console.log("BLOCKING TOWER!");
                this.direction = "W";
            } else {
                this.position.y -= this.speed;
            }
        } else if (this.direction === "W") {
            if (isAnyTowerAt(tileX-1, tileY)) {
                console.log("BLOCKING TOWER!");
                this.direction = "S";
            } else {
                this.position.x -= this.speed;
            }
        }

        this.checkIfEastIsClear(tileX, tileY);
        if (this.direction === "W") {
            this.checkIfNorthIsClear(tileX, tileY);
        }
    };

    this.checkIfEastIsClear = function(tileX, tileY) {
        var eastClear = true;
        for (var xPos = tileX; xPos < columns; xPos++) {

            if (isAnyTowerAt(xPos, tileY)) {
                eastClear = false;
            }
        }

        if (eastClear) {
            this.direction = "E";
        }
    };

    this.checkIfNorthIsClear = function(tileX, tileY) {
       if (!isAnyTowerAt(tileX, tileY-1)) {
           this.direction = "N";
       }
    }
}