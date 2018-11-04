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

        var floor = findTileAt(tileX, tileY);

        var eastD = distanceTo(floor.getTileX() + 1, floor.getTileY());
        var northD = distanceTo(floor.getTileX(), floor.getTileY() - 1);
        var southD = distanceTo(floor.getTileX(), floor.getTileY() + 1);
        var westD = distanceTo(floor.getTileX() - 1, floor.getTileY());

        var east = findTileAt(floor.getTileX() + 1, floor.getTileY());
        var north = findTileAt(floor.getTileX(), floor.getTileY() - 1);
        var south = findTileAt(floor.getTileX(), floor.getTileY() + 1);
        var west = findTileAt(floor.getTileX() - 1, floor.getTileY());

        if (west && westD <= southD && westD <= eastD && westD <= northD) {
            this.direction = "W";
            this.position.x -= this.speed;

        } else if (eastD <= northD && eastD <= southD && eastD <= westD) {
            this.direction = "E";
            this.position.x += this.speed;
        } else if (northD <= eastD && northD <= southD ) {
            this.direction = "N";
            this.position.y -= this.speed;
        } else if (southD <= northD && southD <= eastD) {
            this.direction = "S";
            this.position.y += this.speed;
        }
    };
}