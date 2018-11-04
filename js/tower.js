function Tower(column, row) {
    this.xPos = 0;
    this.yPos = 0;

    this.draw = function() {
        this.xPos = (column*tileWidth) + (tileWidth/2);
        this.yPos = (row*tileHeight) + (tileHeight/2);

        fill(255);
        stroke(0);
        ellipse(this.xPos, this.yPos, (tileWidth-4), (tileHeight-4));
    };

    this.isAt = function(atColumn, atRow) {
        return atColumn == column && atRow == row;
    };

    this.canHit = function(runner) {
        var distance = int(dist(runner.getPosition().x, runner.getPosition().y, this.xPos, this.yPos));

        return distance < (tileWidth * 2.2);
    }
}