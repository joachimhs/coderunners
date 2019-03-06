function Floor(tileX, tileY) {
    this.color = kikoraP5.color(24, 44, 79);
    this.distance = 10000;
    this.walkable = true;
    this.visited = false;
    this.travelTo = "E";
    this.tileSprite = null;

    this.getTileSprite = function() {
        return this.tileSprite;
    };

    this.getColor = function() {
        return this.color;
    };

    this.setColor = function(newColor) {
        this.color = newColor;
    };

    this.setTravelTo = function(direction) {
        this.travelTo = direction;
    };

    this.getTravelTo = function() {
        return this.travelTo;
    };

    this.setVisited = function(vis) {
        this.visited = vis;
        this.color = spillet.getGreenColor();
    };

    this.getVisited = function() {
        return this.visited;
    };

    this.setTileSprite = function(img) {
        this.tileSprite = img;
    };

    this.setWalkable = function(walk) {
        if (!walk) {
            this.color = 50;
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

    this.setPlayer = function() {
        this.color = kikoraP5.color(140, 217, 92);
    };

    this.setGoal = function() {
        this.color = kikoraP5.color(106, 76, 181);
    };

    this.setAvailable = function() {
        this.color = kikoraP5.color(24, 44, 79);
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

    this.resetTile = function() {
        this.setAvailable();
        this.setTileSprite(null);
    };

    this.playerCanBeAtTile = function() {
        let playerCanBeHere = true;

        if (this.tileSprite === spillet.stoneImg) {
            playerCanBeHere = false;
        }

        return playerCanBeHere;
    };

    this.draw = function() {
        kikoraP5.fill(this.color);
        kikoraP5.stroke(0);
        kikoraP5.rect((tileX*spillet.tileWidth)+2, (tileY*spillet.tileHeight)+2, spillet.tileWidth-2, spillet.tileHeight-2);

        if (this.tileSprite) {

            kikoraP5.image(this.tileSprite, (tileX*spillet.tileWidth)+2, (tileY*spillet.tileHeight)+2, spillet.tileWidth-2, spillet.tileHeight-2);
        }
    }
}