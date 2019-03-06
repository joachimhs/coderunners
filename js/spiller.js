function Spiller(startX, startY) {
    this.tileX = startX;
    this.tileY = startY;
    this.position = null;

    this.destX = startX;
    this.destY = startY;

    this.angleDeg = 90;
    this.destDeg = 90;

    /**
     * ACCESSORS AND MUTATORS
     */
    this.getTileX = function() {
        return this.tileX;
    };

    this.getTileY = function() {
        return this.tileY;
    };
    /**
     * //ACCESSORS AND MUTATORS
     */

    this.draw = function() {
        if (this.position === null) {
            this.position = kikoraP5.createVector((this.tileX*spillet.tileWidth)+(spillet.tileWidth/4), (this.tileY*spillet.tileHeight)+(spillet.tileHeight/4));
        }

        this.destPosition = kikoraP5.createVector((this.destX*spillet.tileWidth)+(spillet.tileWidth/4), (this.destY*spillet.tileHeight)+(spillet.tileHeight/4));

        if (this.destPosition.x > this.position.x) {
            this.position.x++;
        } else if (this.destPosition.x < this.position.x) {
            this.position.x--;
        } else {
            this.tileX = this.destX;

            if (spillet.getTileAt(this.tileX, this.tileY)) {
                spillet.getTileAt(this.tileX, this.tileY).setVisited();
            }
        }

        if (this.destPosition.y > this.position.y) {
            this.position.y++;
        } else if (this.destPosition.y < this.position.y) {
            this.position.y--;
        } else {
            this.tileY = this.destY;

            if (spillet.getTileAt(this.tileX, this.tileY)) {
                spillet.getTileAt(this.tileX, this.tileY).setVisited();
            }
        }

        kikoraP5.stroke(0);
        kikoraP5.fill(255);

        if (this.destDeg > this.angleDeg) {
            this.angleDeg+=3;
        }  else if (this.destDeg < this.angleDeg) {
            this.angleDeg-=3;
        } else {
            this.angleDeg = this.destDeg;
        }

        //kikoraP5.rect(this.position.x, this.position.y, spillet.tileWidth/2, spillet.tileHeight/2);

        kikoraP5.push();

        kikoraP5.translate(this.position.x + 12.5, this.position.y + 12.5);
        kikoraP5.rotate(this.angleDeg-90);

        kikoraP5.image(spillet.getWizardImg(), -22.5, -22.5, spillet.tileWidth, spillet.tileHeight);

        /*kikoraP5.triangle(-(spillet.tileWidth/3) + 2, (spillet.tileHeight/3) - 2,
            (spillet.tileWidth/3) - 2, (spillet.tileHeight/3) - 2,
            0, -(spillet.tileWidth/2) + 10);*/

        kikoraP5.pop();
    };


    this.update = function() {

    };

    this.resetPlayerTo = function(x, y) {
        this.tileX = x;
        this.tileY = y;
        this.destX = x;
        this.destY = y;
        this.angleDeg = 90;
        this.destDeg = 90;

        this.position = kikoraP5.createVector((this.tileX*spillet.tileWidth)+(spillet.tileWidth/4), (this.tileY*spillet.tileHeight)+(spillet.tileHeight/4));
    };

    this.moveForward = function() {
        var nextX = parseInt(this.destX);
        var nextY = parseInt(this.destY);

        if (this.angleDeg == 90) {
            nextX++;
        } else if (this.angleDeg == -90) {
            nextX--;
        }

        if (this.angleDeg == 0) {
            nextY--;
        } else if (this.angleDeg == 180) {
            nextY++;
        }

        if (spillet.playerCanMoveTo(nextX, nextY)) {
            this.destX = nextX;
            this.destY = nextY
        } else {
            alert("Spillern kan ikke gå hit!");
        }
    };

    this.rotate = function(deg) {
        this.destDeg += deg;
    }
}