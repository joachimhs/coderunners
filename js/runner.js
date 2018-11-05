function Runner(health) {
    this.position = createVector(0, gameHeight/2);
    this.speed = 3;
    this.direction = "E";
    this.health = health;
    this.steps = 0;
    this.nextTile = null;

    this.east = null;
    this.west = null;
    this.north = null;
    this.south = null;

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
        if (!this.nextTile) {
            var tileX = getTileX(this.position.x - (tileWidth / 2));
            var tileY = getTileY(this.position.y - (tileHeight / 2));

            if (this.direction === "W") {
                tileX = getTileX(this.position.x + (tileWidth / 2));
            }

            if (this.direction === "N") {
                tileY = getTileY(this.position.y + (tileHeight / 2));
            }

            var floor = findTileAt(tileX, tileY);

            var eastD = distanceTo(floor.getTileX() + 1, floor.getTileY());
            var northD = distanceTo(floor.getTileX(), floor.getTileY() - 1);
            var southD = distanceTo(floor.getTileX(), floor.getTileY() + 1);
            var westD = distanceTo(floor.getTileX() - 1, floor.getTileY());

            this.east = findTileAt(floor.getTileX() + 1, floor.getTileY());
            this.north = findTileAt(floor.getTileX(), floor.getTileY() - 1);
            this.south = findTileAt(floor.getTileX(), floor.getTileY() + 1);
            this.west = findTileAt(floor.getTileX() - 1, floor.getTileY());

            if (this.west && westD <= southD && westD <= eastD && westD <= northD) {
                this.steps = parseInt(tileWidth / 4);
                this.nextTile = this.west;
            } else if (eastD <= northD && eastD <= southD && eastD <= westD) {
                this.steps = parseInt(tileWidth / 4);
                this.nextTile = this.east;
            } else if (northD <= eastD && northD <= southD) {
                this.nextTile = this.north;
                this.steps = parseInt(tileWidth / 4);
            } else if (southD <= northD && southD <= eastD) {
                this.steps = parseInt(tileWidth / 4);
                this.nextTile = this.south;
            }
        }

        if (this.nextTile === this.west) {
            this.position.x -= this.speed;
            if (abs(this.nextTile.getCenter().x - this.position.x) < 3) {
                this.nextTile = null;
            }
        } else if (this.nextTile === this.east) {
            this.position.x += this.speed;
            if (abs(this.nextTile.getCenter().x - this.position.x) < 3) {
                this.nextTile = null;
            }
        } else if (this.nextTile === this.north) {
            this.position.y -= this.speed;
            if (abs(this.nextTile.getCenter().y - this.position.y) < 3) {
                this.nextTile = null;
            }
        } else if (this.nextTile === this.south) {
            this.position.y += this.speed;
            if (abs(this.nextTile.getCenter().y - this.position.y) < 3) {
                this.nextTile = null;
            }
        }


        this.steps--;
    };
}