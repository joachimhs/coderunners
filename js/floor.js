function Floor(tileX, tileY) {
    this.color = 100;
    this.distance = 10000;
    this.walkable = true;
    this.visited = false;
    this.travelTo = "E";

    this.setTravelTo = function(direction) {
        this.travelTo = direction;
    };

    this.getTravelTo = function() {
        return this.travelTo;
    };

    this.setVisited = function(vis) {
        this.visited = vis;
    };

    this.getVisited = function() {
        return this.visited;
    };

    this.setWalkable = function(walk) {
        if (!walk) {
            this.color = 255;
        }
        this.walkable = walk;
    };

    this.getWalkable = function() {
        return this.walkable;
    };

    this.setDistance = function(dist) {
        this.distance = dist;
    };

    this.getDistance = function() {
        return this.distance;
    };

    this.setPath = function() {
        this.color = 130;
    };

    this.setAvailable = function() {
        this.color = 100;
    };

    this.getTileX = function() {
        return tileX;
    };

    this.getTileY = function() {
        return tileY;
    };

    this.getCenter = function() {
        return createVector((tileX*tileWidth) + tileWidth/2, (tileY*tileHeight) + tileHeight/2);
    };

    this.draw = function() {
        fill(this.color);
        stroke(0);
        rect((tileX*tileWidth)+2, (tileY*tileHeight)+2, tileWidth-2, tileHeight-2);

        fill(0);
        textSize(12);
        text('' + this.distance, (tileX*tileWidth)+tileWidth/2, (tileY*tileHeight)+tileWidth/2);
    }
}