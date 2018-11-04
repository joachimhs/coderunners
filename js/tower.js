function Tower(column, row) {

    this.draw = function() {
        var tX = (column*tileWidth) + (tileWidth/2);
        var tY = (row*tileHeight) + (tileHeight/2);

        fill(255);
        stroke(0);
        ellipse(tX, tY, (tileWidth-4), (tileHeight-4));
    };

    this.isAt = function(atColumn, atRow) {
        return atColumn == column && atRow == row;
    };
}